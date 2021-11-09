<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIndirectOtherExpenseUsagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('indirect_other_expense_usages', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('indirect_expense_id')->unsigned();
            $table->bigInteger('other_expense_id')->unsigned();
            $table->decimal('amount',20,2);
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
        Schema::dropIfExists('indirect_other_expense_usages');
    }
}
