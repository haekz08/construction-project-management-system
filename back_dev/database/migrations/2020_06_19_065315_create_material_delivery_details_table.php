<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMaterialDeliveryDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('material_delivery_details', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('material_delivery_id')->unsigned();
            $table->bigInteger('material_id')->unsigned();
            $table->decimal('price',20,2);
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
        Schema::dropIfExists('material_delivery_details');
    }
}
