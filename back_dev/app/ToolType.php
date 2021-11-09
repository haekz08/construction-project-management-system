<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ToolType extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'description',
        'created_by',
        'updated_by',
    ];
    protected $hidden=[
        'created_by',
        'updated_by',
        'created_at',
        'updated_at',
        'deleted_at',
    ];
    public function tools()
    {
        return $this->hasMany(Tool::class, 'tool_type_id', 'id');
    }
}
