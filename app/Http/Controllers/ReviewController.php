<?php

namespace App\Http\Controllers;

use App\Models\Workspace;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'workspace_id' => 'required|exists:workspaces,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|min:5|max:1000',
        ]);

        $workspace = Workspace::with(['project', 'student', 'umkm'])->findOrFail($request->workspace_id);
        $userId = Auth::id();

        if ($userId !== $workspace->student_id && $userId !== $workspace->umkm_id && !Auth::user()->isAdmin()) {
            abort(403, 'Akses tidak sah.');
        }

        // Tentukan penerima ulasan
        $targetId = ($userId === $workspace->student_id) ? $workspace->umkm_id : $workspace->student_id;

        // Cek apakah sudah pernah memberi ulasan
        $existing = Review::where('workspace_id', $workspace->id)
            ->where('author_id', $userId)
            ->first();

        if ($existing) {
            return back()->with('error', 'Anda sudah pernah memberikan ulasan untuk proyek ini.');
        }

        $review = Review::create([
            'project_id' => $workspace->project_id,
            'workspace_id' => $workspace->id,
            'author_id' => $userId,
            'target_id' => $targetId,
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);

        // FR-REV-02: Akumulasi skor portofolio jika ulasan ditujukan untuk mahasiswa
        if ($targetId === $workspace->student_id) {
            $student = $workspace->student;
            $profile = $student->studentProfile;
            if ($profile) {
                // Tambah skor portofolio berbasis rating (misal rating 5 = +75 poin)
                $scoreBonus = $request->rating * 15;
                $profile->increment('portfolio_score', $scoreBonus);
            }
        }

        return back()->with('success', 'Terima kasih! Ulasan evaluasi kerja sama berhasil disimpan.');
    }
}
