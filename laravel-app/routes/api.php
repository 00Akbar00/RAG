<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;

use App\Http\Controllers\Guild\GuildController;
use App\Http\Controllers\Category\CategoryController;
use App\Http\Controllers\Channel\ChannelController;
use App\Http\Controllers\Channel\ChannelMessageController;


// Auth
Route::post('/register', [RegisterController::class, 'register']);
Route::post('/login',    [LoginController::class, 'login']);

Route::middleware('auth:api')->group(function () {

    // Guild routes
    Route::post('/guild', [GuildController::class, 'createGuild']);
    Route::get('/user/guilds', [GuildController::class, 'getAllGuilds']);
    Route::get('/guild/{guildId}', [GuildController::class, 'getGuild']);
    Route::post('/guild/{guildId}', [GuildController::class, 'update'])->name('guild.update');
    Route::delete('/guild/{guildId}', [GuildController::class, 'deleteGuild']);
    Route::post('/guild/{guild}', [GuildController::class, 'update']);
    Route::delete('/guild/{guild}', [GuildController::class, 'deleteGuild']);

    // Channel routes
    Route::get('/channel/{guildId}', [ChannelController::class, 'getAllChannel']);
    Route::post('/channel/{guildId}', [ChannelController::class, 'createChannel']);
    Route::put('/channel/{channelId}', [ChannelController::class, 'updateChannel']);
    Route::delete('/channel/{channelId}', [ChannelController::class, 'deleteChannel']);

    // Category routes
    Route::get('/category/{guildId}', [CategoryController::class, 'getAllCategory']);
    Route::post('/category/{guildId}', [CategoryController::class, 'createCategory']);
    Route::put('/category/{categoryId}', [CategoryController::class, 'updateCategory']);
    Route::delete('/category/{categoryId}', [CategoryController::class, 'deleteCategory']);

    // Channel message routes
    Route::prefix('channels/{channelId}/messages')->group(function () {
        Route::get('/', [ChannelMessageController::class, 'fetchChannelMessages']);
        Route::post('/', [ChannelMessageController::class, 'send']);
    });

    Route::prefix('messages/{messageId}')->group(function () {
        Route::patch('/', [ChannelMessageController::class, 'editContent']);
        Route::delete('/', [ChannelMessageController::class, 'remove']);
        Route::post('/reactions', [ChannelMessageController::class, 'addReaction']);
        Route::delete('/reactions', [ChannelMessageController::class, 'removeReaction']);
        Route::post('/attachments', [ChannelMessageController::class, 'attachFile']);
    });

    Route::get('threads/{threadId}/messages', [ChannelMessageController::class, 'fetchThreadMessages']);

    // Direct messages routes
    Route::prefix('dm')->group(function () {});
});
