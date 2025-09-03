<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\ExpeditionRoute;
use App\Models\ForumCategory;
use App\Models\ForumThread;
use App\Models\EducationalContent;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CommunitySeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::create([
            'name' => 'Admin Claket',
            'email' => 'admin@claket.com',
            'password' => bcrypt('password'),
            'role' => 'admin',
            'experience_level' => 'expert',
            'bio' => 'Administrator Komunitas Pecinta Alam Claket',
            'is_active' => true,
        ]);

        // Create some regular users
        $users = User::factory(15)->create();

        // Create forum categories
        $categories = [
            [
                'name' => 'Diskusi Umum',
                'description' => 'Diskusi umum seputar petualangan alam dan aktivitas outdoor',
                'slug' => 'diskusi-umum',
                'icon' => '💬',
                'sort_order' => 1,
            ],
            [
                'name' => 'Tips & Trik',
                'description' => 'Berbagi tips dan trik untuk petualangan alam yang aman dan menyenangkan',
                'slug' => 'tips-trik',
                'icon' => '💡',
                'sort_order' => 2,
            ],
            [
                'name' => 'Gear & Equipment',
                'description' => 'Diskusi tentang perlengkapan dan peralatan outdoor',
                'slug' => 'gear-equipment',
                'icon' => '🎒',
                'sort_order' => 3,
            ],
            [
                'name' => 'Laporan Perjalanan',
                'description' => 'Cerita dan laporan dari perjalanan dan ekspedisi',
                'slug' => 'laporan-perjalanan',
                'icon' => '📝',
                'sort_order' => 4,
            ],
            [
                'name' => 'Konservasi Alam',
                'description' => 'Diskusi tentang konservasi dan pelestarian alam',
                'slug' => 'konservasi-alam',
                'icon' => '🌱',
                'sort_order' => 5,
            ],
        ];

        foreach ($categories as $categoryData) {
            ForumCategory::create($categoryData);
        }

        // Create some sample events
        Event::factory(12)->create([
            'organizer_id' => $users->random()->id,
        ]);

        // Create some expedition routes
        ExpeditionRoute::factory(8)->create([
            'created_by' => $users->random()->id,
        ]);

        // Create educational content
        $educationalContent = [
            [
                'title' => 'Panduan Dasar Hiking untuk Pemula',
                'content' => 'Hiking adalah aktivitas yang menyenangkan dan bermanfaat untuk kesehatan. Artikel ini akan membahas tips dasar untuk pemula yang ingin memulai hiking...',
                'type' => 'article',
                'slug' => 'panduan-dasar-hiking-pemula',
                'excerpt' => 'Pelajari tips dan trik dasar untuk memulai petualangan hiking dengan aman dan menyenangkan.',
                'difficulty_level' => 'beginner',
                'reading_time_minutes' => 8,
                'is_published' => true,
                'author_id' => $admin->id,
            ],
            [
                'title' => 'Mengenal Flora Endemik Indonesia',
                'content' => 'Indonesia memiliki kekayaan flora yang luar biasa. Mari kita mengenal beberapa tanaman endemik yang hanya dapat ditemukan di Indonesia...',
                'type' => 'article',
                'slug' => 'flora-endemik-indonesia',
                'excerpt' => 'Jelajahi keragaman flora endemik Indonesia yang menakjubkan dan pelajari cara melestarikannya.',
                'difficulty_level' => 'intermediate',
                'reading_time_minutes' => 12,
                'is_published' => true,
                'author_id' => $users->random()->id,
            ],
            [
                'title' => 'Kuis: Seberapa Tahu Kamu tentang Gunung Indonesia?',
                'content' => 'Uji pengetahuan kamu tentang gunung-gunung di Indonesia dengan kuis interaktif ini!',
                'type' => 'quiz',
                'slug' => 'kuis-gunung-indonesia',
                'excerpt' => 'Test your knowledge about Indonesian mountains with this interactive quiz.',
                'difficulty_level' => 'beginner',
                'is_published' => true,
                'author_id' => $admin->id,
            ],
            [
                'title' => 'Infografis: 10 Prinsip Leave No Trace',
                'content' => 'Prinsip Leave No Trace sangat penting untuk menjaga kelestarian alam. Infografis ini menjelaskan 10 prinsip utama...',
                'type' => 'infographic',
                'slug' => 'infografis-leave-no-trace',
                'excerpt' => 'Pelajari 10 prinsip Leave No Trace untuk menjaga kelestarian alam saat berpetualang.',
                'difficulty_level' => 'beginner',
                'is_published' => true,
                'author_id' => $users->random()->id,
            ],
            [
                'title' => 'Teknik Navigation dengan Kompas dan Peta',
                'content' => 'Navigasi adalah skill penting untuk setiap petualang. Artikel ini membahas teknik navigasi menggunakan kompas dan peta topografi...',
                'type' => 'article',
                'slug' => 'teknik-navigation-kompas-peta',
                'excerpt' => 'Master the art of navigation using compass and topographic maps for safe outdoor adventures.',
                'difficulty_level' => 'advanced',
                'reading_time_minutes' => 15,
                'is_published' => true,
                'author_id' => $admin->id,
            ],
        ];

        foreach ($educationalContent as $contentData) {
            EducationalContent::create($contentData);
        }

        // Create some forum threads for each category
        $forumCategories = ForumCategory::all();
        foreach ($forumCategories as $category) {
            ForumThread::factory(random_int(3, 8))->create([
                'category_id' => $category->id,
                'user_id' => $users->random()->id,
            ]);
        }
    }
}