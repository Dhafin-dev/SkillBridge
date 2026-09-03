<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UmkmProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'company_name',
        'industry',
        'business_scale',
        'location',
        'description',
        'website',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
