<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\EducationalContent
 *
 * @property int $id
 * @property string $title
 * @property string $content
 * @property string $type
 * @property string $slug
 * @property string|null $excerpt
 * @property string|null $featured_image
 * @property array|null $tags
 * @property string $difficulty_level
 * @property int|null $reading_time_minutes
 * @property bool $is_published
 * @property int $view_count
 * @property int $likes_count
 * @property int $author_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|EducationalContent newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|EducationalContent newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|EducationalContent query()
 * @method static \Database\Factories\EducationalContentFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class EducationalContent extends Model
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
        'type',
        'slug',
        'excerpt',
        'featured_image',
        'tags',
        'difficulty_level',
        'reading_time_minutes',
        'is_published',
        'view_count',
        'likes_count',
        'author_id',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'tags' => 'array',
        'reading_time_minutes' => 'integer',
        'is_published' => 'boolean',
        'view_count' => 'integer',
        'likes_count' => 'integer',
    ];

    /**
     * Get the author of this content.
     */
    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    /**
     * Scope a query to only include published content.
     */
    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }
}