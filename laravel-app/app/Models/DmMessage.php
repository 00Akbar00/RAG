<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class DmMessage extends Model
{
    use HasFactory;

    public $incrementing = false;
    protected $keyType = 'string';

    public function group()
    {
        return $this->belongsTo(DmGroup::class, 'dm_group_id');
    }

    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    public function replyTo()
    {
        return $this->belongsTo(DmMessage::class, 'reply_to_id');
    }

    public function reactions()
    {
        return $this->hasMany(DmMessageReaction::class);
    }

    public function attachments()
    {
        return $this->hasMany(DmMessageAttachment::class);
    }
}
