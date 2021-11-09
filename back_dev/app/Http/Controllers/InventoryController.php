<?php

namespace App\Http\Controllers;

use App\Constants\ReferenceTypes;
use App\MaterialAdjustment;
use App\MaterialAdjustmentDetail;
use App\MaterialDelivery;
use App\MaterialDeliveryDetail;
use App\MaterialIssuance;
use App\MaterialIssuanceDetail;
use App\MaterialPurchase;
use App\MaterialPurchaseDetail;
use App\MaterialReceiving;
use App\MaterialReceivingDetail;
use App\MaterialRequest;
use App\MaterialRequestDetail;
use App\MaterialTransfer;
use App\MaterialTransferDetail;
use App\MaterialWithdrawal;
use App\MaterialWithdrawalDetail;
use App\StartingInventory;
use App\StartingInventoryDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class InventoryController extends Controller
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
    function reset(){
        $data = $this->request->all();
        $data['created_by'] = $this->getUserId();
        $data['updated_by'] = $this->getUserId();
        DB::beginTransaction();
        try
        {
            $result = StartingInventory::where( 'project_location_structure_item_id',$data['project_location_structure_item_id'] )->first();
            if($result)
            {
                $result->updated_by = $this->getUserId();
                $result->save();
                $result->delete();
            }
            $starting_inventory = StartingInventory::updateOrCreate(['id'=>$data['id']],$data);
            foreach($data['starting_inventory_details'] as $row){
                $starting_inventory_detail = $row;
                $starting_inventory_detail['starting_inventory_id'] = $starting_inventory['id'];
                $starting_inventory_detail['created_by'] = $this->getUserId();
                $starting_inventory_detail['updated_by'] = $this->getUserId();
                $starting_inventory = StartingInventoryDetail::updateOrCreate(['id'=>$starting_inventory_detail['id']],$starting_inventory_detail);
            }
            DB::commit();
            return response('Success',200);
        } catch (\Exception $e) {
            DB::rollback();
            return response($e, 422);
        }
    }
    function requestsSave(){
        $data = $this->request->all();
        DB::beginTransaction();
        try
        {
            $data['created_by'] = $this->getUserId();
            $data['updated_by'] = $this->getUserId();

            $material_request = MaterialRequest::create($data);

            foreach($data['material_request_details'] as $row){
                $material_request_details['material_id'] = $row['material_id'];
                $material_request_details['qty'] = $row['qty'];
                $material_request_details['material_request_id'] = $material_request['id'];
                $material_request_details['created_by'] = $this->getUserId();
                $material_request_details['updated_by'] = $this->getUserId();
                MaterialRequestDetail::create($material_request_details);
            }
            DB::commit();
            return response('Success',200);
        } catch (\Exception $e) {
            DB::rollback();
            return response($e, 422);
        }
    }

    public function requestsAll(){
        if(isset($this->request->per_page))
        {
            $data = MaterialRequest::where('reference_number', 'like', '%'.$this->search.'%')
                ->with(
                    [
                        'project_location_structure_item' => function ($query) {
                            $query->with(
                                [
                                    'project_location_structure' => function ($query) {
                                        $query->with(
                                            [
                                                'project_location' => function ($query) {
                                                    $query->with(
                                                        [
                                                            'project'
                                                        ]
                                                    );
                                                }
                                            ]
                                        );
                                    }
                                ]
                            );
                        },
                        'material_request_details' => function ($query) {
                            $query->with(['material']);
                        }
                    ]
                )
                ->paginate($this->per_page);
        }else
        {
            $data = MaterialRequest::all();
        }
        return response($data);
    }

    public function requestsDelete(){
        $data = $this->request->all();
        $result = MaterialRequest::find( $data['id'] );
        $result->updated_by = $this->getUserId();
        $result->save();
        $result->delete();
        return empty($result) ? response('Internal Server Error',500) : response('Successfully Deleted Record',200);
    }
    function purchasesSave(){
        $data = $this->request->all();
        DB::beginTransaction();
        try
        {
            $data['created_by'] = $this->getUserId();
            $data['updated_by'] = $this->getUserId();

            $material_purchase = MaterialPurchase::create($data);

            foreach($data['material_purchase_details'] as $row){
                $material_purchase_detail['material_id'] = $row['material_id'];
                $material_purchase_detail['qty'] = $row['qty'];
                $material_purchase_detail['price'] = $row['price'];
                $material_purchase_detail['total'] = $row['total'];
                $material_purchase_detail['material_purchase_id'] = $material_purchase['id'];
                $material_purchase_detail['created_by'] = $this->getUserId();
                $material_purchase_detail['updated_by'] = $this->getUserId();
                MaterialPurchaseDetail::create($material_purchase_detail);
            }
            DB::commit();
            return response('Success',200);
        } catch (\Exception $e) {
            DB::rollback();
            return response($e, 422);
        }
    }

    public function purchasesAll(){
        if(isset($this->request->per_page))
        {
            $data = MaterialPurchase::where('order_number', 'like', '%'.$this->search.'%')
                ->with(
                    [
                        'project_location_structure_item' => function ($query) {
                            $query->with(
                                [
                                    'project_location_structure' => function ($query) {
                                        $query->with(
                                            [
                                                'project_location' => function ($query) {
                                                    $query->with(
                                                        [
                                                            'project'
                                                        ]
                                                    );
                                                }
                                            ]
                                        );
                                    }
                                ]
                            );
                        },
                        'material_purchase_details' => function ($query) {
                            $query->with(['material']);
                        }
                    ]
                )
                ->paginate($this->per_page);
        }else
        {
            $data = MaterialPurchase::all();
        }
        return response($data);
    }

    public function purchasesDelete(){
        $data = $this->request->all();
        $result = MaterialPurchase::find( $data['id'] );
        $result->updated_by = $this->getUserId();
        $result->save();
        $result->delete();
        return empty($result) ? response('Internal Server Error',500) : response('Successfully Deleted Record',200);
    }

    public function purchasesSearch(){
        $search_key=$this->search;
        if(isset($search_key) and !empty($search_key))
        {
            $data = MaterialPurchase::
                with(
                    [
                        'project_location_structure_item' => function ($query) {
                            $query->with(
                                [
                                    'project_location_structure' => function ($query) {
                                        $query->with(
                                            [
                                                'project_location' => function ($query) {
                                                    $query->with(
                                                        [
                                                            'project'
                                                        ]
                                                    );
                                                }
                                            ]
                                        );
                                    }
                                ]
                            );
                        },
                        'material_purchase_details' => function ($query) {
                            $query->with(['material']);
                        }
                    ]
                )
                ->where('order_number', 'like', '%'.$this->search.'%')
                ->orWhereHas('project_location_structure_item', function($query) use ($search_key){
                    $query->where('description', 'like', '%'.$search_key.'%')
                        ->orWhereHas('project_location_structure', function($query) use ($search_key){
                            $query->where('description', 'like', '%'.$search_key.'%')
                                ->orWhereHas('project_location', function($query) use ($search_key){
                                    $query->where('description', 'like', '%'.$search_key.'%')
                                        ->orWhereHas('project', function($query) use ($search_key){
                                            $query->where('title', 'like', '%'.$search_key.'%');
                                        });
                                });
                        });
                })
                ->get();
            return response($data);
        }
    }

    function deliveriesSave(){
        $data = $this->request->all();
        DB::beginTransaction();
        try
        {


            $data['created_by'] = $this->getUserId();
            $data['updated_by'] = $this->getUserId();

            $material_delivery = MaterialDelivery::create($data);

            foreach($data['material_delivery_details'] as $row){
                $material_delivery_detail['material_id'] = $row['material_id'];
                $material_delivery_detail['qty'] = $row['qty'];
                $material_delivery_detail['price'] = $row['price'];
                $material_delivery_detail['total'] = $row['total'];
                $material_delivery_detail['material_delivery_id'] = $material_delivery['id'];
                $material_delivery_detail['created_by'] = $this->getUserId();
                $material_delivery_detail['updated_by'] = $this->getUserId();
                MaterialDeliveryDetail::create($material_delivery_detail);

                $row['project_location_structure_item_id'] = $data['project_location_structure_item_id'];
                $row['reference_id'] = ReferenceTypes::MATERIAL_DELIVERY;
                $row['reference_type_id'] = $material_delivery->id;
                $logs = new MaterialLogController($this->request);
                $logs->add($row,'Delivery');
            }
            DB::commit();
            return response('Success',200);
        } catch (\Exception $e) {
            DB::rollback();
            return response($e, 422);
        }
    }

    public function deliveriesAll(){
        if(isset($this->request->per_page))
        {
            $data = MaterialDelivery::where('delivery_number', 'like', '%'.$this->search.'%')
                ->with(
                    [
                        'project_location_structure_item' => function ($query) {
                            $query->with(
                                [
                                    'project_location_structure' => function ($query) {
                                        $query->with(
                                            [
                                                'project_location' => function ($query) {
                                                    $query->with(
                                                        [
                                                            'project'
                                                        ]
                                                    );
                                                }
                                            ]
                                        );
                                    }
                                ]
                            );
                        },
                        'material_delivery_details' => function ($query) {
                            $query->with(['material']);
                        },
                        'material_purchase' => function ($query) {
                            $query->with(['project_location_structure_item']);
                        },

                    ]
                )
                ->paginate($this->per_page);
        }else
        {
            $data = MaterialDelivery::all();
        }
        return response($data);
    }

    public function deliveriesDelete(){
        $data = $this->request->all();
        $result = MaterialDelivery::find( $data['id'] );
        $result->updated_by = $this->getUserId();
        $result->save();
        $result->delete();
        return empty($result) ? response('Internal Server Error',500) : response('Successfully Deleted Record',200);
    }

    public function deliveriesSearch(){
        $search_key=$this->search;
        if(isset($search_key) and !empty($search_key))
        {
            $data = MaterialDelivery::
            with(
                [
                    'starting_inventory' => function ($query) {
                        $query->with(
                            [
                                'project_location_structure_item' => function ($query) {
                                    $query->with(
                                        [
                                            'project_location_structure' => function ($query) {
                                                $query->with(
                                                    [
                                                        'project_location' => function ($query) {
                                                            $query->with(
                                                                [
                                                                    'project'
                                                                ]
                                                            );
                                                        }
                                                    ]
                                                );
                                            }
                                        ]
                                    );
                                }
                            ]);
                    },
                    'material_delivery_details' => function ($query) {
                        $query->with(['material']);
                    },
                    'material_purchase' => function ($query) {
                        $query->with(['starting_inventory']);
                    },
                ]
            )
                ->where('delivery_number', 'like', '%'.$this->search.'%')
                ->orWhereHas('starting_inventory', function($query) use ($search_key){
                    $query->whereHas('project_location_structure_item', function($query) use ($search_key){
                        $query->where('description', 'like', '%'.$search_key.'%')
                            ->orWhereHas('project_location_structure', function($query) use ($search_key){
                                $query->where('description', 'like', '%'.$search_key.'%')
                                    ->orWhereHas('project_location', function($query) use ($search_key){
                                        $query->where('description', 'like', '%'.$search_key.'%')
                                            ->orWhereHas('project', function($query) use ($search_key){
                                                $query->where('title', 'like', '%'.$search_key.'%');
                                            });
                                    });
                            });
                    });
                })
                ->get();
            return response($data);
        }
    }

    function receivingsSave(){
        $data = $this->request->all();
        DB::beginTransaction();
        try
        {
            $starting_inventory = StartingInventory::where('project_location_structure_item_id',$data['material_delivery']['material_purchase']['starting_inventory']['project_location_structure_item_id'])->first();

            $data['created_by'] = $this->getUserId();
            $data['updated_by'] = $this->getUserId();
            $data['starting_inventory_id'] = $starting_inventory['id'];

            $material_receiving = MaterialReceiving::create($data);

            foreach($data['material_receiving_details'] as $row){
                $material_receiving_detail['material_id'] = $row['material_id'];
                $material_receiving_detail['qty_received'] = $row['qty_received'];
                $material_receiving_detail['qty_rejected'] = $row['qty_rejected'];
                $material_receiving_detail['price'] = $row['price'];
                $material_receiving_detail['total_received'] = $row['total_received'];
                $material_receiving_detail['total_rejected'] = $row['total_rejected'];
                $material_receiving_detail['material_receiving_id'] = $material_receiving['id'];
                $material_receiving_detail['created_by'] = $this->getUserId();
                $material_receiving_detail['updated_by'] = $this->getUserId();
                MaterialReceivingDetail::create($material_receiving_detail);
            }
            DB::commit();
            return response('Success',200);
        } catch (\Exception $e) {
            DB::rollback();
            return response($e, 422);
        }
    }

    public function receivingsAll(){
        if(isset($this->request->per_page))
        {
            $data = MaterialReceiving::where('reference_number', 'like', '%'.$this->search.'%')
                ->with(
                    [
                        'project_location_structure_item' => function ($query) {
                            $query->with(
                                [
                                    'project_location_structure' => function ($query) {
                                        $query->with(
                                            [
                                                'project_location' => function ($query) {
                                                    $query->with(
                                                        [
                                                            'project'
                                                        ]
                                                    );
                                                }
                                            ]
                                        );
                                    }
                                ]
                            );
                        },
                        'material_receiving_details' => function ($query) {
                            $query->with(['material']);
                        },
                        'material_delivery'
                    ]
                )
                ->paginate($this->per_page);
        }else
        {
            $data = MaterialDelivery::all();
        }
        return response($data);
    }

    public function receivingsDelete(){
        $data = $this->request->all();
        $result = MaterialReceiving::find( $data['id'] );
        $result->updated_by = $this->getUserId();
        $result->save();
        $result->delete();
        return empty($result) ? response('Internal Server Error',500) : response('Successfully Deleted Record',200);
    }


    function transfersSave(){
        $data = $this->request->all();
        DB::beginTransaction();
        try
        {
            $data['created_by'] = $this->getUserId();
            $data['updated_by'] = $this->getUserId();
            $data['from'] = $data['project_location_structure_item_from_id'];
            $data['to'] = $data['project_location_structure_item_to_id'];

            $material_transfer = MaterialTransfer::create($data);

            foreach($data['material_transfer_details'] as $row){
                $material_transfer_detail['material_id'] = $row['material_id'];
                $material_transfer_detail['qty'] = $row['qty'];
                $material_transfer_detail['price'] = $row['price'];
                $material_transfer_detail['total'] = $row['total'];
                $material_transfer_detail['material_transfer_id'] = $material_transfer['id'];
                $material_transfer_detail['created_by'] = $this->getUserId();
                $material_transfer_detail['updated_by'] = $this->getUserId();
                MaterialTransferDetail::create($material_transfer_detail);

                $logs = new MaterialLogController($this->request);


                $row['reference_id'] = ReferenceTypes::MATERIAL_TRANSFER;
                $row['reference_type_id'] = $material_transfer->id;

                $row['project_location_structure_item_id'] = $data['project_location_structure_item_from_id'];
                $logs->deduct($row,'Transfer of Materials (FROM this PROJECT)');

                $row['project_location_structure_item_id'] = $data['project_location_structure_item_to_id'];
                $logs->add($row,'Transfer of Materials (TO this PROJECT)');
            }
            DB::commit();
            return response('Success',200);
        } catch (\Exception $e) {
            DB::rollback();
            return response($e, 422);
        }
    }

    public function transfersAll(){
        if(isset($this->request->per_page))
        {
            $data = MaterialTransfer::where('remarks', 'like', '%'.$this->search.'%')
                ->with(
                    [
                        'project_location_structure_item_from' => function ($query) {
                            $query->with(
                                [
                                    'project_location_structure' => function ($query) {
                                        $query->with(
                                            [
                                                'project_location' => function ($query) {
                                                    $query->with(
                                                        [
                                                            'project'
                                                        ]
                                                    );
                                                }
                                            ]
                                        );
                                    },
                                ]
                            );
                        },
                        'project_location_structure_item_to' => function ($query) {
                            $query->with(
                                [
                                    'project_location_structure' => function ($query) {
                                        $query->with(
                                            [
                                                'project_location' => function ($query) {
                                                    $query->with(
                                                        [
                                                            'project'
                                                        ]
                                                    );
                                                }
                                            ]
                                        );
                                    },
                                ]
                            );
                        },
                        'material_transfer_details' => function ($query) {
                            $query->with(['material']);
                        }
                    ]
                )
                ->paginate($this->per_page);
        }else
        {
            $data = MaterialTransfer::all();
        }
        return response($data);
    }

    public function transfersDelete(){
        $data = $this->request->all();
        $result = MaterialTransfer::find( $data['id'] );
        $result->updated_by = $this->getUserId();
        $result->save();
        $result->delete();
        return empty($result) ? response('Internal Server Error',500) : response('Successfully Deleted Record',200);
    }

    function insertStartingInventory($project_location_structure_item_id){
        $data = array(
            'project_location_structure_item_id'=>$project_location_structure_item_id,
            'remarks'=>'SYSTEM GENERATED',
            'created_by'=>$this->getUserId(),
            'updated_by'=>$this->getUserId()
        );
        return $result = StartingInventory::create($data);
    }
    function withdrawalsSave(){
        $data = $this->request->all();
        DB::beginTransaction();
        try
        {
            $data['created_by'] = $this->getUserId();
            $data['updated_by'] = $this->getUserId();
            $material_withdrawal = MaterialWithdrawal::create($data);

            foreach($data['material_withdrawal_details'] as $row){
                $row['material_withdrawal_id'] = $material_withdrawal->id;
                $row['created_by'] = $this->getUserId();
                $row['updated_by'] = $this->getUserId();
                $material_withdrawal_details = MaterialWithdrawalDetail::create($row);


                $logs = new MaterialLogController($this->request);
                $row['reference_id'] = ReferenceTypes::MATERIAL_WITHDRAWAL;
                $row['reference_type_id'] = $material_withdrawal->id;
                $row['project_location_structure_item_id'] = $data['project_location_structure_item_id'];
                $logs->deduct($row,'Material Withdrawal');
            }


            DB::commit();
            return response('Success',200);
        } catch (\Exception $e) {
            DB::rollback();
            return response($e, 422);
        }
    }
    public function withdrawalsAll(){
        if(isset($this->request->per_page))
        {
            $data = MaterialWithdrawal::where('reference_number', 'like', '%'.$this->search.'%')
                ->with(
                    [
                        'project_location_structure_item' => function ($query) {
                            $query->with(
                                [
                                    'project_location_structure' => function ($query) {
                                        $query->with(
                                            [
                                                'project_location' => function ($query) {
                                                    $query->with(
                                                        [
                                                            'project'
                                                        ]
                                                    );
                                                }
                                            ]
                                        );
                                    },
                                ]
                            );
                        },
                        'material_withdrawal_details' => function ($query) {
                            $query->with(['material']);
                        }
                    ]
                )
                ->paginate($this->per_page);

        }else
        {
            $data = MaterialWithdrawal::all();
        }
        return response($data);
    }
    function issuancesSave(){
        $data = $this->request->all();
        DB::beginTransaction();
        try
        {
            $data['created_by'] = $this->getUserId();
            $data['updated_by'] = $this->getUserId();
            $material_issuance = MaterialIssuance::create($data);

            foreach($data['material_issuance_details'] as $row){
                $row['material_issuance_id'] = $material_issuance->id;
                $row['created_by'] = $this->getUserId();
                $row['updated_by'] = $this->getUserId();
                $material_issuance_details = MaterialIssuanceDetail::create($row);

                $logs = new MaterialLogController($this->request);

                $row['reference_id'] = ReferenceTypes::MATERIAL_ISSUANCE;
                $row['reference_type_id'] = $material_issuance->id;
                $row['project_location_structure_item_id'] = $data['project_location_structure_item_id'];
                $logs->deduct($row,'Material Issuance');
            }

            DB::commit();
            return response('Success',200);
        } catch (\Exception $e) {
            DB::rollback();
            return response($e, 422);
        }
    }
    public function issuancesAll(){
        if(isset($this->request->per_page))
        {
            $data = MaterialIssuance::where('reference_number', 'like', '%'.$this->search.'%')
                ->with(
                    [
                        'project_location_structure_item' => function ($query) {
                            $query->with(
                                [
                                    'project_location_structure' => function ($query) {
                                        $query->with(
                                            [
                                                'project_location' => function ($query) {
                                                    $query->with(
                                                        [
                                                            'project'
                                                        ]
                                                    );
                                                }
                                            ]
                                        );
                                    },
                                ]
                            );
                        },
                        'material_issuance_details' => function ($query) {
                            $query->with(['material']);
                        }
                    ]
                )
                ->paginate($this->per_page);

        }else
        {
            $data = MaterialIssuance::all();
        }
        return response($data);
    }
    public function issuancesDelete(){
        $data = $this->request->all();
        $result = MaterialIssuance::find( $data['id'] );
        $result->updated_by = $this->getUserId();
        $result->save();
        $result->delete();
        return empty($result) ? response('Internal Server Error',500) : response('Successfully Deleted Record',200);
    }
    function adjustmentsSave(){
        $data = $this->request->all();
        DB::beginTransaction();
        try
        {
            $data['created_by'] = $this->getUserId();
            $data['updated_by'] = $this->getUserId();
            $material_adjustment = MaterialAdjustment::create($data);

            foreach($data['material_adjustment_details'] as $row){
                $row['material_adjustment_id'] = $material_adjustment->id;
                $row['created_by'] = $this->getUserId();
                $row['updated_by'] = $this->getUserId();
                $material_adjustment_details = MaterialAdjustmentDetail::create($row);

                $logs = new MaterialLogController($this->request);

                $row['reference_id'] = ReferenceTypes::MATERIAL_ADJUSTMENT;
                $row['reference_type_id'] = $material_adjustment->id;
                $row['project_location_structure_item_id'] = $data['project_location_structure_item_id'];
                $row['qty'] = abs($row['adjustment']);
                if($row['adjustment']>0)
                    $logs->add($row,'Inventory Adjustment');
                else
                    $logs->deduct($row,'Inventory Adjustment');
            }
            DB::commit();
            return response('Success',200);
        } catch (\Exception $e) {
            DB::rollback();
            return response($e, 422);
        }
    }
    public function adjustmentsAll(){
        if(isset($this->request->per_page))
        {
            $data = MaterialAdjustment::where('reference_number', 'like', '%'.$this->search.'%')
                ->with(
                    [
                        'project_location_structure_item' => function ($query) {
                            $query->with(
                                [
                                    'project_location_structure' => function ($query) {
                                        $query->with(
                                            [
                                                'project_location' => function ($query) {
                                                    $query->with(
                                                        [
                                                            'project'
                                                        ]
                                                    );
                                                }
                                            ]
                                        );
                                    },
                                ]
                            );
                        },
                        'material_adjustment_details' => function ($query) {
                            $query->with(['material']);
                        }
                    ]
                )
                ->paginate($this->per_page);

        }else
        {
            $data = MaterialAdjustment::all();
        }
        return response($data);
    }
}
