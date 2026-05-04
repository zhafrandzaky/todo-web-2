<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTaskRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title'       => ['sometimes', 'string', 'max:255'],
            'description' => ['sometimes', 'nullable', 'string'],
            'priority'    => ['sometimes', 'in:low,medium,high'],
            'status'      => ['sometimes', 'in:todo,in_progress,done'],
            'start_date'  => ['sometimes', 'nullable', 'date'],
            'due_date'    => ['sometimes', 'date', 'after_or_equal:today'],
        ];
    }

    public function messages(): array
    {
        return [
            'priority.in'             => 'Priority must be low, medium, or high.',
            'status.in'               => 'Status must be todo, in_progress, or done.',
            'due_date.after_or_equal' => 'Due date must be today or in the future.',
        ];
    }
}
