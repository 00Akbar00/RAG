<?php

namespace App\Exceptions;
use App\Http\Responses\BaseApiResponse;
use Exception;

class InternalServerError extends Exception
{
    public function __construct($message = 'Internal Server Error', $code = 500)
    {
        parent::__construct($message, $code);
    }

    public function render()
    {
        return BaseApiResponse::error($this->getMessage(), $this->getCode());
    }
}
