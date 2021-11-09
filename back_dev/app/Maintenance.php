<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\FormatterTrait;

class Maintenance extends Model
{
    use SoftDeletes;
    use FormatterTrait;
    protected $fillable = [
        'voucher_number',
        'check_number',
        'details',
        'transaction_date',
        'transaction_time',
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


    public function equipment_maintenances()
    {
        return $this->hasMany(EquipmentMaintenance::class, 'maintenance_id', 'id');
    }
    public function tool_maintenances()
    {
        return $this->hasMany(ToolMaintenance::class, 'maintenance_id', 'id');
    }

    // ALL GETTERS STARTS HERE
    public function getTransactionDateAttribute(){
        return $this->format_date($this->attributes['transaction_date']);
    }
    public function getTransactionTimeAttribute(){
        return $this->format_time($this->attributes['transaction_time']);
    }
    public function getTotalAttribute(){
        return $this->format_amount($this->attributes['total']);
    }
    // ALL GETTERS ENDS HERE
}
