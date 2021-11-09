<?php

namespace App\Http\Controllers;

use App\ProgressDetail;
use App\ProjectLocation;
use App\ProjectLocationStructure;
use App\ProjectLocationStructureItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ReportController extends Controller
{
    protected $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }
    public function progress(){
        $data = $this->request->all();
        $result = ProjectLocationStructureItem::
            with([
                'labor_estimates' => function ($query) {
                    $query->with(['job_description']);
                },
                'equipment_estimates' => function ($query) {
                    $query->with(['equipment_type']);
                },
                'material_estimates' => function ($query) {
                    $query->with(['material' => function ($query) {
                        $query->with(['material_unit']);
                    }]);
                },
                'project_location_structure_item_manpowers' => function ($query) {
                    $query->with(['manpower','job_description']);
                },
                'progresses' => function ($query) {
                    $query->with(['progress_details']);
                },
                'daily_logs'
            ])
            ->find($data['id']);

        $progress = ProgressDetail::whereHas('progress', function ($query) use($data) {
            $query->where('project_location_structure_item_id', $data['id']);
        })->get();

        $cost_prev_equipment = collect($result->daily_logs)->where('transaction_date.default','<',$data['from'])->sum('total_equipment');
        $cost_prev_material = collect($result->daily_logs)->where('transaction_date.default','<',$data['from'])->sum('total_material');
        $cost_prev_labor = collect($result->daily_logs)->where('transaction_date.default','<',$data['from'])->sum('total_labor');

        $cost_current_equipment = collect($result->daily_logs)->whereBetween('transaction_date.default',[$data['from'],$data['to']])->sum('total_equipment');
        $cost_current_material = collect($result->daily_logs)->whereBetween('transaction_date.default',[$data['from'],$data['to']])->sum('total_material');
        $cost_current_labor = collect($result->daily_logs)->whereBetween('transaction_date.default',[$data['from'],$data['to']])->sum('total_labor');

        $prev = array(
            'equipment' => $cost_prev_equipment,
            'material' => $cost_prev_material,
            'labor' => $cost_prev_labor
        );
        $current = array(
            'equipment' => $cost_current_equipment,
            'material' => $cost_current_material,
            'labor' => $cost_current_labor
        );
        $total = array(
            'equipment' => $cost_prev_equipment + $cost_current_equipment,
            'material' => $cost_prev_material + $cost_current_material,
            'labor' => $cost_prev_labor + $cost_current_labor
        );
        $completion = array(
            'equipment' => $result->equipment_est['default'] - ($cost_prev_equipment + $cost_current_equipment),
            'material' => $result->material_est['default'] - ($cost_prev_material + $cost_current_material),
            'labor' => $result->labor_est['default'] - ($cost_prev_labor + $cost_current_labor)
        );
        $forecast = array(
            'equipment' => ($result->equipment_est['default'] - ($cost_prev_equipment + $cost_current_equipment)) + ($cost_prev_equipment + $cost_current_equipment),
            'material' => ($result->material_est['default'] - ($cost_prev_material + $cost_current_material)) + ($cost_prev_material + $cost_current_material),
            'labor' => ($result->labor_est['default'] - ($cost_prev_labor + $cost_current_labor)) + ($cost_prev_labor + $cost_current_labor)
        );
        $variance = array(
            'equipment' => $result->equipment_est['default'] - $forecast['equipment'],
            'material' => $result->material_est['default'] - $forecast['material'],
            'labor' => $result->labor_est['default'] - $forecast['labor']
        );
        $cost=array(
            'prev' => $prev,
            'current' => $current,
            'total' => $total,
            'completion' => $completion,
            'forecast' =>$forecast,
            'variance' =>$variance
        );
        $progress_estimate_before = collect($result->progresses)->where('transaction_date.default','<',$data['from'])->sum('qty');
        $progress_actual_before = collect($progress)->where('transaction_date.default','<',$data['from'])->sum('qty');

        $progress_estimate_current = collect($result->progresses)->whereBetween('transaction_date.default',[$data['from'],$data['to']])->sum('qty');
        $progress_actual_current = collect($progress)->whereBetween('transaction_date.default',[$data['from'],$data['to']])->sum('qty');

        $unit_price = $result->grand_total_est['default'] / $result->qty;

        $progress=array(
            'prev' => array(
                'estimate'=>$progress_estimate_before,
                'actual' =>$progress_actual_before,
                'variance'=>$progress_estimate_before - $progress_actual_before,
            ),
            'current' => array(
                'estimate'=>$progress_estimate_current,
                'actual' =>$progress_actual_current,
                'variance' => $progress_estimate_current - $progress_actual_current
            ),
            'total' => array(
                'estimate'=>$progress_estimate_before+$progress_estimate_current,
                'actual' =>$progress_actual_before+$progress_actual_current,
                'variance' => ($progress_estimate_before - $progress_actual_before) + ($progress_estimate_current - $progress_actual_current)
            ),
            'percentage' => array(
                'prev' => array(
                    'estimate'=>($progress_estimate_before/$result->qty) * 100,
                    'actual' =>($progress_actual_before/$result->qty) * 100,
                    'variance'=>(($progress_estimate_before - $progress_actual_before)/100) * 100,
                ),

                'current' => array(
                    'estimate'=>($progress_estimate_current/$result->qty) * 100,
                    'actual' =>($progress_actual_current/$result->qty) * 100,
                    'variance'=>(($progress_estimate_current - $progress_actual_current)/100) * 100,
                ),
                'total' => array(
                    'estimate'=>(($progress_estimate_before/$result->qty) * 100)+(($progress_estimate_current/$result->qty) * 100),
                    'actual' =>(($progress_actual_before/$result->qty) * 100)+(($progress_actual_current/$result->qty) * 100),
                    'variance' => ((($progress_estimate_before - $progress_actual_before)/100) * 100) + ((($progress_estimate_current - $progress_actual_current)/100) * 100)
                )
            ),
            'cost' => array(
                'prev' => array(
                    'estimate'=>($progress_estimate_before*$unit_price),
                    'actual' =>($progress_actual_before*$unit_price),
                    'variance'=>(($progress_estimate_before - $progress_actual_before)*$unit_price),
                ),

                'current' => array(
                    'estimate'=>($progress_estimate_current*$unit_price),
                    'actual' =>($progress_actual_current*$unit_price),
                    'variance'=>(($progress_estimate_current - $progress_actual_current)*$unit_price),
                ),
                'total' => array(
                    'estimate'=>($progress_estimate_before*$unit_price)+($progress_estimate_current*$unit_price),
                    'actual' =>($progress_actual_before*$unit_price)+($progress_actual_current*$unit_price),
                    'variance' => (($progress_estimate_before - $progress_actual_before)*$unit_price) + (($progress_estimate_current - $progress_actual_current)*$unit_price)
                )
            )
        );
        $result=array(
            'details' => $result,
            'cost' => $cost,
            'progress' => $progress
        );

        return empty($result) ? response('Internal Server Error',500) : response($result,200);
    }
    public function billOfMaterials(){
        $data = $this->request->all();
        $result = ProjectLocationStructureItem::
        with([
            'material_estimates' => function ($query) {
                $query->with(['material' => function ($query) {
                    $query->with(['material_unit']);
                }]);
            },
            'equipment_estimates' => function ($query) {
                $query->with(['equipment_type']);
            },
            'labor_estimates' => function ($query) {
                $query->with(['job_description']);
            },
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
            'item_unit'
        ])
            ->find($data['id']);

        return empty($result) ? response('Internal Server Error',500) : response($result,200);
    }
    public function inventory(){
        $data = $this->request->all();
        $project_location_structure_item_id=$data['id'];
        $from=$data['from'];
        $to=$data['to'];
        $details = ProjectLocationStructureItem::
        with([
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
        ])
            ->find($data['id']);
        $materials
            = "SELECT material_estimates.qty,material_estimates.price,material_estimates.material_id, materials.name, material_units.description
                FROM material_estimates
INNER JOIN materials
ON materials.id = material_estimates.material_id
INNER JOIN material_units
ON material_units.id = materials.material_unit_id
                WHERE project_location_structure_item_id='$project_location_structure_item_id'";
        $materials = DB::select($materials);

        $requested = "SELECT SUM(qty) as requested_qty, material_id
                FROM material_request_details
                INNER JOIN material_requests
                ON material_requests.id=material_request_details.material_request_id
                WHERE material_requests.transaction_date BETWEEN '$from' AND '$to'
                AND material_requests.deleted_at IS NULL
				AND material_requests.project_location_structure_item_id='$project_location_structure_item_id'
                GROUP BY material_request_details.material_id ";
        $requested = DB::select($requested);

        $purchased = "SELECT SUM(qty) as purchased_qty, material_id
                FROM material_purchase_details
                INNER JOIN material_purchases
                ON material_purchases.id=material_purchase_details.material_purchase_id
                WHERE material_purchases.transaction_date BETWEEN '$from' AND '$to'
                AND material_purchases.deleted_at IS NULL
				AND material_purchases.project_location_structure_item_id='$project_location_structure_item_id'
                GROUP BY material_purchase_details.material_id ";
        $purchased = DB::select($purchased);

        $delivered = "SELECT SUM(qty) as delivered_qty,material_id
                FROM (SELECT SUM(qty) as qty, material_id
                FROM material_delivery_details
                INNER JOIN material_deliveries
                ON material_deliveries.id=material_delivery_details.material_delivery_id
                WHERE material_deliveries.transaction_date BETWEEN '$from' AND '$to'
                AND material_deliveries.deleted_at IS NULL
				AND material_deliveries.project_location_structure_item_id='$project_location_structure_item_id'
                GROUP BY material_delivery_details.material_id 
                UNION ALL
                SELECT SUM(qty) as qty, material_id
                FROM material_transfer_details
                INNER JOIN material_transfers
                ON material_transfers.id=material_transfer_details.material_transfer_id
                WHERE material_transfers.transaction_date BETWEEN '$from' AND '$to'
                AND material_transfers.deleted_at IS NULL
				AND material_transfers.from='$project_location_structure_item_id'
                GROUP BY material_transfer_details.material_id) table1
                GROUP BY table1.material_id";

        $delivered = DB::select($delivered);

        $withdrawn = "SELECT SUM(qty) as withdrawn_qty, material_id
                FROM material_withdrawal_details
                INNER JOIN material_withdrawals
                ON material_withdrawals.id=material_withdrawal_details.material_withdrawal_id
                WHERE material_withdrawals.transaction_date BETWEEN '$from' AND '$to'
                AND material_withdrawals.deleted_at IS NULL
				AND material_withdrawals.project_location_structure_item_id='$project_location_structure_item_id'
                GROUP BY material_withdrawal_details.material_id ";

        $withdrawn = DB::select($withdrawn);

        $issued = "SELECT SUM(qty) as issued_qty, material_id
                FROM material_issuance_details
                INNER JOIN material_issuances
                ON material_issuances.id=material_issuance_details.material_issuance_id
                WHERE material_issuances.transaction_date BETWEEN '$from' AND '$to'
                AND material_issuances.deleted_at IS NULL
				AND material_issuances.project_location_structure_item_id='$project_location_structure_item_id'
                GROUP BY material_issuance_details.material_id ";

        $issued = DB::select($issued);


        $requested_array = json_decode(json_encode($requested), true);
        $purchased_array = json_decode(json_encode($purchased), true);
        $delivered_array = json_decode(json_encode($delivered), true);
        $withdrawn_array = json_decode(json_encode($withdrawn), true);
        $issued_array = json_decode(json_encode($issued), true);
foreach ($materials as $material){
    $requested = collect($requested_array)->where('material_id',$material->material_id)->first();
    $purchased = collect($purchased_array)->where('material_id',$material->material_id)->first();
    $delivered = collect($delivered_array)->where('material_id',$material->material_id)->first();
    $withdrawn = collect($withdrawn_array)->where('material_id',$material->material_id)->first();
    $issued = collect($issued_array)->where('material_id',$material->material_id)->first();

    $material->requested_qty = (isset($requested['requested_qty'])) ? $requested['requested_qty'] : 0;
    $material->purchased_qty = (isset($purchased['purchased_qty'])) ? $purchased['purchased_qty'] : 0;
    $material->delivered_qty = (isset($delivered['delivered_qty'])) ? $delivered['delivered_qty'] : 0;
    $material->withdrawn_qty = (isset($withdrawn['withdrawn_qty'])) ? $withdrawn['withdrawn_qty'] : 0;
    $material->issued_qty = (isset($issued['issued_qty'])) ? $issued['issued_qty'] : 0;
//    if($new)
//        $material->asdasd=$new->requested_qty;
    //$requested = collect($requested)->where('material_id',$material->material_id);

}
        Log::debug($materials);

        $result = ['details'=>$details,'materials'=>$materials];
        return empty($result) ? response('Internal Server Error',500) : response($result,200);
    }
    public function workAccomplishmentPerStructure()
    {
        $data = $this->request->all();
        $id = $data['id'];

        $group_by_column = 'project_location_structures.project_location_id,project_location_structures.id';
        $where_column = "project_locations.id='$id'";
        $structured_query = $this->workAccomplishment($group_by_column,$where_column);
        $before_date = $structured_query['before_date'];
        $on_date = $structured_query['on_date'];
        $all = $structured_query['all'];
        $sql = "SELECT project_location_structures.id as structure_id,
				IFNULL(all_date.total_qty,0) as total_qty_all,
				IFNULL(before_date.total_qty,0) as total_qty_before_date,
				IFNULL(on_date.total_qty,0) as total_qty_on_date
				FROM project_location_structures
				LEFT JOIN ($before_date) as before_date
				ON before_date.id=project_location_structures.id
				LEFT JOIN ($on_date) as on_date
				ON on_date.id=project_location_structures.id
				LEFT JOIN ($all) as all_date
				ON all_date.id=project_location_structures.id
				WHERE project_location_structures.project_location_id='$id'";
        $query = DB::select($sql);
        $progress = collect($query);

        $location = ProjectLocation::with(
            [
                'project_location_structures' ])->find($id);
        $location = $location->toArray();
        foreach($location['project_location_structures'] as $key=>$row){
            $progress_details = $progress->where('structure_id',$row['id'])->first();
            $weight = ($row['grand_total_est']['default']/$location['grand_total_est']['default'])*100;

            //setting of amount
            $progress_details->total_amount_before_date = $progress_details->total_qty_before_date * $row['unit_price']['default'];
            $progress_details->total_amount_on_date = $progress_details->total_qty_on_date * $row['unit_price']['default'];
            $progress_details->total_amount_all = $progress_details->total_qty_all * $row['unit_price']['default'];

            //setting of weight
            $progress_details->total_weight_before_date = ($progress_details->total_qty_before_date * $row['unit_price']['default']/$location['grand_total_est']['default'])*100;
            $progress_details->total_weight_on_date = ($progress_details->total_qty_on_date * $row['unit_price']['default']/$location['grand_total_est']['default'])*100;
            $progress_details->total_weight_all = ($progress_details->total_qty_all * $row['unit_price']['default']/$location['grand_total_est']['default'])*100;


            //setting of balance
            $progress_details->qty_balance = $row['qty'] - $progress_details->total_qty_all;
            $progress_details->amount_balance = $row['estimated_budget'] - $progress_details->total_amount_all;
            $progress_details->weight_balance = $weight - ($progress_details->total_amount_all/$location['grand_total_est']['default']) * 100;

            $structure['project_location_structure_items'][$key]['progress_details'] = $progress_details;
            $structure['project_location_structure_items'][$key]['weight'] = $weight;
        }
        return $location;
    }
    public function workAccomplishmentPerItem()
    {
        $data = $this->request->all();
        $id = $data['id'];

        $group_by_column = 'project_location_structure_items.project_location_structure_id,project_location_structure_items.id';
        $where_column = "project_location_structures.id='$id'";
        $structured_query = $this->workAccomplishment($group_by_column,$where_column);
        $before_date = $structured_query['before_date'];
        $on_date = $structured_query['on_date'];
        $all = $structured_query['all'];
        $sql = "SELECT project_location_structure_items.id as item_id,
				IFNULL(all_date.total_qty,0) as total_qty_all,
				IFNULL(before_date.total_qty,0) as total_qty_before_date,
				IFNULL(on_date.total_qty,0) as total_qty_on_date
				FROM project_location_structure_items
				LEFT JOIN ($before_date) as before_date
				ON before_date.id=project_location_structure_items.id
				LEFT JOIN ($on_date) as on_date
				ON on_date.id=project_location_structure_items.id
				LEFT JOIN ($all) as all_date
				ON all_date.id=project_location_structure_items.id
				WHERE project_location_structure_items.project_location_structure_id='$id'";
        $query = DB::select($sql);
        $progress = collect($query);

        $structure = ProjectLocationStructure::with(
            [
                'project_location_structure_items' => function ($query) {
                    $query->with(
                        [
                            'item_unit'
                        ]
                    );
                }
            ])->find($id);
        $structure = $structure->toArray();
        foreach($structure['project_location_structure_items'] as $key=>$row){
            $progress_details = $progress->where('item_id',$row['id'])->first();
            $weight = ($row['grand_total_est']['default']/$structure['grand_total_est']['default'])*100;

            //setting of amount
            $progress_details->total_amount_before_date = $progress_details->total_qty_before_date * $row['unit_price']['default'];
            $progress_details->total_amount_on_date = $progress_details->total_qty_on_date * $row['unit_price']['default'];
            $progress_details->total_amount_all = $progress_details->total_qty_all * $row['unit_price']['default'];

            //setting of weight
            $progress_details->total_weight_before_date = ($progress_details->total_qty_before_date * $row['unit_price']['default']/$structure['grand_total_est']['default'])*100;
            $progress_details->total_weight_on_date = ($progress_details->total_qty_on_date * $row['unit_price']['default']/$structure['grand_total_est']['default'])*100;
            $progress_details->total_weight_all = ($progress_details->total_qty_all * $row['unit_price']['default']/$structure['grand_total_est']['default'])*100;


            //setting of balance
            $progress_details->qty_balance = $row['qty'] - $progress_details->total_qty_all;
            $progress_details->amount_balance = $row['grand_total_est']['default'] - $progress_details->total_amount_all;
            $progress_details->weight_balance = $weight - ($progress_details->total_amount_all/$structure['grand_total_est']['default']) * 100;

            $structure['project_location_structure_items'][$key]['progress_details'] = $progress_details;
            $structure['project_location_structure_items'][$key]['weight'] = $weight;
        }
        return $structure;
    }
    public function workAccomplishment($group_by_column,$where_column){
        $data = $this->request->all();
        $date_from = $data['from'];
        $date_to = $data['to'];
        $id = $data['id'];

        $before_date = "SELECT ".$group_by_column.",IFNULL(SUM(progress_details.qty),0) as total_qty
				FROM progress_details
				INNER JOIN progresses
				ON progress_details.progress_id=progresses.id
				
				INNER JOIN project_location_structure_items
				ON progresses.project_location_structure_item_id = project_location_structure_items.id
				
				INNER JOIN project_location_structures
				ON project_location_structure_items.project_location_structure_id = project_location_structures.id
				
				INNER JOIN project_locations
				ON project_location_structures.project_location_id = project_locations.id
				
				INNER JOIN projects
				ON project_locations.project_id = projects.id
				
				
				WHERE ".$where_column."
				AND progress_details.deleted_at IS NULL
				AND progresses.deleted_at IS NULL
				AND project_location_structure_items.deleted_at IS NULL
				AND project_location_structures.deleted_at IS NULL
				AND project_locations.deleted_at IS NULL
				AND projects.deleted_at IS NULL
				AND progress_details.transaction_date < '$date_from'
				GROUP BY ".$group_by_column;

        $on_date = "SELECT ".$group_by_column.",IFNULL(SUM(progress_details.qty),0) as total_qty
				FROM progress_details
				INNER JOIN progresses
				ON progress_details.progress_id=progresses.id
				
				INNER JOIN project_location_structure_items
				ON progresses.project_location_structure_item_id = project_location_structure_items.id
				
				INNER JOIN project_location_structures
				ON project_location_structure_items.project_location_structure_id = project_location_structures.id
				
				INNER JOIN project_locations
				ON project_location_structures.project_location_id = project_locations.id
				
				INNER JOIN projects
				ON project_locations.project_id = projects.id
				
				
				WHERE ".$where_column."
				AND progress_details.deleted_at IS NULL
				AND progresses.deleted_at IS NULL
				AND project_location_structure_items.deleted_at IS NULL
				AND project_location_structures.deleted_at IS NULL
				AND project_locations.deleted_at IS NULL
				AND projects.deleted_at IS NULL
				AND progress_details.transaction_date BETWEEN '$date_from' AND '$date_to'
				GROUP BY ".$group_by_column;

        $all = "SELECT ".$group_by_column.",IFNULL(SUM(progress_details.qty),0) as total_qty
				FROM progress_details
				INNER JOIN progresses
				ON progress_details.progress_id=progresses.id
				
				INNER JOIN project_location_structure_items
				ON progresses.project_location_structure_item_id = project_location_structure_items.id
				
				INNER JOIN project_location_structures
				ON project_location_structure_items.project_location_structure_id = project_location_structures.id
				
				INNER JOIN project_locations
				ON project_location_structures.project_location_id = project_locations.id
				
				INNER JOIN projects
				ON project_locations.project_id = projects.id
				
				
				WHERE ".$where_column."
				AND progress_details.deleted_at IS NULL
				AND progresses.deleted_at IS NULL
				AND project_location_structure_items.deleted_at IS NULL
				AND project_location_structures.deleted_at IS NULL
				AND project_locations.deleted_at IS NULL
				AND projects.deleted_at IS NULL
				AND progress_details.transaction_date < '$date_to'
				GROUP BY ".$group_by_column;

        return ['before_date'=>$before_date,'on_date'=>$on_date,'all'=>$all];


    }
    public function projectBudget()
    {
        $data = $this->request->all();
        $id = $data['id'];

        $result = ProjectLocationStructure::with(
            [
                'project_location_structure_items' => function ($query) {
                    $query->with(
                        [
                            'item_unit'
                        ]
                    );
                }
            ])->find($id);
        return empty($result) ? response('Internal Server Error',500) : response($result,200);
    }
    public function costForecastPerItem()
    {
        $data = $this->request->all();
        $id = $data['id'];

        $result = ProjectLocationStructure::with(
            [
                'project_location_structure_items' => function ($query) {
                    $query->with(
                        [
                            'item_unit'
                        ]
                    );
                }
            ])->find($id);
        $result = $result->toArray();
        foreach($result['project_location_structure_items'] as $key=>$row){
            $material_weight = ($row['material']['default']/$result['material_est']['default']);
            $equipment_weight = ($row['equipment']['default']/$result['equipment_est']['default']);
            $labor_weight = ($row['labor']['default']/$result['labor_est']['default']);
            $total_weight = $material_weight+$equipment_weight+$labor_weight;


            $result['project_location_structure_items'][$key]['material_weight'] = $material_weight;
            $result['project_location_structure_items'][$key]['equipment_weight'] = $equipment_weight;
            $result['project_location_structure_items'][$key]['labor_weight'] = $labor_weight;
            $result['project_location_structure_items'][$key]['total_weight'] = $total_weight;
        }
        return empty($result) ? response('Internal Server Error',500) : response($result,200);
    }

}
