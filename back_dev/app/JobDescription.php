<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\FormatterTrait;

class JobDescription extends Model
{
    use SoftDeletes;
    use FormatterTrait;
    protected $fillable = [
        'description',
        'daily_rate',
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


    // ALL GETTERS STARTS HERE
    public function getDailyRateAttribute(){
        return $this->format_amount($this->attributes['daily_rate']);
    }
    // ALL GETTERS ENDS HERE
}
