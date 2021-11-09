<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMaterialReceivingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('material_receivings', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('starting_inventory_id')->unsigned();
            $table->bigInteger('material_delivery_id')->unsigned();
            $table->date('transaction_date');
            $table->string('reference_number');
            $table->string('remarks');
            $table->decimal('total_received',20,2);
            $table->decimal('total_rejected',20,2);
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
        Schema::dropIfExists('material_receivings');
    }
}
