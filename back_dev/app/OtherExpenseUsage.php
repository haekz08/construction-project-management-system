<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class OtherExpenseUsage extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'daily_log_id',
        'other_expense_id',
        'amount',
        'voucher_number',
        'check_number',
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

    public function other_expense()
    {
        return $this->belongsTo(OtherExpense::class, 'other_expense_id', 'id');
    }
}
