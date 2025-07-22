<?php

namespace App\Http\Controllers\Category;

use App\Http\Controllers\Controller;
use App\Http\Responses\BaseApiResponse;
use App\Services\Category\CategoryService;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CategoryController extends Controller
{
    protected $categoryService;

    public function __construct(CategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }

    public function getAllCategory($guildId)
    {
        $category = $this->categoryService->getAllCategory($guildId);
        return BaseApiResponse::success($category, 'All category get successfully', 200);
    }

    public function createCategory(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:100',
            'guild_id' => 'required|uuid|exists:guilds,id',
            'position' => 'sometimes|integer',
        ]);

        $category = $this->categoryService->createCategory($data);

        return BaseApiResponse::success($category, 'Category created successfully', 201);
    }

    public function updateCategory(Request $request, $categoryId)
    {
        $data = $request->validate([
            'name' => 'sometimes|string|max:100',
            'position' => 'sometimes|integer',
        ]);

        $category = Category::findOrFail($categoryId);
        $updatedCategory = $this->categoryService->updateCategory($category, $data);

        return BaseApiResponse::success($updatedCategory, 'Category updated successfully');
    }

    public function deleteCategory(string $categoryId)
    {
        $this->categoryService->deleteCategory($categoryId);

        return BaseApiResponse::success(null, 'Category deleted successfully');
    }
}
