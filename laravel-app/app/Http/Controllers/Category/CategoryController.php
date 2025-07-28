<?php

namespace App\Http\Controllers\Category;

use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryRequest;
use App\Http\Responses\BaseApiResponse;
use App\Services\Category\CategoryService;
use App\Models\Category;
use Illuminate\Http\JsonResponse;

class CategoryController extends Controller
{
    public function __construct(protected CategoryService $categoryService) {}

    public function getAllCategory(string $guildId)
    {
        $categories = $this->categoryService->getAllCategory($guildId);
        return BaseApiResponse::success($categories, 'All categories retrieved successfully', 200);
    }

    public function createCategory(CategoryRequest $request, $guildId)
    {
        $data = $request->payload();

        $category = $this->categoryService->createCategory($data, $guildId);

        return BaseApiResponse::success($category, 'Category created successfully', 201);
    }

    public function updateCategory(CategoryRequest $request, $categoryId)
    {
        $data = $request->payload();

        $category = Category::findOrFail($categoryId);
        $updatedCategory = $this->categoryService->updateCategory($category, $data);

        return BaseApiResponse::success($updatedCategory, 'Category updated successfully', 200);
    }

    public function deleteCategory(string $categoryId)
    {
        $this->categoryService->deleteCategory($categoryId);

        return BaseApiResponse::success(null, 'Category deleted successfully', 204);
    }
}
