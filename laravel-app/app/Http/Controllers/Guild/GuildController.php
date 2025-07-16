<?php 

namespace App\Http\Controllers\Guild;
use App\Http\Controllers\Controller;
use App\Http\Responses\BaseApiResponse;
use App\Services\Guild\GuildService;
use Illuminate\Http\Request;

class GuildController extends Controller
{
    protected $guildService;

    public function __construct(GuildService $guildService)
    {
        $this->guildService = $guildService;
    }

    public function createGuild(Request $request)
    {
        $validated = $request->validate( [
            'name' => 'required|string|max:255',
            'icon_url' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $guild = $this->guildService->createGuild($validated);
        return BaseApiResponse::success($guild, 'Guild created successfully!', 200);
    }

}