<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use App\Models\Guild;

class GuildRequest extends FormRequest
{
    public function authorize(): bool
    {
        $guildId = $this->route('guildId');
        $guild = Guild::find($guildId);

        if ($this->routeIs('guild.update')) {
            return $guild && $guild->owner_id === Auth::id();
        }

        return true;
    }

    public function rules(): array
    {
        $rules = [
            'name' => 'required|string|max:255',
            'icon_url' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ];

        if ($this->isMethod('put') || $this->isMethod('patch')) {
            $rules['name'] = 'sometimes|string|max:255';
        }

        return $rules;
    }

    public function payload(): array
    {
        return [
            'name' => $this->input('name'),
            'icon_url' => $this->file('icon_url'),
        ];
    }
}
