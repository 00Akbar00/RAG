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
        Schema::create('channel_messages', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('channel_id');
            $table->uuid('user_id');
            $table->text('content')->nullable();
            $table->string('message_type')->default('text');
            // This column will be linked in a later migration
            $table->uuid('thread_id')->nullable();
            $table->uuid('reply_to_id')->nullable();
            $table->timestamp('edited_at')->nullable();
            $table->boolean('deleted')->default(false);
            $table->timestamps();

            // Foreign keys
            $table->foreign('channel_id')->references('id')->on('channels')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('reply_to_id')->references('id')->on('channel_messages')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('channel_messages');
    }
};
