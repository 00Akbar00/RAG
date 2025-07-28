<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Add authorization logic if needed
    }

    public function rules(): array
    {
        $rules = [
            'name' => 'required|string|max:100',
            'position' => 'sometimes|integer',
        ];

        if ($this->isMethod('put') || $this->isMethod('patch')) {
            $rules['name'] = 'sometimes|string|max:100';
        }

        return $rules;
    }

    public function payload(): array
    {
        return [
            'name' => $this->input('name'),
            'position' => $this->input('position'),
        ];
    }
}

