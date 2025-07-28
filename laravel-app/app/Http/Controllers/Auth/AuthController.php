<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\AuthRequest;
use App\Http\Responses\BaseApiResponse;
use App\Services\Auth\LoginService;
use App\Services\Auth\RegisterService;

class AuthController extends Controller
{
    public function __construct(
        protected LoginService $loginService,
        protected RegisterService $registerService
    ) {}

    public function login(AuthRequest $request)
    {
        $user = $this->loginService->login($request->validated());

        return BaseApiResponse::success($user, 'User logged in successfully!', 200);
    }

    public function register(AuthRequest $request)
    {
        $user = $this->registerService->register($request->validated());

        return BaseApiResponse::success($user, 'User registered successfully!', 201);
    }
}
