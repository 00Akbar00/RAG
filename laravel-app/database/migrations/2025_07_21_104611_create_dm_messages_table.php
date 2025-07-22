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
        Schema::create('dm_messages', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('dm_group_id')->constrained('dm_groups')->onDelete('cascade');
            $table->foreignUuid('sender_id')->constrained('users')->onDelete('cascade');
            $table->text('content')->nullable();
            $table->string('message_type')->default('text');
            $table->uuid('reply_to_id')->nullable();
            $table->timestamp('edited_at')->nullable();
            $table->boolean('deleted_by_sender')->default(false);
            $table->boolean('deleted_by_receiver')->default(false);
            $table->boolean('is_read')->default(false);
            $table->timestamps();

            $table->foreign('reply_to_id')->references('id')->on('dm_messages')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dm_messages');
    }
};
