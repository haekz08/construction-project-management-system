<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:api'])->prefix('maintenance')->group(function () {
    Route::post("/material_units/save","MaterialUnitController@save");
    Route::get("/material_units/all","MaterialUnitController@all");
    Route::get("/material_units/get","MaterialUnitController@get");
    Route::delete("/material_units/delete","MaterialUnitController@delete");

    Route::post("/item_units/save","ItemUnitController@save");
    Route::get("/item_units/all","ItemUnitController@all");
    Route::get("/item_units/get","ItemUnitController@get");
    Route::delete("/item_units/delete","ItemUnitController@delete");

    Route::post("/job_descriptions/save","JobDescriptionController@save");
    Route::get("/job_descriptions/all","JobDescriptionController@all");
    Route::get("/job_descriptions/get","JobDescriptionController@get");
    Route::delete("/job_descriptions/delete","JobDescriptionController@delete");

    Route::post("/maintenance_descriptions/save","MaintenanceDescriptionController@save");
    Route::get("/maintenance_descriptions/all","MaintenanceDescriptionController@all");
    Route::get("/maintenance_descriptions/get","MaintenanceDescriptionController@get");
    Route::delete("/maintenance_descriptions/delete","MaintenanceDescriptionController@delete");
    Route::get("/maintenance_descriptions/search","MaintenanceDescriptionController@search");

    Route::post("/other_expenses/save","OtherExpenseController@save");
    Route::get("/other_expenses/all","OtherExpenseController@all");
    Route::get("/other_expenses/get","OtherExpenseController@get");
    Route::delete("/other_expenses/delete","OtherExpenseController@delete");
    Route::get("/other_expenses/search","OtherExpenseController@search");

    Route::post("/suppliers/save","SupplierController@save");
    Route::get("/suppliers/all","SupplierController@all");
    Route::get("/suppliers/get","SupplierController@get");
    Route::delete("/suppliers/delete","SupplierController@delete");

    Route::post("/equipment_types/save","EquipmentTypeController@save");
    Route::get("/equipment_types/all","EquipmentTypeController@all");
    Route::get("/equipment_types/get","EquipmentTypeController@get");
    Route::delete("/equipment_types/delete","EquipmentTypeController@delete");

    Route::get("/equipments/search","EquipmentTypeController@search");

    Route::post("/tool_types/save","ToolTypeController@save");
    Route::get("/tool_types/all","ToolTypeController@all");
    Route::get("/tool_types/get","ToolTypeController@get");
    Route::delete("/tool_types/delete","ToolTypeController@delete");

    Route::get("/tools/search","ToolTypeController@search");

    Route::post("/manpowers/save","ManpowerController@save");
    Route::get("/manpowers/all","ManpowerController@all");
    Route::get("/manpowers/get","ManpowerController@get");
    Route::get("/manpowers/get-records","ManpowerController@getRecords");
    Route::delete("/manpowers/delete","ManpowerController@delete");
    Route::get("/manpowers/search","ManpowerController@search");

    Route::post("/manpowers/cash_advance/save","ManpowerController@saveCashAdvance");
    Route::get("/manpowers/cash_advance/all","ManpowerController@allCashAdvance");
    Route::delete("/manpowers/cash_advance/delete","ManpowerController@deleteCashAdvance");

    Route::post("/materials/save","MaterialController@save");
    Route::get("/materials/all","MaterialController@all");
    Route::get("/materials/get","MaterialController@get");
    Route::delete("/materials/delete","MaterialController@delete");
    Route::get("/materials/search","MaterialController@search");
    Route::get("/materials/search-per-location","MaterialController@searchPerLocation");
});
Route::middleware(['auth:api'])->prefix('crumbs')->group(function () {
    Route::get("/generate_from_location","CrumbController@generateFromLocation");
    Route::get("/generate_from_structure","CrumbController@generateFromStructure");
    Route::get("/generate_from_item","CrumbController@generateFromItem");
});
Route::middleware(['auth:api'])->prefix('projects')->group(function () {
    Route::post("/save","ProjectController@save");
    Route::get("/all","ProjectController@all");
    Route::get("/get","ProjectController@get");
    Route::delete("/delete","ProjectController@delete");
    Route::post("/save_access","ProjectController@saveAccess");
});

