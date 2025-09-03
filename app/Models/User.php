<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

/**
 * App\Models\User
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property mixed $password
 * @property string|null $remember_token
 * @property string $role
 * @property string|null $phone
 * @property string|null $bio
 * @property \Illuminate\Support\Carbon|null $date_of_birth
 * @property string $experience_level
 * @property array|null $interests
 * @property string|null $profile_photo
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User query()
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'phone',
        'bio',
        'date_of_birth',
        'experience_level',
        'interests',
        'profile_photo',
        'is_active',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'date_of_birth' => 'date',
            'interests' => 'array',
            'is_active' => 'boolean',
        ];
    }

    /**
     * Get the events organized by this user.
     */
    public function organizedEvents(): HasMany
    {
        return $this->hasMany(Event::class, 'organizer_id');
    }

    /**
     * Get the events this user is participating in.
     */
    public function participatingEvents(): HasMany
    {
        return $this->hasMany(EventParticipant::class);
    }

    /**
     * Get the forum threads created by this user.
     */
    public function forumThreads(): HasMany
    {
        return $this->hasMany(ForumThread::class);
    }

    /**
     * Get the forum replies by this user.
     */
    public function forumReplies(): HasMany
    {
        return $this->hasMany(ForumReply::class);
    }

    /**
     * Get the expedition routes created by this user.
     */
    public function expeditionRoutes(): HasMany
    {
        return $this->hasMany(ExpeditionRoute::class, 'created_by');
    }

    /**
     * Get the media uploaded by this user.
     */
    public function mediaUploads(): HasMany
    {
        return $this->hasMany(MediaGallery::class, 'uploaded_by');
    }

    /**
     * Get the educational content authored by this user.
     */
    public function educationalContent(): HasMany
    {
        return $this->hasMany(EducationalContent::class, 'author_id');
    }
}
