<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\FormatterTrait;

class ProjectLocationStructure extends Model
{
    use SoftDeletes;
    use FormatterTrait;
    protected $fillable = [
        'project_location_id',
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
    public function project_location_structure_items()
    {
        return $this->hasMany(ProjectLocationStructureItem::class, 'project_location_structure_id', 'id');
    }
    public function project_location()
    {
        return $this->belongsTo(ProjectLocation::class, 'project_location_id', 'id');
    }

    // ALL APPENDS STARTS HERE
    public function getLaborAttribute(){

        return $this->format_amount($this->project_location_structure_items->sum('labor.default'));
    }
    public function getEquipmentAttribute(){
        return $this->format_amount($this->project_location_structure_items->sum('equipment.default'));
    }
    public function getMaterialAttribute(){
        return $this->format_amount($this->project_location_structure_items->sum('material.default'));
    }
    public function getOtherExpenseAttribute(){
        return $this->format_amount($this->project_location_structure_items->sum('other_expense.default'));
    }
    public function getGrandTotalAttribute(){
        return $this->format_amount($this->project_location_structure_items->sum('grand_total.default'));
    }

    public function getLaborEstAttribute(){
        return $this->format_amount($this->project_location_structure_items->sum('labor_est.default'));
    }
    public function getEquipmentEstAttribute(){
        return $this->format_amount($this->project_location_structure_items->sum('equipment_est.default'));
    }
    public function getMaterialEstAttribute(){
        return $this->format_amount($this->project_location_structure_items->sum('material_est.default'));
    }
    public function getGrandTotalEstAttribute(){
        $labor = $this->project_location_structure_items->sum('labor_est.default');
        $equipment = $this->project_location_structure_items->sum('equipment_est.default');
        $material = $this->project_location_structure_items->sum('material_est.default');
        $grand_total = $labor + $equipment + $material;
        return $this->format_amount($grand_total);
    }
    // ALL APPENDS ENDS HERE
}
