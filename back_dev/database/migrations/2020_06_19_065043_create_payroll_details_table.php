<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePayrollDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payroll_details', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('payroll_id')->unsigned();
            $table->bigInteger('manpower_id')->unsigned();
            $table->decimal('total_days',20,2);
            $table->decimal('total_regular_hours',20,2);
            $table->decimal('total_ot_hours',20,2);
            $table->decimal('initial_payout',20,2);
            $table->decimal('previous_ca_balance',20,2);
            $table->decimal('ca_payment',20,2);
            $table->decimal('sss_payment',20,2);
            $table->decimal('philhealth_payment',20,2);
            $table->decimal('pagibig_payment',20,2);
            $table->decimal('other_payment',20,2);
            $table->decimal('total_payout',20,2);
            $table->string('remarks')->nullable();
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
        Schema::dropIfExists('payroll_details');
    }
}
