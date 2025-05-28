<?php

namespace Tests\Unit;

use App\Services\ImageService;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class ImageServiceTest extends TestCase
{
    protected ImageService $imageService;

    protected function setUp(): void
    {
        parent::setUp();
        $this->imageService = new ImageService();

        // Usar disk de testing
        Storage::fake('projects');
    }

    #[Test]
    public function can_validate_valid_image(): void
    {
        // Verificar si GD está disponible
        if (!extension_loaded('gd')) {
            $this->markTestSkipped('GD extension is not available.');
        }

        // Crear imagen de prueba válida
        $file = UploadedFile::fake()->image('test.jpg', 500, 500);

        // No debería lanzar excepción
        $this->expectNotToPerformAssertions();

        // Usar reflexión para acceder al método protegido
        $reflection = new \ReflectionClass($this->imageService);
        $method = $reflection->getMethod('validateImage');
        $method->setAccessible(true);

        $method->invoke($this->imageService, $file);
    }

    #[Test]
    public function rejects_invalid_file_type(): void
    {
        // Crear archivo que no es imagen
        $file = UploadedFile::fake()->create('document.pdf', 1000, 'application/pdf');

        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('Tipo de archivo no permitido');

        $reflection = new \ReflectionClass($this->imageService);
        $method = $reflection->getMethod('validateImage');
        $method->setAccessible(true);

        $method->invoke($this->imageService, $file);
    }

    #[Test]
    public function rejects_oversized_image(): void
    {
        // Verificar si GD está disponible
        if (!extension_loaded('gd')) {
            $this->markTestSkipped('GD extension is not available.');
        }

        // Crear imagen muy grande (15MB)
        $file = UploadedFile::fake()->image('huge.jpg')->size(15000);

        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('demasiado grande');

        $reflection = new \ReflectionClass($this->imageService);
        $method = $reflection->getMethod('validateImage');
        $method->setAccessible(true);

        $method->invoke($this->imageService, $file);
    }

    #[Test]
    public function generates_unique_filename(): void
    {
        // Verificar si GD está disponible
        if (!extension_loaded('gd')) {
            $this->markTestSkipped('GD extension is not available.');
        }

        $file = UploadedFile::fake()->image('test.jpg');

        $reflection = new \ReflectionClass($this->imageService);
        $method = $reflection->getMethod('generateFilename');
        $method->setAccessible(true);

        $filename1 = $method->invoke($this->imageService, $file);
        $filename2 = $method->invoke($this->imageService, $file);

        $this->assertNotEquals($filename1, $filename2);
        $this->assertStringEndsWith('.jpg', $filename1);
    }

    #[Test]
    public function creates_correct_project_path(): void
    {
        $reflection = new \ReflectionClass($this->imageService);
        $method = $reflection->getMethod('getProjectPath');
        $method->setAccessible(true);

        $path = $method->invoke($this->imageService, 123);

        $this->assertEquals('project_123', $path);
    }

    #[Test]
    public function gets_image_url(): void
    {
        $path = 'project_1/test.jpg';

        $url = $this->imageService->getImageUrl($path);

        // Verificar que contiene la URL base y termina con el path correcto
        $this->assertStringContainsString('/storage/', $url);
        $this->assertStringEndsWith('/project_1/test.jpg', $url);
    }

    #[Test]
    public function validates_file_extension(): void
    {
        $reflection = new \ReflectionClass($this->imageService);
        $method = $reflection->getMethod('validateImage');
        $method->setAccessible(true);

        // Test con extensión válida
        $validFile = UploadedFile::fake()->create('test.jpg', 100, 'image/jpeg');

        // Esto debería pasar la validación de extensión pero puede fallar en GD
        try {
            $method->invoke($this->imageService, $validFile);
        } catch (\InvalidArgumentException $e) {
            // Si falla por otro motivo (como GD), verificar que no sea por extensión
            $this->assertStringNotContainsString('Tipo de archivo no permitido', $e->getMessage());
        }
    }

    #[Test]
    public function can_get_project_path_for_different_ids(): void
    {
        $reflection = new \ReflectionClass($this->imageService);
        $method = $reflection->getMethod('getProjectPath');
        $method->setAccessible(true);

        $this->assertEquals('project_1', $method->invoke($this->imageService, 1));
        $this->assertEquals('project_999', $method->invoke($this->imageService, 999));
        $this->assertEquals('project_12345', $method->invoke($this->imageService, 12345));
    }
}