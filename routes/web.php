<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\WorkspaceController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\AdminController;
use App\Models\Project;
use App\Models\Category;
use App\Models\User;
use App\Models\Workspace;

// Landing Page
Route::get('/', function () {
    $featuredProjects = Project::with(['owner.umkmProfile', 'category'])
        ->where('status', 'PUBLISHED')
        ->latest()
        ->take(6)
        ->get();

    $categories = Category::withCount(['projects' => function ($q) {
        $q->where('status', 'PUBLISHED');
    }])->get();

    $stats = [
        'students' => User::where('role', 'STUDENT')->count(),
        'umkm' => User::where('role', 'UMKM')->count(),
        'projects' => Project::where('status', 'PUBLISHED')->count(),
        'workspaces' => Workspace::where('status', 'ACTIVE')->count(),
        'completed' => Project::where('status', 'COMPLETED')->count(),
    ];

    return view('home', compact('featuredProjects', 'categories', 'stats'));
})->name('home');

// Autentikasi Tamu (Guest)
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
    Route::post('/register', [AuthController::class, 'register']);
});

// Autentikasi Pengguna Terdaftar (Auth)
Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    // Manajemen Profil Pengguna
    Route::get('/profile', [ProfileController::class, 'show'])->name('profile.show');
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');

    // Proyek & Marketplace
    Route::get('/projects/create', [ProjectController::class, 'create'])->name('projects.create');
    Route::post('/projects', [ProjectController::class, 'store'])->name('projects.store');

    // Lamaran & Seleksi Kandidat
    Route::post('/projects/{id}/apply', [ApplicationController::class, 'apply'])->name('projects.apply');
    Route::get('/projects/{id}/candidates', [ApplicationController::class, 'candidates'])->name('projects.candidates');
    Route::post('/applications/{id}/accept', [ApplicationController::class, 'accept'])->name('applications.accept');
    Route::post('/applications/{id}/reject', [ApplicationController::class, 'reject'])->name('applications.reject');

    // Ruang Kerja Kolaboratif (Workspace)
    Route::get('/workspaces/{id}', [WorkspaceController::class, 'show'])->name('workspaces.show');
    Route::post('/workspaces/{id}/tasks', [WorkspaceController::class, 'storeTask'])->name('workspaces.tasks.store');
    Route::patch('/tasks/{id}/toggle', [WorkspaceController::class, 'toggleTask'])->name('tasks.toggle');
    Route::post('/workspaces/{id}/deliverable', [WorkspaceController::class, 'submitDeliverable'])->name('workspaces.deliverable');
    Route::post('/workspaces/{id}/complete', [WorkspaceController::class, 'complete'])->name('workspaces.complete');

    // Sistem Ulasan Dua Arah (Reviews)
    Route::post('/reviews', [ReviewController::class, 'store'])->name('reviews.store');

    // Dasbor Tata Kelola Administrator
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    Route::post('/admin/projects/{id}/toggle', [AdminController::class, 'toggleProjectStatus'])->name('admin.projects.toggle');
});

// Katalog Proyek Terbuka (Publik)
Route::get('/projects', [ProjectController::class, 'index'])->name('projects.index');
Route::get('/projects/{id}', [ProjectController::class, 'show'])->name('projects.show');
