<?php

namespace App\Http\Controllers\Api;

use Illuminate\Routing\Controller;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use App\Services\TaskService;
use App\Models\Task;

class TaskController extends Controller
{
    public function __construct(
        private readonly TaskService $taskService
    ) {}

    public function index(): \Illuminate\Http\JsonResponse
    {
        $tasks = $this->taskService->getTasks();

        return TaskResource::collection($tasks)->response();
    }

    public function store(StoreTaskRequest $request): \Illuminate\Http\JsonResponse
    {
        $task = $this->taskService->createTask($request->validated());

        return (new TaskResource($task))
            ->response()
            ->setStatusCode(201);
    }

    public function update(UpdateTaskRequest $request, int $id): \Illuminate\Http\JsonResponse
    {
        $task = $this->taskService->updateTask($id, $request->validated());

        return (new TaskResource($task))
            ->response()
            ->setStatusCode(200);
    }

    public function destroy(int $id): \Illuminate\Http\JsonResponse
    {
        $this->taskService->deleteTask($id);

        return response()->json([
            'message' => 'Task deleted successfully'
        ], 200);
    }
}