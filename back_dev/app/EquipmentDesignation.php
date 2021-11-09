<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\Traits\FormatterTrait;
class EquipmentDesignation extends Model
{
    use SoftDeletes;
    use FormatterTrait;
    protected $fillable = [
        'equipment_id',
        'project_location_structure_item_id',
        'manpower_id',
        'transaction_date',
        'transaction_time',
        'is_active',
        'remarks',
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
    public function manpower()
    {
        return $this->belongsTo(Manpower::class, 'manpower_id', 'id');
    }
    public function project_location_structure_item()
    {
        return $this->belongsTo(ProjectLocationStructureItem::class, 'project_location_structure_item_id', 'id')
            ->with(
                [
                    'project_location_structure' => function ($query) {
                        $query->with(['project_location' => function ($query) {
                            $query->with(['project']);
                        }]);
                    },
                ]
            );
    }
    // ALL GETTERS STARTS HERE
    public function getTransactionDateAttribute(){
        return $this->format_date($this->attributes['transaction_date']);
    }
    public function getTransactionTimeAttribute(){
        return $this->format_time($this->attributes['transaction_time']);
    }
    // ALL GETTERS ENDS HERE
}
