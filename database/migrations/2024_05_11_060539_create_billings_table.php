<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('billings', function (Blueprint $table) {
            $table->id();
            $table->enum('billing_type', ['Air', 'Listrik', 'Maintenance', 'Parkir']);
            $table->integer('billing_fee');
            $table->date('billing_date')->nullable();
            $table->unsignedBigInteger('owner_id');
            $table->foreign('owner_id')->references('id')->on('apartment_owners')->onDelete('cascade');
            $table->integer('meter_reading')->nullable();
            $table->boolean('is_paid')->default(false);
            $table->dateTime('paid_date')->nullable();
            $table->enum('status', ['Pending', 'Success', 'Cancel'])->default('Pending');
            $table->unsignedBigInteger('created_by');
            $table->foreign('created_by')->references('id')->on('users')->onDelete('cascade');
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
        Schema::dropIfExists('billings');
    }
};
