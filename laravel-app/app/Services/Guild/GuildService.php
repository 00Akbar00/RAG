<?php

namespace App\Services\Guild;

use App\Models\Guild;
use App\Services\Auth\AvatarService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class GuildService
{
    protected $avatarService;

    public function __construct(AvatarService $avatarService)
    {
        $this->avatarService = $avatarService;
    }
    public function createGuild(array $data)
    {

        $guildId = (string) Str::uuid();
        $guild = Guild::create([
            'id' => $guildId,
            'name' => $data['name'],
            'owner_id' => Auth::id(),
            'icon_url' => null,
        ]);
        $iconPath = $this->avatarService->generateOrUploadAvatar($guild, $data['icon_url'] ?? null);
        $guild->icon_url = $iconPath;
        $guild->save();

        return $guild;

    }

    public function getAllGuilds($user)
    {
        return $user->ownedGuilds()->with('members')->get();
    }

    public function getGuild(string $guildId)
    {
        return Guild::with(['owner', 'members', 'channels'])->findOrFail($guildId);
    }

    public function updateGuild(Guild $guild, array $data): Guild
    {

        if (isset($data['icon_url'])) {
            // If new icon is uploaded, update it using AvatarService
            $guild->icon_url = $this->avatarService->generateOrUploadAvatar($guild, $data['icon_url']);
        }

        if (isset($data['name'])) {
            $guild->name = $data['name'];

            if (!isset($data['icon_url'])) {
                $guild->icon_url = $this->avatarService->generateOrUploadAvatar($guild);
            }
        }

        $guild->save();
        return $guild;
    }


    public function deleteGuild($guildId)
    {

    }
}
