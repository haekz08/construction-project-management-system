<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CashAdvanceDetail extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'cash_advance_id',
        'manpower_id',
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

    public function manpower()
    {
        return $this->belongsTo(Manpower::class, 'manpower_id', 'id');
    }
}
