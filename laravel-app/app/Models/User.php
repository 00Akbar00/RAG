<?php

namespace App\Models;
use App\Models\Guild;
use App\Models\GuildMember;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Str;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Casts\Attribute;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;
    protected $primaryKey = 'id';

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'id',
        'user_name',
        'email',
        'role',
        'status',
        'password',
        'avatar',
    ];

    protected $hidden = ['password'];

    protected $casts = [
        'password' => 'hashed',
    ];
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [
            'user_name' => $this->user_name,
        ];
    }

    public function ownedGuilds()
    {
        return $this->hasMany(Guild::class, 'owner_id');
    }

    public function guilds(): BelongsToMany
    {
        return $this->belongsToMany(Guild::class, 'guild_members', 'user_id', 'guild_id')
            ->using(GuildMember::class)
            ->withPivot('nickname', 'joined_at');
    }
}

