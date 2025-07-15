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
        Schema::create('channels', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('guild_id');
            $table->uuid('category_id')->nullable();
            $table->enum('type', ['text', 'voice', 'announcement'])->default('text');
            $table->string('name', 100);
            $table->text('topic')->nullable();
            $table->timestamp('created_at')->useCurrent();


            // Foreign key constraints
            $table->foreign('guild_id')->references('id')->on('guilds')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('channels');
    }
};
