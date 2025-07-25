<?php

namespace App\Http\Requests\ChannelMessages;

use Illuminate\Foundation\Http\FormRequest;

class ReactToMessageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'user_id'  => 'required|uuid',
            'reaction' => 'required|string|max:50',
        ];
    }
}
