<?php

namespace App\Kafka\Producers;

use Junges\Kafka\Facades\Kafka;

class ChannelMessageProducer
{
    public function push(array $payload): void
    {
        Kafka::publishOn('channel-messages')
            ->withBodyKey('id', $payload['id'])
            ->withBodyKey('channel_id', $payload['channel_id'])
            ->withBodyKey('user_id', $payload['user_id'])
            ->withBodyKey('content', $payload['content'])
            ->withBodyKey('message_type', $payload['message_type'])
            ->withBodyKey('thread_id', $payload['thread_id'] ?? null)
            ->withBodyKey('reply_to_id', $payload['reply_to_id'] ?? null)
            ->withBodyKey('created_at', $payload['created_at'])
            ->send();
    }
}
