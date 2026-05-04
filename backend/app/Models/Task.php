<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Task extends Model
{
    protected $fillable = [
        'title',
        'description',
        'priority',
        'status',
        'start_date',
        'due_date',
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'due_date'   => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected function effectiveStartDate(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->start_date ?? $this->created_at,
        );
    }
}
