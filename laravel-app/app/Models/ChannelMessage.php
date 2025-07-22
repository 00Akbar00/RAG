<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ChannelMessage extends Model
{
    use HasFactory;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'channel_id',
        'user_id',
        'content',
        'message_type',
        'thread_id',
        'reply_to_id',
        'edited_at',
        'deleted'
    ];

    public function channel()
    {
        return $this->belongsTo(Channel::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function thread()
    {
        return $this->belongsTo(Thread::class);
    }

    public function parent()
    {
        return $this->belongsTo(self::class, 'reply_to_id');
    }

    public function replies()
    {
        return $this->hasMany(self::class, 'reply_to_id');
    }

    public function attachments()
    {
        return $this->hasMany(ChannelMessageAttachment::class, 'message_id');
    }

    public function reactions()
    {
        return $this->hasMany(ChannelMessageReaction::class, 'message_id');
    }
}
