<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Project\StoreProjectRequest;
use App\Http\Requests\Project\UpdateProjectRequest;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProjectController extends Controller
{
    /**
     * Obtener lista de proyectos con filtros y paginación
     */
    public function index(Request $request)
    {
        try {
            $user = $request->user();
            $query = Project::with([
                'user:id,name,email,role',
                'images' => function($query) {
                    $query->select('id', 'project_id', 'thumbnail_path', 'is_main', 'order')
                          ->orderBy('order')
                          ->orderByDesc('is_main');
                }
            ]);

            // Filtrar proyectos según el rol del usuario
            if (!$user->isManager()) {
                // Empleados y supervisores solo ven sus proyectos asignados
                $query->where('user_id', $user->id);
            }

            // Filtro por tipo
            if ($request->filled('type')) {
                $query->byType($request->type);
            }

            // Filtro por estado
            if ($request->filled('status')) {
                $query->byStatus($request->status);
            }

            // Filtro por ubicación
            if ($request->filled('location')) {
                $query->byLocation($request->location);
            }

            // Filtro por usuario asignado (solo para managers y admins)
            if ($request->filled('user_id') && $user->isManager()) {
                $query->where('user_id', $request->user_id);
            }

            // Filtro por rango de fechas
            if ($request->filled('start_date_from')) {
                $query->where('start_date', '>=', $request->start_date_from);
            }

            if ($request->filled('start_date_to')) {
                $query->where('start_date', '<=', $request->start_date_to);
            }

            // Filtro por presupuesto
            if ($request->filled('budget_min')) {
                $query->where('budget', '>=', $request->budget_min);
            }

            if ($request->filled('budget_max')) {
                $query->where('budget', '<=', $request->budget_max);
            }

            // Búsqueda general
            if ($request->filled('search')) {
                $search = $request->search;
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'ILIKE', "%{$search}%")
                      ->orWhere('description', 'ILIKE', "%{$search}%")
                      ->orWhere('client_name', 'ILIKE', "%{$search}%")
                      ->orWhere('location', 'ILIKE', "%{$search}%");
                });
            }

            // Solo proyectos activos por defecto
            if (!$request->has('include_inactive')) {
                $query->active();
            }

            // Ordenamiento
            $sortBy = $request->get('sort_by', 'created_at');
            $sortDirection = $request->get('sort_direction', 'desc');

            $allowedSorts = ['name', 'type', 'status', 'location', 'budget', 'start_date', 'created_at', 'progress_percentage'];
            if (in_array($sortBy, $allowedSorts)) {
                $query->orderBy($sortBy, $sortDirection);
            }

            // Paginación
            $perPage = min($request->get('per_page', 15), 100); // Máximo 100 por página
            $projects = $query->paginate($perPage);

            // Transformar datos para la respuesta
            $projects->getCollection()->transform(function ($project) {
                return [
                    'id' => $project->id,
                    'name' => $project->name,
                    'description' => $project->description,
                    'type' => $project->type,
                    'type_name' => $project->type_name,
                    'status' => $project->status,
                    'status_name' => $project->status_name,
                    'location' => $project->location,
                    'budget' => $project->budget,
                    'formatted_budget' => $project->formatted_budget,
                    'start_date' => $project->start_date,
                    'end_date' => $project->end_date,
                    'estimated_end_date' => $project->estimated_end_date,
                    'client_name' => $project->client_name,
                    'client_contact' => $project->client_contact,
                    'progress_percentage' => $project->progress_percentage,
                    'notes' => $project->notes,
                    'is_active' => $project->is_active,
                    'days_remaining' => $project->days_remaining,
                    'is_overdue' => $project->is_overdue,
                    'user' => [
                        'id' => $project->user->id,
                        'name' => $project->user->name,
                        'email' => $project->user->email,
                        'role' => $project->user->role,
                    ],
                    'created_at' => $project->created_at,
                    'updated_at' => $project->updated_at,
                    'images' => $project->images->map(function($image) {
                        return [
                            'id' => $image->id,
                            'thumbnail_url' => $image->thumbnail_url,
                            'is_main' => $image->is_main,
                        ];
                    })->toArray(),
                    'images_count' => $project->images->count(),
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $projects,
                'meta' => [
                    'total_projects' => Project::count(),
                    'active_projects' => Project::active()->count(),
                    'user_projects' => $user->projects()->count(),
                ]
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener proyectos',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Crear nuevo proyecto
     */
    public function store(StoreProjectRequest $request)
    {
        try {
            DB::beginTransaction();

            $project = Project::create($request->validated());

            DB::commit();

            // Cargar relaciones
            $project->load('user:id,name,email,role');

            return response()->json([
                'success' => true,
                'message' => 'Proyecto creado exitosamente',
                'data' => [
                    'project' => $this->transformProject($project)
                ]
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Error al crear proyecto',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Obtener proyecto específico
     */
    public function show(Request $request, Project $project)
    {
        try {
            $user = $request->user();

            // Verificar permisos
            if (!$user->canManageProject($project)) {
                return response()->json([
                    'success' => false,
                    'message' => 'No tienes permisos para ver este proyecto'
                ], 403);
            }

            // Cargar relaciones
            $project->load(['user:id,name,email,role,phone,position', 'images']);

            return response()->json([
                'success' => true,
                'data' => [
                    'project' => $this->transformProject($project, true)
                ]
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener proyecto',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Actualizar proyecto
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        try {
            DB::beginTransaction();

            // Verificar si el proyecto puede ser editado
            if (!$project->canBeEdited()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Este proyecto no puede ser editado en su estado actual'
                ], 422);
            }

            $project->update($request->validated());

            DB::commit();

            // Cargar relaciones
            $project->load('user:id,name,email,role');

            return response()->json([
                'success' => true,
                'message' => 'Proyecto actualizado exitosamente',
                'data' => [
                    'project' => $this->transformProject($project)
                ]
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Error al actualizar proyecto',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Eliminar proyecto (soft delete)
     */
    public function destroy(Request $request, Project $project)
    {
        try {
            $user = $request->user();

            // Solo admin y manager pueden eliminar proyectos
            if (!$user->isManager()) {
                return response()->json([
                    'success' => false,
                    'message' => 'No tienes permisos para eliminar proyectos'
                ], 403);
            }

            // No permitir eliminar proyectos en progreso
            if ($project->status === 'en_progreso') {
                return response()->json([
                    'success' => false,
                    'message' => 'No se puede eliminar un proyecto en progreso'
                ], 422);
            }

            DB::beginTransaction();

            $project->delete();

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Proyecto eliminado exitosamente'
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Error al eliminar proyecto',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Actualizar progreso del proyecto
     */
    public function updateProgress(Request $request, Project $project)
    {
        try {
            $user = $request->user();

            // Verificar permisos
            if (!$user->canManageProject($project)) {
                return response()->json([
                    'success' => false,
                    'message' => 'No tienes permisos para actualizar este proyecto'
                ], 403);
            }

            $request->validate([
                'progress_percentage' => ['required', 'integer', 'min:0', 'max:100'],
                'notes' => ['nullable', 'string', 'max:1000']
            ]);

            DB::beginTransaction();

            $project->updateProgress($request->progress_percentage);

            if ($request->filled('notes')) {
                $project->notes = $request->notes;
                $project->save();
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Progreso actualizado exitosamente',
                'data' => [
                    'progress_percentage' => $project->progress_percentage,
                    'status' => $project->status,
                    'status_name' => $project->status_name,
                ]
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Error al actualizar progreso',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Obtener estadísticas de proyectos
     */
    public function statistics(Request $request)
    {
        try {
            $user = $request->user();
            $query = Project::query();
            $userFilteredQuery = clone $query;

            if (!$user->isManager()) {
                $userFilteredQuery->where('user_id', $user->id);
            }

            $stats = [
                'total_projects' => Project::count(),
                'active_projects' => Project::active()->count(),
                'by_status' => [
                    'planificacion' => $userFilteredQuery->byStatus('planificacion')->count(),
                    'en_progreso' => $userFilteredQuery->byStatus('en_progreso')->count(),
                    'pausado' => $userFilteredQuery->byStatus('pausado')->count(),
                    'completado' => $userFilteredQuery->byStatus('completado')->count(),
                    'cancelado' => $userFilteredQuery->byStatus('cancelado')->count(),
                ],
                'by_type' => [
                    'gubernamental' => $userFilteredQuery->byType('gubernamental')->count(),
                    'privado' => $userFilteredQuery->byType('privado')->count(),
                ],
                'budget_stats' => [
                    'total_budget' => $userFilteredQuery->sum('budget'),
                    'average_budget' => $userFilteredQuery->avg('budget'),
                    'completed_budget' => $userFilteredQuery->byStatus('completado')->sum('budget'),
                ],
                'overdue_projects' => $userFilteredQuery->where('estimated_end_date', '<', now())
                                           ->whereNotIn('status', ['completado', 'cancelado'])
                                           ->count(),
            ];

            return response()->json([
                'success' => true,
                'data' => $stats
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener estadísticas',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Obtener opciones para formularios (tipos, estados, usuarios)
     */
    public function options(Request $request)
    {
        try {
            $user = $request->user();

            // Obtener usuarios disponibles según el rol
            $usersQuery = User::active();
            if (!$user->isAdmin()) {
                // Manager puede asignar a supervisores y empleados
                // Supervisor solo puede ver su perfil
                if ($user->isManager()) {
                    $usersQuery->whereIn('role', ['supervisor', 'employee']);
                } else {
                    $usersQuery->where('id', $user->id);
                }
            }

            $users = $usersQuery->select('id', 'name', 'email', 'role')->get();

            return response()->json([
                'success' => true,
                'data' => [
                    'types' => Project::TYPES,
                    'statuses' => Project::STATUSES,
                    'users' => $users,
                    'current_user_permissions' => [
                        'can_create' => $user->canManageProjects(),
                        'can_assign_users' => $user->isManager(),
                        'can_delete' => $user->isManager(),
                    ]
                ]
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener opciones',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Obtener todos los proyectos activos (endpoint público)
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getActiveProjects()
    {
        try {
            $projects = Project::where('is_active', true)
                ->with(['images']) // Cargar relación con imágenes
                ->select([
                    'id',
                    'name', // Usar 'name' en lugar de 'title'
                    'description',
                    'type', // gubernamental/privado
                    'location',
                    'budget',
                    'start_date',
                    'end_date',
                    'status',
                    'created_at',
                    'updated_at'
                ])
                ->orderBy('created_at', 'desc')
                ->get();

            // Transformar imágenes a URL completa si es necesario, similar a la función transformProject
            $projects->transform(function ($project) {
                $project->images->transform(function ($image) {
                    return [
                        'id' => $image->id,
                        'thumbnail_url' => $image->thumbnail_url, // Asegúrate de tener este accessor en ProjectImage
                        'is_main' => $image->is_main,
                    ];
                });
                // Incluir formatted_budget y name_type/name_status si son necesarios en el frontend público
                 $project->append(['formatted_budget', 'type_name', 'status_name']); // Añadir accessors
                return $project;
            });

            return response()->json([
                'success' => true,
                'data' => $projects,
                'total' => $projects->count()
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener los proyectos activos',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Transformar proyecto para respuesta
     */
    private function transformProject(Project $project, $detailed = false)
    {
        $data = [
            'id' => $project->id,
            'name' => $project->name,
            'description' => $project->description,
            'type' => $project->type,
            'type_name' => $project->type_name,
            'status' => $project->status,
            'status_name' => $project->status_name,
            'location' => $project->location,
            'budget' => $project->budget,
            'formatted_budget' => $project->formatted_budget,
            'start_date' => $project->start_date,
            'end_date' => $project->end_date,
            'estimated_end_date' => $project->estimated_end_date,
            'client_name' => $project->client_name,
            'client_contact' => $project->client_contact,
            'progress_percentage' => $project->progress_percentage,
            'notes' => $project->notes,
            'is_active' => $project->is_active,
            'days_remaining' => $project->days_remaining,
            'is_overdue' => $project->is_overdue,
            'can_be_edited' => $project->canBeEdited(),
            'user' => [
                'id' => $project->user->id,
                'name' => $project->user->name,
                'email' => $project->user->email,
                'role' => $project->user->role,
            ],
            'created_at' => $project->created_at,
            'updated_at' => $project->updated_at,
        ];

        if ($detailed) {
            $data['user']['phone'] = $project->user->phone ?? null;
            $data['user']['position'] = $project->user->position ?? null;
            $data['images'] = $project->images->map(function($image) {
                 return [
                    'id' => $image->id,
                    'filename' => $image->filename,
                    'original_name' => $image->original_name,
                    'path' => $image->path,
                    'thumbnail_path' => $image->thumbnail_path,
                    'size' => $image->size,
                    'formatted_size' => $image->formatted_size,
                    'mime_type' => $image->mime_type,
                    'width' => $image->width,
                    'height' => $image->height,
                    'dimensions' => $image->dimensions,
                    'is_main' => $image->is_main,
                    'order' => $image->order,
                    'description' => $image->description,
                    'url' => $image->url,
                    'thumbnail_url' => $image->thumbnail_url,
                 ];
            })->toArray() ?? [];
        }

        return $data;
    }
}
