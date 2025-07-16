<?php

namespace App\Services\Guild;

use App\Models\Guild;
use App\Services\Auth\AvatarService;
use Illuminate\Support\Facades\Auth;
use Str;

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

    public function updateGuild(array $request, $guildId)
    {

    }

    public function deleteGuild($guildId)
    {

    }
}