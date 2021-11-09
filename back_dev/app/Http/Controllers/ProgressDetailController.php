<?php

namespace App\Http\Controllers;

use App\Progress;
use App\ProgressDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class ProgressDetailController extends Controller
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
            $data = ProgressDetailController::where('description', 'like', '%'.$this->search.'%')->paginate($this->per_page);
        }else
        {
            $data = ProgressDetailController::all();
        }
        return response($data);
    }
    public function save(){
        $data = $this->request->all();
        $validate = ProgressDetail::where('progress_id',$data['progress_id'])
                              ->where('transaction_date',$data['transaction_date'])
                              ->first();
        if($validate)
            return response('Date already exists.',422);

        $date = date("Y-m", strtotime($data['transaction_date']));

        $date_range = Progress::where('id',$data['progress_id'])
            ->whereRaw("DATE_FORMAT(transaction_date, '%Y-%m') = ?", array($date))
            ->first();

        Log::debug($date_range);
        if(!$date_range)
            return response('Date error.',422);


        $data['updated_by'] = $this->getUserId();

        if (isset($data['id']) && $data['id'] == -1)
            $data['created_by'] = $this->getUserId();

        $result = ProgressDetail::create($data);
        return empty($result) ? response('Internal Server Error',500) : response($result,200);
    }
    public function delete(){
        $data = $this->request->all();
        $result = ProgressDetail::find( $data['id'] );
        $result->updated_by = $this->getUserId();
        $result->save();
        $result->delete();
        return empty($result) ? response('Internal Server Error',500) : response('Successfully Deleted Record',200);
    }
    public function get(){
        $data = $this->request->all();
        $result = ProgressDetailController::find($data['id']);
        return empty($result) ? response('Internal Server Error',500) : response($result,200);
    }
}
