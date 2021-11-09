<?php

namespace App\Http\Controllers;

use App\DailyLog;
use App\MaterialLog;
use App\Progress;
use App\ProjectLocationStructureItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ProjectLocationStructureItemController extends Controller
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
            $data = ProjectLocationStructureItem::where('title', 'like', '%'.$this->search.'%')->paginate($this->per_page);
        }else
        {
            $data = ProjectLocationStructureItem::all();
        }
        return response($data);
    }
    public function save(){
        $data = $this->request->all();
        $validate = ProjectLocationStructureItem::where('description',$data['description'])
            ->where('project_location_structure_id',$data['project_location_structure_id'])
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
        $result = ProjectLocationStructureItem::updateOrCreate(['id'=>$data['id']],$data);
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
        $result = ProjectLocationStructureItem::find($id);
        $result->updated_by = $this->getUserId();
        $result->save();
        $result->delete();

        $result = DailyLog::where('project_location_structure_item_id',$id)->get();
        $child = new DailyLogController($this->request);
        if(!empty($result)){
            foreach($result as $row){
                $child->deleteChildren($row['id']);
            }
        }

        $progress_result = Progress::where('project_location_structure_item_id',$id)->get();
        $progress_child = new ProgressController($this->request);
        if(!empty($progress_result)){
            foreach($progress_result as $row){
                $progress_child->deleteChildren($row['id']);
            }
        }

    }
    public function get(){
        $data = $this->request->all();
        $details = ProjectLocationStructureItem::
                    with([
                        'labor_estimates' => function ($query) {
                            $query->with(['job_description']);
                        },
                        'equipment_estimates' => function ($query) {
                            $query->with(['equipment_type']);
                        },
                        'material_estimates' => function ($query) {
                            $query->with(['material' => function ($query) {
                                $query->with(['material_unit']);
                            }]);
                        },
                        'project_location_structure_item_manpowers' => function ($query) {
                            $query->with(['manpower','job_description']);
                        },
                        'progresses' => function ($query) {
                            $query->with(['progress_details']);
                        },
                        'daily_logs'
                        ])
                    ->find($data['id']);
        $item_id = $data['id'];
        $query
            = "SELECT material_units.description,materials.name,IFNULL(SUM(material_logs.in),0) - IFNULL(SUM(material_logs.out),0) as balance,
                material_id
                FROM material_logs
                INNER JOIN materials
                ON materials.id = material_logs.material_id
                INNER JOIN material_units
                ON materials.material_unit_id = material_units.id
                WHERE project_location_structure_item_id = $item_id
                GROUP BY material_id";

        $materials = DB::select($query);
        $result = ['details'=>$details,'materials'=>$materials];

        return empty($result) ? response('Internal Server Error',500) : response($result,200);
    }
    public function search(){
        $search_key=$this->search;
        if(isset($search_key) and !empty($search_key))
        {
//            $data = ProjectLocationStructureItem::
//                with(
//                    [
//                        'project_location_structure' => function ($query) {
//                            $query->with(
//                                [
//                                    'project_location' => function ($query) {
//                                        $query->with(
//                                            [
//                                                'project'
//                                            ]
//                                        );
//                                    }
//                                ]
//                            );
//                        }
//                    ])
//                ->where('description', 'like', '%'.$search_key.'%')
//                ->orWhereHas('project_location_structure', function($query) use ($search_key){
//                    $query->where('description', 'like', '%'.$search_key.'%')
//                            ->orWhereHas('project_location', function($query) use ($search_key){
//                                $query->where('description', 'like', '%'.$search_key.'%')
//                                        ->orWhereHas('project', function($query) use ($search_key){
//                                            $query->where('title', 'like', '%'.$search_key.'%');
//                                        });
//                            });
//                })
//                ->get();

            $query
                = "SELECT project_location_structure_items.id,
                project_location_structure_items.description as item_description,
                project_location_structures.description as structure_description,
                project_locations.description as location_description,
                projects.title as project_title
                FROM project_location_structure_items
                INNER JOIN project_location_structures
                ON project_location_structure_items.project_location_structure_id = project_location_structures.id
                INNER JOIN project_locations
                ON project_location_structures.project_location_id = project_locations.id
                INNER JOIN projects
                ON project_locations.project_id = projects.id
                WHERE projects.title LIKE '%$search_key%'
                OR project_locations.description LIKE '%$search_key%'
                OR project_location_structures.description LIKE '%$search_key%'
                OR project_location_structure_items.description LIKE '%$search_key%'";

            $data = DB::select($query);
            return response($data);
        }
    }

    public function logDetailsPerPrice(){
        $data = $this->request->all();
        $material_id = $data['id'];
        $query
            = "SELECT material_units.description,
                materials.name,
                material_logs.price,
                IFNULL(SUM(material_logs.in),0) - IFNULL(SUM(material_logs.out),0) as balance,
                material_id
                FROM material_logs
                INNER JOIN materials
                ON materials.id = material_logs.material_id
                INNER JOIN material_units
                ON materials.material_unit_id = material_units.id
                WHERE material_logs.material_id = $material_id
                GROUP BY material_logs.price";

        $materials = DB::select($query);

        return response($materials);
    }
    public function logDetails(){
        $data = $this->request->all();
        $result = MaterialLog::where('project_location_structure_item_id', $data['id'])->where('material_id',$data['material_id'])->where('price',$data['price'])->orderBy('id', 'desc')->paginate($this->per_page);
        return response($result);
    }
}
