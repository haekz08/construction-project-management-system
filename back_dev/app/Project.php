<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\FormatterTrait;
use Illuminate\Support\Facades\Auth;

class Project extends Model
{
    use SoftDeletes;
    use FormatterTrait;
    protected $fillable = [
        'title',
        'description',
        'contractor',
        'manager',
        'location',
        'starting_date',
        'ending_date',
        'extension',
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


    protected  $appends = [
        'labor',
        'equipment',
        'material',
        'other_expense',
        'indirect_expense',
        'grand_total',

        'labor_est',
        'equipment_est',
        'material_est',
        'grand_total_est',

        'is_project_owner'
    ];
    public function project_locations()
    {
        return $this->hasMany(ProjectLocation::class, 'project_id', 'id');
    }
    public function indirect_expenses()
    {
        return $this->hasMany(IndirectExpense::class, 'project_id', 'id');
    }
    public function users()
    {
        return $this->belongsToMany(User::class, 'user_accesses', 'project_id','user_id');
    }
    public function indirect_daily_logs()
    {
        return $this->hasMany(IndirectDailyLog::class, 'project_id', 'id');
    }

    // ALL APPENDS STARTS HERE
    public function getLaborAttribute(){

        return $this->format_amount($this->project_locations->sum('labor.default'));
    }
    public function getEquipmentAttribute(){
        return $this->format_amount($this->project_locations->sum('equipment.default'));
    }
    public function getMaterialAttribute(){
        return $this->format_amount($this->project_locations->sum('material.default'));
    }
    public function getOtherExpenseAttribute(){
        return $this->format_amount($this->project_locations->sum('other_expense.default'));
    }
    public function getIndirectExpenseAttribute(){
        $other_expenses = $this->indirect_expenses->sum('total.default');
        $labor = $this->indirect_daily_logs->whereNotNull('payroll_id')->sum('grand_total');
        $total = $other_expenses + $labor;
        return $this->format_amount($total);
    }
    public function getGrandTotalAttribute(){
        return $this->format_amount($this->project_locations->sum('grand_total.default'));
    }

    public function getLaborEstAttribute(){
        return $this->format_amount($this->project_locations->sum('labor_est.default'));
    }
    public function getEquipmentEstAttribute(){
        return $this->format_amount($this->project_locations->sum('equipment_est.default'));
    }
    public function getMaterialEstAttribute(){
        return $this->format_amount($this->project_locations->sum('material_est.default'));
    }
    public function getGrandTotalEstAttribute(){
        $labor = $this->project_locations->sum('labor_est.default');
        $equipment = $this->project_locations->sum('equipment_est.default');
        $material = $this->project_locations->sum('material_est.default');
        $grand_total = $labor + $equipment + $material;
        return $this->format_amount($grand_total);
    }
    // ALL APPENDS ENDS HERE

    // ALL GETTERS STARTS HERE
    public function getPriceAttribute(){
        return $this->format_amount($this->attributes['price']);
    }
    public function getIsProjectOwnerAttribute(){
        return ($this->attributes['created_by'] == Auth::id()) ? true : false;
    }
    // ALL GETTERS ENDS HERE
}
