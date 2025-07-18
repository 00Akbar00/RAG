<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use App\Models\Guild;

class GuildRequest extends FormRequest
{
    public function authorize(): bool
    {
        // For update, ensure user is the owner
        if ($this->isMethod('put') || $this->isMethod('patch')) {
            $guildId = $this->route('guildId');
            $guild = Guild::find($guildId);
            return $guild && $guild->owner_id === Auth::id();
        }

        return true; // Allow all for creation
    }

    public function rules(): array
    {
        $rules = [
            'name' => 'required|string|max:255',
            'icon_url' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ];

        // For update, allow name to be optional
        if ($this->isMethod('put') || $this->isMethod('patch')) {
            $rules['name'] = 'sometimes|string|max:255';
        }

        return $rules;

        // This message is added for the testing
    }
}
