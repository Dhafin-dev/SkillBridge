<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'institution',
        'major',
        'portfolio_score',
        'skills',
        'resume_url',
        'github_url',
        'linkedin_url',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Dapatkan daftar skill dalam bentuk array
     */
    public function getSkillsArrayAttribute(): array
    {
        if (empty($this->skills)) {
            return [];
        }
        return array_map('trim', explode(',', $this->skills));
    }
}
