<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\FormatterTrait;

class MaterialIssuance extends Model
{
    use SoftDeletes;
    use FormatterTrait;
    protected $fillable = [
        'reference_number',
        'project_location_structure_item_id',
        'transaction_date',
        'remarks',
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

    public function project_location_structure_item()
    {
        return $this->belongsTo(ProjectLocationStructureItem::class, 'project_location_structure_item_id', 'id');
    }
    public function project_item()
    {
        return $this->belongsTo(ProjectItem::class, 'project_item_id', 'id');
    }
    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id', 'id');
    }
    public function material_issuance_details()
    {
        return $this->hasMany(MaterialIssuanceDetail::class, 'material_issuance_id', 'id');
    }


    // ALL GETTERS STARTS HERE
    public function getTransactionDateAttribute(){
        return $this->format_date($this->attributes['transaction_date']);
    }
    // ALL GETTERS ENDS HERE
}
