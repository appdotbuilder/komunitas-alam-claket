<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ExpeditionRoute>
 */
class ExpeditionRouteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startLat = fake()->latitude(-8.0, -7.0);
        $startLng = fake()->longitude(112.0, 113.0);
        
        return [
            'name' => fake()->words(3, true) . ' Trail',
            'description' => fake()->paragraph(2),
            'start_latitude' => $startLat,
            'start_longitude' => $startLng,
            'end_latitude' => $startLat + fake()->randomFloat(6, -0.1, 0.1),
            'end_longitude' => $startLng + fake()->randomFloat(6, -0.1, 0.1),
            'waypoints' => fake()->optional()->randomElements([
                ['lat' => $startLat + 0.01, 'lng' => $startLng + 0.01],
                ['lat' => $startLat + 0.02, 'lng' => $startLng + 0.02],
            ], random_int(0, 5)),
            'distance_km' => fake()->randomFloat(2, 1, 50),
            'estimated_duration_hours' => fake()->numberBetween(2, 24),
            'difficulty_level' => fake()->randomElement(['easy', 'moderate', 'challenging', 'extreme']),
            'terrain_notes' => fake()->optional()->paragraph(),
            'safety_tips' => fake()->optional()->paragraph(),
            'is_verified' => fake()->boolean(70),
            'created_by' => User::factory(),
        ];
    }

    /**
     * Indicate that the route is verified.
     */
    public function verified(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_verified' => true,
        ]);
    }
}