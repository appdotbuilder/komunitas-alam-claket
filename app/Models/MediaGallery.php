<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\MediaGallery
 *
 * @property int $id
 * @property string $title
 * @property string|null $description
 * @property string $file_path
 * @property string $file_name
 * @property string $file_type
 * @property string $mime_type
 * @property int $file_size
 * @property int|null $width
 * @property int|null $height
 * @property int $uploaded_by
 * @property int|null $event_id
 * @property int|null $route_id
 * @property array|null $tags
 * @property float|null $latitude
 * @property float|null $longitude
 * @property \Illuminate\Support\Carbon|null $taken_at
 * @property bool $is_featured
 * @property bool $is_approved
 * @property int $likes_count
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|MediaGallery newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|MediaGallery newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|MediaGallery query()
 * @method static \Database\Factories\MediaGalleryFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class MediaGallery extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'description',
        'file_path',
        'file_name',
        'file_type',
        'mime_type',
        'file_size',
        'width',
        'height',
        'uploaded_by',
        'event_id',
        'route_id',
        'tags',
        'latitude',
        'longitude',
        'taken_at',
        'is_featured',
        'is_approved',
        'likes_count',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'file_size' => 'integer',
        'width' => 'integer',
        'height' => 'integer',
        'tags' => 'array',
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
        'taken_at' => 'datetime',
        'is_featured' => 'boolean',
        'is_approved' => 'boolean',
        'likes_count' => 'integer',
    ];

    /**
     * Get the user who uploaded this media.
     */
    public function uploader(): BelongsTo
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }

    /**
     * Get the event this media is associated with.
     */
    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }

    /**
     * Get the expedition route this media is associated with.
     */
    public function route(): BelongsTo
    {
        return $this->belongsTo(ExpeditionRoute::class, 'route_id');
    }

    /**
     * Scope a query to only include approved media.
     */
    public function scopeApproved($query)
    {
        return $query->where('is_approved', true);
    }

    /**
     * Scope a query to only include featured media.
     */
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }
}