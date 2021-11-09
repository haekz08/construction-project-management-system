<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEquipmentUsagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('equipment_usages', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('daily_log_id')->unsigned();
            $table->bigInteger('equipment_id')->unsigned();
            $table->string('voucher_number');
            $table->string('check_number');
            $table->decimal('hours_used',20,2);
            $table->decimal('price_per_hour',20,2);
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
        Schema::dropIfExists('equipment_usages');
    }
}
