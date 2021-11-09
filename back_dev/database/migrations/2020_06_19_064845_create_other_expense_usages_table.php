<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOtherExpenseUsagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('other_expense_usages', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('daily_log_id')->unsigned();
            $table->bigInteger('other_expense_id')->unsigned();
            $table->decimal('amount',20,2);
            $table->string('voucher_number');
            $table->string('check_number');
            $table->string('details');
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
        Schema::dropIfExists('other_expense_usages');
    }
}
