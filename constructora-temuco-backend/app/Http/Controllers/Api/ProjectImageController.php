<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Project\UploadImagesRequest;
use App\Models\Project;
use App\Models\ProjectImage;
use App\Services\ImageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProjectImageController extends Controller
{
    protected $imageService;

    public function __construct(ImageService $imageService)
    {
        $this->imageService = $imageService;
    }

    /**
     * Obtener todas las imágenes de un proyecto
     */
    public function index(Request $request, Project $project)
    {
        try {
            $user = $request->user();

            // Verificar permisos
            if (!$user->canManageProject($project)) {
                return response()->json([
                    'success' => false,
                    'message' => 'No tienes permisos para ver las imágenes de este proyecto'
                ], 403);
            }

            $images = $project->images()->ordered()->get();

            $imagesData = $images->map(function ($image) {
                return [
                    'id' => $image->id,
                    'filename' => $image->filename,
                    'original_name' => $image->original_name,
                    'path' => $image->path,
                    'url' => $image->url,
                    'thumbnail_url' => $image->thumbnail_url,
                    'size' => $image->size,
                    'formatted_size' => $image->formatted_size,
                    'mime_type' => $image->mime_type,
                    'width' => $image->width,
                    'height' => $image->height,
                    'dimensions' => $image->dimensions,
                    'is_main' => $image->is_main,
                    'order' => $image->order,
                    'description' => $image->description,
                    'created_at' => $image->created_at,
                ];
            });

            return response()->json([
                'success' => true,
                'data' => [
                    'project_id' => $project->id,
                    'project_name' => $project->name,
                    'images' => $imagesData,
                    'images_count' => $images->count(),
                    'main_image' => $images->where('is_main', true)->first() ? [
                        'id' => $images->where('is_main', true)->first()->id,
                        'url' => $images->where('is_main', true)->first()->url,
                    ] : null,
                ]
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener imágenes',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Subir imágenes al proyecto
     */
    public function store(UploadImagesRequest $request, Project $project)
    {
        try {
            DB::beginTransaction();

            $images = $request->file('images');
            $descriptions = $request->get('descriptions', []);
            $mainImageIndex = $request->get('main_image_index');

            // Subir imágenes
            $uploadedImages = $this->imageService->uploadMultipleImages(
                $images,
                $project->id,
                $descriptions
            );

            $projectImages = [];
            $currentMaxOrder = $project->images()->max('order') ?? 0;

            foreach ($uploadedImages as $index => $imageData) {
                $isMain = ($mainImageIndex !== null && $mainImageIndex == $index);

                $projectImage = ProjectImage::create([
                    'project_id' => $project->id,
                    'filename' => $imageData['filename'],
                    'original_name' => $imageData['original_name'],
                    'path' => $imageData['path'],
                    'thumbnail_path' => $imageData['thumbnail_path'],
                    'size' => $imageData['size'],
                    'mime_type' => $imageData['mime_type'],
                    'width' => $imageData['width'],
                    'height' => $imageData['height'],
                    'is_main' => $isMain,
                    'order' => $currentMaxOrder + $index + 1,
                    'description' => $imageData['description'],
                ]);

                if ($isMain) {
                    $projectImage->setAsMain();
                }

                $projectImages[] = [
                    'id' => $projectImage->id,
                    'filename' => $projectImage->filename,
                    'original_name' => $projectImage->original_name,
                    'url' => $projectImage->url,
                    'thumbnail_url' => $projectImage->thumbnail_url,
                    'size' => $projectImage->size,
                    'formatted_size' => $projectImage->formatted_size,
                    'dimensions' => $projectImage->dimensions,
                    'is_main' => $projectImage->is_main,
                    'description' => $projectImage->description,
                ];
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Imágenes subidas exitosamente',
                'data' => [
                    'project_id' => $project->id,
                    'uploaded_images' => $projectImages,
                    'uploaded_count' => count($projectImages),
                ]
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Error al subir imágenes',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Obtener imagen específica
     */
    public function show(Request $request, Project $project, ProjectImage $image)
    {
        try {
            $user = $request->user();

            // Verificar permisos
            if (!$user->canManageProject($project)) {
                return response()->json([
                    'success' => false,
                    'message' => 'No tienes permisos para ver esta imagen'
                ], 403);
            }

            // Verificar que la imagen pertenece al proyecto
            if ($image->project_id !== $project->id) {
                return response()->json([
                    'success' => false,
                    'message' => 'La imagen no pertenece a este proyecto'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => [
                    'id' => $image->id,
                    'filename' => $image->filename,
                    'original_name' => $image->original_name,
                    'url' => $image->url,
                    'thumbnail_url' => $image->thumbnail_url,
                    'size' => $image->size,
                    'formatted_size' => $image->formatted_size,
                    'mime_type' => $image->mime_type,
                    'width' => $image->width,
                    'height' => $image->height,
                    'dimensions' => $image->dimensions,
                    'is_main' => $image->is_main,
                    'order' => $image->order,
                    'description' => $image->description,
                    'created_at' => $image->created_at,
                    'project' => [
                        'id' => $project->id,
                        'name' => $project->name,
                    ]
                ]
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener imagen',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Actualizar imagen (descripción, orden, main)
     */
    public function update(Request $request, Project $project, ProjectImage $image)
    {
        try {
            $user = $request->user();

            // Verificar permisos
            if (!$user->canManageProject($project)) {
                return response()->json([
                    'success' => false,
                    'message' => 'No tienes permisos para editar esta imagen'
                ], 403);
            }

            // Verificar que la imagen pertenece al proyecto
            if ($image->project_id !== $project->id) {
                return response()->json([
                    'success' => false,
                    'message' => 'La imagen no pertenece a este proyecto'
                ], 404);
            }

            $request->validate([
                'description' => ['nullable', 'string', 'max:255'],
                'order' => ['nullable', 'integer', 'min:0'],
                'is_main' => ['nullable', 'boolean'],
            ]);

            DB::beginTransaction();

            // Actualizar campos
            if ($request->has('description')) {
                $image->description = $request->description;
            }

            if ($request->has('order')) {
                $image->order = $request->order;
            }

            $image->save();

            // Establecer como imagen principal si se especifica
            if ($request->has('is_main') && $request->is_main) {
                $image->setAsMain();
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Imagen actualizada exitosamente',
                'data' => [
                    'id' => $image->id,
                    'description' => $image->description,
                    'order' => $image->order,
                    'is_main' => $image->is_main,
                    'updated_at' => $image->updated_at,
                ]
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Error al actualizar imagen',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Eliminar imagen
     */
    public function destroy(Request $request, Project $project, ProjectImage $image)
    {
        try {
            $user = $request->user();

            // Verificar permisos
            if (!$user->canManageProject($project)) {
                return response()->json([
                    'success' => false,
                    'message' => 'No tienes permisos para eliminar esta imagen'
                ], 403);
            }

            // Verificar que la imagen pertenece al proyecto
            if ($image->project_id !== $project->id) {
                return response()->json([
                    'success' => false,
                    'message' => 'La imagen no pertenece a este proyecto'
                ], 404);
            }

            DB::beginTransaction();

            $wasMain = $image->is_main;
            $image->delete();

            // Si era la imagen principal, establecer otra como principal
            if ($wasMain) {
                $newMainImage = $project->images()->orderBy('order')->first();
                if ($newMainImage) {
                    $newMainImage->setAsMain();
                }
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Imagen eliminada exitosamente'
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Error al eliminar imagen',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Reordenar imágenes
     */
    public function reorder(Request $request, Project $project)
    {
        try {
            $user = $request->user();

            // Verificar permisos
            if (!$user->canManageProject($project)) {
                return response()->json([
                    'success' => false,
                    'message' => 'No tienes permisos para reordenar las imágenes'
                ], 403);
            }

            $request->validate([
                'image_ids' => ['required', 'array'],
                'image_ids.*' => ['required', 'integer', 'exists:project_images,id'],
            ]);

            DB::beginTransaction();

            foreach ($request->image_ids as $order => $imageId) {
                ProjectImage::where('id', $imageId)
                          ->where('project_id', $project->id)
                          ->update(['order' => $order + 1]);
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Imágenes reordenadas exitosamente'
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Error al reordenar imágenes',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Establecer imagen principal
     */
    public function setMain(Request $request, Project $project, ProjectImage $image)
    {
        try {
            $user = $request->user();

            // Verificar permisos
            if (!$user->canManageProject($project)) {
                return response()->json([
                    'success' => false,
                    'message' => 'No tienes permisos para cambiar la imagen principal'
                ], 403);
            }

            // Verificar que la imagen pertenece al proyecto
            if ($image->project_id !== $project->id) {
                return response()->json([
                    'success' => false,
                    'message' => 'La imagen no pertenece a este proyecto'
                ], 404);
            }

            DB::beginTransaction();

            $image->setAsMain();

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Imagen principal establecida exitosamente',
                'data' => [
                    'main_image_id' => $image->id,
                    'main_image_url' => $image->url,
                ]
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Error al establecer imagen principal',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}