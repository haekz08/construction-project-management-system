<?php

namespace App\Http\Controllers;

use App\EquipmentEstimate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class EquipmentEstimateController extends Controller
{
    protected $request;
    protected $search='';
    protected $per_page;

    public function __construct(Request $request)
    {
        $this->request = $request;
        $this->per_page = isset($request->per_page) ? $request->per_page : $this->per_page;
        $this->search = isset($request->search) ? $request->search : $this->search;
    }
    public function getUserId(){
        return Auth::id();
    }
    public function save(){
        $data = $this->request->all();
        $validate = EquipmentEstimate::where('project_location_structure_item_id',$data['project_location_structure_item_id'])
            ->where('equipment_type_id',$data['equipment_type_id'])
            ->when((isset($data['id']) && $data['id'] != -1), function ($query) use ($data) {
                return $query->where('id','!=',$data['id']);
            })
            ->first();
        if($validate)
            return response('Record already exists.',422);


        if (isset($data['id']) && $data['id'] != -1) {
            $data['updated_by'] = $this->getUserId();
        } else {
            $data['created_by'] = $this->getUserId();
            $data['updated_by'] = $this->getUserId();
        }
        $data['total'] = $data['hourly_rate'] * $data['duration_in_hour'] * $data['qty'];
        $result = EquipmentEstimate::updateOrCreate(['id'=>$data['id']],$data);
        return empty($result) ? response('Internal Server Error',500) : response($result,200);
    }
    public function delete(){
        $data = $this->request->all();
        $result = EquipmentEstimate::find( $data['id'] );
        $result->updated_by = $this->getUserId();
        $result->save();
        $result->delete();
        return empty($result) ? response('Internal Server Error',500) : response('Successfully Deleted Record',200);
    }
}
