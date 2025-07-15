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
        Schema::create('guild_members', function (Blueprint $table) {
            $table->uuid('guild_id');
            $table->uuid('user_id');
            $table->string('nickname', 32)->nullable();
            $table->timestamp('joined_at')->useCurrent();

            // Foreign key constraints
            $table->foreign('guild_id')->references('id')->on('guilds')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            // Composite primary key
            $table->primary(['guild_id', 'user_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('guild_members');
    }
};
