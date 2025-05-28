<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'type',
        'status',
        'location',
        'budget',
        'start_date',
        'end_date',
        'estimated_end_date',
        'client_name',
        'client_contact',
        'user_id',
        'progress_percentage',
        'notes',
        'is_active'
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'estimated_end_date' => 'date',
        'budget' => 'decimal:2',
        'progress_percentage' => 'integer',
        'is_active' => 'boolean',
    ];

    protected $dates = ['deleted_at'];

    // Tipos de proyecto disponibles
    const TYPES = [
        'gubernamental' => 'Gubernamental',
        'privado' => 'Privado',
    ];

    // Estados de proyecto disponibles
    const STATUSES = [
        'planificacion' => 'Planificación',
        'en_progreso' => 'En Progreso',
        'pausado' => 'Pausado',
        'completado' => 'Completado',
        'cancelado' => 'Cancelado',
    ];

    // Relaciones
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function images()
    {
        return $this->hasMany(ProjectImage::class);
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeByType($query, $type)
    {
        return $query->where('type', $type);
    }

    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    public function scopeByLocation($query, $location)
    {
        return $query->where('location', 'LIKE', "%{$location}%");
    }

    public function scopeInProgress($query)
    {
        return $query->where('status', 'en_progreso');
    }

    public function scopeCompleted($query)
    {
        return $query->where('status', 'completado');
    }

    // Accessors y Mutators
    public function getTypeNameAttribute()
    {
        return self::TYPES[$this->type] ?? 'Sin tipo';
    }

    public function getStatusNameAttribute()
    {
        return self::STATUSES[$this->status] ?? 'Sin estado';
    }

    public function getFormattedBudgetAttribute()
    {
        return 'CLP $' . number_format($this->budget, 0, ',', '.');
    }

    public function getDaysRemainingAttribute()
    {
        if (!$this->estimated_end_date) {
            return null;
        }

        $today = now();
        $endDate = $this->estimated_end_date;

        if ($endDate->isPast()) {
            return $today->diffInDays($endDate) * -1; // Días atrasado (negativo)
        }

        return $today->diffInDays($endDate); // Días restantes
    }

    public function getIsOverdueAttribute()
    {
        if (!$this->estimated_end_date || $this->status === 'completado') {
            return false;
        }

        return $this->estimated_end_date->isPast();
    }

    // Métodos de utilidad
    public function isGovernmental()
    {
        return $this->type === 'gubernamental';
    }

    public function isPrivate()
    {
        return $this->type === 'privado';
    }

    public function isInProgress()
    {
        return $this->status === 'en_progreso';
    }

    public function isCompleted()
    {
        return $this->status === 'completado';
    }

    public function canBeEdited()
    {
        return in_array($this->status, ['planificacion', 'en_progreso', 'pausado']);
    }

    public function updateProgress($percentage)
    {
        $this->progress_percentage = max(0, min(100, $percentage));

        // Auto-cambiar estado basado en progreso
        if ($percentage >= 100 && $this->status !== 'completado') {
            $this->status = 'completado';
            $this->end_date = now();
        } elseif ($percentage > 0 && $this->status === 'planificacion') {
            $this->status = 'en_progreso';
        }

        $this->save();
    }
}