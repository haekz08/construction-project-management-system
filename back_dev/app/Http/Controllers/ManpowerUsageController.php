<?php

namespace App\Http\Controllers;

use App\DailyLog;
use App\ManpowerUsage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ManpowerUsageController extends Controller
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
        DB::beginTransaction();
        try
        {
            $total_labor=0;
            foreach ($data['project_location_structure_item_manpowers'] as $row)
            {
                if(!empty($row['regular_hours']))
                {
                    $check = ManpowerUsage::where('daily_log_id',$data['daily_log_id'])->where('manpower_id',$row['manpower_id'])->first();
                    if($check){
                        DB::rollback();
                        return response('Duplicate record.',422);
                    }
                    $manpower_usage = array();

                    $ot_hours = (isset($row['ot_hours'])) ? $row['ot_hours'] : 0;
                    $manpower_usage['daily_log_id'] = $data['daily_log_id'];
                    $manpower_usage['manpower_id'] = $row['manpower_id'];
                    $manpower_usage['job_description_id'] = $row['job_description_id'];
                    $manpower_usage['daily_rate'] = $row['daily_rate'];
                    $manpower_usage['regular_hours'] = $row['regular_hours'];
                    $manpower_usage['ot_hours'] = $ot_hours;
                    $manpower_usage['total'] = ($row['daily_rate']/8)*($row['regular_hours']+$ot_hours);
                    $manpower_usage['created_by'] = $this->getUserId();
                    $manpower_usage['updated_by'] = $this->getUserId();


                    $total_labor += $manpower_usage['total'];
                        ManpowerUsage::create($manpower_usage);
                }
            }
            $daily_log = DailyLog::find( $data['daily_log_id'] );
            $daily_log->updated_by = $this->getUserId();
            $daily_log->total_labor += $total_labor;
            $daily_log->grand_total += $total_labor;
            $daily_log->save();

            DB::commit();
            return response('Success',200);
        } catch (\Exception $e) {
            DB::rollback();
            return response($e, 422);
        }
    }
    public function delete(){
        DB::beginTransaction();
        try
        {
            $data = $this->request->all();
            $result = ManpowerUsage::find( $data['id'] );
            $result->updated_by = $this->getUserId();
            $result->save();
            $result->delete();

            $daily_log = DailyLog::find( $result['daily_log_id'] );
            $daily_log->updated_by = $this->getUserId();
            $daily_log->total_labor -= $result->total;
            $daily_log->grand_total -= $result->total;
            $daily_log->save();

            DB::commit();
            return response('Success',200);
        } catch (\Exception $e) {
            DB::rollback();
            return response($e, 422);
        }
    }
    public function get(){
        $data = $this->request->all();
        $result = ManpowerUsage::find($data['id']);
        return empty($result) ? response('Internal Server Error',500) : response($result,200);
    }
}
