<?php

namespace App\Services\Auth;

use App\Exceptions\InternalServerError;
use App\Models\User;
use Illuminate\Support\Str;

class RegisterService
{
    protected $avatarService;

    public function __construct(AvatarService $avatarService)
    {
        $this->avatarService = $avatarService;
    }
    public function register(array $data)
    {
        try {

            $user = User::create([
                'id' => (string) Str::uuid(),
                'user_name' => $data['user_name'],
                'email' => $data['email'],
                'role' => $data['role'] ?? 'user',
                'status' => $data['status'] ?? 'active',
                'password' => $data['password'],
                'avatar' => null,
            ]);

            $avatarPath = $this->avatarService->generateOrUploadAvatar($user);
            $user->avatar = $avatarPath;
            $user->save();
            return $user;

        } catch (\Exception $e) {
            throw new InternalServerError(
                'Failed user registration. Please try again later!',
                500
            );
        }
    }
}

