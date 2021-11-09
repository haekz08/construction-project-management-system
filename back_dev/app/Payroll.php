<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\FormatterTrait;

class Payroll extends Model
{
    use SoftDeletes;
    use FormatterTrait;
    protected $fillable = [
        'project_id',
        'payroll_type',
        'date_from',
        'date_to',
        'voucher_number',
        'check_number',
        'remarks',
        'authorized_by',
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
    public function payroll_details(){
        return $this->hasMany(PayrollDetail::class, 'payroll_id', 'id');
    }
    public function project(){
        return $this->belongsTo(Project::class, 'project_id', 'id');
    }
    public function authorized(){
        return $this->belongsTo(User::class, 'authorized_by', 'id');
    }
    // ALL GETTERS STARTS HERE
    public function getDateFromAttribute(){
        return $this->format_date($this->attributes['date_from']);
    }
    public function getDateToAttribute(){
        return $this->format_date($this->attributes['date_to']);
    }
    public function getPayrollTypeAttribute(){
        if($this->attributes['payroll_type']==1)
            return 'Direct Expense';
        return 'Indirect Expense';
    }
    // ALL GETTERS ENDS HERE
}
