<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateToolDesignationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tool_designations', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('tool_id')->unsigned();
            $table->bigInteger('project_location_structure_item_id')->unsigned()->comment('current location')->nullable();
            $table->bigInteger('manpower_id')->unsigned();
            $table->date('transaction_date');
            $table->time('transaction_time');
            $table->tinyInteger('is_active')->default(1);
            $table->string('remarks');
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
        Schema::dropIfExists('tool_designations');
    }
}
