<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\FormatterTrait;

class DailyLog extends Model
{
    use SoftDeletes;
    use FormatterTrait;
    protected $fillable = [
        'project_location_structure_item_id',
        'transaction_date',
        'payroll_id',
        'total_labor',
        'total_equipment',
        'total_material',
        'total_other_expense',
        'grand_total',
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

    public function manpower_usages()
    {
        return $this->hasMany(ManpowerUsage::class, 'daily_log_id', 'id');
    }
    public function equipment_usages()
    {
        return $this->hasMany(EquipmentUsage::class, 'daily_log_id', 'id');
    }
    public function material_usages()
    {
        return $this->hasMany(MaterialUsage::class, 'daily_log_id', 'id');
    }
    public function other_expense_usages()
    {
        return $this->hasMany(OtherExpenseUsage::class, 'daily_log_id', 'id');
    }
    public function project_location_structure_item()
    {
        return $this->belongsTo(ProjectLocationStructureItem::class, 'project_location_structure_item_id', 'id');
    }


    // ALL GETTERS STARTS HERE
    public function getTransactionDateAttribute(){
        return $this->format_date($this->attributes['transaction_date']);
    }
//    public function getGrandTotalAttribute(){
//        if(empty($this->attributes['payroll_id']))
//            return $this->attributes['grand_total'] - $this->attributes['total_labor'];
//
//        return $this->attributes['grand_total'];
//    }
//    public function getTotalLaborAttribute(){
//        if(empty($this->attributes['payroll_id']))
//            return 0;
//
//        return $this->attributes['total_labor'];
//    }
    // ALL GETTERS ENDS HERE
}
