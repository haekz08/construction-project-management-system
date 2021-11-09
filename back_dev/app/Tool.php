<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tool extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'tool_type_id',
        'code',
        'hourly_rate',
        'is_company_owned',
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


    public function tool_type()
    {
        return $this->belongsTo(ToolType::class, 'tool_type_id', 'id');
    }
    public function tool_designation()
    {
        return $this->belongsTo(ToolDesignation::class, 'id', 'tool_id')->where('is_active',1);
    }
    public function tool_designations()
    {
        return $this->hasMany(ToolDesignation::class, 'tool_id', 'id')->orderBy('id','desc');
    }

    // ALL GETTERS STARTS HERE
    public function getIsCompanyOwnedAttribute(){
        if($this->attributes['is_company_owned'] == 0)
            return false;
        return true;
    }
    // ALL GETTERS ENDS HERE



    // ALL SETTERS STARTS HERE
    public function setIsCompanyOwnedAttribute($value){
        if($value == "true"){
            $this->attributes['is_company_owned'] = 1;
        }else{
            $this->attributes['is_company_owned'] = 0;
        }
    }
    // ALL SETTERS ENDS HERE
}
