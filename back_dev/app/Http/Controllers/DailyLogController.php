<?php

namespace App\Http\Controllers;

use App\DailyLog;
use App\EquipmentUsage;
use App\ManpowerUsage;
use App\MaterialUsage;
use App\OtherExpenseUsage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class DailyLogController extends Controller
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
        if (isset($data['id']) && $data['id'] != -1) {
            $data['updated_by'] = $this->getUserId();
        } else {
            $data['created_by'] = $this->getUserId();
            $data['updated_by'] = $this->getUserId();
        }
        $result = DailyLog::updateOrCreate(['id'=>$data['id']],$data);
        return empty($result) ? response('Internal Server Error',500) : response($result,200);
    }
    public function delete(){
        $data = $this->request->all();
        DB::beginTransaction();
        try
        {
            $this->deleteChildren($data['id']);
            DB::commit();
            return response('Successfully Deleted Record',200);
        } catch (\Exception $e) {
            DB::rollback();
            return response($e, 422);
        }
    }
    public function deleteChildren($id){
        $result = DailyLog::find( $id );
        $result->updated_by = $this->getUserId();
        $result->save();
        $result->delete();

        ManpowerUsage::where('daily_log_id',$id)->update(['updated_by' => $this->getUserId()]);
        ManpowerUsage::where('daily_log_id', $id )->delete();

        EquipmentUsage::where('daily_log_id',$id)->update(['updated_by' => $this->getUserId()]);
        EquipmentUsage::where('daily_log_id', $id )->delete();

        MaterialUsage::where('daily_log_id',$id)->update(['updated_by' => $this->getUserId()]);
        MaterialUsage::where('daily_log_id', $id )->delete();

        OtherExpenseUsage::where('daily_log_id',$id)->update(['updated_by' => $this->getUserId()]);
        OtherExpenseUsage::where('daily_log_id', $id )->delete();

    }
    public function get(){
        $data = $this->request->all();
        $result = DailyLog::with([
            'manpower_usages' => function ($query) {
                $query->with(['manpower','job_description']);
            },
            'equipment_usages' => function ($query) {
                $query->with(['equipment' => function ($query) {
                    $query->with(['equipment_type']);
                }]);
            },
            'other_expense_usages' => function ($query) {
                $query->with(['other_expense']);
            },
            'material_usages' => function ($query) {
                $query->with(['material']);
            }
        ])->find($data['id']);
        return empty($result) ? response('Internal Server Error',500) : response($result,200);
    }
    public function getByItem(){
        $data = $this->request->all();
        $search_key = $this->search;
        $result = DailyLog::
                where('project_location_structure_item_id',$data['id'])
                ->when(isset($this->search), function($query) use ($search_key){
                    $query->where('transaction_date', 'like', '%'.$search_key.'%');
                })
                ->paginate($this->per_page);
        return empty($result) ? response('Internal Server Error',500) : response($result,200);
    }
}
