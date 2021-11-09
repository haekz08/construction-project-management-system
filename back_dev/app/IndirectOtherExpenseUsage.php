<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\FormatterTrait;

class IndirectOtherExpenseUsage extends Model
{
    use SoftDeletes;
    use FormatterTrait;
    protected $fillable = [
        'indirect_expense_id',
        'other_expense_id',
        'amount',
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
