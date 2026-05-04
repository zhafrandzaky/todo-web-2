<?php

namespace App\Http\Controllers\Api;

use Illuminate\Routing\Controller;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use App\Services\TaskService;

class TaskController extends Controller
{
    public function __construct(
        private readonly TaskService $taskService
    ) {}

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
}
