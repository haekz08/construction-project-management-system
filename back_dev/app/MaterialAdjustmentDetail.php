<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MaterialAdjustmentDetail extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'material_adjustment_id',
        'material_id',
        'price',
        'system_count',
        'physical_count',
        'adjustment',
        'physical_total',
        'total_adjustment',
        'updated_by',
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
    public function material()
    {
        return $this->belongsTo(Material::class, 'material_id', 'id');
    }
}
