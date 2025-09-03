<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\ForumThread
 *
 * @property int $id
 * @property string $title
 * @property string $content
 * @property int $category_id
 * @property int $user_id
 * @property bool $is_pinned
 * @property bool $is_locked
 * @property int $view_count
 * @property int $reply_count
 * @property int $upvotes
 * @property int $downvotes
 * @property \Illuminate\Support\Carbon|null $last_activity_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|ForumThread newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ForumThread newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ForumThread query()
 * @method static \Database\Factories\ForumThreadFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class ForumThread extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'content',
        'category_id',
        'user_id',
        'is_pinned',
        'is_locked',
        'view_count',
        'reply_count',
        'upvotes',
        'downvotes',
        'last_activity_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_pinned' => 'boolean',
        'is_locked' => 'boolean',
        'view_count' => 'integer',
        'reply_count' => 'integer',
        'upvotes' => 'integer',
        'downvotes' => 'integer',
        'last_activity_at' => 'datetime',
    ];

    /**
     * Get the category this thread belongs to.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(ForumCategory::class, 'category_id');
    }

    /**
     * Get the user who created this thread.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the replies to this thread.
     */
    public function replies(): HasMany
    {
        return $this->hasMany(ForumReply::class, 'thread_id');
    }

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($thread) {
            $thread->last_activity_at = now();
        });
    }
}