Route::middleware(['auth:api'])->prefix('project/locations')->group(function () {
    Route::post("/save","ProjectLocationController@save");
    Route::get("/all","ProjectLocationController@all");
    Route::get("/get","ProjectLocationController@get");
    Route::delete("/delete","ProjectLocationController@delete");
});

Route::middleware(['auth:api'])->prefix('project/location/structures')->group(function () {
    Route::post("/save","ProjectLocationStructureController@save");
    Route::get("/all","ProjectLocationStructureController@all");
    Route::get("/get","ProjectLocationStructureController@get");
    Route::delete("/delete","ProjectLocationStructureController@delete");
});

Route::middleware(['auth:api'])->prefix('project/location/structure/items')->group(function () {
    Route::post("/save","ProjectLocationStructureItemController@save");
    Route::get("/all","ProjectLocationStructureItemController@all");
    Route::get("/get","ProjectLocationStructureItemController@get");
    Route::delete("/delete","ProjectLocationStructureItemController@delete");

    Route::get("/log-details-per-price","ProjectLocationStructureItemController@logDetailsPerPrice");
    Route::get("/log-details","ProjectLocationStructureItemController@logDetails");
    Route::get("/search","ProjectLocationStructureItemController@search");
});

Route::middleware(['auth:api'])->prefix('labor_estimates')->group(function () {
    Route::post("/save","LaborEstimateController@save");
    Route::delete("/delete","LaborEstimateController@delete");
});
Route::middleware(['auth:api'])->prefix('equipment_estimates')->group(function () {
    Route::post("/save","EquipmentEstimateController@save");
    Route::delete("/delete","EquipmentEstimateController@delete");
});
Route::middleware(['auth:api'])->prefix('material_estimates')->group(function () {
    Route::post("/save","MaterialEstimateController@save");
    Route::delete("/delete","MaterialEstimateController@delete");
});

Route::middleware(['auth:api'])->prefix('project/location/structure/item/manpowers')->group(function () {
    Route::post("/save","ProjectLocationStructureItemManpowerController@save");
    Route::delete("/delete","ProjectLocationStructureItemManpowerController@delete");
});


Route::middleware(['auth:api'])->prefix('daily_logs')->group(function () {
    Route::post("/save","DailyLogController@save");
    Route::delete("/delete","DailyLogController@delete");
    Route::get("/get","DailyLogController@get");
    Route::get("/get_by_item","DailyLogController@getByItem");
});
Route::middleware(['auth:api'])->prefix('daily_log')->group(function () {
    Route::post("/manpower_usages/save","ManpowerUsageController@save");
    Route::delete("/manpower_usages/delete","ManpowerUsageController@delete");

    Route::post("/equipment_usages/save","EquipmentUsageController@save");
    Route::delete("/equipment_usages/delete","EquipmentUsageController@delete");

    Route::post("/material_usages/save","MaterialUsageController@save");
    Route::delete("/material_usages/delete","MaterialUsageController@delete");

    Route::post("/other_expense_usages/save","OtherExpenseUsageController@save");
    Route::delete("/other_expense_usages/delete","OtherExpenseUsageController@delete");
});
Route::middleware(['auth:api'])->prefix('indirect_daily_logs')->group(function () {
    Route::post("/save","IndirectDailyLogController@save");
    Route::delete("/delete","IndirectDailyLogController@delete");
    Route::get("/get","IndirectDailyLogController@get");
    Route::get("/get_by_item","IndirectDailyLogController@getByItem");
});
Route::middleware(['auth:api'])->prefix('indirect_daily_log')->group(function () {
    Route::post("/manpower_usages/save","IndirectManpowerUsageController@save");
    Route::delete("/manpower_usages/delete","IndirectManpowerUsageController@delete");

});

