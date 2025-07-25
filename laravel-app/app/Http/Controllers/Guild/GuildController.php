<?php

namespace App\Http\Controllers\Guild;
use App\Http\Controllers\Controller;
use App\Http\Requests\GuildRequest;
use App\Http\Responses\BaseApiResponse;
use App\Models\Guild;
use App\Services\Guild\GuildService;
use Illuminate\Support\Facades\Auth;

class GuildController extends Controller
{
    protected $guildService;

    public function __construct(GuildService $guildService)
    {
        $this->guildService = $guildService;
    }

    // For creation
    public function createGuild(GuildRequest $request)
    {
        $guild = $this->guildService->createGuild($request->validated());
        return BaseApiResponse::success($guild, 'Guild created successfully!', 200);
    }

    public function getAllGuilds()
    {
        $user = Auth::user();
        $guilds = $this->guildService->getAllGuilds($user);
        return BaseApiResponse::success($guilds, 'All guilds retrieved successfully!');
    }

    public function getGuild(string $guildId)
    {
        $guild = $this->guildService->getGuild($guildId);
        return BaseApiResponse::success($guild, 'Guild data retrieved successfully!');
    }

    // For update
    public function update(GuildRequest $request, $guildId)
    {
        $data = [
            'name' => $request->input('name'),
            'icon_url' => $request->file('icon_url'),
        ];

        $guild = Guild::findOrFail($guildId);

        $updatedGuild = $this->guildService->updateGuild($guild, $data);

        return BaseApiResponse::success($updatedGuild, 'Guild updated successfully');
    }

    public function deleteGuild(Guild $guild)
    {
        $guild->delete();

        return BaseApiResponse::success(null, 'Guild deleted successfully');
    }
}     




