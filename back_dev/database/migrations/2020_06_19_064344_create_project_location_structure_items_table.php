<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjectLocationStructureItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('project_location_structure_items', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('project_location_structure_id')->unsigned();
            $table->string('description');
            $table->decimal('qty',20,2);
            $table->bigInteger('item_unit_id')->unsigned();
            $table->decimal('estimated_hours',20,2);
            $table->decimal('estimated_days',20,2);
            $table->decimal('estimated_budget',20,2);
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
        Schema::dropIfExists('project_location_structure_items');
    }
}
