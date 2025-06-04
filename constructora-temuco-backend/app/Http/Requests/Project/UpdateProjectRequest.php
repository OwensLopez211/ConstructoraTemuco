<?php

namespace App\Http\Requests\Project;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        $user = $this->user();
        $project = $this->route('project');

        // Verificar si el usuario puede gestionar este proyecto específico
        return $user && $user->canManageProject($project);
    }

    public function rules(): array
    {
        return [
            'name' => ['sometimes', 'string', 'max:255'],
            'description' => ['sometimes', 'nullable', 'string', 'max:5000'],
            'type' => ['sometimes', 'in:gubernamental,privado'],
            'status' => ['sometimes', 'in:planificacion,en_progreso,pausado,completado,cancelado'],
            'location' => ['sometimes', 'string', 'max:255'],
            'budget' => ['sometimes', 'nullable', 'numeric', 'min:0'],
            'start_date' => ['sometimes', 'nullable', 'date'],
            'end_date' => ['sometimes', 'nullable', 'date'],
            'estimated_end_date' => ['sometimes', 'nullable', 'date'],
            'client_name' => ['sometimes', 'string', 'max:255'],
            'client_contact' => ['sometimes', 'nullable', 'string', 'max:255'],
            'user_id' => ['sometimes', 'nullable', 'exists:users,id'],
            'progress_percentage' => ['sometimes', 'nullable', 'integer', 'min:0', 'max:100'],
            'notes' => ['sometimes', 'nullable', 'string', 'max:10000'],
            'is_active' => ['sometimes', 'boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.string' => 'El nombre del proyecto debe ser texto.',
            'name.max' => 'El nombre no puede exceder 255 caracteres.',
            'type.in' => 'El tipo debe ser gubernamental o privado.',
            'status.in' => 'El estado no es válido.',
            'location.string' => 'La ubicación debe ser texto.',
            'location.max' => 'La ubicación no puede exceder 255 caracteres.',
            'budget.numeric' => 'El presupuesto debe ser un número válido.',
            'budget.min' => 'El presupuesto no puede ser negativo.',
            'start_date.date' => 'La fecha de inicio debe ser una fecha válida.',
            'end_date.date' => 'La fecha de fin debe ser una fecha válida.',
            'estimated_end_date.date' => 'La fecha estimada debe ser una fecha válida.',
            'client_name.string' => 'El nombre del cliente debe ser texto.',
            'client_name.max' => 'El nombre del cliente no puede exceder 255 caracteres.',
            'user_id.exists' => 'El usuario asignado no existe.',
            'progress_percentage.integer' => 'El porcentaje debe ser un número entero.',
            'progress_percentage.min' => 'El porcentaje no puede ser menor a 0.',
            'progress_percentage.max' => 'El porcentaje no puede ser mayor a 100.',
        ];
    }

    public function prepareForValidation()
    {
        $data = $this->all();

        // Limpiar strings vacíos
        foreach ($data as $key => $value) {
            if ($value === '' || $value === 'null' || $value === 'undefined') {
                $data[$key] = null;
            }
        }

        // Convertir progress a progress_percentage
        if (isset($data['progress']) && !isset($data['progress_percentage'])) {
            $data['progress_percentage'] = (int) $data['progress'];
            unset($data['progress']);
        }

        // Asegurar que progress_percentage sea entero
        if (isset($data['progress_percentage']) && $data['progress_percentage'] !== null) {
            $data['progress_percentage'] = (int) $data['progress_percentage'];
        }

        $this->replace($data);
    }
}