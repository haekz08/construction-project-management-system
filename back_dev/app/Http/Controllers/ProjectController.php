<?php

namespace App\Http\Controllers;

use App\Project;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ProjectController extends Controller
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
        $project1 =  Project::where('created_by', $this->getUserId())->get();
        $project2 =  User::with('projects')->find($this->getUserId());
        $collect = collect($project2->projects);
        $merged = $collect->merge($project1);
        return response($merged->all());
    }
    public function save(){
        $data = $this->request->all();
        if (isset($data['id']) && $data['id'] != -1) {
            $validate = Project::where('title',$data['title'])
                                      ->where('id','!=',$data['id'])
                                      ->first();
            if($validate)
                return response('Project title already exists.',422);
            $data['updated_by'] = $this->getUserId();
        } else {
            $validate = Validator::make($data, [
                'title' => 'required|unique:projects',
            ]);
            if ($validate->fails())
                return response('Project title already exists.',422);
            $data['created_by'] = $this->getUserId();
            $data['updated_by'] = $this->getUserId();
        }
        $result = Project::updateOrCreate(['id'=>$data['id']],$data);
        return empty($result) ? response('Internal Server Error',500) : response($result,200);
    }
    public function delete(){
        $data = $this->request->all();
        $result = Project::find( $data['id'] );
        $result->updated_by = $this->getUserId();
        $result->save();
        $result->delete();
        return empty($result) ? response('Internal Server Error',500) : response('Successfully Deleted Record',200);
    }
    public function get(){
        $data = $this->request->all();
        $user_id = $this->getUserId();
        $result = Project::
                with(
                    [
                        'project_locations',
                        'users',
                    ]
                )->where('id',$data['id'])
//                ->where('created_by',$this->getUserId())
//                ->orWhereHas('users', function($query) use ($user_id){
//                    $query->where('user_id', $user_id);
//                })
//                ->first();
        ->first();
        return empty($result) ? response('Internal Server Error',500) : response($result,200);
    }
    public function saveAccess(){
        $data = $this->request->all();
        $collection = collect($data['users']);
        $ids = $collection->where('is_selected','=',true)->pluck('id');

        $result = Project::find($data['id']);
        $result->users()->sync($ids);
        return empty($result) ? response('Internal Server Error',500) : response($result,200);
    }
}
