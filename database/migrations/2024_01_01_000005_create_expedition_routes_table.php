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
        Schema::create('expedition_routes', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->decimal('start_latitude', 10, 8);
            $table->decimal('start_longitude', 11, 8);
            $table->decimal('end_latitude', 10, 8);
            $table->decimal('end_longitude', 11, 8);
            $table->json('waypoints')->nullable(); // Store GPS coordinates as JSON
            $table->decimal('distance_km', 8, 2);
            $table->integer('estimated_duration_hours');
            $table->enum('difficulty_level', ['easy', 'moderate', 'challenging', 'extreme'])->default('moderate');
            $table->text('terrain_notes')->nullable();
            $table->text('safety_tips')->nullable();
            $table->boolean('is_verified')->default(false);
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
            $table->timestamps();
            
            $table->index(['difficulty_level', 'is_verified']);
            $table->index('created_by');
            $table->index('distance_km');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expedition_routes');
    }
};