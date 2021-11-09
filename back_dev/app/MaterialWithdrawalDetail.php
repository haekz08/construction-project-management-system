<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MaterialWithdrawalDetail extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'material_withdrawal_id',
        'material_id',
        'price',
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
    public function material()
    {
        return $this->belongsTo(Material::class, 'material_id', 'id');
    }
}
