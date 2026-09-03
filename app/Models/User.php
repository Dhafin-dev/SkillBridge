<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'avatar',
        'bio',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function isStudent(): bool
    {
        return strtoupper($this->role) === 'STUDENT';
    }

    public function isUmkm(): bool
    {
        return strtoupper($this->role) === 'UMKM';
    }

    public function isAdmin(): bool
    {
        return strtoupper($this->role) === 'ADMIN';
    }

    public function studentProfile()
    {
        return $this->hasOne(StudentProfile::class);
    }

    public function umkmProfile()
    {
        return $this->hasOne(UmkmProfile::class);
    }

    public function projects()
    {
        return $this->hasMany(Project::class, 'owner_id');
    }

    public function applications()
    {
        return $this->hasMany(ProjectApplication::class, 'student_id');
    }

    public function studentWorkspaces()
    {
        return $this->hasMany(Workspace::class, 'student_id');
    }

    public function umkmWorkspaces()
    {
        return $this->hasMany(Workspace::class, 'umkm_id');
    }

    public function reviewsReceived()
    {
        return $this->hasMany(Review::class, 'target_id');
    }

    public function reviewsGiven()
    {
        return $this->hasMany(Review::class, 'author_id');
    }
}
