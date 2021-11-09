<?php

namespace App\Http\Controllers;

use App\DailyLog;
use App\MaterialUsage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class MaterialUsageController extends Controller
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
        $check = MaterialUsage::where('daily_log_id',$data['daily_log_id'])->where('material_id',$data['material_id'])->first();
        if($check)
            return response('Duplicate record.',422);

        DB::beginTransaction();
        try
        {
            $data['created_by'] = $this->getUserId();
            $data['updated_by'] = $this->getUserId();
            $data['total'] = $data['price'] * $data['qty'];
            $result = MaterialUsage::updateOrCreate(['id'=>$data['id']],$data);

            $daily_log = DailyLog::find( $data['daily_log_id'] );
            $daily_log->updated_by = $this->getUserId();
            $daily_log->total_material += $data['total'];
            $daily_log->grand_total += $data['total'];
            $daily_log->save();

            DB::commit();
            return empty($result) ? response('Internal Server Error',500) : response($result,200);
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
            $result = MaterialUsage::find( $data['id'] );
            $result->updated_by = $this->getUserId();
            $result->save();
            $result->delete();

            $daily_log = DailyLog::find( $result['daily_log_id'] );
            $daily_log->updated_by = $this->getUserId();
            $daily_log->total_material -= $result->total;
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
        $result = MaterialUsage::find($data['id']);
        return empty($result) ? response('Internal Server Error',500) : response($result,200);
    }
}
