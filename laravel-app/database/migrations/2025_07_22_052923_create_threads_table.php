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
        Schema::create('threads', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('channel_id');
            // This column will be linked in a later migration
            $table->uuid('parent_message_id');
            $table->string('title')->nullable();
            $table->uuid('created_by');
            $table->timestamps();

            // Foreign keys that can be created now
            $table->foreign('channel_id')->references('id')->on('channels')->onDelete('cascade');
            $table->foreign('created_by')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('threads');
    }
};
