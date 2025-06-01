<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\ProjectImageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Ruta de prueba
Route::get('/test', function () {
    return response()->json([
        'message' => 'API Constructora Temuco funcionando correctamente',
        'timestamp' => now(),
        'version' => '1.0.0'
    ]);
});

// Rutas de autenticación (públicas)
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});

// Ruta pública para proyectos activos
Route::get('/projects/public', [ProjectController::class, 'getActiveProjects']);

// Rutas protegidas por autenticación
Route::middleware('auth:sanctum')->group(function () {
    // Rutas de usuario autenticado
    Route::prefix('auth')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'me']);
        Route::post('/refresh', [AuthController::class, 'refresh']);
    });

    // Rutas de proyectos
    Route::prefix('projects')->group(function () {
        // Rutas básicas de CRUD
        Route::get('/', [ProjectController::class, 'index']);
        Route::post('/', [ProjectController::class, 'store']);
        Route::get('/{project}', [ProjectController::class, 'show']);
        Route::put('/{project}', [ProjectController::class, 'update']);
        Route::delete('/{project}', [ProjectController::class, 'destroy']);

        // Rutas especiales de proyectos
        Route::put('/{project}/progress', [ProjectController::class, 'updateProgress']);
        Route::get('/statistics/summary', [ProjectController::class, 'statistics']);
        Route::get('/options/form-data', [ProjectController::class, 'options']);

        // Rutas de imágenes de proyectos
        Route::prefix('{project}/images')->group(function () {
            Route::get('/', [ProjectImageController::class, 'index']);
            Route::post('/', [ProjectImageController::class, 'store']);
            Route::get('/{image}', [ProjectImageController::class, 'show']);
            Route::put('/{image}', [ProjectImageController::class, 'update']);
            Route::delete('/{image}', [ProjectImageController::class, 'destroy']);
            Route::put('/{image}/set-main', [ProjectImageController::class, 'setMain']);
            Route::post('/reorder', [ProjectImageController::class, 'reorder']);
        });
    });

    // Ruta de usuario (para compatibilidad)
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});
