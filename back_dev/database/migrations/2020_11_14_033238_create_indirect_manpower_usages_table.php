<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIndirectManpowerUsagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('indirect_manpower_usages', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('indirect_daily_log_id')->unsigned();
            $table->bigInteger('manpower_id')->unsigned();
            $table->bigInteger('job_description_id')->unsigned();
            $table->decimal('daily_rate',20,2);
            $table->decimal('regular_hours',20,2);
            $table->decimal('ot_hours',20,2);
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
        Schema::dropIfExists('indirect_manpower_usages');
    }
}
