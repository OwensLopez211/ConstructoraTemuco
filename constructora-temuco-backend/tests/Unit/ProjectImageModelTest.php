<?php

namespace Tests\Unit;

use App\Models\Project;
use App\Models\ProjectImage;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class ProjectImageModelTest extends TestCase
{
    use RefreshDatabase;

    protected $project;

    protected function setUp(): void
    {
        parent::setUp();

        $user = User::factory()->create();
        $this->project = Project::factory()->create(['user_id' => $user->id]);
    }

    #[Test]
    public function belongs_to_project(): void
    {
        $image = ProjectImage::create([
            'project_id' => $this->project->id,
            'filename' => 'test.jpg',
            'original_name' => 'test.jpg',
            'path' => 'project_1/test.jpg',
            'size' => 100000,
            'mime_type' => 'image/jpeg',
            'order' => 1
        ]);

        $this->assertInstanceOf(Project::class, $image->project);
        $this->assertEquals($this->project->id, $image->project->id);
    }

    #[Test]
    public function formats_size_correctly(): void
    {
        $image = new ProjectImage([
            'size' => 1048576 // 1MB
        ]);

        $this->assertEquals('1 MB', $image->formatted_size);

        $image->size = 1024; // 1KB
        $this->assertEquals('1 KB', $image->formatted_size);

        $image->size = 500; // 500 bytes
        $this->assertEquals('500 bytes', $image->formatted_size);
    }

    #[Test]
    public function returns_dimensions(): void
    {
        $image = new ProjectImage([
            'width' => 1920,
            'height' => 1080
        ]);

        $this->assertEquals('1920x1080', $image->dimensions);

        $image->width = null;
        $this->assertNull($image->dimensions);
    }

    #[Test]
    public function can_set_as_main_image(): void
    {
        // Crear imagen principal existente
        $mainImage = ProjectImage::create([
            'project_id' => $this->project->id,
            'filename' => 'main.jpg',
            'original_name' => 'main.jpg',
            'path' => 'project_1/main.jpg',
            'size' => 100000,
            'mime_type' => 'image/jpeg',
            'is_main' => true,
            'order' => 1
        ]);

        // Crear nueva imagen
        $newImage = ProjectImage::create([
            'project_id' => $this->project->id,
            'filename' => 'new.jpg',
            'original_name' => 'new.jpg',
            'path' => 'project_1/new.jpg',
            'size' => 120000,
            'mime_type' => 'image/jpeg',
            'is_main' => false,
            'order' => 2
        ]);

        // Establecer nueva imagen como principal
        $newImage->setAsMain();

        // Verificar que la nueva es principal
        $this->assertTrue($newImage->fresh()->is_main);

        // Verificar que la anterior ya no es principal
        $this->assertFalse($mainImage->fresh()->is_main);
    }

    #[Test]
    public function main_image_scope_works(): void
    {
        // Crear imágenes
        ProjectImage::create([
            'project_id' => $this->project->id,
            'filename' => 'regular.jpg',
            'original_name' => 'regular.jpg',
            'path' => 'project_1/regular.jpg',
            'size' => 100000,
            'mime_type' => 'image/jpeg',
            'is_main' => false,
            'order' => 1
        ]);

        $mainImage = ProjectImage::create([
            'project_id' => $this->project->id,
            'filename' => 'main.jpg',
            'original_name' => 'main.jpg',
            'path' => 'project_1/main.jpg',
            'size' => 120000,
            'mime_type' => 'image/jpeg',
            'is_main' => true,
            'order' => 2
        ]);

        $result = ProjectImage::mainImage()->first();

        $this->assertEquals($mainImage->id, $result->id);
    }

    #[Test]
    public function ordered_scope_works(): void
    {
        // Crear imágenes en orden diferente
        $image2 = ProjectImage::create([
            'project_id' => $this->project->id,
            'filename' => 'second.jpg',
            'original_name' => 'second.jpg',
            'path' => 'project_1/second.jpg',
            'size' => 100000,
            'mime_type' => 'image/jpeg',
            'order' => 2
        ]);

        $image1 = ProjectImage::create([
            'project_id' => $this->project->id,
            'filename' => 'first.jpg',
            'original_name' => 'first.jpg',
            'path' => 'project_1/first.jpg',
            'size' => 100000,
            'mime_type' => 'image/jpeg',
            'order' => 1
        ]);

        $orderedImages = ProjectImage::ordered()->get();

        $this->assertEquals($image1->id, $orderedImages->first()->id);
        $this->assertEquals($image2->id, $orderedImages->last()->id);
    }
}