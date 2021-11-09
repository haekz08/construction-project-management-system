<?php

namespace App\Http\Controllers;

use App\ToolDesignation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class ToolDesignationController extends Controller
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
        if (isset($data['id']) && $data['id'] == -1)
            $data['created_by'] = $this->getUserId();
        $data['updated_by'] = $this->getUserId();

        DB::beginTransaction();
        try {
            ToolDesignation::where('tool_id',$data['tool_id'])->update(['updated_by' => $this->getUserId(),'is_active'=>0]);
            ToolDesignation::create($data);
            DB::commit();
            return response('Success',200);
        } catch (\Exception $e) {
            DB::rollback();
            return response($e, 422);
        }
    }
}
