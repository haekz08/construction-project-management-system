<?php

namespace App\Http\Controllers;

use App\ItemUnit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ItemUnitController extends Controller
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
            $data = ItemUnit::where('description', 'like', '%'.$this->search.'%')->paginate($this->per_page);
        }else
        {
            $data = ItemUnit::all();
        }
        return response($data);
    }
    public function save(){
        $data = $this->request->all();
        if (isset($data['id']) && $data['id'] != -1) {
            $validate = ItemUnit::where('description',$data['description'])
                                      ->where('id','!=',$data['id'])
                                      ->first();
            if($validate)
                return response('Item unit description already exists.',422);
            $data['updated_by'] = $this->getUserId();
        } else {
            $validate = Validator::make($data, [
                'description' => 'required|unique:item_units',
            ]);
            if ($validate->fails())
                return response('Item unit description already exists.',422);
            $data['created_by'] = $this->getUserId();
            $data['updated_by'] = $this->getUserId();
        }
        $result = ItemUnit::updateOrCreate(['id'=>$data['id']],$data);
        return empty($result) ? response('Internal Server Error',500) : response($result,200);
    }
    public function delete(){
        $data = $this->request->all();
        $result = ItemUnit::find( $data['id'] );
        $result->updated_by = $this->getUserId();
        $result->save();
        $result->delete();
        return empty($result) ? response('Internal Server Error',500) : response('Successfully Deleted Record',200);
    }
    public function get(){
        $data = $this->request->all();
        $result = ItemUnit::find($data['id']);
        return empty($result) ? response('Internal Server Error',500) : response($result,200);
    }
}
