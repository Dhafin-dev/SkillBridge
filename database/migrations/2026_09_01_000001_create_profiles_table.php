<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('student_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained('users')->onDelete('cascade');
            $table->string('institution')->default('Universitas Airlangga');
            $table->string('major')->nullable()->default('Sistem Informasi');
            $table->integer('portfolio_score')->default(100);
            $table->text('skills')->nullable(); // comma-separated or json text
            $table->string('resume_url', 500)->nullable();
            $table->string('github_url')->nullable();
            $table->string('linkedin_url')->nullable();
            $table->timestamps();
        });

        Schema::create('umkm_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained('users')->onDelete('cascade');
            $table->string('company_name');
            $table->string('industry')->default('Digital & Retail');
            $table->string('business_scale')->default('Usaha Kecil'); // Mikro, Kecil, Menengah
            $table->string('location')->nullable()->default('Surabaya, Jawa Timur');
            $table->text('description')->nullable();
            $table->string('website')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('umkm_profiles');
        Schema::dropIfExists('student_profiles');
    }
};
