<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        // Obtener usuarios existentes
        $admin = User::where('email', 'admin@constructoratemuco.cl')->first();
        $manager = User::where('email', 'gerente@constructoratemuco.cl')->first();
        $supervisor = User::where('email', 'supervisor@constructoratemuco.cl')->first();

        // Proyectos específicos para demo
        $specificProjects = [
            [
                'name' => 'Construcción Hospital Regional Temuco - Fase 2',
                'description' => 'Ampliación del hospital regional con nuevas salas de cirugía, UCI y área de emergencias. Proyecto gubernamental de alta prioridad.',
                'type' => 'gubernamental',
                'status' => 'en_progreso',
                'location' => 'Temuco Centro',
                'budget' => 1500000000.00,
                'start_date' => '2024-01-15',
                'estimated_end_date' => '2025-12-31',
                'client_name' => 'Gobierno Regional de La Araucanía',
                'client_contact' => '+56 45 123 4567',
                'user_id' => $manager->id,
                'progress_percentage' => 35,
                'notes' => 'Proyecto estratégico para la región. Requiere coordinación con múltiples organismos.',
                'is_active' => true,
            ],
            [
                'name' => 'Condominio Los Robles Premium',
                'description' => 'Desarrollo habitacional de 120 casas con áreas verdes, club house y seguridad 24/7.',
                'type' => 'privado',
                'status' => 'planificacion',
                'location' => 'Pedro de Valdivia',
                'budget' => 800000000.00,
                'start_date' => null,
                'estimated_end_date' => '2026-06-30',
                'client_name' => 'Inmobiliaria Los Andes Ltda',
                'client_contact' => '+56 9 8765 4321',
                'user_id' => $supervisor->id,
                'progress_percentage' => 0,
                'notes' => 'Esperando aprobación de permisos municipales.',
                'is_active' => true,
            ],
            [
                'name' => 'Centro Comercial Plaza Araucanía',
                'description' => 'Centro comercial de 3 pisos con 80 locales comerciales, food court y estacionamientos.',
                'type' => 'privado',
                'status' => 'completado',
                'location' => 'Labranza',
                'budget' => 1200000000.00,
                'start_date' => '2023-03-01',
                'end_date' => '2024-11-15',
                'estimated_end_date' => '2024-12-31',
                'client_name' => 'Constructora del Sur SpA',
                'client_contact' => '+56 45 987 6543',
                'user_id' => $admin->id,
                'progress_percentage' => 100,
                'notes' => 'Proyecto completado exitosamente. Cliente muy satisfecho.',
                'is_active' => true,
            ],
            [
                'name' => 'Escuela Básica Intercultural Mapuche',
                'description' => 'Construcción de escuela básica con enfoque intercultural, biblioteca, laboratorios y gimnasio.',
                'type' => 'gubernamental',
                'status' => 'en_progreso',
                'location' => 'Nueva Imperial',
                'budget' => 450000000.00,
                'start_date' => '2024-08-01',
                'estimated_end_date' => '2025-07-31',
                'client_name' => 'Municipalidad de Nueva Imperial',
                'client_contact' => '+56 45 567 8901',
                'user_id' => $supervisor->id,
                'progress_percentage' => 65,
                'notes' => 'Proyecto con componente cultural importante. Coordinación con comunidades locales.',
                'is_active' => true,
            ],
            [
                'name' => 'Edificio Corporativo Torre Norte',
                'description' => 'Edificio de oficinas de 15 pisos con estacionamientos subterráneos y helipuerto.',
                'type' => 'privado',
                'status' => 'pausado',
                'location' => 'Temuco Centro',
                'budget' => 2000000000.00,
                'start_date' => '2024-02-01',
                'estimated_end_date' => '2025-08-31',
                'client_name' => 'Corporación de Desarrollo',
                'client_contact' => '+56 9 1234 5678',
                'user_id' => $manager->id,
                'progress_percentage' => 25,
                'notes' => 'Pausado por revisión de permisos de construcción en altura.',
                'is_active' => true,
            ],
        ];

        // Crear proyectos específicos
        foreach ($specificProjects as $projectData) {
            Project::create($projectData);
        }

        // Generar proyectos adicionales con factory
        // Proyectos gubernamentales
        Project::factory()
            ->governmental()
            ->count(8)
            ->create([
                'user_id' => collect([$admin->id, $manager->id, $supervisor->id])->random()
            ]);

        // Proyectos privados
        Project::factory()
            ->private()
            ->count(12)
            ->create([
                'user_id' => collect([$admin->id, $manager->id, $supervisor->id])->random()
            ]);

        // Proyectos en diferentes estados
        Project::factory()
            ->inProgress()
            ->count(6)
            ->create([
                'user_id' => collect([$admin->id, $manager->id, $supervisor->id])->random()
            ]);

        Project::factory()
            ->completed()
            ->count(4)
            ->create([
                'user_id' => collect([$admin->id, $manager->id, $supervisor->id])->random()
            ]);

        Project::factory()
            ->planning()
            ->count(3)
            ->create([
                'user_id' => collect([$admin->id, $manager->id, $supervisor->id])->random()
            ]);
    }
}