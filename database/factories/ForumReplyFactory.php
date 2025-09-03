<?php

namespace Database\Factories;

use App\Models\ForumThread;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ForumReply>
 */
class ForumReplyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'content' => fake()->paragraph(random_int(1, 4)),
            'thread_id' => ForumThread::factory(),
            'user_id' => User::factory(),
            'parent_id' => null,
            'upvotes' => fake()->numberBetween(0, 25),
            'downvotes' => fake()->numberBetween(0, 3),
        ];
    }

    /**
     * Indicate that this is a reply to another reply.
     */
    public function withParent(): static
    {
        return $this->state(fn (array $attributes) => [
            'parent_id' => \App\Models\ForumReply::factory(),
        ]);
    }
}