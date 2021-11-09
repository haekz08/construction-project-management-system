<?php

namespace App\Http\Controllers;

use App\DailyLog;
use App\ProjectLocationStructure;
use App\ProjectLocationStructureItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ProjectLocationStructureController extends Controller
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
            $data = ProjectLocationStructure::where('title', 'like', '%'.$this->search.'%')->paginate($this->per_page);
        }else
        {
            $data = ProjectLocationStructure::all();
        }
        return response($data);
    }
    public function save(){
        $data = $this->request->all();
        $validate = ProjectLocationStructure::where('description',$data['description'])
            ->where('project_location_id',$data['project_location_id'])
            ->when((isset($data['id']) && $data['id'] != -1), function ($query, $data) {
                return $query->where('id','!=',$data['id']);
            })
            ->first();
        if($validate)
            return response('Location structure already exists.',422);


        if (isset($data['id']) && $data['id'] != -1) {
            $data['updated_by'] = $this->getUserId();
        } else {
            $data['created_by'] = $this->getUserId();
            $data['updated_by'] = $this->getUserId();
        }
        $result = ProjectLocationStructure::updateOrCreate(['id'=>$data['id']],$data);
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
        $result = ProjectLocationStructure::find($id);
        $result->updated_by = $this->getUserId();
        $result->save();
        $result->delete();

        $result = ProjectLocationStructureItem::where('project_location_structure_id',$id)->get();
        $child = new ProjectLocationStructureItemController($this->request);
        if(!empty($result)){
            foreach($result as $row){
                $child->deleteChildren($row['id']);
            }
        }

    }
    public function get(){
        $data = $this->request->all();
        $result = ProjectLocationStructure::find($data['id']);
        return empty($result) ? response('Internal Server Error',500) : response($result,200);
    }
}
