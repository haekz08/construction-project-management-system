<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\FormatterTrait;

class ProjectLocation extends Model
{
    use SoftDeletes;
    use FormatterTrait;
    protected $fillable = [
        'project_id',
        'description',
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
    ];
    public function project_location_structures()
    {
        return $this->hasMany(ProjectLocationStructure::class, 'project_location_id', 'id');
    }
    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id', 'id');
    }


    // ALL APPENDS STARTS HERE
    public function getLaborAttribute(){

        return $this->format_amount($this->project_location_structures->sum('labor.default'));
    }
    public function getEquipmentAttribute(){
        return $this->format_amount($this->project_location_structures->sum('equipment.default'));
    }
    public function getMaterialAttribute(){
        return $this->format_amount($this->project_location_structures->sum('material.default'));
    }
    public function getOtherExpenseAttribute(){
        return $this->format_amount($this->project_location_structures->sum('other_expense.default'));
    }
    public function getGrandTotalAttribute(){
        return $this->format_amount($this->project_location_structures->sum('grand_total.default'));
    }

    public function getLaborEstAttribute(){
        return $this->format_amount($this->project_location_structures->sum('labor_est.default'));
    }
    public function getEquipmentEstAttribute(){
        return $this->format_amount($this->project_location_structures->sum('equipment_est.default'));
    }
    public function getMaterialEstAttribute(){
        return $this->format_amount($this->project_location_structures->sum('material_est.default'));
    }
    public function getGrandTotalEstAttribute(){
        $labor = $this->project_location_structures->sum('labor_est.default');
        $equipment = $this->project_location_structures->sum('equipment_est.default');
        $material = $this->project_location_structures->sum('material_est.default');
        $grand_total = $labor + $equipment + $material;
        return $this->format_amount($grand_total);
    }
    // ALL APPENDS ENDS HERE
}
