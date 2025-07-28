<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class AuthRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $path = $this->path();

        if ($path === 'login') {
            return [
                'email'    => 'required|email',
                'password' => 'required|string|min:6',
            ];
        }

        if ($path === 'register') {
            return [
                'user_name' => 'required|string|max:255',
                'email'     => 'required|email|unique:users',
                'password'  => 'required|string|min:6|confirmed',
            ];
        }

        return [];
    }

    public function messages(): array
    {
        return [
            'email.required'      => 'Email is required.',
            'email.email'         => 'Enter a valid email address.',
            'password.required'   => 'Password is required.',
            'password.min'        => 'Password must be at least 6 characters.',
            'password.confirmed'  => 'Password confirmation does not match.',

            'user_name.required'  => 'Username is required.',
            'user_name.string'    => 'Username must be a string.',
            'user_name.max'       => 'Username cannot exceed 255 characters.',
        ];
    }

    public function attributes(): array
    {
        return [
            'user_name' => 'username',
        ];
    }
}
