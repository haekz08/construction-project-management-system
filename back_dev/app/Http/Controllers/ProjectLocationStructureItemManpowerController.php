<?php

namespace App\Http\Controllers;

use App\ProjectLocationStructureItemManpower;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ProjectLocationStructureItemManpowerController extends Controller
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
        $validate = ProjectLocationStructureItemManpower::where('project_location_structure_item_id',$data['project_location_structure_item_id'])
            ->where('manpower_id',$data['manpower_id'])
            ->when((isset($data['id']) && $data['id'] != -1), function ($query) use ($data) {
                return $query->where('id','!=',$data['id']);
            })
            ->first();
        if($validate)
            return response('Item already exists.',422);


        if (isset($data['id']) && $data['id'] != -1) {
            $data['updated_by'] = $this->getUserId();
        } else {
            $data['created_by'] = $this->getUserId();
            $data['updated_by'] = $this->getUserId();
        }
        $result = ProjectLocationStructureItemManpower::updateOrCreate(['id'=>$data['id']],$data);
        return empty($result) ? response('Internal Server Error',500) : response($result,200);
    }
    public function delete(){
        $data = $this->request->all();
        $result = ProjectLocationStructureItemManpower::find( $data['id'] );
        $result->updated_by = $this->getUserId();
        $result->save();
        $result->delete();
        return empty($result) ? response('Internal Server Error',500) : response('Successfully Deleted Record',200);
    }
}
