<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LaborEstimate extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'project_location_structure_item_id',
        'job_description_id',
        'daily_rate',
        'hourly_rate',
        'duration_in_hour',
        'qty',
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
    public function job_description()
    {
        return $this->belongsTo(JobDescription::class, 'job_description_id', 'id');
    }
}
