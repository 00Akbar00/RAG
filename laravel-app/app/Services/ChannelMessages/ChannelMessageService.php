<?php

namespace App\Services\ChannelMessages;

use App\Kafka\Producers\ChannelMessageProducer;
use App\Models\ChannelMessage;
use App\Models\ChannelMessageAttachment;
use App\Models\ChannelMessageReaction;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class ChannelMessageService
{
    public function __construct(
        protected ChannelMessageProducer $producer
    ) {}

    public function sendMessage(array $data): ChannelMessage
    {
        return DB::transaction(function () use ($data) {
            $message = ChannelMessage::create($data);

            $this->producer->push([
                'id'           => $message->id,
                'channel_id'   => $message->channel_id,
                'user_id'      => $message->user_id,
                'content'      => $message->content,
                'message_type' => $message->message_type,
                'thread_id'    => $message->thread_id,
                'reply_to_id'  => $message->reply_to_id,
                'created_at'   => $message->created_at->toISOString(),
            ]);

            return $message;
        });
    }

    public function listMessages(string $channelId, int $perPage = 50): LengthAwarePaginator
    {
        return ChannelMessage::where('channel_id', $channelId)
            ->where('deleted', false)
            ->orderBy('created_at', 'asc')
            ->paginate($perPage);
    }

    public function updateMessage(string $messageId, string $content): ChannelMessage
    {
        $message = ChannelMessage::where('id', $messageId)
            ->where('deleted', false)
            ->firstOrFail();

        $message->content = $content;
        $message->edited_at = now();
        $message->save();

        return $message;
    }

    public function deleteMessage(string $messageId): void
    {
        $message = ChannelMessage::findOrFail($messageId);
        $message->deleted = true;
        $message->save();
    }

    public function addReaction(string $messageId, string $userId, string $reaction): ChannelMessageReaction
    {
        ChannelMessage::findOrFail($messageId);

        return ChannelMessageReaction::create([
            'message_id' => $messageId,
            'user_id'    => $userId,
            'reaction'   => $reaction,
        ]);
    }

    public function removeReaction(string $messageId, string $userId, string $reaction): void
    {
        ChannelMessageReaction::where('message_id', $messageId)
            ->where('user_id', $userId)
            ->where('reaction', $reaction)
            ->delete();
    }

    public function attachFile(string $messageId, string $url, string $type): ChannelMessageAttachment
    {
        ChannelMessage::findOrFail($messageId);

        return ChannelMessageAttachment::create([
            'message_id' => $messageId,
            'file_url'   => $url,
            'file_type'  => $type,
        ]);
    }

    public function listThreadMessages(string $threadId, int $perPage = 50): LengthAwarePaginator
    {
        return ChannelMessage::where('thread_id', $threadId)
            ->where('deleted', false)
            ->orderBy('created_at', 'asc')
            ->paginate($perPage);
    }
}
