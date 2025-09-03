<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\ForumReply
 *
 * @property int $id
 * @property string $content
 * @property int $thread_id
 * @property int $user_id
 * @property int|null $parent_id
 * @property int $upvotes
 * @property int $downvotes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|ForumReply newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ForumReply newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ForumReply query()
 * @method static \Database\Factories\ForumReplyFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class ForumReply extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'content',
        'thread_id',
        'user_id',
        'parent_id',
        'upvotes',
        'downvotes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'upvotes' => 'integer',
        'downvotes' => 'integer',
    ];

    /**
     * Get the thread this reply belongs to.
     */
    public function thread(): BelongsTo
    {
        return $this->belongsTo(ForumThread::class, 'thread_id');
    }

    /**
     * Get the user who created this reply.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the parent reply if this is a nested reply.
     */
    public function parent(): BelongsTo
    {
        return $this->belongsTo(ForumReply::class, 'parent_id');
    }

    /**
     * Get the child replies to this reply.
     */
    public function children(): HasMany
    {
        return $this->hasMany(ForumReply::class, 'parent_id');
    }

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::created(function ($reply) {
            // Update parent thread's last activity and reply count
            $reply->thread()->update([
                'last_activity_at' => now(),
                'reply_count' => $reply->thread->replies()->count(),
            ]);
        });
    }
}