<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Manpower extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'last_name',
        'first_name',
        'middle_name',
        'job_description_id',
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
    protected $appends=['full_name'];

    public function getFullNameAttribute(){
        return $this->attributes['last_name'].', '.$this->attributes['first_name'];
    }

    public function job_description(){
        return $this->belongsTo(JobDescription::class, 'job_description_id', 'id');
    }
}
