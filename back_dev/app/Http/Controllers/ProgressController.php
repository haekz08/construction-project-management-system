<?php

namespace App\Http\Controllers;

use App\Progress;
use App\ProgressDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ProgressController extends Controller
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
            $data = JobDescription::where('description', 'like', '%'.$this->search.'%')->paginate($this->per_page);
        }else
        {
            $data = JobDescription::all();
        }
        return response($data);
    }
    public function save(){
        $data = $this->request->all();
        $validate = Progress::where('project_location_structure_item_id',$data['project_location_structure_item_id'])
                              ->whereRaw("DATE_FORMAT(transaction_date, '%Y-%m') = ?", array($data['transaction_date']))
                              ->when($data['id']!=-1, function($query) use ($data){
                                $query->where('id','!=',$data['id']);
                              })
                              ->first();
        if($validate)
            return response('Date already exists.',422);

        $data['updated_by'] = $this->getUserId();

        if (isset($data['id']) && $data['id'] == -1)
            $data['created_by'] = $this->getUserId();

        $result = Progress::updateOrCreate(['id'=>$data['id']],$data);
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

        return empty($result) ? response('Internal Server Error',500) : response('Successfully Deleted Record',200);
    }
    public function deleteChildren($id){
        $result = Progress::find( $id );
        $result->updated_by = $this->getUserId();
        $result->save();
        $result->delete();

        ProgressDetail::where('progress_id',$id)->update(['updated_by' => $this->getUserId()]);
        ProgressDetail::where('progress_id',$id)->delete();
    }
    public function get(){
        $data = $this->request->all();
        $result = Progress::with(['progress_details'])->find($data['id']);
        return empty($result) ? response('Internal Server Error',500) : response($result,200);
    }
}
