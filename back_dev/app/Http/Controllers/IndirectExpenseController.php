<?php

namespace App\Http\Controllers;

use App\IndirectExpense;
use App\IndirectOtherExpenseUsage;
use App\ToolType;
use App\Tool;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class IndirectExpenseController extends Controller
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

        $data = $this->request->all();
        if(isset($this->request->per_page))
        {
            //$data = ToolType::with(['tools'])->where('description', 'like', '%'.$this->search.'%')->paginate($this->per_page);
            $data = IndirectExpense::with(
                [
                    'indirect_other_expense_usages' => function ($query) {
                        $query->with(
                            [
                                'other_expense'
                            ]);
                    },
                ])
                ->where('project_id',$data['project_id'])
                ->paginate($this->per_page);
        }else
        {
            $data = IndirectExpense::all();
        }
        return response($data);
    }
    public function save(){
        $data = $this->request->all();

        DB::beginTransaction();
        try {
            $data['created_by'] = $this->getUserId();
            $data['updated_by'] = $this->getUserId();
            $indirect_expense = IndirectExpense::create($data);
            if(!empty($data['indirect_other_expense_usages']))
            {
                foreach($data['indirect_other_expense_usages'] as $row){
                    $row['created_by'] = $this->getUserId();
                    $row['updated_by'] = $this->getUserId();
                    $row['indirect_expense_id'] = $indirect_expense['id'];
                    IndirectOtherExpenseUsage::create($row);
                }
            }
            DB::commit();
            return response('Success',200);
        } catch (\Exception $e) {
            DB::rollback();
            return response($e, 422);
        }
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
        $result = IndirectExpense::find( $id );
        $result->updated_by = $this->getUserId();
        $result->save();
        $result->delete();

        IndirectOtherExpenseUsage::where('indirect_expense_id',$id)->update(['updated_by' => $this->getUserId()]);
        IndirectOtherExpenseUsage::where('indirect_expense_id', $id )->delete();

    }
}
