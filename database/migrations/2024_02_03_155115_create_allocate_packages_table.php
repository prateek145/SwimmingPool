<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('allocate_packages', function (Blueprint $table) {
            $table->id();
            $table->integer('member_id')->nullable();
            $table->string('member_name')->nullable();
            $table->integer('package_id')->nullable();
            $table->string('package_name')->nullable();
            $table->string('package_price')->nullable();
            $table->integer('package_status')->nullable();
            $table->date('doj')->nullable();
            $table->date('package_start_date')->nullable();
            $table->date('package_end_date')->nullable();

            $table->integer('created_by')->nullable();
            $table->integer('updated_by')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('allocate_packages');
    }
};
