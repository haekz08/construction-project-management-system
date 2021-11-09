<?php

namespace App\Http\Controllers;

use App\EquipmentType;
use App\Equipment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class EquipmentTypeController extends Controller
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
    public function all(){
        if(isset($this->request->per_page))
        {
            $data = EquipmentType::with(['equipments'])->where('description', 'like', '%'.$this->search.'%')->paginate($this->per_page);
        }else
        {
            $data = EquipmentType::all();
        }
        return response($data);
    }
    public function save(){
        $data = $this->request->all();
        if (isset($data['id']) && $data['id'] != -1) {
            $validate = EquipmentType::where('description',$data['description'])
                                      ->where('id','!=',$data['id'])
                                      ->first();
            if($validate)
                return response('Equipment description already exists.',422);
            $data['updated_by'] = $this->getUserId();
        } else {
            $validate = Validator::make($data, [
                'description' => 'required|unique:equipment_types',
            ]);
            if ($validate->fails())
                return response('Equipment description already exists.',422);
            $data['created_by'] = $this->getUserId();
            $data['updated_by'] = $this->getUserId();
        }
        DB::beginTransaction();
        try {
            $equipment_type = EquipmentType::updateOrCreate(['id'=>$data['id']],$data);
            if(!empty($data['equipments']))
            {
                foreach($data['equipments'] as $row){
                    if($row['id'] != -1 && $row['is_deleted']){
                        $result = Equipment::find( $row['id'] );
                        $result->updated_by = $this->getUserId();
                        $result->save();
                        $result->delete();
                    }elseif(!$row['is_deleted']){
                        $equipment = $row;
                        if (isset($row['id']) && $row['id'] != -1) {
                            $equipment['updated_by'] = $this->getUserId();
                        }else{
                            $equipment['created_by'] = $this->getUserId();
                            $equipment['updated_by'] = $this->getUserId();
                        }
                        $equipment['equipment_type_id'] = $equipment_type['id'];
                        $result = Equipment::updateOrCreate(['id'=>$equipment['id']],$equipment);
                    }
                }
            }
            DB::commit();
            return response('Success',200);
        } catch (\Exception $e) {
            DB::rollback();
            return response($e, 422);
        }
    }
    public function delete(){
        $data = $this->request->all();
        $result = EquipmentType::find( $data['id'] );
        $result->updated_by = $this->getUserId();
        $result->save();
        $result->delete();
        return empty($result) ? response('Internal Server Error',500) : response('Successfully Deleted Record',200);
    }
    public function get(){
        $data = $this->request->all();
        $result = EquipmentType::with(
                [
                    'equipments' => function ($query) {
                        $query->with(
                            [
                                'equipment_designation' => function ($query) {
                                    $query->with(['manpower','project_location_structure_item']);
                                },
                                'equipment_designations' => function ($query) {
                                    $query->with(['manpower','project_location_structure_item']);
                                },
                                'equipment_type'
                            ]);
                    },
                ])->find($data['id']);
        return empty($result) ? response('Internal Server Error',500) : response($result,200);
    }
    public function search(){
        $search_key=$this->search;
        if(isset($search_key) and !empty($search_key))
        {
            $data = Equipment::
                    with(['equipment_type'])
                    ->where('code', 'like', '%'.$search_key.'%')
                    ->orWhereHas('equipment_type', function($query) use ($search_key){
                        $query->where('description', 'like', '%'.$search_key.'%');
                    })
                    ->get();
            return response($data);
        }
    }
}
