<?php

namespace App\Http\Requests\Project;

use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

class StoreProjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        $user = $this->user();

        // Solo admin, manager y supervisor pueden crear proyectos
        return $user && $user->canManageProjects();
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:5000'],
            'type' => ['required', 'in:' . implode(',', array_keys(Project::TYPES))],
            'status' => ['nullable', 'in:' . implode(',', array_keys(Project::STATUSES))],
            'location' => ['required', 'string', 'max:255'],
            'budget' => ['nullable', 'numeric', 'min:0', 'max:999999999999.99'],
            'start_date' => ['nullable', 'date', 'after_or_equal:2020-01-01'],
            'end_date' => ['nullable', 'date', 'after:start_date'],
            'estimated_end_date' => ['nullable', 'date', 'after:start_date'],
            'client_name' => ['required', 'string', 'max:255'],
            'client_contact' => ['nullable', 'string', 'max:255'],
            'user_id' => ['nullable', 'exists:users,id'],
            'progress_percentage' => ['nullable', 'integer', 'min:0', 'max:100'],
            'notes' => ['nullable', 'string', 'max:10000'],
            'is_active' => ['nullable', 'boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'El nombre del proyecto es obligatorio.',
            'name.max' => 'El nombre no puede exceder 255 caracteres.',
            'type.required' => 'El tipo de proyecto es obligatorio.',
            'type.in' => 'El tipo debe ser gubernamental o privado.',
            'location.required' => 'La ubicación es obligatoria.',
            'budget.numeric' => 'El presupuesto debe ser un número válido.',
            'budget.min' => 'El presupuesto no puede ser negativo.',
            'start_date.date' => 'La fecha de inicio debe ser una fecha válida.',
            'start_date.after_or_equal' => 'La fecha de inicio debe ser desde el año 2020.',
            'end_date.after' => 'La fecha de fin debe ser posterior a la fecha de inicio.',
            'estimated_end_date.after' => 'La fecha estimada debe ser posterior a la fecha de inicio.',
            'client_name.required' => 'El nombre del cliente es obligatorio.',
            'user_id.exists' => 'El usuario asignado no existe.',
            'progress_percentage.integer' => 'El porcentaje debe ser un número entero.',
            'progress_percentage.min' => 'El porcentaje no puede ser menor a 0.',
            'progress_percentage.max' => 'El porcentaje no puede ser mayor a 100.',
        ];
    }

    public function prepareForValidation()
    {
        // Si no se especifica usuario, asignar al usuario actual
        if (!$this->has('user_id') || !$this->user_id) {
            $this->merge(['user_id' => $this->user()->id]);
        }

        // Si no se especifica estado, usar planificación por defecto
        if (!$this->has('status') || !$this->status) {
            $this->merge(['status' => 'planificacion']);
        }

        // Si no se especifica is_active, usar true por defecto
        if (!$this->has('is_active')) {
            $this->merge(['is_active' => true]);
        }
    }
}