<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreForumThreadRequest;
use App\Models\ForumCategory;
use App\Models\ForumThread;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class ForumThreadController extends Controller
{
    /**
     * Show the form for creating a new thread.
     */
    public function create()
    {
        $categories = ForumCategory::active()
            ->orderBy('sort_order')
            ->get(['id', 'name', 'description']);

        return Inertia::render('forum/create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created thread in storage.
     */
    public function store(StoreForumThreadRequest $request): RedirectResponse
    {
        $thread = ForumThread::create([
            'title' => $request->validated('title'),
            'content' => $request->validated('content'),
            'category_id' => $request->validated('category_id'),
            'user_id' => auth()->id(),
            'last_activity_at' => now(),
        ]);

        return redirect()->route('forum.threads.show', [$thread->category, $thread])
            ->with('success', 'Thread berhasil dibuat.');
    }

    /**
     * Display a specific thread with its replies.
     */
    public function show(ForumCategory $category, ForumThread $thread)
    {
        // Increment view count
        $thread->increment('view_count');

        // Load thread with relationships
        $thread->load(['user', 'category']);

        // Get replies with nested structure
        $replies = $thread->replies()
            ->with(['user', 'parent', 'children.user'])
            ->whereNull('parent_id') // Only get top-level replies
            ->orderBy('created_at')
            ->get();

        return Inertia::render('forum/show', [
            'thread' => $thread,
            'category' => $category,
            'replies' => $replies,
        ]);
    }
}