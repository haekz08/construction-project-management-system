<?php

namespace App\Http\Controllers;

use App\DailyLog;
use App\IndirectDailyLog;
use App\Manpower;
use App\Payroll;
use App\PayrollDetail;
use App\Project;
use App\ProjectLocationStructureItem;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class PayrollController extends Controller
{
    protected $request;
    protected $search = '';
    protected $per_page;

    public function __construct(Request $request)
    {
        $this->request = $request;
        $this->per_page = isset($request->per_page) ? $request->per_page : $this->per_page;
        $this->search = isset($request->search) ? $request->search : $this->search;
    }

    public function getUserId()
    {
        return Auth::id();
    }

    public function generate()
    {
        $data = $this->request->all();
        $payroll_type = $data['payroll_type'];
        $project_id = $data['project_id'];
        $date_from = $data['date_from'];
        $date_to = $data['date_to'];

        if ($payroll_type == 1)
            $result = $this->generateDirectPayroll($project_id, $date_from, $date_to);
        else
            $result = $this->generateIndirectPayroll($project_id, $date_from, $date_to);
        return empty($result) ? response('Internal Server Error', 500) : response($result, 200);
    }

    function generateDirectPayroll($project_id, $date_from, $date_to)
    {
        $ca
            = "SELECT manpower_id,
            SUM(amount) as ca
            FROM cash_advance_details
            INNER JOIN cash_advances
            ON cash_advances.id = cash_advance_details.cash_advance_id
            WHERE cash_advances.deleted_at IS NULL
            GROUP BY manpower_id";
        $ca_payment
            = "SELECT manpower_id,
            SUM(ca_payment) as ca_payment
            FROM payroll_details
            INNER JOIN payrolls
            ON payrolls.id = payroll_details.payroll_id
            WHERE payrolls.deleted_at IS NULL
            GROUP BY manpower_id";

        $salary
            = "SELECT manpowers.*,
            COUNT(manpowers.id) as days_rendered,
            SUM(regular_hours) as regular_hours,
            SUM(ot_hours) as ot_hours,
            SUM(total) as total
            FROM manpower_usages
            INNER JOIN daily_logs
            ON daily_logs.id = manpower_usages.daily_log_id
            INNER JOIN project_location_structure_items
            ON project_location_structure_items.id = daily_logs.project_location_structure_item_id
            INNER JOIN project_location_structures
            ON project_location_structures.id = project_location_structure_items.project_location_structure_id
            INNER JOIN project_locations
            ON project_locations.id = project_location_structures.project_location_id
            INNER JOIN projects
            ON projects.id = project_locations.project_id
            INNER JOIN manpowers
            ON manpowers.id = manpower_usages.manpower_id
            WHERE projects.id = $project_id
            AND daily_logs.transaction_date BETWEEN '$date_from' AND '$date_to'
            AND daily_logs.deleted_at IS NULL
            AND daily_logs.payroll_id IS NULL
            AND manpower_usages.deleted_at IS NULL
            AND project_location_structure_items.deleted_at IS NULL
            AND project_location_structures.deleted_at IS NULL
            AND project_locations.deleted_at IS NULL
            AND projects.deleted_at IS NULL
            GROUP BY manpowers.id
            ORDER BY manpowers.last_name";

        $query
            = "SELECT salary.*,
            (IFNULL(ca.ca,0) - IFNULL(ca_payment.ca_payment,0)) ca_balance
            FROM ($salary) as salary
            LEFT JOIN ($ca) as ca
            ON ca.manpower_id = salary.id
            LEFT JOIN ($ca_payment) as ca_payment
            ON ca_payment.manpower_id = salary.id";

        $payroll_draft = DB::select($query);
        $project = Project::with(['project_locations'])->find($project_id);
        $daily_log_ids = DailyLog::whereBetween('transaction_date', [$date_from, $date_to])
            ->whereHas('project_location_structure_item', function ($query) use ($project_id) {
                $query->whereHas('project_location_structure', function ($query) use ($project_id) {
                    $query->whereHas('project_location', function ($query) use ($project_id) {
                        $query->whereHas('project', function ($query) use ($project_id) {
                            $query->where('id', $project_id);
                        });
                    });
                });
            })
            ->whereNull('payroll_id')
            ->get();


        $query = "SELECT project_location_structure_items.* 
                  FROM project_location_structure_items
                  INNER JOIN project_location_structures
                  ON project_location_structures.id = project_location_structure_items.project_location_structure_id
                  INNER JOIN project_locations
                  ON project_locations.id = project_location_structures.project_location_id
                  INNER JOIN projects
                  ON projects.id = project_locations.project_id
                  WHERE projects.id='$project_id'";
        $items = DB::select($query);

        $cost_per_item = [];
        foreach ($items as $item) {
            $query
                = "SELECT manpowers.*,
                COUNT(manpowers.id) as days_rendered,
                SUM(regular_hours) as regular_hours,
                SUM(ot_hours) as ot_hours,
                SUM(total) as total
                FROM manpower_usages
                INNER JOIN daily_logs
                ON daily_logs.id = manpower_usages.daily_log_id
                INNER JOIN project_location_structure_items
                ON project_location_structure_items.id = daily_logs.project_location_structure_item_id
                INNER JOIN project_location_structures
                ON project_location_structures.id = project_location_structure_items.project_location_structure_id
                INNER JOIN project_locations
                ON project_locations.id = project_location_structures.project_location_id
                INNER JOIN projects
                ON projects.id = project_locations.project_id
                INNER JOIN manpowers
                ON manpowers.id = manpower_usages.manpower_id
                WHERE project_location_structure_items.id = " . $item->id . "
                AND daily_logs.transaction_date BETWEEN '$date_from' AND '$date_to'
                AND daily_logs.deleted_at IS NULL
                AND daily_logs.payroll_id IS NULL
                AND manpower_usages.deleted_at IS NULL
                AND project_location_structure_items.deleted_at IS NULL
                AND project_location_structures.deleted_at IS NULL
                AND project_locations.deleted_at IS NULL
                AND projects.deleted_at IS NULL
                GROUP BY manpowers.id
                ORDER BY manpowers.last_name
                ";
            $details = DB::select($query);
            if (!empty($details)) {

                $collection = collect($details);

                $total_hours = $collection->sum('regular_hours') + $collection->sum('ot_hours');
                $total_days = $collection->sum('days_rendered');

                $balance_hours = $item->estimated_hours - $total_hours;
                $balance_days = $item->estimated_days - $total_days;

                $item->total_hours = $total_hours;
                $item->total_days = $total_days;

                $item->balance_hours = $balance_hours;
                $item->balance_days = $balance_days;
                $item->total_cost = $collection->sum('total');

                $row = array(
                    'item' => $item,
                    'details' => $details
                );
                array_push($cost_per_item, $row);
            }
        }
        $result = array(
            'payroll_draft' => $payroll_draft,
            'project' => $project,
            'daily_log_ids' => $daily_log_ids,
            'cost_per_item' => $cost_per_item
        );
        return $result;
    }

    function generateIndirectPayroll($project_id, $date_from, $date_to)
    {
        $ca
            = "SELECT manpower_id,
            SUM(amount) as ca
            FROM cash_advance_details
            INNER JOIN cash_advances
            ON cash_advances.id = cash_advance_details.cash_advance_id
            WHERE cash_advances.deleted_at IS NULL
            GROUP BY manpower_id";
        $ca_payment
            = "SELECT manpower_id,
            SUM(ca_payment) as ca_payment
            FROM payroll_details
            INNER JOIN payrolls
            ON payrolls.id = payroll_details.payroll_id
            WHERE payrolls.deleted_at IS NULL
            GROUP BY manpower_id";

        $salary
            = "SELECT manpowers.*,
            COUNT(manpowers.id) as days_rendered,
            SUM(regular_hours) as regular_hours,
            SUM(ot_hours) as ot_hours,
            SUM(total) as total
            FROM indirect_manpower_usages
            INNER JOIN indirect_daily_logs
            ON indirect_daily_logs.id = indirect_manpower_usages.indirect_daily_log_id
            INNER JOIN projects
            ON projects.id = indirect_daily_logs.project_id
            INNER JOIN manpowers
            ON manpowers.id = indirect_manpower_usages.manpower_id
            WHERE projects.id = $project_id
            AND indirect_daily_logs.transaction_date BETWEEN '$date_from' AND '$date_to'
            AND indirect_daily_logs.deleted_at IS NULL
            AND indirect_daily_logs.payroll_id IS NULL
            AND indirect_manpower_usages.deleted_at IS NULL
            AND projects.deleted_at IS NULL
            GROUP BY manpowers.id
            ORDER BY manpowers.last_name";

        $query
            = "SELECT salary.*,
            (IFNULL(ca.ca,0) - IFNULL(ca_payment.ca_payment,0)) ca_balance
            FROM ($salary) as salary
            LEFT JOIN ($ca) as ca
            ON ca.manpower_id = salary.id
            LEFT JOIN ($ca_payment) as ca_payment
            ON ca_payment.manpower_id = salary.id";

        $payroll_draft = DB::select($query);
        $project = Project::find($project_id);
        $daily_log_ids = IndirectDailyLog::whereBetween('transaction_date', [$date_from, $date_to])
            ->where('project_id', $project_id)
            ->whereNull('payroll_id')
            ->get();

        $result = array(
            'payroll_draft' => $payroll_draft,
            'project' => $project,
            'daily_log_ids' => $daily_log_ids,
        );
        return $result;
    }
    function getPerItem()
    {
        $data = $this->request->all();
        $payroll = Payroll::
        with(
            [
                'payroll_details' => function ($query) {
                    $query->with(
                        [
                            'manpower'
                        ]
                    );
                },
                'project',
                'authorized'
            ]
        )->find($data['id']);

        $query = "SELECT project_location_structure_items.* 
                  FROM project_location_structure_items
                  INNER JOIN project_location_structures
                  ON project_location_structures.id = project_location_structure_items.project_location_structure_id
                  INNER JOIN project_locations
                  ON project_locations.id = project_location_structures.project_location_id
                  INNER JOIN projects
                  ON projects.id = project_locations.project_id
                  WHERE projects.id='$payroll->project_id'";
        $items = DB::select($query);

        $cost_per_item = [];
        foreach ($items as $item) {
            $query
                = "SELECT manpowers.*,
                COUNT(manpowers.id) as days_rendered,
                SUM(regular_hours) as regular_hours,
                SUM(ot_hours) as ot_hours,
                SUM(total) as total
                FROM manpower_usages
                INNER JOIN daily_logs
                ON daily_logs.id = manpower_usages.daily_log_id
                INNER JOIN project_location_structure_items
                ON project_location_structure_items.id = daily_logs.project_location_structure_item_id
                INNER JOIN project_location_structures
                ON project_location_structures.id = project_location_structure_items.project_location_structure_id
                INNER JOIN project_locations
                ON project_locations.id = project_location_structures.project_location_id
                INNER JOIN projects
                ON projects.id = project_locations.project_id
                INNER JOIN manpowers
                ON manpowers.id = manpower_usages.manpower_id
                WHERE project_location_structure_items.id = " . $item->id . "
                AND daily_logs.payroll_id = '$payroll->id'
                GROUP BY manpowers.id
                ORDER BY manpowers.last_name
                ";
            $details = DB::select($query);
            if (!empty($details)) {

                $collection = collect($details);

                $total_hours = $collection->sum('regular_hours') + $collection->sum('ot_hours');
                $total_days = $collection->sum('days_rendered');

                $balance_hours = $item->estimated_hours - $total_hours;
                $balance_days = $item->estimated_days - $total_days;

                $item->total_hours = $total_hours;
                $item->total_days = $total_days;

                $item->balance_hours = $balance_hours;
                $item->balance_days = $balance_days;
                $item->total_cost = $collection->sum('total');

                $row = array(
                    'item' => $item,
                    'details' => $details
                );
                array_push($cost_per_item, $row);
            }
        }


        $result = ['cost_per_item'=>$cost_per_item,'payroll'=>$payroll];
        return response($result, 200);
    }
    function save()
    {
        $data = $this->request->all();
        $user = User::where('email', $data['authorization']['username'])->first();
        if (!Hash::check($data['authorization']['password'], $user['password'])) {
            return response('Invalid Authorization', 422);
        }


        DB::beginTransaction();
        try {
            $data['created_by'] = $this->getUserId();
            $data['updated_by'] = $this->getUserId();
            $data['authorized_by'] = $user['id'];

            $payroll = Payroll::create($data);

            $collection = collect($data['daily_log_ids']);
            $daily_log_ids = $collection->pluck('id');

            if ($data['payroll_type'] == 1)
                DailyLog::whereIn('id', $daily_log_ids)->update(['payroll_id' => $payroll['id']]);
            else
                IndirectDailyLog::whereIn('id', $daily_log_ids)->update(['payroll_id' => $payroll['id']]);
            foreach ($data['payroll_details'] as $row) {
                $row['payroll_id'] = $payroll['id'];
                $row['created_by'] = $this->getUserId();
                $row['updated_by'] = $this->getUserId();
                PayrollDetail::create($row);
            }
            DB::commit();
            return response($payroll, 200);
        } catch (\Exception $e) {
            DB::rollback();
            return response($e, 422);
        }
    }

    public function all()
    {
        $search = $this->search;
        $data = Payroll::with(
            [
                'project',
                'authorized'
            ]
        )
            ->when(!empty($search), function ($query) use ($search) {
                $query->whereRaw("DATE_FORMAT(date_from, '%M %d, %Y') like ?", array('%' . $search . '%'))
                    ->orWhereRaw("DATE_FORMAT(date_to, '%M %d, %Y') like ?", array('%' . $search . '%'))
                    ->orWhere('date_from', 'like', '%' . $this->search . '%')
                    ->orWhere('voucher_number', 'like', '%' . $this->search . '%')
                    ->orWhere('check_number', 'like', '%' . $this->search . '%');
            })
            ->paginate($this->per_page);
        return response($data, 200);
    }

    public function get()
    {
        $data = $this->request->all();
        $result = Payroll::
        with(
            [
                'payroll_details' => function ($query) {
                    $query->with(
                        [
                            'manpower'
                        ]
                    );
                },
                'project',
                'authorized'
            ]
        )->find($data['id']);
        return empty($result) ? response('Internal Server Error', 500) : response($result, 200);
    }

    public function getDetails()
    {
        $data = $this->request->all();
        $manpower_id = $data['manpower_id'];
        $payroll_type = $data['payroll_type'];
        $project_id = $data['project_id'];
        $date_from = $data['date_from'];
        $date_to = $data['date_to'];
        $direct
            = "SELECT manpower_usages.*,
              DATE_FORMAT(daily_logs.transaction_date, '%M %d, %Y') as transaction_date,
              job_descriptions.description as job_description,
              project_location_structure_items.description as project_location_structure_item
              FROM manpower_usages
              INNER JOIN daily_logs
              ON daily_logs.id = manpower_usages.daily_log_id
              INNER JOIN job_descriptions
              ON job_descriptions.id = manpower_usages.job_description_id
              INNER JOIN project_location_structure_items
            ON project_location_structure_items.id = daily_logs.project_location_structure_item_id
            INNER JOIN project_location_structures
            ON project_location_structures.id = project_location_structure_items.project_location_structure_id
            INNER JOIN project_locations
            ON project_locations.id = project_location_structures.project_location_id
            INNER JOIN projects
            ON projects.id = project_locations.project_id
            INNER JOIN manpowers
            ON manpowers.id = manpower_usages.manpower_id
            WHERE projects.id = $project_id
            AND manpower_usages.manpower_id = $manpower_id 
            AND daily_logs.transaction_date BETWEEN '$date_from' AND '$date_to'
                AND daily_logs.deleted_at IS NULL
                AND daily_logs.payroll_id IS NULL
                AND manpower_usages.deleted_at IS NULL";

        $indirect
            = "SELECT indirect_manpower_usages.*,
              DATE_FORMAT(indirect_daily_logs.transaction_date, '%M %d, %Y') as transaction_date,
              job_descriptions.description as job_description
              FROM indirect_manpower_usages
              INNER JOIN indirect_daily_logs
              ON indirect_daily_logs.id = indirect_manpower_usages.indirect_daily_log_id
              INNER JOIN job_descriptions
              ON job_descriptions.id = indirect_manpower_usages.job_description_id
              INNER JOIN projects
              ON projects.id = indirect_daily_logs.project_id
              INNER JOIN manpowers
              ON manpowers.id = indirect_manpower_usages.manpower_id
              WHERE projects.id = $project_id
              AND indirect_manpower_usages.manpower_id = $manpower_id 
              AND indirect_daily_logs.transaction_date BETWEEN '$date_from' AND '$date_to'
              AND indirect_daily_logs.deleted_at IS NULL
              AND indirect_daily_logs.payroll_id IS NULL
              AND indirect_manpower_usages.deleted_at IS NULL";

        $query = ($payroll_type==1) ? $direct : $indirect;
        $log_details = DB::select($query);
        $manpower = Manpower::find($manpower_id);


        return $result = array('log_details'=>$log_details,'manpower'=>$manpower);
    }
}
