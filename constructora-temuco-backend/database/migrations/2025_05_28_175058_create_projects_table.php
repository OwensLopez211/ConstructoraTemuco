<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->enum('type', ['gubernamental', 'privado'])->default('privado');
            $table->enum('status', [
                'planificacion',
                'en_progreso',
                'pausado',
                'completado',
                'cancelado'
            ])->default('planificacion');
            $table->string('location');
            $table->decimal('budget', 15, 2)->nullable();
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->date('estimated_end_date')->nullable();
            $table->string('client_name');
            $table->string('client_contact')->nullable();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->integer('progress_percentage')->default(0);
            $table->text('notes')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();

            // Índices para mejor rendimiento
            $table->index('type');
            $table->index('status');
            $table->index('location');
            $table->index('is_active');
            $table->index('start_date');
            $table->index('end_date');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};