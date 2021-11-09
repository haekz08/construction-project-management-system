<?php

namespace App\Http\Controllers;

use App\Material;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class MaterialController extends Controller
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
            $data = Material::where('name', 'like', '%'.$this->search.'%')
                    ->with(['material_unit'])
                    ->paginate($this->per_page);
        }else
        {
            $data = Material::all();
        }
        return response($data);
    }
    public function save(){
        $data = $this->request->all();
        if (isset($data['id']) && $data['id'] != -1) {
            $validate = Material::where('name',$data['name'])
                                      ->where('id','!=',$data['id'])
                                      ->first();
            if($validate)
                return response('Material already exists.',422);
            $data['updated_by'] = $this->getUserId();
        } else {
            $validate = Validator::make($data, [
                'name' => 'required|unique:materials',
            ]);

            if ($validate->fails())
                return response('Material already existsss.',422);
            $data['created_by'] = $this->getUserId();
            $data['updated_by'] = $this->getUserId();
        }
        DB::beginTransaction();
        try {
            Material::updateOrCreate(['id'=>$data['id']],$data);
            DB::commit();
            return response('Success',200);
        } catch (\Exception $e) {
            DB::rollback();
            return response($e, 422);
        }
    }
    public function delete(){
        $data = $this->request->all();
        $result = Material::find( $data['id'] );
        $result->updated_by = $this->getUserId();
        $result->save();
        $result->delete();
        return empty($result) ? response('Internal Server Error',500) : response('Successfully Deleted Record',200);
    }
    public function get(){
        $data = $this->request->all();
        $result = Material::find($data['id']);
        return empty($result) ? response('Internal Server Error',500) : response($result,200);
    }
    public function search(){
        $search_key=$this->search;
        if(isset($search_key) and !empty($search_key))
        {
            $data = Material::with([
                'material_unit'
            ])
                ->where('name', 'like', '%'.$search_key.'%')
                ->get();
            return response($data);
        }
    }

    public function searchPerLocation(){
        $data = $this->request->all();
        $project_location_structure_item_id=$data['project_location_structure_item_id'];
        $search_key=$data['search'];
        if(isset($search_key) and !empty($search_key))
        {

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
                WHERE material_logs.project_location_structure_item_id = $project_location_structure_item_id
                AND materials.name LIKE '%$search_key%'
                GROUP BY material_logs.material_id , material_logs.price";

            $materials = DB::select($query);
            return response($materials);
        }
    }
}
