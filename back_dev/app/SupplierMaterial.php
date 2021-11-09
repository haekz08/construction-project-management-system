<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SupplierMaterial extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'supplier_id',
        'material_id',
        'price',
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
