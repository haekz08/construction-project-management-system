<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ToolMaintenance extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'maintenance_id',
        'tool_id',
        'project_location_structure_item_id',
        'maintenance_description_id',
        'manpower_id',
        'remarks',
        'amount',
        'qty',
        'total',
        'is_indirect',
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
    public function tool()
    {
        return $this->belongsTo(Tool::class, 'tool_id', 'id');
    }
    public function manpower()
    {
        return $this->belongsTo(Manpower::class, 'manpower_id', 'id');
    }
    public function project_location_structure_item()
    {
        return $this->belongsTo(ProjectLocationStructureItem::class, 'project_location_structure_item_id', 'id');
    }
    public function maintenance_description()
    {
        return $this->belongsTo(MaintenanceDescription::class, 'maintenance_description_id', 'id');
    }
}
