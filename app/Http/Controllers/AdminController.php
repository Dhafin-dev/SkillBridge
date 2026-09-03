<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Project;
use App\Models\Workspace;
use App\Models\AuditLog;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    public function dashboard()
    {
        if (!Auth::check() || !Auth::user()->isAdmin()) {
            abort(403, 'Hanya administrator yang memiliki akses ke halaman ini.');
        }

        $stats = [
            'total_users' => User::count(),
            'total_students' => User::where('role', 'STUDENT')->count(),
            'total_umkm' => User::where('role', 'UMKM')->count(),
            'total_projects' => Project::count(),
            'active_workspaces' => Workspace::where('status', 'ACTIVE')->count(),
            'completed_projects' => Project::where('status', 'COMPLETED')->count(),
        ];

        $projects = Project::with(['owner', 'category'])->latest()->paginate(10);
        $categories = Category::withCount('projects')->get();
        $auditLogs = AuditLog::with('user')->latest()->take(10)->get();

        return view('admin.dashboard', compact('stats', 'projects', 'categories', 'auditLogs'));
    }

    public function toggleProjectStatus(Request $request, $id)
    {
        if (!Auth::check() || !Auth::user()->isAdmin()) {
            abort(403, 'Akses tidak sah.');
        }

        $project = Project::findOrFail($id);
        $oldStatus = $project->status;
        $newStatus = ($oldStatus === 'PUBLISHED') ? 'DRAFT' : 'PUBLISHED';
        $project->update(['status' => $newStatus]);

        AuditLog::create([
            'user_id' => Auth::id(),
            'action' => 'PROJECT_STATUS_TOGGLE',
            'details' => "Mengubah status proyek #{$project->id} ({$project->title}) dari {$oldStatus} ke {$newStatus}.",
            'ip_address' => $request->ip(),
        ]);

        return back()->with('success', "Status proyek #{$project->id} berhasil diubah menjadi {$newStatus}.");
    }
}
