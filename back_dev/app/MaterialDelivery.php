<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\FormatterTrait;

class MaterialDelivery extends Model
{
    use SoftDeletes;
    use FormatterTrait;
    protected $fillable = [
        'project_location_structure_item_id',
        'material_purchase_id',
        'transaction_date',
        'delivery_number',
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
    public function material_purchase()
    {
        return $this->belongsTo(MaterialPurchase::class, 'material_purchase_id', 'id');
    }

    public function material_delivery_details()
    {
        return $this->hasMany(MaterialDeliveryDetail::class, 'material_delivery_id', 'id');
    }


    // ALL GETTERS STARTS HERE
    public function getTransactionDateAttribute(){
        return $this->format_date($this->attributes['transaction_date']);
    }
    // ALL GETTERS ENDS HERE
}
