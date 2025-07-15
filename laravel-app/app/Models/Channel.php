<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Channel extends Model
{
    use HasFactory;

    protected $table = 'channels';

    // Use UUIDs for primary keys
    protected $keyType = 'string';
    public $incrementing = false;

    // Only created_at exists
    const CREATED_AT = 'created_at';
    const UPDATED_AT = null;

    public $timestamps = true;

    protected $fillable = [
        'guild_id',
        'category_id',
        'type',
        'name',
        'topic',
    ];

    /**
     * Guild this channel belongs to
     */
    public function guild(): BelongsTo
    {
        return $this->belongsTo(Guild::class, 'guild_id');
    }
}
