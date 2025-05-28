<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'is_active',
        'phone',
        'position'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'is_active' => 'boolean',
    ];

    // Roles disponibles
    const ROLES = [
        'admin' => 'Administrador',
        'manager' => 'Gerente',
        'supervisor' => 'Supervisor',
        'employee' => 'Empleado',
    ];

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeByRole($query, $role)
    {
        return $query->where('role', $role);
    }

    // Métodos de utilidad
    public function isAdmin()
    {
        return $this->role === 'admin';
    }

    public function isManager()
    {
        return in_array($this->role, ['admin', 'manager']);
    }

    public function canManageProjects()
    {
        return in_array($this->role, ['admin', 'manager', 'supervisor']);
    }

    public function getRoleNameAttribute()
    {
        return self::ROLES[$this->role] ?? 'Sin rol';
    }

    /**
     * Relación con proyectos
     */
    public function projects()
    {
        return $this->hasMany(Project::class);
    }

    /**
     * Proyectos activos del usuario
     */
    public function activeProjects()
    {
        return $this->hasMany(Project::class)->active();
    }

    /**
     * Proyectos en progreso del usuario
     */
    public function projectsInProgress()
    {
        return $this->hasMany(Project::class)->inProgress();
    }

    /**
     * Contar proyectos por estado
     */
    public function getProjectsCountByStatusAttribute()
    {
        return [
            'total' => $this->projects()->count(),
            'planificacion' => $this->projects()->byStatus('planificacion')->count(),
            'en_progreso' => $this->projects()->byStatus('en_progreso')->count(),
            'pausado' => $this->projects()->byStatus('pausado')->count(),
            'completado' => $this->projects()->byStatus('completado')->count(),
            'cancelado' => $this->projects()->byStatus('cancelado')->count(),
        ];
    }

    /**
     * Verificar si el usuario puede gestionar un proyecto específico
     */
    public function canManageProject(Project $project)
    {
        // Admin y Manager pueden gestionar todos los proyectos
        if ($this->isManager()) {
            return true;
        }

        // Supervisor puede gestionar proyectos asignados a él
        if ($this->role === 'supervisor' && $project->user_id === $this->id) {
            return true;
        }

        // Empleado solo puede ver proyectos asignados a él
        return $project->user_id === $this->id;
    }
}