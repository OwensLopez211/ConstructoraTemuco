<?php

namespace Tests\Feature;

use App\Models\Project;
use App\Models\ProjectImage;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class ProjectImageTest extends TestCase
{
    use RefreshDatabase;

    protected $admin;
    protected $manager;
    protected $supervisor;
    protected $employee;
    protected $project;

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

        // Crear proyecto de prueba
        $this->project = Project::create([
            'name' => 'Proyecto Test Imágenes',
            'type' => 'privado',
            'status' => 'en_progreso',
            'location' => 'Temuco Test',
            'client_name' => 'Cliente Test',
            'user_id' => $this->supervisor->id,
        ]);

        // Fake storage
        Storage::fake('projects');
    }

    #[Test]
    public function authorized_user_can_view_project_images(): void
    {
        $token = $this->supervisor->createToken('test')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->getJson("/api/projects/{$this->project->id}/images");

        $response->assertStatus(200)
                ->assertJsonStructure([
                    'success',
                    'data' => [
                        'project_id',
                        'project_name',
                        'images',
                        'images_count',
                        'main_image'
                    ]
                ]);
    }

    #[Test]
    public function unauthorized_user_cannot_view_project_images(): void
    {
        $token = $this->employee->createToken('test')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->getJson("/api/projects/{$this->project->id}/images");

        $response->assertStatus(403);
    }

    #[Test]
    public function can_upload_single_image(): void
    {
        $token = $this->supervisor->createToken('test')->plainTextToken;

        $file = UploadedFile::fake()->image('test.jpg', 800, 600);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->postJson("/api/projects/{$this->project->id}/images", [
            'images' => [$file],
            'descriptions' => ['Imagen de prueba'],
        ]);

        $response->assertStatus(201)
                ->assertJson([
                    'success' => true,
                    'message' => 'Imágenes subidas exitosamente'
                ])
                ->assertJsonStructure([
                    'data' => [
                        'project_id',
                        'uploaded_images' => [
                            '*' => [
                                'id',
                                'filename',
                                'original_name',
                                'url',
                                'thumbnail_url',
                                'size',
                                'formatted_size',
                                'dimensions',
                                'description'
                            ]
                        ],
                        'uploaded_count'
                    ]
                ]);

        // Verificar que se creó en la base de datos
        $this->assertDatabaseHas('project_images', [
            'project_id' => $this->project->id,
            'original_name' => 'test.jpg',
            'description' => 'Imagen de prueba'
        ]);
    }

    #[Test]
    public function can_upload_multiple_images(): void
    {
        $token = $this->supervisor->createToken('test')->plainTextToken;

        $files = [
            UploadedFile::fake()->image('test1.jpg', 800, 600),
            UploadedFile::fake()->image('test2.png', 1024, 768),
            UploadedFile::fake()->image('test3.jpg', 500, 500),
        ];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->postJson("/api/projects/{$this->project->id}/images", [
            'images' => $files,
            'descriptions' => ['Primera imagen', 'Segunda imagen', 'Tercera imagen'],
            'main_image_index' => 1
        ]);

        // Debug: Ver qué está pasando si falla
        if ($response->status() !== 201) {
            $this->fail('Upload failed with response: ' . $response->getContent());
        }

        $response->assertStatus(201);

        // Verificar que se crearon 3 imágenes
        $this->assertEquals(3, ProjectImage::where('project_id', $this->project->id)->count());

        // Verificar que la segunda imagen es la principal
        $mainImage = ProjectImage::where('project_id', $this->project->id)
                                ->where('is_main', true)
                                ->first();

        $this->assertNotNull($mainImage);
        $this->assertEquals('test2.png', $mainImage->original_name);
    }


    #[Test]
    public function validates_image_upload_requirements(): void
    {
        $token = $this->supervisor->createToken('test')->plainTextToken;

        // Test sin imágenes
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->postJson("/api/projects/{$this->project->id}/images", []);

        $response->assertStatus(422)
                ->assertJsonValidationErrors(['images']);

        // Test con archivo no válido
        $file = UploadedFile::fake()->create('document.pdf', 1000, 'application/pdf');

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->postJson("/api/projects/{$this->project->id}/images", [
            'images' => [$file]
        ]);

        $response->assertStatus(422)
                ->assertJsonValidationErrors(['images.0']);
    }

    #[Test]
    public function can_view_specific_image(): void
    {
        $token = $this->supervisor->createToken('test')->plainTextToken;

        // Crear imagen de prueba
        $image = ProjectImage::create([
            'project_id' => $this->project->id,
            'filename' => 'test.jpg',
            'original_name' => 'test.jpg',
            'path' => 'project_1/test.jpg',
            'thumbnail_path' => 'project_1/thumb_test.jpg',
            'size' => 100000,
            'mime_type' => 'image/jpeg',
            'width' => 800,
            'height' => 600,
            'is_main' => false,
            'order' => 1,
            'description' => 'Imagen de prueba'
        ]);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->getJson("/api/projects/{$this->project->id}/images/{$image->id}");

        $response->assertStatus(200)
                ->assertJson([
                    'success' => true,
                    'data' => [
                        'id' => $image->id,
                        'original_name' => 'test.jpg',
                        'description' => 'Imagen de prueba'
                    ]
                ]);
    }

    #[Test]
    public function can_update_image_description(): void
    {
        $token = $this->supervisor->createToken('test')->plainTextToken;

        $image = ProjectImage::create([
            'project_id' => $this->project->id,
            'filename' => 'test.jpg',
            'original_name' => 'test.jpg',
            'path' => 'project_1/test.jpg',
            'size' => 100000,
            'mime_type' => 'image/jpeg',
            'width' => 800,
            'height' => 600,
            'order' => 1,
            'description' => 'Descripción original'
        ]);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->putJson("/api/projects/{$this->project->id}/images/{$image->id}", [
            'description' => 'Nueva descripción actualizada'
        ]);

        $response->assertStatus(200)
                ->assertJson([
                    'success' => true,
                    'message' => 'Imagen actualizada exitosamente'
                ]);

        // Verificar en base de datos
        $this->assertDatabaseHas('project_images', [
            'id' => $image->id,
            'description' => 'Nueva descripción actualizada'
        ]);
    }

    public function can_set_image_as_main(): void
    {
        $token = $this->supervisor->createToken('test')->plainTextToken;

        // Crear dos imágenes
        $image1 = ProjectImage::create([
            'project_id' => $this->project->id,
            'filename' => 'test1.jpg',
            'original_name' => 'test1.jpg',
            'path' => 'project_1/test1.jpg',
            'size' => 100000,
            'mime_type' => 'image/jpeg',
            'width' => 800,
            'height' => 600,
            'is_main' => true,
            'order' => 1
        ]);

        $image2 = ProjectImage::create([
            'project_id' => $this->project->id,
            'filename' => 'test2.jpg',
            'original_name' => 'test2.jpg',
            'path' => 'project_1/test2.jpg',
            'size' => 120000,
            'mime_type' => 'image/jpeg',
            'width' => 1024,
            'height' => 768,
            'is_main' => false,
            'order' => 2
        ]);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->putJson("/api/projects/{$this->project->id}/images/{$image2->id}/set-main");

        // Debug: Ver qué está pasando si falla
        if ($response->status() !== 200) {
            $this->fail('Set main failed with response: ' . $response->getContent());
        }

        $response->assertStatus(200)
                ->assertJson([
                    'success' => true,
                    'message' => 'Imagen principal establecida exitosamente'
                ]);

        // Verificar que image2 es ahora la principal
        $this->assertDatabaseHas('project_images', [
            'id' => $image2->id,
            'is_main' => true
        ]);

        // Verificar que image1 ya no es principal
        $this->assertDatabaseHas('project_images', [
            'id' => $image1->id,
            'is_main' => false
        ]);
    }

    #[Test]
    public function can_delete_image(): void
    {
        $token = $this->supervisor->createToken('test')->plainTextToken;

        $image = ProjectImage::create([
            'project_id' => $this->project->id,
            'filename' => 'test.jpg',
            'original_name' => 'test.jpg',
            'path' => 'project_1/test.jpg',
            'size' => 100000,
            'mime_type' => 'image/jpeg',
            'width' => 800,
            'height' => 600,
            'order' => 1
        ]);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->deleteJson("/api/projects/{$this->project->id}/images/{$image->id}");

        $response->assertStatus(200)
                ->assertJson([
                    'success' => true,
                    'message' => 'Imagen eliminada exitosamente'
                ]);

        // Verificar que se eliminó de la base de datos
        $this->assertDatabaseMissing('project_images', [
            'id' => $image->id
        ]);
    }

    #[Test]
    public function can_reorder_images(): void
    {
        $token = $this->supervisor->createToken('test')->plainTextToken;

        // Crear 3 imágenes
        $image1 = ProjectImage::create([
            'project_id' => $this->project->id,
            'filename' => 'test1.jpg',
            'original_name' => 'test1.jpg',
            'path' => 'project_1/test1.jpg',
            'size' => 100000,
            'mime_type' => 'image/jpeg',
            'order' => 1
        ]);

        $image2 = ProjectImage::create([
            'project_id' => $this->project->id,
            'filename' => 'test2.jpg',
            'original_name' => 'test2.jpg',
            'path' => 'project_1/test2.jpg',
            'size' => 100000,
            'mime_type' => 'image/jpeg',
            'order' => 2
        ]);

        $image3 = ProjectImage::create([
            'project_id' => $this->project->id,
            'filename' => 'test3.jpg',
            'original_name' => 'test3.jpg',
            'path' => 'project_1/test3.jpg',
            'size' => 100000,
            'mime_type' => 'image/jpeg',
            'order' => 3
        ]);

        // Reordenar: 3, 1, 2
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->postJson("/api/projects/{$this->project->id}/images/reorder", [
            'image_ids' => [$image3->id, $image1->id, $image2->id]
        ]);

        $response->assertStatus(200)
                ->assertJson([
                    'success' => true,
                    'message' => 'Imágenes reordenadas exitosamente'
                ]);

        // Verificar nuevo orden
        $this->assertDatabaseHas('project_images', ['id' => $image3->id, 'order' => 1]);
        $this->assertDatabaseHas('project_images', ['id' => $image1->id, 'order' => 2]);
        $this->assertDatabaseHas('project_images', ['id' => $image2->id, 'order' => 3]);
    }

    #[Test]
    public function employee_cannot_upload_images(): void
    {
        $token = $this->employee->createToken('test')->plainTextToken;

        $file = UploadedFile::fake()->image('test.jpg');

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->postJson("/api/projects/{$this->project->id}/images", [
            'images' => [$file]
        ]);

        $response->assertStatus(403);
    }

    #[Test]
    public function manager_can_manage_any_project_images(): void
    {
        $token = $this->manager->createToken('test')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->getJson("/api/projects/{$this->project->id}/images");

        $response->assertStatus(200);
    }

    #[Test]
    public function cannot_access_images_from_wrong_project(): void
    {
        $token = $this->supervisor->createToken('test')->plainTextToken;

        // Crear otro proyecto
        $otherProject = Project::create([
            'name' => 'Otro Proyecto',
            'type' => 'gubernamental',
            'status' => 'planificacion',
            'location' => 'Otra Ciudad',
            'client_name' => 'Otro Cliente',
            'user_id' => $this->admin->id,
        ]);

        // Crear imagen en el otro proyecto
        $image = ProjectImage::create([
            'project_id' => $otherProject->id,
            'filename' => 'test.jpg',
            'original_name' => 'test.jpg',
            'path' => 'project_2/test.jpg',
            'size' => 100000,
            'mime_type' => 'image/jpeg',
            'order' => 1
        ]);

        // Intentar acceder desde el proyecto original
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->getJson("/api/projects/{$this->project->id}/images/{$image->id}");

        $response->assertStatus(404);
    }
}