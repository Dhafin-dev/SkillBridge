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
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('icon')->nullable();
            $table->text('description')->nullable();
            $table->timestamps();
        });

        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('owner_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('category_id')->constrained('categories')->onDelete('cascade');
            $table->string('title');
            $table->string('slug')->nullable();
            $table->string('duration')->default('4 Minggu');
            $table->string('stipend')->default('Rp 1.500.000');
            $table->text('description');
            $table->text('required_skills'); // contoh: "Laravel, Blade, PostgreSQL, HTML/CSS"
            $table->text('deliverables_brief')->nullable();
            $table->string('status')->default('PUBLISHED'); // DRAFT, PUBLISHED, ACTIVE, COMPLETED
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
        Schema::dropIfExists('categories');
    }
};