Route::middleware(['auth:api'])->prefix('inventory')->group(function () {
    Route::post("/reset","InventoryController@reset");

    Route::post("/requests/save","InventoryController@requestsSave");
    Route::get("/requests/all","InventoryController@requestsAll");
    Route::delete("/requests/delete","InventoryController@requestsDelete");

    Route::post("/purchases/save","InventoryController@purchasesSave");
    Route::get("/purchases/all","InventoryController@purchasesAll");
    Route::delete("/purchases/delete","InventoryController@purchasesDelete");
    Route::get("/purchases/search","InventoryController@purchasesSearch");

    Route::post("/deliveries/save","InventoryController@deliveriesSave");
    Route::get("/deliveries/all","InventoryController@deliveriesAll");
    Route::delete("/deliveries/delete","InventoryController@deliveriesDelete");
    Route::get("/deliveries/search","InventoryController@deliveriesSearch");

    Route::post("/receivings/save","InventoryController@receivingsSave");
    Route::get("/receivings/all","InventoryController@receivingsAll");
    Route::delete("/receivings/delete","InventoryController@receivingsDelete");

    Route::post("/transfers/save","InventoryController@transfersSave");
    Route::get("/transfers/all","InventoryController@transfersAll");
    Route::delete("/transfers/delete","InventoryController@transfersDelete");


    Route::post("/adjustments/save","InventoryController@adjustmentsSave");
    Route::get("/adjustments/all","InventoryController@adjustmentsAll");

    Route::post("/issuances/save","InventoryController@issuancesSave");
    Route::get("/issuances/all","InventoryController@issuancesAll");
    Route::delete("/issuances/delete","InventoryController@issuancesDelete");

    Route::post("/withdrawals/save","InventoryController@withdrawalsSave");
    Route::get("/withdrawals/all","InventoryController@withdrawalsAll");
});

Route::middleware(['auth:api'])->prefix('payroll')->group(function () {
    Route::get("/generate","PayrollController@generate");
    Route::post("/save","PayrollController@save");
    Route::get("/all","PayrollController@all");
    Route::get("/get","PayrollController@get");
    Route::get("/get-per-item","PayrollController@getPerItem");
    Route::get("/get_details","PayrollController@getDetails");
});

Route::middleware(['auth:api'])->prefix('users')->group(function () {
    Route::get("/all","AuthController@all");
});
Route::middleware(['auth:api'])->prefix('progresses')->group(function () {
    Route::post("/save","ProgressController@save");
    Route::get("/all","ProgressController@all");
    Route::get("/get","ProgressController@get");
    Route::delete("/delete","ProgressController@delete");
});
Route::middleware(['auth:api'])->prefix('progress_details')->group(function () {
    Route::post("/save","ProgressDetailController@save");
    Route::get("/all","ProgressDetailController@all");
    Route::get("/get","ProgressDetailController@get");
    Route::delete("/delete","ProgressDetailController@delete");
});

Route::middleware(['auth:api'])->prefix('equipment_designations')->group(function () {
    Route::post("/save","EquipmentDesignationController@save");
    Route::get("/all","EquipmentDesignationController@all");
    Route::get("/get","EquipmentDesignationController@get");
    Route::delete("/delete","EquipmentDesignationController@delete");
});
Route::middleware(['auth:api'])->prefix('tool_designations')->group(function () {
    Route::post("/save","ToolDesignationController@save");
    Route::get("/all","ToolDesignationController@all");
    Route::get("/get","ToolDesignationController@get");
    Route::delete("/delete","ToolDesignationController@delete");
});

Route::middleware(['auth:api'])->prefix('maintenance_items')->group(function () {
    Route::post("/save","MaintenanceController@save");
    Route::get("/all","MaintenanceController@all");
    Route::get("/get","MaintenanceController@get");
});
Route::middleware(['auth:api'])->prefix('indirect_expenses')->group(function () {
    Route::post("/save","IndirectExpenseController@save");
    Route::get("/all","IndirectExpenseController@all");
    Route::get("/get","IndirectExpenseController@get");
    Route::delete("/delete","IndirectExpenseController@delete");
});


Route::middleware(['auth:api'])->prefix('reports')->group(function () {
    Route::get("/progress","ReportController@progress");
    Route::get("/bill_of_materials","ReportController@billOfMaterials");
    Route::get("/inventory","ReportController@inventory");
    Route::get("/work-accomplishment-per-item","ReportController@workAccomplishmentPerItem");
    Route::get("/work-accomplishment-per-structure","ReportController@workAccomplishmentPerStructure");
    Route::get("/project-budget","ReportController@projectBudget");
    Route::get("/cost-forecast-per-item","ReportController@costForecastPerItem");
});
Route::post('oauth/token', 'AuthController@auth');