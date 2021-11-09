<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEquipmentMaintenancesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('equipment_maintenances', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('maintenance_id')->unsigned();
            $table->bigInteger('equipment_id')->unsigned();
            $table->bigInteger('project_location_structure_item_id')->unsigned()->comment('expense for')->nullable();
            $table->bigInteger('maintenance_description_id')->unsigned();
            $table->bigInteger('manpower_id')->unsigned();
            $table->string('remarks');
            $table->decimal('amount',20,2);
            $table->decimal('qty',20,2);
            $table->decimal('total',20,2);
            $table->tinyInteger('is_indirect')->default(0);
            $table->bigInteger('created_by')->unsigned();
            $table->bigInteger('updated_by')->unsigned();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('equipment_maintenances');
    }
}
