<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Thread extends Model
{
    use HasFactory;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'channel_id',
        'parent_message_id',
        'title',
        'created_by'
    ];

    public function channel()
    {
        return $this->belongsTo(Channel::class);
    }

    public function parentMessage()
    {
        return $this->belongsTo(ChannelMessage::class, 'parent_message_id');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function messages()
    {
        return $this->hasMany(ChannelMessage::class, 'thread_id');
    }
}
