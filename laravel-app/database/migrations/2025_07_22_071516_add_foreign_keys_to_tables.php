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
        Schema::table('threads', function (Blueprint $table) {
            // Now that channel_messages exists, we can add this foreign key.
            $table->foreign('parent_message_id')
                ->references('id')
                ->on('channel_messages')
                ->onDelete('cascade');
        });

        Schema::table('channel_messages', function (Blueprint $table) {
            // Now we can add the foreign key for thread_id.
            $table->foreign('thread_id')
                ->references('id')
                ->on('threads')
                ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('threads', function (Blueprint $table) {
            $table->dropForeign(['parent_message_id']);
        });

        Schema::table('channel_messages', function (Blueprint $table) {
            $table->dropForeign(['thread_id']);
        });
    }
};
