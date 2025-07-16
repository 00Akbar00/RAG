<?php 

namespace App\Services\Auth;

use App\Exceptions\InternalServerError;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

class LoginService
{
    public function login(array $data)
    {
        try{
            if (! $token = JWTAuth::attempt([
                'email' => $data['email'],
                'password' => $data['password'],
            ])) {
                throw new UnauthorizedHttpException('', 'Invalid credentials.');
            }
    
            $user = Auth::user();
    
            return [
                'access_token' => $token,
                'token_type' => 'bearer',
                'expires_in' => auth('api')->factory()->getTTL() * 60, // default is 60 mins
                'user' => $user,
            ];
        }
        catch (\Exception $e) {
            throw new InternalServerError(
                'Failed user login. Please try again later!',
                500
            );
        }
    }
}