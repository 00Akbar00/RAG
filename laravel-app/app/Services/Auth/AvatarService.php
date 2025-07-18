<?php

namespace App\Services\Auth;

use Illuminate\Support\Facades\Storage;
use Intervention\Image\Encoders\PngEncoder;
use Laravolt\Avatar\Facade as Avatar;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class AvatarService
{
    public function generateOrUploadAvatar($entity, UploadedFile $iconFile = null): string
    {
        $id = is_array($entity) ? $entity['id'] : $entity->id;

        // Support both `name` and `user_name` keys/properties
        $name = is_array($entity)
            ? ($entity['name'] ?? $entity['user_name'] ?? 'unknown')
            : ($entity->name ?? $entity->user_name ?? 'unknown');

        if ($iconFile) {
            $filename = Str::slug($name) . '.' . $iconFile->getClientOriginalExtension();
            $path = "avatars/{$id}/$filename";

            Storage::disk('public')->putFileAs("avatars/{$id}", $iconFile, $filename);

            return asset("storage/{$path}");
        } else {
            $avatar = Avatar::create($name)->getImageObject();
            $filename = Str::slug($name) . '.png';
            $path = "avatars/{$id}/{$filename}";
            $imageData = $avatar->encode(new PngEncoder());

            Storage::disk('public')->put($path, (string) $imageData);

            return asset("storage/{$path}");
        }
    }

}
