<?php

use App\Http\Controllers\Guild\GuildController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Channel\ChannelController;
use App\Http\Controllers\Category\CategoryController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [RegisterController::class, 'register'])->name('register');
Route::post('/login', [LoginController::class, 'login'])->name('login');

Route::middleware('auth:api')->group(function () {
    // Guild routes
    Route::post('/guild', [GuildController::class, 'createGuild']);
    Route::get('/user/guilds', [GuildController::class, 'getAllGuilds']);
    Route::get('/guild/{guildId}', [GuildController::class, 'getGuild']);
    Route::post('/guild/{guild}', [GuildController::class, 'update']);
    Route::delete('/guild/{guild}', [GuildController::class, 'deleteGuild']);

    // Channel routes
    Route::get('/channel/{guildId}', [ChannelController::class, 'getAllChannel']);
    Route::post('/channel/{guildId}', [ChannelController::class, 'createChannel']);
    Route::put('/channel/{channelId}', [ChannelController::class, 'updateChannel']);
    Route::delete('/channel/{channelId}', [ChannelController::class, 'deleteChannel']);

    // Category routes
    Route::get('/category/{guildId}', [CategoryController::class, 'getAllCategory']);
    Route::post('/category', [CategoryController::class, 'createCategory']);
    Route::put('/category/{categoryId}', [CategoryController::class, 'updateCategory']);
    Route::delete('/category/{categoryId}', [CategoryController::class, 'deleteCategory']);
});



// Direct messages routes

Route::prefix('dm')->group(function () {})->middleware('auth:api');
