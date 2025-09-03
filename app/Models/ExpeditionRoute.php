<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\ExpeditionRoute
 *
 * @property int $id
 * @property string $name
 * @property string $description
 * @property float $start_latitude
 * @property float $start_longitude
 * @property float $end_latitude
 * @property float $end_longitude
 * @property array|null $waypoints
 * @property float $distance_km
 * @property int $estimated_duration_hours
 * @property string $difficulty_level
 * @property string|null $terrain_notes
 * @property string|null $safety_tips
 * @property bool $is_verified
 * @property int $created_by
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|ExpeditionRoute newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ExpeditionRoute newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ExpeditionRoute query()
 * @method static \Database\Factories\ExpeditionRouteFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class ExpeditionRoute extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'description',
        'start_latitude',
        'start_longitude',
        'end_latitude',
        'end_longitude',
        'waypoints',
        'distance_km',
        'estimated_duration_hours',
        'difficulty_level',
        'terrain_notes',
        'safety_tips',
        'is_verified',
        'created_by',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'start_latitude' => 'decimal:8',
        'start_longitude' => 'decimal:8',
        'end_latitude' => 'decimal:8',
        'end_longitude' => 'decimal:8',
        'waypoints' => 'array',
        'distance_km' => 'decimal:2',
        'estimated_duration_hours' => 'integer',
        'is_verified' => 'boolean',
    ];

    /**
     * Get the user who created this route.
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get the media gallery items for this route.
     */
    public function mediaGallery(): HasMany
    {
        return $this->hasMany(MediaGallery::class, 'route_id');
    }

    /**
     * Scope a query to only include verified routes.
     */
    public function scopeVerified($query)
    {
        return $query->where('is_verified', true);
    }
}