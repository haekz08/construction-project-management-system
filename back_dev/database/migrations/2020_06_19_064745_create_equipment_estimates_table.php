<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEquipmentEstimatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('equipment_estimates', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('project_location_structure_item_id')->unsigned();
            $table->bigInteger('equipment_type_id')->unsigned();
            $table->decimal('hourly_rate',20,2);
            $table->decimal('duration_in_hour',20,2);
            $table->decimal('duration_in_day',20,2);
            $table->decimal('qty',20,2);
            $table->decimal('total',20,2);
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
        Schema::dropIfExists('equipment_estimates');
    }
}
