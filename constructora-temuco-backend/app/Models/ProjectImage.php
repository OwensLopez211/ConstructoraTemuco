<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'filename',
        'original_name',
        'path',
        'size',
        'mime_type',
        'is_main',
        'order',
        'description'
    ];

    protected $casts = [
        'is_main' => 'boolean',
        'size' => 'integer',
        'order' => 'integer',
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

    // Accessors
    public function getUrlAttribute()
    {
        return asset('storage/' . $this->path);
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
}