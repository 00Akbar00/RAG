<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Responses\BaseApiResponse;
use App\Services\Auth\RegisterService;
use Illuminate\Http\Request;
use Log;

class RegisterController extends Controller
{
    protected $registerService;

    public function __construct(RegisterService $registerService)
    {
        $this->registerService = $registerService;
    }

    public function register(Request $registerRequest)
    {
        $validated = $registerRequest->validate([
            'user_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $user = $this->registerService->register($validated);
        return BaseApiResponse::success($user, 'User registered successfully!', 201);
    }
}
