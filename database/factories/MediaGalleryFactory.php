<?php

namespace Database\Factories;

use App\Models\Event;
use App\Models\ExpeditionRoute;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MediaGallery>
 */
class MediaGalleryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $fileType = fake()->randomElement(['image', 'video']);
        
        return [
            'title' => fake()->sentence(3),
            'description' => fake()->optional()->paragraph(),
            'file_path' => '/uploads/media/' . fake()->uuid() . '.' . ($fileType === 'image' ? 'jpg' : 'mp4'),
            'file_name' => fake()->word() . '.' . ($fileType === 'image' ? 'jpg' : 'mp4'),
            'file_type' => $fileType,
            'mime_type' => $fileType === 'image' ? 'image/jpeg' : 'video/mp4',
            'file_size' => fake()->numberBetween(1000000, 50000000), // 1MB to 50MB
            'width' => $fileType === 'image' ? fake()->numberBetween(800, 4000) : null,
            'height' => $fileType === 'image' ? fake()->numberBetween(600, 3000) : null,
            'uploaded_by' => User::factory(),
            'event_id' => fake()->optional(0.3)->randomElement([null, Event::factory()]),
            'route_id' => fake()->optional(0.2)->randomElement([null, ExpeditionRoute::factory()]),
            'tags' => fake()->optional()->randomElements(['nature', 'hiking', 'camping', 'sunrise', 'landscape'], random_int(1, 3)),
            'latitude' => fake()->optional(0.7)->latitude(-8.0, -6.0),
            'longitude' => fake()->optional(0.7)->longitude(110.0, 115.0),
            'taken_at' => fake()->optional(0.8)->dateTimeBetween('-6 months', 'now'),
            'is_featured' => fake()->boolean(20),
            'is_approved' => fake()->boolean(85),
            'likes_count' => fake()->numberBetween(0, 100),
        ];
    }

    /**
     * Indicate that the media is approved.
     */
    public function approved(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_approved' => true,
        ]);
    }

    /**
     * Indicate that the media is featured.
     */
    public function featured(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_featured' => true,
            'is_approved' => true,
        ]);
    }
}