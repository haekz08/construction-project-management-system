<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PayrollDetail extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'payroll_id',
        'manpower_id',
        'total_days',
        'total_regular_hours',
        'total_ot_hours',
        'initial_payout',
        'previous_ca_balance',
        'ca_payment',
        'sss_payment',
        'philhealth_payment',
        'pagibig_payment',
        'other_payment',
        'total_payout',
        'remarks',
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
    public function manpower(){
        return $this->belongsTo(Manpower::class, 'manpower_id', 'id');
    }
}
