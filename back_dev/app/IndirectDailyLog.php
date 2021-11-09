<?php

namespace App;

use App\Traits\FormatterTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class IndirectDailyLog extends Model
{
    use SoftDeletes;
    use FormatterTrait;
    protected $fillable = [
        'project_id',
        'transaction_date',
        'payroll_id',
        'total_labor',
        'grand_total',
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

    public function manpower_usages()
    {
        return $this->hasMany(IndirectManpowerUsage::class, 'indirect_daily_log_id', 'id');
    }
    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id', 'id');
    }


    // ALL GETTERS STARTS HERE
    public function getTransactionDateAttribute(){
        return $this->format_date($this->attributes['transaction_date']);
    }
    // ALL GETTERS ENDS HERE
}
