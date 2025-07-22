<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ChannelMessageAttachment extends Model
{
    use HasFactory;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'message_id',
        'file_url',
        'file_type'
    ];

    public function message()
    {
        return $this->belongsTo(ChannelMessage::class, 'message_id');
    }
}
