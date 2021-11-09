<?php

namespace App;

use App\Traits\FormatterTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CashAdvance extends Model
{
    use SoftDeletes;
    use FormatterTrait;
    protected $fillable = [
        'voucher_number',
        'check_number',
        'transaction_date',
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
    public function cash_advance_details()
    {
        return $this->hasMany(CashAdvanceDetail::class, 'cash_advance_id', 'id');
    }

    // ALL GETTERS STARTS HERE
    public function getTransactionDateAttribute(){
        return $this->format_date($this->attributes['transaction_date']);
    }
    // ALL GETTERS ENDS HERE
}
