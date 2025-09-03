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
        Schema::table('users', function (Blueprint $table) {
            $table->enum('role', ['admin', 'member', 'guest'])->default('member');
            $table->string('phone')->nullable();
            $table->text('bio')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->enum('experience_level', ['beginner', 'intermediate', 'advanced', 'expert'])->default('beginner');
            $table->json('interests')->nullable();
            $table->string('profile_photo')->nullable();
            $table->boolean('is_active')->default(true);
            
            $table->index('role');
            $table->index('experience_level');
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'role', 'phone', 'bio', 'date_of_birth', 
                'experience_level', 'interests', 'profile_photo', 'is_active'
            ]);
        });
    }
};