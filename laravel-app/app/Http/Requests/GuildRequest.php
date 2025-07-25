<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use App\Models\Guild;
use Log;

class GuildRequest extends FormRequest
{
    public function authorize(): bool
    {
        $guildId = $this->route('guildId');
        $guild = Guild::find($guildId);  
        // Only allow the owner to update the guild
        if ($this->route()->getName() === 'guild.update') {
            return $guild && $guild['owner_id'] === Auth::id();
        }
        return true;
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
