<?php

namespace App\Services\Channel;

use App\Models\Channel;
use App\Exceptions\InternalServerError;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Str;

class ChannelService
{
    public function createChannel(array $data, $guildId): Channel
    {
        try {
            return Channel::create([
                'id' => Str::uuid(),
                'name'        => $data['name'],
                'guild_id'    => $guildId,
                'category_id' => $data['category_id'] ?? null,
                'type'        => $data['type'] ?? 'text',
                'topic'       => $data['topic'] ?? null,
                'position'    => $data['position'] ?? 0,
            ]);
        } catch (\Throwable $e) {
            Log::info('ChannelService@createChannel failed', ['exception' => $e]);
            throw new InternalServerError('Failed to create channel. Please try again later!', 500);
        }
    }

    public function getChannel(string $channelId): Channel
    {
        return Channel::with('guild')->findOrFail($channelId);
    }

    public function getAllChannels(string $guildId): Collection
    {
        try {
            return Channel::where('guild_id', $guildId)
                ->get();
        } catch (\Throwable $e) {
            Log::error('ChannelService@getAllChannels failed', ['exception' => $e]);
            throw new InternalServerError('Failed to retrieve channels. Please try again later!', 500);
        }
    }

    public function updateChannel(Channel $channel, array $data): Channel
    {
        try {
            $channel->fill(Arr::only($data, ['name', 'type', 'position', 'topic', 'category_id']));
            $channel->save();
            return $channel;
        } catch (\Throwable $e) {
            Log::error('ChannelService@updateChannel failed', ['exception' => $e]);
            throw new InternalServerError('Failed to update channel. Please try again later!', 500);
        }
    }

    public function deleteChannel(string $channelId): bool
    {
        try {
            $channel = Channel::findOrFail($channelId);
            $channel->delete();
            return true;
        } catch (\Throwable $e) {
            Log::error('ChannelService@deleteChannel failed', ['exception' => $e]);
            throw new InternalServerError('Failed to delete channel. Please try again later!', 500);
        }
    }
}
