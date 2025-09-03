<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(4),
            'description' => fake()->paragraph(3),
            'location' => fake()->city() . ', ' . fake()->country(),
            'latitude' => fake()->latitude(-6.2, -6.1), // Coordinates around Malang, Indonesia
            'longitude' => fake()->longitude(112.6, 112.7),
            'event_date' => fake()->dateTimeBetween('+1 week', '+6 months'),
            'max_participants' => fake()->numberBetween(10, 50),
            'price' => fake()->randomFloat(2, 0, 500000), // IDR
            'difficulty_level' => fake()->randomElement(['beginner', 'intermediate', 'advanced']),
            'status' => fake()->randomElement(['draft', 'published', 'cancelled', 'completed']),
            'equipment_needed' => fake()->optional()->paragraph(2),
            'meeting_point' => fake()->address(),
            'organizer_id' => User::factory(),
        ];
    }

    /**
     * Indicate that the event is published.
     */
    public function published(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'published',
            'event_date' => fake()->dateTimeBetween('+1 week', '+3 months'),
        ]);
    }

    /**
     * Indicate that the event is upcoming.
     */
    public function upcoming(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'published',
            'event_date' => fake()->dateTimeBetween('+1 day', '+2 months'),
        ]);
    }

    /**
     * Indicate that the event is free.
     */
    public function free(): static
    {
        return $this->state(fn (array $attributes) => [
            'price' => 0,
        ]);
    }
}