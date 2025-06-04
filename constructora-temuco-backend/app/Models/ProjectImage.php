<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Services\ImageService;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class ProjectImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'filename',
        'original_name',
        'path',
        'thumbnail_path',
        'size',
        'mime_type',
        'width',
        'height',
        'is_main',
        'order',
        'description'
    ];

    protected $casts = [
        'is_main' => 'boolean',
        'size' => 'integer',
        'order' => 'integer',
        'width' => 'integer',
        'height' => 'integer',
    ];

    // Relaciones
    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    // Scopes
    public function scopeMainImage($query)
    {
        return $query->where('is_main', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('order')->orderBy('created_at');
    }

    // Accessors - CORREGIDOS PARA SUBDIRECTORIO
    public function getUrlAttribute()
    {
        if (!$this->path) {
            return null;
        }

        // URL directa a la ubicación real en el subdirectorio
        return 'https://ctemuco.cl/constructora-temuco-backend/storage/app/public/' . $this->path;
    }

    public function getThumbnailUrlAttribute()
    {
        if ($this->thumbnail_path) {
            // URL directa a la ubicación real en el subdirectorio
            return 'https://ctemuco.cl/constructora-temuco-backend/storage/app/public/' . $this->thumbnail_path;
        }

        // Si no hay thumbnail, usar la imagen original
        return $this->url;
    }

    public function getFormattedSizeAttribute()
    {
        $bytes = $this->size;

        if ($bytes >= 1048576) {
            return round($bytes / 1048576, 2) . ' MB';
        } elseif ($bytes >= 1024) {
            return round($bytes / 1024, 2) . ' KB';
        }

        return $bytes . ' bytes';
    }

    public function getDimensionsAttribute()
    {
        if ($this->width && $this->height) {
            return $this->width . 'x' . $this->height;
        }
        return null;
    }

    // Métodos de utilidad
    public function setAsMain()
    {
        // Usar transacción para evitar problemas de concurrencia
        DB::transaction(function () {
            // Quitar main de otras imágenes del mismo proyecto
            static::where('project_id', $this->project_id)
                  ->where('id', '!=', $this->id)
                  ->update(['is_main' => false]);

            // Establecer como main
            $this->update(['is_main' => true]);
        });

        return $this;
    }

    // Boot method
    protected static function boot()
    {
        parent::boot();

        // Al eliminar, limpiar archivos
        static::deleting(function ($image) {
            try {
                $imageService = app(ImageService::class);
                $imageService->deleteImage($image->path, $image->thumbnail_path);
            } catch (\Exception $e) {
                // Log error pero no fallar la eliminación del registro
                Log::error("Error deleting image files: " . $e->getMessage());
            }
        });
    }
}