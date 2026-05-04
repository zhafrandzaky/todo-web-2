<?php

namespace App\Services;

use App\Models\Task;

class TaskService
{
    public function createTask(array $data): Task
    {
        return Task::create($data);
    }

    public function updateTask(int $id, array $data): Task
    {
        $task = Task::findOrFail($id);
        $task->update($data);
        return $task->fresh();
    }

    public function getTask(int $id): Task
    {
        return Task::findOrFail($id);
    }

    public function deleteTask(int $id): bool
    {
        $task = Task::findOrFail($id);
        return $task->delete();
    }
}