<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TaskController;

Route::apiResource('tasks', TaskController::class)->only([
    'store',
    'update',
    // 'index', 'destroy' — will be added by teammate in feature/read-delete-task
]);
