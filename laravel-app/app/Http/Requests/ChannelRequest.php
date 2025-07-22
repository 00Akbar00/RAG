<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ChannelRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'name' => 'sometimes|required|string|max:100',
            'guild_id' => 'sometimes|required|uuid|exists:guilds,id',

            // 💡 IMPROVEMENT 1: Category is now optional.
            // 'nullable' allows this field to be empty or not present in the request.
            // If it IS provided, it must be a valid UUID and exist in the 'categories' table.
            'category_id' => 'nullable|uuid|exists:categories,id',
            'topic' => 'sometimes|required|string|max:100',
            'type' => [
                'sometimes',
                'required',
                // 💡 IMPROVEMENT 2: Add 'announcement' to the list of valid channel types.
                Rule::in(['text', 'voice', 'announcement']),
            ],
            'position' => 'sometimes|integer|min:0',
        ];
    }
}
