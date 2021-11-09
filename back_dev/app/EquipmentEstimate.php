<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class EquipmentEstimate extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'project_location_structure_item_id',
        'equipment_type_id',
        'hourly_rate',
        'duration_in_hour',
        'duration_in_day',
        'qty',
        'total',
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

    public function equipment_type()
    {
        return $this->belongsTo(EquipmentType::class, 'equipment_type_id', 'id');
    }
}
