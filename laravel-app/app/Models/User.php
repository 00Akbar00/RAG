<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    // Use UUIDs for primary keys
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'user_name',
        'email',
        'role',
        'status',
        'password_hash',
        'avatar',
    ];

    protected $hidden = [
        'password_hash',
    ];

    /**
     * Guilds owned by the user
     */
    public function ownedGuilds()
    {
        return $this->hasMany(Guild::class, 'owner_id');
    }

    /**
     * Guilds the user participates in
     */
    public function guilds(): BelongsToMany
    {
        return $this->belongsToMany(Guild::class, 'guild_members', 'user_id', 'guild_id')
                    ->using(GuildMember::class)
                    ->withPivot('nickname', 'joined_at');
    }
}
