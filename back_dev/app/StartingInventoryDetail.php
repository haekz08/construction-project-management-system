<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class StartingInventoryDetail extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'starting_inventory_id',
        'material_id',
        'price',
        'qty',
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
}
