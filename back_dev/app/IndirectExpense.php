<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\FormatterTrait;

class IndirectExpense extends Model
{
    use SoftDeletes;
    use FormatterTrait;
    protected $fillable = [
        'project_id',
        'transaction_date',
        'voucher_number',
        'check_number',
        'details',
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

    public function indirect_other_expense_usages()
    {
        return $this->hasMany(IndirectOtherExpenseUsage::class, 'indirect_expense_id', 'id');
    }


    // ALL GETTERS STARTS HERE
    public function getTransactionDateAttribute(){
        return $this->format_date($this->attributes['transaction_date']);
    }
    public function getTotalAttribute(){
        return $this->format_amount($this->attributes['total']);
    }
    // ALL GETTERS ENDS HERE
}
