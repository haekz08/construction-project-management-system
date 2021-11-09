<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MaterialReceivingDetail extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'material_receiving_id',
        'material_id',
        'price',
        'qty_received',
        'qty_rejected',
        'total_received',
        'total_rejected',
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
