<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('project_images', function (Blueprint $table) {
            // Agregar campos que faltan si no existen
            if (!Schema::hasColumn('project_images', 'thumbnail_path')) {
                $table->string('thumbnail_path')->nullable()->after('path');
            }

            if (!Schema::hasColumn('project_images', 'width')) {
                $table->integer('width')->nullable()->after('mime_type');
            }

            if (!Schema::hasColumn('project_images', 'height')) {
                $table->integer('height')->nullable()->after('width');
            }
        });
    }

    public function down(): void
    {
        Schema::table('project_images', function (Blueprint $table) {
            $table->dropColumn(['thumbnail_path', 'width', 'height']);
        });
    }
};