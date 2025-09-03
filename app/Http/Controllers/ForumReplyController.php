<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreForumReplyRequest;
use App\Models\ForumReply;
use App\Models\ForumThread;
use Illuminate\Http\RedirectResponse;

class ForumReplyController extends Controller
{
    /**
     * Store a newly created reply in storage.
     */
    public function store(StoreForumReplyRequest $request, ForumThread $thread): RedirectResponse
    {
        $reply = ForumReply::create([
            'content' => $request->validated('content'),
            'thread_id' => $thread->id,
            'user_id' => auth()->id(),
            'parent_id' => $request->validated('parent_id'),
        ]);

        // Update thread last activity and reply count
        $thread->update([
            'last_activity_at' => now(),
            'reply_count' => $thread->replies()->count(),
        ]);

        return redirect()->route('forum.threads.show', [$thread->category, $thread])
            ->with('success', 'Balasan berhasil ditambahkan.');
    }
}