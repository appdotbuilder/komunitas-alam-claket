<?php

namespace Database\Factories;

use App\Models\ForumCategory;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ForumThread>
 */
class ForumThreadFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $titles = [
            'Tips hiking untuk pemula',
            'Rekomendasi gunung untuk pendakian pertama',
            'Perlengkapan wajib untuk camping',
            'Pengalaman mendaki Rinjani',
            'Cara memilih sepatu hiking yang tepat',
            'Lokasi camping terbaik di Jawa Barat',
            'Safety tips saat mendaki gunung',
            'Review tas carrier 60L',
            'Cuaca ekstrem saat pendakian',
            'Makanan praktis untuk hiking',
            'Teknik fotografi landscape',
            'Etika berkemah di alam',
            'Penanganan cedera saat hiking',
            'Route trekking terbaik di Sumatra',
            'Konservasi alam dan tanggung jawab pendaki',
        ];

        return [
            'title' => fake()->randomElement($titles),
            'content' => fake()->paragraphs(random_int(3, 6), true),
            'category_id' => ForumCategory::factory(),
            'user_id' => User::factory(),
            'is_pinned' => fake()->boolean(10),
            'is_locked' => fake()->boolean(5),
            'view_count' => fake()->numberBetween(10, 1000),
            'reply_count' => fake()->numberBetween(0, 25),
            'upvotes' => fake()->numberBetween(0, 50),
            'downvotes' => fake()->numberBetween(0, 5),
            'last_activity_at' => fake()->dateTimeBetween('-1 month', 'now'),
        ];
    }

    /**
     * Indicate that the thread is pinned.
     */
    public function pinned(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_pinned' => true,
        ]);
    }

    /**
     * Indicate that the thread is popular.
     */
    public function popular(): static
    {
        return $this->state(fn (array $attributes) => [
            'upvotes' => fake()->numberBetween(20, 100),
            'reply_count' => fake()->numberBetween(10, 50),
            'view_count' => fake()->numberBetween(500, 2000),
        ]);
    }

    /**
     * Associate the thread with a specific user.
     */
    public function forUser(User $user): static
    {
        return $this->state(fn (array $attributes) => [
            'user_id' => $user->id,
        ]);
    }
}