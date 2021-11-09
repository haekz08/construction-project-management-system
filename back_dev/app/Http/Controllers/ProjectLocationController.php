<?php

namespace App\Http\Controllers;

use App\ProjectLocation;
use App\ProjectLocationStructure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ProjectLocationController extends Controller
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
            $data = ProjectLocation::where('title', 'like', '%'.$this->search.'%')->paginate($this->per_page);
        }else
        {
            $data = ProjectLocation::all();
        }
        return response($data);
    }
    public function save(){
        $data = $this->request->all();
        $validate = ProjectLocation::where('description',$data['description'])
            ->where('project_id',$data['project_id'])
            ->when((isset($data['id']) && $data['id'] != -1), function ($query) use ($data) {
                return $query->where('id','!=',$data['id']);
            })
            ->first();
        if($validate)
            return response('Project location already exists.',422);


        if (isset($data['id']) && $data['id'] != -1) {
            $data['updated_by'] = $this->getUserId();
        } else {
            $data['created_by'] = $this->getUserId();
            $data['updated_by'] = $this->getUserId();
        }
        $result = ProjectLocation::updateOrCreate(['id'=>$data['id']],$data);
        return empty($result) ? response('Internal Server Error',500) : response($result,200);
    }
    public function delete(){
        DB::beginTransaction();
        try
        {
            $data = $this->request->all();
            $this->deleteChildren($data['id']);

            DB::commit();
            return response('Successfully Deleted Record',200);
        } catch (\Exception $e) {
            DB::rollback();
            return response($e, 422);
        }
    }
    public function deleteChildren($id){
        $result = ProjectLocation::find($id);
        $result->updated_by = $this->getUserId();
        $result->save();
        $result->delete();

        $result = ProjectLocationStructure::where('project_location_id',$id)->get();
        $child = new ProjectLocationStructureController($this->request);
        if(!empty($result)){
            foreach($result as $row){
                $child->deleteChildren($row['id']);
            }
        }

    }
    public function get(){
        $data = $this->request->all();
        $result = ProjectLocation::with(['project_location_structures'])->find($data['id']);
        return empty($result) ? response('Internal Server Error',500) : response($result,200);
    }
}
