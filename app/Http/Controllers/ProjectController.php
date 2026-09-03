<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $query = Project::with(['owner.umkmProfile', 'category'])
            ->where('status', 'PUBLISHED')
            ->latest();

        if ($request->filled('category')) {
            $query->where('category_id', $request->category);
        }

        if ($request->filled('q')) {
            $search = $request->q;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhere('required_skills', 'like', "%{$search}%");
            });
        }

        $projects = $query->paginate(9)->withQueryString();
        $categories = Category::withCount(['projects' => function ($q) {
            $q->where('status', 'PUBLISHED');
        }])->get();

        return view('projects.index', compact('projects', 'categories'));
    }

    public function show($id)
    {
        $project = Project::with([
            'owner.umkmProfile',
            'category',
            'applications' => function ($q) {
                $q->with('student.studentProfile');
            }
        ])->findOrFail($id);

        $hasApplied = false;
        $userApplication = null;
        if (Auth::check() && Auth::user()->isStudent()) {
            $userApplication = $project->applications()
                ->where('student_id', Auth::id())
                ->first();
            $hasApplied = !is_null($userApplication);
        }

        // Cari workspace aktif jika ada
        $activeWorkspace = null;
        if (Auth::check()) {
            $activeWorkspace = $project->workspaces()
                ->where(function ($q) {
                    $q->where('student_id', Auth::id())
                      ->orWhere('umkm_id', Auth::id());
                })
                ->first();
        }

        return view('projects.show', compact('project', 'hasApplied', 'userApplication', 'activeWorkspace'));
    }

    public function create()
    {
        if (!Auth::check() || !Auth::user()->isUmkm()) {
            return redirect()->route('projects.index')->with('error', 'Hanya akun mitra UMKM yang dapat menerbitkan brief proyek.');
        }

        $categories = Category::all();
        return view('projects.create', compact('categories'));
    }

    public function store(Request $request)
    {
        if (!Auth::check() || !Auth::user()->isUmkm()) {
            abort(403, 'Akses tidak sah.');
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'duration' => 'required|string|max:50',
            'stipend' => 'required|string|max:100',
            'description' => 'required|string',
            'required_skills' => 'required|string',
            'deliverables_brief' => 'nullable|string',
        ]);

        $project = Project::create([
            'owner_id' => Auth::id(),
            'category_id' => $validated['category_id'],
            'title' => $validated['title'],
            'slug' => Str::slug($validated['title']) . '-' . time(),
            'duration' => $validated['duration'],
            'stipend' => $validated['stipend'],
            'description' => $validated['description'],
            'required_skills' => $validated['required_skills'],
            'deliverables_brief' => $validated['deliverables_brief'] ?? null,
            'status' => 'PUBLISHED',
        ]);

        return redirect()->route('projects.show', $project->id)->with('success', 'Brief proyek berhasil diterbitkan ke katalog!');
    }
}
