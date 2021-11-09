<?php

namespace App\Http\Controllers;

use App\MaterialLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MaterialLogController extends Controller
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
    public function add($data,$remarks='NA'){
        $last_log = MaterialLog::where('project_location_structure_item_id',$data['project_location_structure_item_id'])->where('material_id',$data['material_id'])->where('price',$data['price'])->orderBy('id', 'desc')->first();
        $last_log_count = (isset($last_log) && !empty($last_log)) ? $last_log->balance : 0;
        $material_log['material_id'] = $data['material_id'];
        $material_log['project_location_structure_item_id'] = $data['project_location_structure_item_id'];
        $material_log['price'] = $data['price'];
        $material_log['reference_id'] = $data['reference_id'];
        $material_log['reference_type_id'] = $data['reference_type_id'];
        $material_log['in'] = $data['qty'];
        $material_log['balance'] = $last_log_count + $data['qty'];
        $material_log['remarks'] = $remarks;
        $material_log['created_by'] = $this->getUserId();
        $material_log['updated_by'] = $this->getUserId();
        MaterialLog::create($material_log);
    }
    public function deduct($data,$remarks='NA'){

        $last_log = MaterialLog::where('project_location_structure_item_id',$data['project_location_structure_item_id'])->where('material_id',$data['material_id'])->where('price',$data['price'])->orderBy('id', 'desc')->first();
        $last_log_count = (isset($last_log) && !empty($last_log)) ? $last_log->balance : 0;
        $material_log['material_id'] = $data['material_id'];
        $material_log['project_location_structure_item_id'] = $data['project_location_structure_item_id'];
        $material_log['price'] = $data['price'];
        $material_log['reference_id'] = $data['reference_id'];
        $material_log['reference_type_id'] = $data['reference_type_id'];
        $material_log['out'] = $data['qty'];
        $material_log['balance'] = $last_log_count - $data['qty'];
        $material_log['remarks'] = $remarks;
        $material_log['created_by'] = $this->getUserId();
        $material_log['updated_by'] = $this->getUserId();
        MaterialLog::create($material_log);
    }
}
