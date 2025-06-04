<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Illuminate\Support\Facades\Log;

class ImageService
{
    protected $disk;
    protected $allowedTypes;
    protected $maxSize;
    protected $quality;
    protected $thumbnailSize;

    public function __construct()
    {
        // CAMBIO: Usar disco 'public' en lugar de 'projects'
        $this->disk = 'public';
        $this->allowedTypes = explode(',', config('app.allowed_image_types', 'jpg,jpeg,png,webp'));
        $this->maxSize = config('app.max_image_size', 10240); // KB
        $this->quality = config('app.image_quality', 85);
        $this->thumbnailSize = config('app.thumbnail_size', 300);
    }

    /**
     * Subir y procesar imagen
     */
    public function uploadImage(UploadedFile $file, int $projectId, ?string $description = null): array
    {
        // Validar archivo
        $this->validateImage($file);

        // Generar nombres únicos
        $filename = $this->generateFilename($file);
        $thumbnailFilename = 'thumb_' . $filename;

        // Rutas - CAMBIO: agregar 'projects/' como prefijo
        $projectPath = $this->getProjectPath($projectId);
        $imagePath = $projectPath . '/' . $filename;
        $thumbnailPath = $projectPath . '/' . $thumbnailFilename;

        // Crear directorio si no existe
        Storage::disk($this->disk)->makeDirectory($projectPath);

        // Procesar imagen principal
        $manager = new ImageManager(new Driver());
        $image = $manager->read($file);
        $this->optimizeImage($image);

        // Guardar imagen principal
        Storage::disk($this->disk)->put($imagePath, $image->toJpeg($this->quality));

        // Crear thumbnail
        $thumbnail = $manager->read($file);
        $this->createThumbnail($thumbnail);
        Storage::disk($this->disk)->put($thumbnailPath, $thumbnail->toJpeg($this->quality));

        // NUEVO: También copiar a public/storage si no es un enlace simbólico
        $this->ensurePublicCopy($imagePath);
        $this->ensurePublicCopy($thumbnailPath);

        return [
            'filename' => $filename,
            'original_name' => $file->getClientOriginalName(),
            'path' => $imagePath,
            'thumbnail_path' => $thumbnailPath,
            'size' => $file->getSize(),
            'mime_type' => $file->getMimeType(),
            'width' => $image->width(),
            'height' => $image->height(),
            'description' => $description,
        ];
    }

    /**
     * Subir múltiples imágenes
     */
    public function uploadMultipleImages(array $files, int $projectId, array $descriptions = []): array
    {
        $uploadedImages = [];

        foreach ($files as $index => $file) {
            $description = $descriptions[$index] ?? null;

            try {
                $imageData = $this->uploadImage($file, $projectId, $description);
                $uploadedImages[] = $imageData;
            } catch (\Exception $e) {
                // Log error pero continúa con las demás imágenes
                \Log::error("Error uploading image {$index}: " . $e->getMessage());
            }
        }

        return $uploadedImages;
    }

    /**
     * Eliminar imagen
     */
    public function deleteImage(string $imagePath, ?string $thumbnailPath = null): bool
    {
        $deleted = Storage::disk($this->disk)->delete($imagePath);

        if ($thumbnailPath) {
            Storage::disk($this->disk)->delete($thumbnailPath);
        }

        // También eliminar de public/storage si existe
        $this->deletePublicCopy($imagePath);
        if ($thumbnailPath) {
            $this->deletePublicCopy($thumbnailPath);
        }

        return $deleted;
    }

/**
 * Obtener URL pública de imagen - CORREGIDO PARA SUBDIRECTORIO
 */
    public function getImageUrl(string $path): string
    {
        // URL directa a la ubicación real en el subdirectorio
        return 'https://ctemuco.cl/constructora-temuco-backend/storage/app/public/' . $path;
    }

