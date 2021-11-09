<?php

namespace App\Http\Controllers;

use App\EquipmentMaintenance;
use App\Maintenance;
use App\ToolMaintenance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class MaintenanceController extends Controller
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
            $data = Maintenance::
                    where('details', 'like', '%'.$this->search.'%')
                    ->orWhere('voucher_number', 'like', '%'.$this->search.'%')
                    ->orWhere('check_number', 'like', '%'.$this->search.'%')
                    ->paginate($this->per_page);
        }else
        {
            $data = Maintenance::all();
        }
        return response($data);
    }
    public function save(){
        $data = $this->request->all();
        if (isset($data['id']) && $data['id'] != -1) {
            $data['updated_by'] = $this->getUserId();
        } else {
            $data['created_by'] = $this->getUserId();
            $data['updated_by'] = $this->getUserId();
        }
        DB::beginTransaction();
        try {
            $maintenance = Maintenance::create($data);
            foreach($data['maintenance_details'] as $row){
                $row['created_by'] = $this->getUserId();
                $row['updated_by'] = $this->getUserId();
                $row['maintenance_id'] = $maintenance['id'];
                if($row['type']==1){
                    EquipmentMaintenance::create($row);
                }else{
                    ToolMaintenance::create($row);
                }
            }
            DB::commit();
            return response('Success',200);
        } catch (\Exception $e) {
            DB::rollback();
            return response($e, 422);
        }
    }
    public function get(){
        $data = $this->request->all();
        $result = Maintenance::with(
            [
                'equipment_maintenances' => function ($query) {
                    $query->with(
                        [
                            'equipment' => function ($query) {
                                $query->with(['equipment_type']);
                            },
                            'project_location_structure_item' => function ($query) {
                                $query->with(
                                    [
                                        'project_location_structure' => function ($query) {
                                            $query->with(
                                                [
                                                    'project_location' => function ($query) {
                                                        $query->with(['project']);
                                                    }
                                                ]
                                            );
                                        }
                                    ]
                                );
                            },
                            'maintenance_description',
                            'manpower'
                        ]);
                },
                'tool_maintenances' => function ($query) {
                    $query->with(
                        [
                            'tool' => function ($query) {
                                $query->with(['tool_type']);
                            },
                            'project_location_structure_item' => function ($query) {
                                $query->with(
                                    [
                                        'project_location_structure' => function ($query) {
                                            $query->with(
                                                [
                                                    'project_location' => function ($query) {
                                                        $query->with(['project']);
                                                    }
                                                ]
                                            );
                                        }
                                    ]
                                );
                            },
                            'maintenance_description',
                            'manpower'
                        ]);
                },
            ])->find($data['id']);
        return empty($result) ? response('Internal Server Error',500) : response($result,200);
    }
}
