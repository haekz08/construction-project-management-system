<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class StartingInventory extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'project_location_structure_item_id',
        'transaction_date',
        'remarks',
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
    public function project_location_structure_item()
    {
        return $this->belongsTo(ProjectLocationStructureItem::class, 'project_location_structure_item_id', 'id');
    }
}
