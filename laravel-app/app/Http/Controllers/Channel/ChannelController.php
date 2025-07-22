<?php

namespace App\Http\Controllers\Channel;

use App\Http\Controllers\Controller;
use App\Http\Requests\ChannelRequest;
use App\Http\Responses\BaseApiResponse;
use App\Services\Channel\ChannelService;
use App\Models\Channel;

class ChannelController extends Controller
{
    protected ChannelService $channelService;

    public function __construct(ChannelService $channelService)
    {
        $this->channelService = $channelService;
    }

    public function getAllChannel($guildId){
        $channel = $this->channelService->getAllChannels($guildId);
        return BaseApiResponse::success($channel,"All channels get successfully", 200);
    }

    public function createChannel(ChannelRequest $request,$guildId)
    {
        $channel = $this->channelService->createChannel($request->validated(), $guildId);
        return BaseApiResponse::success($channel, "Channel created successfully", 201);
    }

    public function updateChannel(ChannelRequest $request, $channelId)
    {
        $channel = Channel::findOrFail($channelId);
        $updatedChannel = $this->channelService->updateChannel($channel, $request->validated());
        return BaseApiResponse::success($updatedChannel, "Channel updated successfully");
    }

    public function deleteChannel(string $channelId)
    {
        $this->channelService->deleteChannel($channelId);
        return BaseApiResponse::success(null, 'Channel deleted successfully');
    }
}
