<?php

namespace App\Http\Controllers;

use App\ToolType;
use App\Tool;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class ToolTypeController extends Controller
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
            $data = ToolType::with(['tools'])->where('description', 'like', '%'.$this->search.'%')->paginate($this->per_page);
        }else
        {
            $data = ToolType::all();
        }
        return response($data);
    }
    public function save(){
        $data = $this->request->all();
        if (isset($data['id']) && $data['id'] != -1) {
            $validate = ToolType::where('description',$data['description'])
                                      ->where('id','!=',$data['id'])
                                      ->first();
            if($validate)
                return response('Tool description already exists.',422);
            $data['updated_by'] = $this->getUserId();
        } else {
            $validate = Validator::make($data, [
                'description' => 'required|unique:tool_types',
            ]);
            if ($validate->fails())
                return response('Tool description already exists.',422);
            $data['created_by'] = $this->getUserId();
            $data['updated_by'] = $this->getUserId();
        }
        DB::beginTransaction();
        try {
            $tool_type = ToolType::updateOrCreate(['id'=>$data['id']],$data);
            if(!empty($data['tools']))
            {
                foreach($data['tools'] as $row){
                    if($row['id'] != -1 && $row['is_deleted']){
                        $result = Tool::find( $row['id'] );
                        $result->updated_by = $this->getUserId();
                        $result->save();
                        $result->delete();
                    }elseif(!$row['is_deleted']){
                        $tool = $row;
                        if (isset($row['id']) && $row['id'] != -1) {
                            $tool['updated_by'] = $this->getUserId();
                        }else{
                            $tool['created_by'] = $this->getUserId();
                            $tool['updated_by'] = $this->getUserId();
                        }
                        $tool['tool_type_id'] = $tool_type['id'];
                        $result = Tool::updateOrCreate(['id'=>$tool['id']],$tool);
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
        $result = ToolType::find( $data['id'] );
        $result->updated_by = $this->getUserId();
        $result->save();
        $result->delete();
        return empty($result) ? response('Internal Server Error',500) : response('Successfully Deleted Record',200);
    }
    public function get(){
        $data = $this->request->all();
        $result = ToolType::with(
            [
                'tools' => function ($query) {
                    $query->with(
                        [
                            'tool_designation' => function ($query) {
                                $query->with(['manpower','project_location_structure_item']);
                            },
                            'tool_designations' => function ($query) {
                                $query->with(['manpower','project_location_structure_item']);
                            },
                            'tool_type'
                        ]);
                },
            ])->find($data['id']);
        return empty($result) ? response('Internal Server Error',500) : response($result,200);
    }
    public function search(){
        $search_key=$this->search;
        if(isset($search_key) and !empty($search_key))
        {
            $data = Tool::
            with(['tool_type'])
                ->where('code', 'like', '%'.$search_key.'%')
                ->orWhereHas('tool_type', function($query) use ($search_key){
                    $query->where('description', 'like', '%'.$search_key.'%');
                })
                ->get();
            return response($data);
        }
    }
}
