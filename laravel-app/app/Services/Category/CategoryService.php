<?php

namespace App\Services\Category;

use App\Models\Category;
use Illuminate\Support\Str;
use App\Exceptions\InternalServerError;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;

class CategoryService
{
    public function createCategory(array $data): Category
    {
        try {
            return Category::create([
                'id' => (string) Str::uuid(),
                'name' => $data['name'],
                'guild_id' => $data['guild_id'],
                'position' => $data['position'] ?? 0,
            ]);
        } catch (\Throwable $e) {
            Log::error('CategoryService@createCategory failed', ['exception' => $e]);
            throw new InternalServerError('Failed to create category. Please try again later!', 500);
        }
    }

    public function getAllCategory($guildId)
    {
        try {
            return Category::where('guild_id', $guildId)->get();
        } catch (\Throwable $e) {
            Log::error('CategoryService@getAllCategory failed', ['exception' => $e]);
            throw new InternalServerError('Failed to get all categories. Please try again later!', 500);
        }
    }

    public function updateCategory(Category $category, array $data): Category
    {
        try {
            $category->fill(Arr::only($data, ['name', 'position']));
            $category->save();
            return $category;
        } catch (\Throwable $e) {
            Log::error('CategoryService@updateCategory failed', ['exception' => $e]);
            throw new InternalServerError('Failed to update category. Please try again later!', 500);
        }
    }

    public function deleteCategory(string $categoryId): bool
    {
        try {
            $category = Category::findOrFail($categoryId);
            $category->delete();
            return true;
        } catch (\Throwable $e) {
            Log::error('CategoryService@deleteCategory failed', ['exception' => $e]);
            throw new InternalServerError('Failed to delete category. Please try again later!', 500);
        }
    }
}
