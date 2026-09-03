<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Workspace extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'student_id',
        'umkm_id',
        'status',
        'progress_percent',
        'deliverable_url',
        'deliverable_notes',
        'completed_at',
    ];

    protected $casts = [
        'completed_at' => 'datetime',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function student()
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    public function umkm()
    {
        return $this->belongsTo(User::class, 'umkm_id');
    }

    public function tasks()
    {
        return $this->hasMany(ProjectTask::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    /**
     * Hitung ulang persentase progres dinamis berdasarkan perbandingan tugas selesai
     */
    public function recalculateProgress(): int
    {
        $total = $this->tasks()->count();
        if ($total === 0) {
            $this->update(['progress_percent' => 0]);
            return 0;
        }

        $completed = $this->tasks()->where('completed', true)->count();
        $percent = (int) round(($completed / $total) * 100);
        $this->update(['progress_percent' => $percent]);
        return $percent;
    }
}
