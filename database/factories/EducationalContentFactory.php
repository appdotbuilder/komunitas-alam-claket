<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\EducationalContent>
 */
class EducationalContentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->sentence(4);
        
        return [
            'title' => $title,
            'content' => fake()->paragraphs(5, true),
            'type' => fake()->randomElement(['article', 'quiz', 'infographic', 'video']),
            'slug' => Str::slug($title),
            'excerpt' => fake()->paragraph(),
            'difficulty_level' => fake()->randomElement(['beginner', 'intermediate', 'advanced']),
            'reading_time_minutes' => fake()->numberBetween(3, 20),
            'is_published' => fake()->boolean(80),
            'view_count' => fake()->numberBetween(10, 500),
            'likes_count' => fake()->numberBetween(0, 50),
            'author_id' => User::factory(),
        ];
    }

    /**
     * Indicate that the content is published.
     */
    public function published(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_published' => true,
        ]);
    }
}