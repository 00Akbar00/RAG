<?php

namespace App\Http\Responses;

use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\JsonResponse;

class BaseApiResponse implements Responsable
{
    protected bool $success;
    protected string $message;
    protected mixed $data;
    protected int $status;

    public function __construct(bool $success, string $message = '', mixed $data = null, int $status = 200)
    {
        $this->success = $success;
        $this->message = $message;
        $this->data = $data;
        $this->status = $status;
    }

    public function toResponse($request): JsonResponse
    {
        return response()->json([
            'success' => $this->success,
            'message' => $this->message,
            'data'    => $this->data,
        ], $this->status);
    }

    public static function success(mixed $data = null, string $message = '', int $status = 200): self
    {
        return new self(true, $message, $data, $status);
    }

    public static function error(string $message = 'Something went wrong', int $status = 500, mixed $data = null): self
    {
        return new self(false, $message, $data, $status);
    }
}

