<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('project_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained()->onDelete('cascade');
            $table->string('filename');
            $table->string('original_name');
            $table->string('path');
            $table->bigInteger('size');
            $table->string('mime_type');
            $table->boolean('is_main')->default(false);
            $table->integer('order')->default(0);
            $table->string('description')->nullable();
            $table->timestamps();

            // Índices
            $table->index('project_id');
            $table->index('is_main');
            $table->index('order');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('project_images');
    }
};