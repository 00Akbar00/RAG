<?php

namespace App\Http\Requests\ChannelMessages;

use Illuminate\Foundation\Http\FormRequest;

class ListMessagesRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'per_page' => 'sometimes|integer|min:1|max:200',
            'before'   => 'sometimes|date',         // optional filters
            'after'    => 'sometimes|date',
        ];
    }
}
