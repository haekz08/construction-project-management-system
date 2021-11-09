<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\FormatterTrait;

class ProgressDetail extends Model
{
    use SoftDeletes;
    use FormatterTrait;
    protected $fillable = [
        'progress_id',
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


    public function progress()
    {
        return $this->belongsTo(Progress::class, 'progress_id', 'id');
    }
    // ALL GETTERS STARTS HERE
    public function getTransactionDateAttribute(){
        return $this->format_date($this->attributes['transaction_date']);
    }
    // ALL GETTERS ENDS HERE
}
