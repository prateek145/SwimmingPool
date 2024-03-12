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
        Schema::create('member_slots', function (Blueprint $table) {
            $table->id();
            $table->integer('member_id')->nullable();
            $table->integer('slot_id')->nullable();
            $table->string('member_name')->nullable();
            $table->string('slot_start_time')->nullable();
            $table->string('slot_end_time')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('member_slots');
    }
};
