<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CrumbController extends Controller
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
    public function generateFromLocation(){
        $data = $this->request->all();
        $project_location_id = $data['id'];
        $result = DB::table('project_locations')
            ->join('projects', 'projects.id', '=', 'project_locations.project_id')
            ->select('projects.id', 'projects.title', 'project_locations.id as project_location_id', 'project_locations.description as location_description')
            ->where('project_locations.id',$project_location_id)
            ->first();
        $result= json_decode( json_encode($result), true);
        return $result;
    }
    public function generateFromStructure(){
        $data = $this->request->all();
        $project_location_structure_id = $data['id'];
        $result = DB::table('project_location_structures')
            ->join('project_locations', 'project_locations.id', '=', 'project_location_structures.project_location_id')
            ->join('projects', 'projects.id', '=', 'project_locations.project_id')
            ->select(
                'projects.id',
                'projects.title',
                'project_locations.id as location_id',
                'project_locations.description as location_description',
                'project_location_structures.id as structure_id',
                'project_location_structures.description as structure_description'
            )
            ->where('project_location_structures.id',$project_location_structure_id)
            ->first();
        $result= json_decode( json_encode($result), true);
        return $result;
    }
    public function generateFromItem(){
        $data = $this->request->all();
        $project_location_structure_item_id = $data['id'];
        $result = DB::table('project_location_structure_items')
            ->join('project_location_structures', 'project_location_structures.id', '=', 'project_location_structure_items.project_location_structure_id')
            ->join('project_locations', 'project_locations.id', '=', 'project_location_structures.project_location_id')
            ->join('projects', 'projects.id', '=', 'project_locations.project_id')
            ->select(
                'projects.id',
                'projects.title',
                'project_locations.id as location_id',
                'project_locations.description as location_description',
                'project_location_structures.id as structure_id',
                'project_location_structures.description as structure_description',
                'project_location_structure_items.id as item_id',
                'project_location_structure_items.description as item_description'
            )
            ->where('project_location_structure_items.id',$project_location_structure_item_id)
            ->first();
        $result= json_decode( json_encode($result), true);
        return $result;
    }
}
