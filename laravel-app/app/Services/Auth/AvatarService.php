<?php

namespace App\Services\Auth;

use App\Models\User;
use Illuminate\Http\UploadedFile;
use Intervention\Image\Encoders\PngEncoder;
use Illuminate\Support\Facades\Storage;
use Laravolt\Avatar\Facade as Avatar;
use Log;
use Str;


class AvatarService
{
    public function generateAvatar($user): string
    {
        $avatar = Avatar::create($user['user_name'])->getImageObject();
        $sanitizedName = Str::slug($user['user_name']);
        $filename = "{$sanitizedName}.png";
        $path = "avatars/{$user['id']}/$filename";
        $imageData = $avatar->encode(new PngEncoder());

        Storage::disk('public')->put($path, (string) $imageData);

        return asset("storage/{$path}");
    }

    public function generateOrUploadAvatar($nameOrEntity, $iconFile = null): string
    {
        $id = is_array($nameOrEntity) ? $nameOrEntity['id'] : $nameOrEntity->id;
        $name = is_array($nameOrEntity) ? $nameOrEntity['name'] : $nameOrEntity->name;
        Log::info("{Icon file: $iconFile}");
        if ($iconFile) {
            $filename = Str::slug($nameOrEntity->name) . '.' . $iconFile->getClientOriginalExtension();
            $path = "avatars/{$nameOrEntity->id}/$filename";

            // Store file in public disk
            Storage::disk('public')->putFileAs("avatars/{$nameOrEntity->id}", $iconFile, $filename);

            return asset("storage/$path");
        } else {
            // Otherwise generate default Laravolt image
            $avatar = Avatar::create($name)->getImageObject();
            $filename = Str::slug($name) . '.png';
            $path = "avatars/{$id}/{$filename}";
            $imageData = $avatar->encode(new PngEncoder());
            Storage::disk('public')->put($path, (string) $imageData);
        }

        return asset("storage/{$path}");
    }


}