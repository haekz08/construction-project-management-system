<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\FormatterTrait;

class MaterialTransfer extends Model
{
    use SoftDeletes;
    use FormatterTrait;
    protected $fillable = [
        'from',
        'to',
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
    public function project_location_structure_item_from()
    {
        return $this->belongsTo(ProjectLocationStructureItem::class, 'from', 'id');
    }
    public function project_location_structure_item_to()
    {
        return $this->belongsTo(ProjectLocationStructureItem::class, 'to', 'id');
    }

    public function material_transfer_details()
    {
        return $this->hasMany(MaterialTransferDetail::class, 'material_transfer_id', 'id');
    }


    // ALL GETTERS STARTS HERE
    public function getTransactionDateAttribute(){
        return $this->format_date($this->attributes['transaction_date']);
    }
    // ALL GETTERS ENDS HERE
}
