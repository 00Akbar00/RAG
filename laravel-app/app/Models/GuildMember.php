<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class GuildMember extends Pivot
{
    protected $table = 'guild_members';
    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'guild_id',
        'user_id',
        'nickname',
        'joined_at',
    ];

    /**
     * The guild in this pivot
     */
    public function guild()
    {
        return $this->belongsTo(Guild::class, 'guild_id');
    }

    /**
     * The user in this pivot
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
