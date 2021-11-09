<?php

namespace App\Http\Controllers;

use App\CashAdvance;
use App\CashAdvanceDetail;
use App\Manpower;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ManpowerController extends Controller
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
            $data = Manpower::with(['job_description'])
                ->where('last_name', 'like', '%'.$this->search.'%')
                ->orWhere('first_name', 'like', '%'.$this->search.'%')
                ->paginate($this->per_page);
        }else
        {
            $data = Manpower::all();
        }
        return response($data);
    }
    public function save(){
        $data = $this->request->all();
        if (isset($data['id']) && $data['id'] != -1) {
            $validate = Manpower::where('last_name',$data['last_name'])
                                    ->where('first_name', $data['first_name'])
                                    ->where('id','!=',$data['id'])
                                    ->first();
            if($validate)
                return response('Manpower name already exists.',422);
            $data['updated_by'] = $this->getUserId();
        } else {
            $validate = Manpower::where('last_name',$data['last_name'])
                ->where('first_name', $data['first_name'])
                ->first();
            if($validate)
                return response('Manpower name already exists.',422);
            $data['created_by'] = $this->getUserId();
            $data['updated_by'] = $this->getUserId();
        }
        $result = Manpower::updateOrCreate(['id'=>$data['id']],$data);
        return empty($result) ? response('Internal Server Error',500) : response($result,200);
    }
    public function delete(){
        $data = $this->request->all();
        $result = Manpower::find( $data['id'] );
        $result->updated_by = $this->getUserId();
        $result->save();
        $result->delete();
        return empty($result) ? response('Internal Server Error',500) : response('Successfully Deleted Record',200);
    }
    public function get(){
        $data = $this->request->all();
        $result = Manpower::with(['job_description'])->find($data['id']);
        return empty($result) ? response('Internal Server Error',500) : response($result,200);
    }

    public function getRecords(){
        $data = $this->request->all();

        $cash_advances = DB::table('cash_advance_details')
            ->join('cash_advances', 'cash_advances.id', '=', 'cash_advance_details.cash_advance_id')
            ->select('cash_advances.*', 'cash_advance_details.*')
            ->where('manpower_id',$data['id'])
            ->whereNull('cash_advances.deleted_at')
            ->whereNull('cash_advance_details.deleted_at')
            ->get();

        $payments = DB::table('payroll_details')
            ->join('payrolls', 'payrolls.id', '=', 'payroll_details.payroll_id')
            ->select('payrolls.*', 'payroll_details.*')
            ->where('ca_payment','>',0)
            ->where('manpower_id',$data['id'])
            ->whereNull('payrolls.deleted_at')
            ->whereNull('payroll_details.deleted_at')
            ->get();

        $logs = DB::table('manpower_usages')
            ->join('daily_logs', 'daily_logs.id', '=', 'manpower_usages.daily_log_id')
            ->join('job_descriptions', 'job_descriptions.id', '=', 'manpower_usages.job_description_id')
            ->join('project_location_structure_items', 'project_location_structure_items.id', '=', 'daily_logs.project_location_structure_item_id')
            ->join('project_location_structures', 'project_location_structures.id', '=', 'project_location_structure_items.project_location_structure_id')
            ->join('project_locations', 'project_locations.id', '=', 'project_location_structures.project_location_id')
            ->join('projects', 'projects.id', '=', 'project_locations.project_id')
            ->select('daily_logs.*', 'manpower_usages.*','job_descriptions.description','project_location_structure_items.description as item_description','project_location_structures.description as structure_description','project_locations.description as location_description','projects.description as project_description')
            ->where('manpower_id',$data['id'])
            ->get();
        $result=['cash_advances'=>$cash_advances,'payments'=>$payments,'logs'=>$logs];
        return empty($result) ? response('Internal Server Error',500) : response($result,200);
    }
    public function search(){
        $search_key=$this->search;
        if(isset($search_key) and !empty($search_key))
        {
            $data = Manpower::
            where('last_name', 'like', '%'.$search_key.'%')
                ->orWhere('first_name', 'like', '%'.$search_key.'%')
                ->with('job_description')
                ->get();
            return response($data);
        }
    }
    public function saveCashAdvance(){
        $data = $this->request->all();
        DB::beginTransaction();
        try
        {
            $data['created_by'] = $this->getUserId();
            $data['updated_by'] = $this->getUserId();

            $cash_advance = CashAdvance::create($data);

            foreach($data['cash_advance_details'] as $row){
                $row['cash_advance_id'] = $cash_advance['id'];
                $row['created_by'] = $this->getUserId();
                $row['updated_by'] = $this->getUserId();
                CashAdvanceDetail::create($row);
            }
            DB::commit();
            return response('Success',200);
        } catch (\Exception $e) {
            DB::rollback();
            return response($e, 422);
        }
    }
    public function allCashAdvance(){
        if(isset($this->request->per_page))
        {
            $data = CashAdvance::where('voucher_number', 'like', '%'.$this->search.'%')
                ->orWhere('check_number', 'like', '%'.$this->search.'%')
                ->orWhere('transaction_date', 'like', '%'.$this->search.'%')
                ->orWhereRaw("DATE_FORMAT(transaction_date, '%M %d, %Y') like ?", array('%' . $this->search . '%'))
                ->with(
                    [
                        'cash_advance_details' => function ($query) {
                            $query->with(
                                [
                                    'manpower'
                                ]);
                        },
                    ]
                )
                ->paginate($this->per_page);
        }else
        {
            $data = Manpower::all();
        }
        return response($data);
    }
    public function deleteCashAdvance(){
        $data = $this->request->all();
        $result = CashAdvance::find( $data['id'] );
        $result->updated_by = $this->getUserId();
        $result->save();
        $result->delete();
        return empty($result) ? response('Internal Server Error',500) : response('Successfully Deleted Record',200);
    }
    public function generatePayroll(){
        return $data = $this->request->all();

    }
}
