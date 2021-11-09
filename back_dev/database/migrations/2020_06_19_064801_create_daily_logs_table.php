<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDailyLogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('daily_logs', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('project_location_structure_item_id')->unsigned();
            $table->bigInteger('payroll_id')->nullable();
            $table->date('transaction_date');
            $table->decimal('total_labor',20,2);
            $table->decimal('total_equipment',20,2);
            $table->decimal('total_material',20,2);
            $table->decimal('total_other_expense',20,2);
            $table->decimal('grand_total',20,2);
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
        Schema::dropIfExists('daily_logs');
    }
}
