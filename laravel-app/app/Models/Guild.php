<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Guild extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';
    protected $table = 'guilds';

    // Use UUIDs for primary keys
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'id',
        'name',
        'icon_url',
        'owner_id',
    ];

    /**
     * Owner of the guild
     */
    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    /**
     * Members of the guild
     */
    public function members(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'guild_members', 'guild_id', 'user_id')
                    ->using(GuildMember::class)
                    ->withPivot('nickname', 'joined_at');
    }

    /**
     * Channels within the guild
     */
    public function channels(): HasMany
    {
        return $this->hasMany(Channel::class, 'guild_id');
    }
}
