<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class DmMessageReaction extends Model
{
    use HasFactory;

    public $incrementing = false;
    protected $keyType = 'string';

    public function message()
    {
        return $this->belongsTo(DmMessage::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