    /**
     * NUEVO: Asegurar copia en public/storage para hosting compartido
     */
    protected function ensurePublicCopy(string $storagePath): void
    {
        $sourcePath = storage_path('app/public/' . $storagePath);
        $targetPath = public_path('storage/' . $storagePath);

        // Crear directorio si no existe
        $targetDir = dirname($targetPath);
        if (!is_dir($targetDir)) {
            mkdir($targetDir, 0755, true);
        }

        // Copiar archivo si existe y el destino no es un enlace simbólico
        if (file_exists($sourcePath) && !is_link(public_path('storage'))) {
            copy($sourcePath, $targetPath);
        }
    }

    /**
     * NUEVO: Eliminar copia de public/storage
     */
    protected function deletePublicCopy(string $storagePath): void
    {
        $targetPath = public_path('storage/' . $storagePath);
        if (file_exists($targetPath) && !is_link(public_path('storage'))) {
            unlink($targetPath);
        }
    }

    /**
     * Validar imagen
     */
    protected function validateImage(UploadedFile $file): void
    {
        // Validar tipo de archivo
        $extension = strtolower($file->getClientOriginalExtension());
        if (!in_array($extension, $this->allowedTypes)) {
            throw new \InvalidArgumentException(
                "Tipo de archivo no permitido. Tipos permitidos: " . implode(', ', $this->allowedTypes)
            );
        }

        // Validar tamaño
        $sizeKB = $file->getSize() / 1024;
        if ($sizeKB > $this->maxSize) {
            throw new \InvalidArgumentException(
                "El archivo es demasiado grande. Tamaño máximo: {$this->maxSize}KB"
            );
        }

        // Validar que sea una imagen válida
        try {
            $manager = new ImageManager(new Driver());
            $image = $manager->read($file);
            if (!$image->width() || !$image->height()) {
                throw new \InvalidArgumentException("El archivo no es una imagen válida");
            }
        } catch (\Exception $e) {
            throw new \InvalidArgumentException("Error al procesar la imagen: " . $e->getMessage());
        }
    }

    /**
     * Optimizar imagen
     */
    protected function optimizeImage($image): void
    {
        // Limitar dimensiones máximas
        $maxWidth = 1920;
        $maxHeight = 1080;

        if ($image->width() > $maxWidth || $image->height() > $maxHeight) {
            $image->resize($maxWidth, $maxHeight, function ($constraint) {
                $constraint->aspectRatio();
                $constraint->upsize();
            });
        }
    }

    /**
     * Crear thumbnail
     */
    protected function createThumbnail($image): void
    {
        $image->resize($this->thumbnailSize, $this->thumbnailSize, function ($constraint) {
            $constraint->aspectRatio();
            $constraint->upsize();
        });
    }

    /**
     * Generar nombre único para archivo
     */
    protected function generateFilename(UploadedFile $file): string
    {
        $extension = $file->getClientOriginalExtension();
        return Str::uuid() . '.' . strtolower($extension);
    }

    /**
     * Obtener ruta del proyecto - CORREGIDO
     */
    protected function getProjectPath(int $projectId): string
    {
        return "projects/project_{$projectId}";
    }

    /**
     * Obtener información de imagen
     */
    public function getImageInfo(string $path): array
    {
        if (!Storage::disk($this->disk)->exists($path)) {
            throw new \Exception("La imagen no existe");
        }

        $fullPath = Storage::disk($this->disk)->path($path);
        $manager = new ImageManager(new Driver());
        $image = $manager->read($fullPath);

        return [
            'path' => $path,
            'url' => $this->getImageUrl($path),
            'size' => Storage::disk($this->disk)->size($path),
            'width' => $image->width(),
            'height' => $image->height(),
            'last_modified' => Storage::disk($this->disk)->lastModified($path),
        ];
    }

    /**
     * Limpiar imágenes huérfanas
     */
    public function cleanOrphanImages(): int
    {
        $allImages = Storage::disk($this->disk)->allFiles('projects');
        $usedImages = \App\Models\ProjectImage::pluck('path')->toArray();

        $orphanImages = array_diff($allImages, $usedImages);
        $deleted = 0;

        foreach ($orphanImages as $image) {
            if (Storage::disk($this->disk)->delete($image)) {
                $deleted++;
                // También eliminar de public si existe
                $this->deletePublicCopy($image);
            }
        }

        return $deleted;
    }
}