<?php

namespace App\Http\Controllers;

use App\Models\Workspace;
use App\Models\ProjectTask;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WorkspaceController extends Controller
{
    public function show($id)
    {
        $workspace = Workspace::with([
            'project',
            'student.studentProfile',
            'umkm.umkmProfile',
            'tasks' => function ($q) {
                $q->orderBy('completed')->orderBy('id');
            },
            'reviews.author'
        ])->findOrFail($id);

        $userId = Auth::id();
        // Otorisasi: hanya anggota workspace (mahasiswa / umkm) atau admin
        if ($userId !== $workspace->student_id && $userId !== $workspace->umkm_id && !Auth::user()->isAdmin()) {
            abort(403, 'Anda tidak memiliki hak akses ke workspace ini.');
        }

        // Cek ulasan yang sudah diberikan user ini
        $userReview = $workspace->reviews()->where('author_id', $userId)->first();

        return view('workspaces.show', compact('workspace', 'userReview'));
    }

    public function storeTask(Request $request, $id)
    {
        $workspace = Workspace::findOrFail($id);
        $userId = Auth::id();

        if ($userId !== $workspace->student_id && $userId !== $workspace->umkm_id && !Auth::user()->isAdmin()) {
            abort(403, 'Akses tidak sah.');
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'due_date' => 'nullable|date',
        ]);

        $workspace->tasks()->create([
            'title' => $request->title,
            'due_date' => $request->due_date,
            'completed' => false,
        ]);

        $workspace->recalculateProgress();

        return back()->with('success', 'Tugas milestone baru berhasil ditambahkan.');
    }

    public function toggleTask($taskId)
    {
        $task = ProjectTask::with('workspace')->findOrFail($taskId);
        $workspace = $task->workspace;
        $userId = Auth::id();

        if ($userId !== $workspace->student_id && $userId !== $workspace->umkm_id && !Auth::user()->isAdmin()) {
            abort(403, 'Akses tidak sah.');
        }

        $task->update(['completed' => !$task->completed]);
        $newProgress = $workspace->recalculateProgress();

        return back()->with('success', "Status tugas diperbarui! Progres proyek saat ini: {$newProgress}%.");
    }

    public function submitDeliverable(Request $request, $id)
    {
        $workspace = Workspace::findOrFail($id);
        if (Auth::id() !== $workspace->student_id && !Auth::user()->isAdmin()) {
            abort(403, 'Hanya mahasiswa yang dapat menyerahkan hasil kerja.');
        }

        $request->validate([
            'deliverable_url' => 'required|url|max:500',
            'deliverable_notes' => 'nullable|string',
        ]);

        $workspace->update([
            'deliverable_url' => $request->deliverable_url,
            'deliverable_notes' => $request->deliverable_notes,
        ]);

        return back()->with('success', 'Hasil luaran proyek berhasil diserahkan untuk ditinjau oleh UMKM!');
    }

    public function complete($id)
    {
        $workspace = Workspace::with('project')->findOrFail($id);
        if (Auth::id() !== $workspace->umkm_id && !Auth::user()->isAdmin()) {
            abort(403, 'Hanya pihak UMKM yang dapat menyetujui penyelesaian proyek.');
        }

        $workspace->update([
            'status' => 'COMPLETED',
            'progress_percent' => 100,
            'completed_at' => now(),
        ]);

        $workspace->project->update(['status' => 'COMPLETED']);

        return back()->with('success', 'Proyek berhasil disetujui dan dinyatakan selesai! Silakan berikan ulasan dua arah.');
    }
}
