<?php

namespace App\Http\Requests\ChannelMessages;

use Illuminate\Foundation\Http\FormRequest;

class CreateMessageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'channel_id'   => 'required|uuid',
            'user_id'      => 'required|uuid',
            'content'      => 'nullable|string',
            'message_type' => 'required|string|in:text,image,file,system,embed',
            'thread_id'    => 'nullable|uuid',
            'reply_to_id'  => 'nullable|uuid',
        ];
    }
}
