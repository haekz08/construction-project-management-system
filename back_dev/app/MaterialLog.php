<?php

namespace App;

use App\Traits\FormatterTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MaterialLog extends Model
{
    use SoftDeletes;
    use FormatterTrait;
    protected $fillable = [
        'project_location_structure_item_id',
        'material_id',
        'price',
        'in',
        'out',
        'balance',
        'remarks',
        'reference_id',
        'reference_type_id',
        'updated_by',
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
        'logs'
    ];
    public function material()
    {
        return $this->belongsTo(Material::class, 'material_id', 'id');
    }
    public function project_location_structure_item()
    {
        return $this->belongsTo(ProjectLocationStructureItem::class, 'project_location_structure_item_id', 'id');
    }
    public function getLogsAttribute(){
        return $this->getDataLogsAttribute();
    }
}
