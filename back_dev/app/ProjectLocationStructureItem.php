<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\FormatterTrait;

class ProjectLocationStructureItem extends Model
{
    use SoftDeletes;
    use FormatterTrait;
    protected $fillable = [
        'project_location_structure_id',
        'description',
        'qty',
        'item_unit_id',
        'estimated_hours',
        'estimated_days',
        'estimated_budget',
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
    protected  $appends = [
        'labor',
        'equipment',
        'material',
        'other_expense',
        'grand_total',

        'labor_est',
        'equipment_est',
        'material_est',
        'grand_total_est',

        'progress_estimate',
        'progress_accomplishment',
        'progress_balance',

        'unit_price',
    ];
    public function labor_estimates()
    {
        return $this->hasMany(LaborEstimate::class, 'project_location_structure_item_id', 'id');
    }
    public function equipment_estimates()
    {
        return $this->hasMany(EquipmentEstimate::class, 'project_location_structure_item_id', 'id');
    }
    public function material_estimates()
    {
        return $this->hasMany(MaterialEstimate::class, 'project_location_structure_item_id', 'id');
    }
    public function project_location_structure_item_manpowers()
    {
        return $this->hasMany(ProjectLocationStructureItemManpower::class, 'project_location_structure_item_id', 'id');
    }
    public function daily_logs()
    {
        return $this->hasMany(DailyLog::class, 'project_location_structure_item_id', 'id');
    }
    public function progresses()
    {
        return $this->hasMany(Progress::class, 'project_location_structure_item_id', 'id');
    }
    public function project_location_structure()
    {
        return $this->belongsTo(ProjectLocationStructure::class, 'project_location_structure_id', 'id');
    }
    public function item_unit()
    {
        return $this->belongsTo(ItemUnit::class, 'item_unit_id', 'id');
    }
    public function material_issuances()
    {
        return $this->hasMany(MaterialIssuance::class, 'project_location_structure_item_id', 'id');
    }

    public function material_withdrawals()
    {
        return $this->hasMany(MaterialWithdrawal::class, 'project_location_structure_item_id', 'id');
    }


    // ALL APPENDS STARTS HERE
    public function getLaborAttribute(){
        return $this->format_amount($this->daily_logs->whereNotNull('payroll_id')->sum('total_labor'));
    }
    public function getEquipmentAttribute(){
        return $this->format_amount($this->daily_logs->sum('total_equipment'));
    }
    public function getMaterialAttribute(){
        return $this->format_amount($this->material_issuances->sum('total') + $this->material_withdrawals->sum('total'));
    }
    public function getOtherExpenseAttribute(){
        return $this->format_amount($this->daily_logs->sum('total_other_expense'));
    }
    public function getGrandTotalAttribute(){
        $materials = $this->material_issuances->sum('total') + $this->material_withdrawals->sum('total');
        $grand_total = ($this->daily_logs->sum('grand_total') - ($this->daily_logs->whereNull('payroll_id')->sum('total_labor') + $this->daily_logs->sum('total_material'))) + $materials;
        return $this->format_amount($grand_total);
    }

    public function getLaborEstAttribute(){
        return $this->format_amount($this->labor_estimates->sum('total'));
    }
    public function getEquipmentEstAttribute(){
        return $this->format_amount($this->equipment_estimates->sum('total'));
    }
    public function getMaterialEstAttribute(){
        return $this->format_amount($this->material_estimates->sum('total'));
    }
    public function getGrandTotalEstAttribute(){
        $labor = $this->labor_estimates->sum('total');
        $equipment = $this->equipment_estimates->sum('total');
        $material = $this->material_estimates->sum('total');
        $grand_total = $labor + $equipment + $material;
        return $this->format_amount($grand_total);
    }

    public function getProgressEstimateAttribute(){
        return $this->progresses->sum('qty');
    }
    public function getProgressAccomplishmentAttribute(){
        return $this->progresses->sum('usage');
    }
    public function getProgressBalanceAttribute(){
        return $this->progresses->sum('balance');
    }
    public function getUnitPriceAttribute(){
        $labor = $this->labor_estimates->sum('total');
        $equipment = $this->equipment_estimates->sum('total');
        $material = $this->material_estimates->sum('total');
        $grand_total = $labor + $equipment + $material;
        return $this->format_amount($grand_total/$this->attributes['qty']);
    }
    // ALL APPENDS ENDS HERE


}
