<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ProjectApplication;
use App\Models\Workspace;
use App\Models\ProjectTask;
use App\Services\SkillMatchService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ApplicationController extends Controller
{
    protected SkillMatchService $skillMatchService;

    public function __construct(SkillMatchService $skillMatchService)
    {
        $this->skillMatchService = $skillMatchService;
    }

    public function apply(Request $request, $projectId)
    {
        if (!Auth::check() || !Auth::user()->isStudent()) {
            return redirect()->route('login')->with('error', 'Hanya akun mahasiswa yang dapat mengajukan lamaran proyek.');
        }

        $project = Project::findOrFail($projectId);

        // Periksa apakah sudah pernah melamar (FR-APP-01)
        $existing = ProjectApplication::where('project_id', $project->id)
            ->where('student_id', Auth::id())
            ->first();

        if ($existing) {
            return back()->with('error', 'Anda sudah pernah mengajukan lamaran untuk proyek ini.');
        }

        $request->validate([
            'pitch' => 'nullable|string|max:1000',
        ]);

        ProjectApplication::create([
            'project_id' => $project->id,
            'student_id' => Auth::id(),
            'pitch' => $request->pitch,
            'match_score' => 0.0,
            'status' => 'PENDING',
        ]);

        return back()->with('success', 'Lamaran Anda berhasil dikirimkan ke mitra UMKM!');
    }

    public function candidates($projectId)
    {
        $project = Project::findOrFail($projectId);

        // Hanya pemilik proyek (UMKM) atau Admin yang boleh melihat kandidat
        if (Auth::id() !== $project->owner_id && !Auth::user()->isAdmin()) {
            abort(403, 'Akses dibatasi hanya untuk pemilik proyek.');
        }

        // Jalankan pemeringkatan NLP SkillMatch Engine
        $rankings = $this->skillMatchService->rankCandidates($project);

        // Ambil data lamaran lengkap yang telah diperbarui
        $applications = $project->applications()
            ->with(['student.studentProfile'])
            ->orderByDesc('match_score')
            ->get();

        return view('projects.candidates', compact('project', 'applications', 'rankings'));
    }

    public function accept($applicationId)
    {
        $application = ProjectApplication::with(['project', 'student'])->findOrFail($applicationId);
        $project = $application->project;

        if (Auth::id() !== $project->owner_id && !Auth::user()->isAdmin()) {
            abort(403, 'Akses tidak sah.');
        }

        $application->update(['status' => 'ACCEPTED']);

        // Tolak pelamar lain jika hanya membutuhkan 1 talenta utama
        $project->applications()->where('id', '!=', $application->id)->update(['status' => 'REJECTED']);

        // Update status proyek menjadi ACTIVE
        $project->update(['status' => 'ACTIVE']);

        // FR-WORK-01: Inisiasi Workspace Kolaboratif Otomatis
        $workspace = Workspace::firstOrCreate(
            [
                'project_id' => $project->id,
                'student_id' => $application->student_id,
            ],
            [
                'umkm_id' => $project->owner_id,
                'status' => 'ACTIVE',
                'progress_percent' => 0,
            ]
        );

        // Buat 3 checklist milestone awal standar jika belum ada task
        if ($workspace->tasks()->count() === 0) {
            ProjectTask::create([
                'workspace_id' => $workspace->id,
                'title' => 'Kick-off Meeting & Penyelarasan Kebutuhan Proyek',
                'completed' => true,
                'due_date' => now()->addDays(2),
            ]);
            ProjectTask::create([
                'workspace_id' => $workspace->id,
                'title' => 'Perancangan Prototipe / Draf Awal Luaran',
                'completed' => false,
                'due_date' => now()->addDays(7),
            ]);
            ProjectTask::create([
                'workspace_id' => $workspace->id,
                'title' => 'Implementasi Akhir & Penyerahan Berkas Deliverables',
                'completed' => false,
                'due_date' => now()->addDays(14),
            ]);
            $workspace->recalculateProgress();
        }

        return redirect()->route('workspaces.show', $workspace->id)->with('success', 'Kandidat diterima! Ruang kerja (Workspace) telah berhasil diinisialisasi.');
    }

    public function reject($applicationId)
    {
        $application = ProjectApplication::with('project')->findOrFail($applicationId);
        if (Auth::id() !== $application->project->owner_id && !Auth::user()->isAdmin()) {
            abort(403, 'Akses tidak sah.');
        }

        $application->update(['status' => 'REJECTED']);
        return back()->with('info', 'Lamaran kandidat telah ditandai ditolak.');
    }
}
