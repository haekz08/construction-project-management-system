<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\FormatterTrait;

class MaterialRequest extends Model
{
    use SoftDeletes;
    use FormatterTrait;
    protected $fillable = [
        'project_location_structure_item_id',
        'transaction_date',
        'reference_number',
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

    public function material_request_details()
    {
        return $this->hasMany(MaterialRequestDetail::class, 'material_request_id', 'id');
    }


    // ALL GETTERS STARTS HERE
    public function getTransactionDateAttribute(){
        return $this->format_date($this->attributes['transaction_date']);
    }
    // ALL GETTERS ENDS HERE
}
