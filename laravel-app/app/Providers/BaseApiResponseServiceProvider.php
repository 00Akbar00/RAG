<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Response;

class BaseApiResponseServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Response::macro('baseApiResponse', function ($data = null, string $message = '', int $status = 200) {
            return response()->json([
                'success' => $status >= 200 && $status < 300,
                'message' => $message,
                'data'    => $data,
            ], $status);
        });
    }
}
