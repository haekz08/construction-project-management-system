<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMaterialDeliveriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('material_deliveries', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('starting_inventory_id')->unsigned();
            $table->bigInteger('material_purchase_id')->unsigned();
            $table->date('transaction_date');
            $table->string('delivery_number');
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
        Schema::dropIfExists('material_deliveries');
    }
}
