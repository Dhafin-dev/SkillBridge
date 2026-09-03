<?php

namespace App\Services;

use App\Models\Project;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class SkillMatchService
{
    protected string $fastApiUrl;

    public function __construct()
    {
        $this->fastApiUrl = env('FASTAPI_MATCH_URL', 'http://127.0.0.1:8000');
    }

    /**
     * Jalankan proses pemeringkatan kandidat pelamar untuk suatu proyek.
     *
     * @param Project $project
     * @return array
     */
    public function rankCandidates(Project $project): array
    {
        $applications = $project->applications()
            ->with(['student.studentProfile'])
            ->get();

        if ($applications->isEmpty()) {
            return [];
        }

        // Siapkan struktur data kandidat untuk payload FastAPI
        $candidatesPayload = [];
        foreach ($applications as $app) {
            $student = $app->student;
            $profile = $student->studentProfile;

            $skillsList = $profile && $profile->skills ? $profile->skills : '';
            $profileBio = ($student->bio ?? '') . ' ' . ($app->pitch ?? '');

            $candidatesPayload[] = [
                'candidate_id' => $app->id,
                'candidate_name' => $student->name,
                'profile_text' => trim($profileBio),
                'skills' => $skillsList,
            ];
        }

        $projectReqs = $project->description . ' ' . ($project->deliverables_brief ?? '');
        $requiredSkills = $project->skills_array;

        // Panggil endpoint FastAPI /match dengan batas waktu (timeout) 4 detik
        try {
            $response = Http::timeout(4)->post("{$this->fastApiUrl}/match", [
                'project_requirements' => $projectReqs,
                'required_skills' => $requiredSkills,
                'candidates' => $candidatesPayload,
            ]);

            if ($response->successful()) {
                $data = $response->json();
                $rankings = $data['rankings'] ?? [];

                // Perbarui skor kecocokan di database
                foreach ($rankings as $rankItem) {
                    $appId = $rankItem['candidate_id'];
                    $score = $rankItem['match_score'] ?? 0;
                    $project->applications()->where('id', $appId)->update([
                        'match_score' => $score,
                    ]);
                }

                return $rankings;
            }

            Log::warning('FastAPI SkillMatch returned non-200 response: ' . $response->status());
        } catch (\Throwable $e) {
            Log::warning('FastAPI SkillMatch service connection failed, fallback to local PHP matching: ' . $e->getMessage());
        }

        // TR-03 Fallback Matching Algorithm jika FastAPI service sedang offline
        return $this->fallbackMatchingAlgorithm($projectReqs, $requiredSkills, $applications);
    }

    /**
     * Fallback matching algorithm berbasis Jaccard token overlap untuk keandalan sistem (NFR-R-01 & TR-03)
     */
    protected function fallbackMatchingAlgorithm(string $projectReqs, array $requiredSkills, $applications): array
    {
        $projectTokens = array_unique(array_filter(explode(' ', strtolower(preg_replace('/[^a-zA-Z0-9\s]/', ' ', $projectReqs . ' ' . implode(' ', $requiredSkills))))));

        $rankings = [];
        foreach ($applications as $app) {
            $student = $app->student;
            $profile = $student->studentProfile;
            $candText = strtolower(($student->bio ?? '') . ' ' . ($profile->skills ?? '') . ' ' . ($app->pitch ?? ''));
            $candTokens = array_unique(array_filter(explode(' ', preg_replace('/[^a-zA-Z0-9\s]/', ' ', $candText))));

            $intersection = array_intersect($projectTokens, $candTokens);
            $union = array_unique(array_merge($projectTokens, $candTokens));

            $score = 0.0;
            if (count($union) > 0) {
                $score = round((count($intersection) / count($union)) * 100 * 1.8, 1);
                $score = min(100.0, $score);
            }

            $app->update(['match_score' => $score]);

            $rankings[] = [
                'candidate_id' => $app->id,
                'candidate_name' => $student->name,
                'match_score' => $score,
                'overlapping_skills' => array_values(array_slice($intersection, 0, 5)),
            ];
        }

        usort($rankings, fn($a, $b) => $b['match_score'] <=> $a['match_score']);

        foreach ($rankings as $idx => &$item) {
            $item['rank'] = $idx + 1;
        }

        return $rankings;
    }
}
