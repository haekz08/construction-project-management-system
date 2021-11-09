<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjectLocationStructureItemManpowersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('project_location_structure_item_manpowers', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('project_location_structure_item_id')->unsigned();
            $table->bigInteger('manpower_id')->unsigned();
            $table->bigInteger('job_description_id')->unsigned();
            $table->decimal('daily_rate',20,2);
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
        Schema::dropIfExists('project_location_structure_item_manpowers');
    }
}
