<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'owner_id',
        'category_id',
        'title',
        'slug',
        'duration',
        'stipend',
        'description',
        'required_skills',
        'deliverables_brief',
        'status',
    ];

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function applications()
    {
        return $this->hasMany(ProjectApplication::class);
    }

    public function workspaces()
    {
        return $this->hasMany(Workspace::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function getSkillsArrayAttribute(): array
    {
        if (empty($this->required_skills)) {
            return [];
        }
        return array_map('trim', explode(',', $this->required_skills));
    }
}
