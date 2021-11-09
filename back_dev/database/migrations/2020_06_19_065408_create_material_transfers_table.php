<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMaterialTransfersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('material_transfers', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('from')->unsigned()->comment('starting_inventory_id');
            $table->bigInteger('to')->unsigned()->comment('starting_inventory_id');
            $table->date('transaction_date');
            $table->string('remarks');
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
        Schema::dropIfExists('material_transfers');
    }
}
