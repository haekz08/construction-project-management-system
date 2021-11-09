<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class EquipmentUsage extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'daily_log_id',
        'equipment_id',
        'voucher_number',
        'check_number',
        'hours_used',
        'price_per_hour',
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
    public function equipment()
    {
        return $this->belongsTo(Equipment::class, 'equipment_id', 'id');
    }
}
