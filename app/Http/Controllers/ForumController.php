<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\ForumCategory;
use App\Models\ForumThread;
use Inertia\Inertia;

class ForumController extends Controller
{
    /**
     * Display the forum homepage.
     */
    public function index()
    {
        $categories = ForumCategory::active()
            ->with(['threads' => function ($query) {
                $query->latest('last_activity_at')->take(5);
            }])
            ->orderBy('sort_order')
            ->get();

        $recentThreads = ForumThread::with(['user', 'category'])
            ->latest('last_activity_at')
            ->take(10)
            ->get();

        return Inertia::render('forum/index', [
            'categories' => $categories,
            'recentThreads' => $recentThreads,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(ForumCategory $category)
    {
        $threads = ForumThread::with(['user'])
            ->where('category_id', $category->id)
            ->orderBy('is_pinned', 'desc')
            ->orderBy('last_activity_at', 'desc')
            ->paginate(20);

        return Inertia::render('forum/category', [
            'category' => $category,
            'threads' => $threads,
        ]);
    }


}