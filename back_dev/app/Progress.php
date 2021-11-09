<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\FormatterTrait;

class Progress extends Model
{
    use SoftDeletes;
    use FormatterTrait;
    protected $fillable = [
        'project_location_structure_item_id',
        'transaction_date',
        'qty',
        'details',
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
        'usage',
        'balance',
    ];
    public function progress_details()
    {
        return $this->hasMany(ProgressDetail::class, 'progress_id', 'id');
    }

    // ALL APPENDS STARTS HERE
    public function getUsageAttribute(){
        return $this->progress_details->sum('qty');
    }
    public function getBalanceAttribute(){
        $estimate = $this->attributes['qty'];
        $usage = $this->progress_details->sum('qty');
        $grand_total = $estimate - $usage;
        return $grand_total;
    }
    // ALL APPENDS ENDS HERE

    // ALL GETTERS STARTS HERE
    public function getTransactionDateAttribute(){
        return $this->format_month($this->attributes['transaction_date']);
    }
    // ALL GETTERS ENDS HERE

    // ALL SETTERS STARTS HERE
    public function setTransactionDateAttribute($value)
    {
        $this->attributes['transaction_date'] = $value.'-01';
    }
    // ALL SETTERS ENDS HERE
}
