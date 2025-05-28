<?php

namespace Tests\Feature;

use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class ProjectTest extends TestCase
{
    use RefreshDatabase;

    protected $admin;
    protected $manager;
    protected $supervisor;
    protected $employee;

    protected function setUp(): void
    {
        parent::setUp();

        // Crear usuarios de prueba
        $this->admin = User::create([
            'name' => 'Admin Test',
            'email' => 'admin@test.cl',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'is_active' => true,
        ]);

        $this->manager = User::create([
            'name' => 'Manager Test',
            'email' => 'manager@test.cl',
            'password' => Hash::make('password'),
            'role' => 'manager',
            'is_active' => true,
        ]);

        $this->supervisor = User::create([
            'name' => 'Supervisor Test',
            'email' => 'supervisor@test.cl',
            'password' => Hash::make('password'),
            'role' => 'supervisor',
            'is_active' => true,
        ]);

        $this->employee = User::create([
            'name' => 'Employee Test',
            'email' => 'employee@test.cl',
            'password' => Hash::make('password'),
            'role' => 'employee',
            'is_active' => true,
        ]);
    }

    /** @test */
    public function test_admin_can_get_all_projects()
    {
        // Crear algunos proyectos
        Project::factory()->count(5)->create();

        $token = $this->admin->createToken('test')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->getJson('/api/projects');

        $response->assertStatus(200)
                ->assertJsonStructure([
                    'success',
                    'data' => [
                        'data' => [
                            '*' => [
                                'id', 'name', 'type', 'status', 'location'
                            ]
                        ]
                    ]
                ]);
    }

    /** @test */
    public function test_admin_can_create_project()
    {
        $token = $this->admin->createToken('test')->plainTextToken;

        $projectData = [
            'name' => 'Proyecto Test',
            'description' => 'Descripción del proyecto test',
            'type' => 'gubernamental',
            'location' => 'Temuco',
            'client_name' => 'Cliente Test',
            'budget' => 1000000,
        ];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->postJson('/api/projects', $projectData);

        $response->assertStatus(201)
                ->assertJson([
                    'success' => true,
                    'message' => 'Proyecto creado exitosamente'
                ]);

        $this->assertDatabaseHas('projects', [
            'name' => 'Proyecto Test',
            'type' => 'gubernamental'
        ]);
    }

    /** @test */
    public function test_employee_cannot_create_project()
    {
        $token = $this->employee->createToken('test')->plainTextToken;

        $projectData = [
            'name' => 'Proyecto Test',
            'type' => 'privado',
            'location' => 'Temuco',
            'client_name' => 'Cliente Test',
        ];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->postJson('/api/projects', $projectData);

        $response->assertStatus(403);
    }

    /** @test */
    public function test_project_validation_works()
    {
        $token = $this->admin->createToken('test')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->postJson('/api/projects', [
            'name' => '', // Requerido
            'type' => 'invalid_type', // Debe ser gubernamental o privado
            'budget' => -1000, // No puede ser negativo
        ]);

        $response->assertStatus(422)
                ->assertJsonValidationErrors(['name', 'type', 'location', 'client_name', 'budget']);
    }

    /** @test */
    public function test_user_can_only_see_assigned_projects()
    {
        // Crear proyecto asignado al supervisor
        $assignedProject = Project::factory()->create([
            'user_id' => $this->supervisor->id,
            'name' => 'Proyecto Asignado'
        ]);

        // Crear proyecto asignado a otro usuario
        $otherProject = Project::factory()->create([
            'user_id' => $this->admin->id,
            'name' => 'Proyecto de Otro'
        ]);

        $token = $this->supervisor->createToken('test')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->getJson('/api/projects');

        $response->assertStatus(200);

        $projects = $response->json('data.data');
        $this->assertCount(1, $projects);
        $this->assertEquals('Proyecto Asignado', $projects[0]['name']);
    }

    /** @test */
    public function test_project_progress_update()
    {
        $project = Project::factory()->create([
            'user_id' => $this->supervisor->id,
            'status' => 'planificacion',
            'progress_percentage' => 0
        ]);

        $token = $this->supervisor->createToken('test')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->putJson("/api/projects/{$project->id}/progress", [
            'progress_percentage' => 50,
            'notes' => 'Progreso actualizado'
        ]);

        $response->assertStatus(200)
                ->assertJson([
                    'success' => true,
                    'data' => [
                        'progress_percentage' => 50,
                        'status' => 'en_progreso'
                    ]
                ]);

        $project->refresh();
        $this->assertEquals(50, $project->progress_percentage);
        $this->assertEquals('en_progreso', $project->status);
    }

    /** @test */
    public function test_project_filters_work()
    {
        // Crear proyectos con diferentes tipos
        Project::factory()->create(['type' => 'gubernamental', 'user_id' => $this->admin->id]);
        Project::factory()->create(['type' => 'privado', 'user_id' => $this->admin->id]);

        $token = $this->admin->createToken('test')->plainTextToken;

        // Filtrar por tipo gubernamental
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->getJson('/api/projects?type=gubernamental');

        $response->assertStatus(200);
        $projects = $response->json('data.data');

        foreach ($projects as $project) {
            $this->assertEquals('gubernamental', $project['type']);
        }
    }

    /** @test */
    public function test_project_statistics()
    {
        // Crear proyectos con diferentes estados
        Project::factory()->create(['status' => 'planificacion', 'user_id' => $this->admin->id]);
        Project::factory()->create(['status' => 'en_progreso', 'user_id' => $this->admin->id]);
        Project::factory()->create(['status' => 'completado', 'user_id' => $this->admin->id]);

        $token = $this->admin->createToken('test')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->getJson('/api/projects/statistics/summary');

        $response->assertStatus(200)
                ->assertJsonStructure([
                    'success',
                    'data' => [
                        'total_projects',
                        'active_projects',
                        'by_status',
                        'by_type',
                        'budget_stats'
                    ]
                ]);
    }
}