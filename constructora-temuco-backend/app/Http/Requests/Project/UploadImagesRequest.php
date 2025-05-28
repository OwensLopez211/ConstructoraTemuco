<?php

namespace App\Http\Requests\Project;

use Illuminate\Foundation\Http\FormRequest;

class UploadImagesRequest extends FormRequest
{
    public function authorize(): bool
    {
        $user = $this->user();
        $project = $this->route('project');

        // Verificar si el usuario puede gestionar este proyecto
        return $user && $user->canManageProject($project);
    }

    public function rules(): array
    {
        $maxSize = config('app.max_image_size', 10240); // KB
        $allowedTypes = config('app.allowed_image_types', 'jpg,jpeg,png,webp');

        return [
            'images' => ['required', 'array', 'min:1', 'max:10'],
            'images.*' => [
                'required',
                'image',
                "mimes:{$allowedTypes}",
                "max:{$maxSize}",
                'dimensions:min_width=100,min_height=100,max_width=4000,max_height=4000'
            ],
            'descriptions' => ['nullable', 'array'],
            'descriptions.*' => ['nullable', 'string', 'max:255'],
            'main_image_index' => ['nullable', 'integer', 'min:0']
        ];
    }

    public function messages(): array
    {
        return [
            'images.required' => 'Debe seleccionar al menos una imagen.',
            'images.array' => 'El formato de imágenes no es válido.',
            'images.min' => 'Debe subir al menos una imagen.',
            'images.max' => 'No puede subir más de 10 imágenes a la vez.',
            'images.*.required' => 'Cada imagen es obligatoria.',
            'images.*.image' => 'El archivo debe ser una imagen.',
            'images.*.mimes' => 'La imagen debe ser de tipo: ' . config('app.allowed_image_types', 'jpg,jpeg,png,webp'),
            'images.*.max' => 'La imagen no puede ser mayor a ' . (config('app.max_image_size', 10240) / 1024) . 'MB.',
            'images.*.dimensions' => 'La imagen debe tener dimensiones entre 100x100 y 4000x4000 píxeles.',
            'descriptions.array' => 'El formato de descripciones no es válido.',
            'descriptions.*.string' => 'Cada descripción debe ser texto.',
            'descriptions.*.max' => 'Cada descripción no puede exceder 255 caracteres.',
            'main_image_index.integer' => 'El índice de imagen principal debe ser un número.',
            'main_image_index.min' => 'El índice de imagen principal no puede ser negativo.',
        ];
    }
}