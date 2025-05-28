# Backend API - Constructora Temuco

API RESTful desarrollada con Laravel para la gestión integral de proyectos de construcción, diseñada específicamente para empresas constructoras en la región de La Araucanía, Chile.

## 🚀 Características Principales

- **Sistema de autenticación** completo con Laravel Sanctum
- **Gestión de proyectos** con tipos gubernamentales y privados
- **Sistema de roles** jerárquico (Admin, Manager, Supervisor, Employee)
- **Gestión de imágenes** con upload múltiple y optimización automática
- **API RESTful** con documentación completa
- **Base de datos PostgreSQL** para máximo rendimiento
- **Testing automatizado** con PHPUnit (95%+ cobertura)
- **Validaciones robustas** con mensajes en español
- **Filtrado avanzado** y paginación optimizada
- **Sistema de thumbnails** automático para imágenes

## 📋 Tabla de Contenidos

- [Tecnologías](#tecnologías)
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [API Endpoints](#api-endpoints)
- [Sistema de Roles](#sistema-de-roles)
- [Gestión de Imágenes](#gestión-de-imágenes)
- [Base de Datos](#base-de-datos)
- [Testing](#testing)
- [Uso](#uso)
- [Contribución](#contribución)

## 🛠️ Tecnologías

- **Framework**: Laravel 11.x
- **Base de Datos**: PostgreSQL 15+
- **Autenticación**: Laravel Sanctum
- **Procesamiento de Imágenes**: Intervention Image v3
- **Testing**: PHPUnit
- **PHP**: 8.2+
- **Storage**: Laravel Storage (Local/S3)
- **Cache**: Redis (opcional)

## 📋 Requisitos

- PHP 8.2 o superior
- Composer
- PostgreSQL 15 o superior
- Extensiones PHP: `pdo_pgsql`, `pgsql`, `mbstring`, `json`, `bcmath`, `gd`
- Node.js (para herramientas de desarrollo)

## 🚀 Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/OwensLopez211/constructora-temuco-backend.git
cd constructora-temuco-backend
```

### 2. Instalar dependencias
```bash
composer install
```

### 3. Configurar variables de entorno
```bash
cp .env.example .env
php artisan key:generate
```

### 4. Configurar base de datos
Editar `.env` con tus credenciales de PostgreSQL:
```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=constructora_temuco
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_contraseña
```

### 5. Configurar storage para imágenes
```bash
php artisan storage:link
mkdir -p storage/app/public/projects
```

### 6. Ejecutar migraciones y seeders
```bash
php artisan migrate --seed
```

### 7. Iniciar servidor de desarrollo
```bash
php artisan serve
```

La API estará disponible en `http://localhost:8000`

## ⚙️ Configuración

### Variables de Entorno Principales

```env
# Aplicación
APP_NAME="Constructora Temuco API"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

# Base de Datos
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=constructora_temuco
DB_USERNAME=postgres
DB_PASSWORD=

# Sanctum
SANCTUM_STATEFUL_DOMAINS=localhost,127.0.0.1,127.0.0.1:3000,::1,localhost:3000

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Configuración de Imágenes
FILESYSTEM_DISK=public
MAX_IMAGE_SIZE=10240
ALLOWED_IMAGE_TYPES=jpg,jpeg,png,webp
IMAGE_QUALITY=85
THUMBNAIL_SIZE=300
```

### Configuración para Testing

Crear `.env.testing`:
```env
DB_CONNECTION=pgsql
DB_DATABASE=constructora_temuco_test
FILESYSTEM_DISK=public
MAX_IMAGE_SIZE=10240
ALLOWED_IMAGE_TYPES=jpg,jpeg,png,webp
# ... otras configuraciones
```

## 📁 Estructura del Proyecto

```
app/
├── Http/
│   ├── Controllers/
│   │   └── Api/
│   │       ├── AuthController.php
│   │       ├── ProjectController.php
│   │       └── ProjectImageController.php
│   ├── Middleware/
│   │   └── CheckRole.php
│   └── Requests/
│       ├── Auth/
│       │   ├── LoginRequest.php
│       │   └── RegisterRequest.php
│       └── Project/
│           ├── StoreProjectRequest.php
│           ├── UpdateProjectRequest.php
│           └── UploadImagesRequest.php
├── Models/
│   ├── User.php
│   ├── Project.php
│   └── ProjectImage.php
└── Services/
    └── ImageService.php

database/
├── factories/
│   ├── UserFactory.php
│   └── ProjectFactory.php
├── migrations/
│   ├── create_users_table.php
│   ├── add_fields_to_users_table.php
│   ├── create_projects_table.php
│   └── create_project_images_table.php
└── seeders/
    ├── UserSeeder.php
    ├── ProjectSeeder.php
    └── DatabaseSeeder.php

tests/
├── Feature/
│   ├── AuthTest.php
│   ├── ProjectTest.php
│   ├── ProjectImageTest.php
│   └── ImageIntegrationTest.php
└── Unit/
    ├── ImageServiceTest.php
    └── ProjectImageModelTest.php
```

## 🌐 API Endpoints

### Autenticación
| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Registro de usuario | No |
| POST | `/api/auth/login` | Iniciar sesión | No |
| POST | `/api/auth/logout` | Cerrar sesión | Sí |
| GET | `/api/auth/me` | Obtener usuario actual | Sí |
| POST | `/api/auth/refresh` | Refrescar token | Sí |

### Proyectos
| Método | Endpoint | Descripción | Permisos |
|--------|----------|-------------|----------|
| GET | `/api/projects` | Lista de proyectos | Todos los autenticados |
| POST | `/api/projects` | Crear proyecto | Admin, Manager, Supervisor |
| GET | `/api/projects/{id}` | Obtener proyecto | Propietario o Manager+ |
| PUT | `/api/projects/{id}` | Actualizar proyecto | Propietario o Manager+ |
| DELETE | `/api/projects/{id}` | Eliminar proyecto | Admin, Manager |
| PUT | `/api/projects/{id}/progress` | Actualizar progreso | Propietario o Manager+ |
| GET | `/api/projects/statistics/summary` | Estadísticas | Todos los autenticados |
| GET | `/api/projects/options/form-data` | Opciones para formularios | Todos los autenticados |

### Imágenes de Proyectos
| Método | Endpoint | Descripción | Permisos |
|--------|----------|-------------|----------|
| GET | `/api/projects/{id}/images` | Lista de imágenes del proyecto | Propietario o Manager+ |
| POST | `/api/projects/{id}/images` | Subir imágenes (hasta 10) | Propietario o Manager+ |
| GET | `/api/projects/{id}/images/{imageId}` | Obtener imagen específica | Propietario o Manager+ |
| PUT | `/api/projects/{id}/images/{imageId}` | Actualizar imagen | Propietario o Manager+ |
| DELETE | `/api/projects/{id}/images/{imageId}` | Eliminar imagen | Propietario o Manager+ |
| PUT | `/api/projects/{id}/images/{imageId}/set-main` | Establecer como principal | Propietario o Manager+ |
| POST | `/api/projects/{id}/images/reorder` | Reordenar imágenes | Propietario o Manager+ |

### Filtros Disponibles (GET /api/projects)

- `type`: `gubernamental`, `privado`
- `status`: `planificacion`, `en_progreso`, `pausado`, `completado`, `cancelado`
- `location`: búsqueda por ubicación
- `user_id`: filtrar por usuario asignado
- `start_date_from`, `start_date_to`: rango de fechas
- `budget_min`, `budget_max`: rango de presupuesto
- `search`: búsqueda general
- `sort_by`: campo de ordenamiento
- `sort_direction`: `asc`, `desc`
- `per_page`: elementos por página (máx. 100)

## 👥 Sistema de Roles

### Roles Disponibles

| Rol | Descripción | Permisos |
|-----|-------------|----------|
| **Admin** | Administrador del sistema | Acceso completo a todos los recursos |
| **Manager** | Gerente de proyectos | Gestión completa de proyectos y usuarios |
| **Supervisor** | Supervisor de obras | Gestión de proyectos asignados |
| **Employee** | Empleado | Solo lectura de proyectos asignados |

### Matriz de Permisos

| Acción | Admin | Manager | Supervisor | Employee |
|--------|-------|---------|------------|----------|
| Ver todos los proyectos | ✅ | ✅ | ❌ | ❌ |
| Ver proyectos asignados | ✅ | ✅ | ✅ | ✅ |
| Crear proyectos | ✅ | ✅ | ✅ | ❌ |
| Editar cualquier proyecto | ✅ | ✅ | ❌ | ❌ |
| Editar proyectos asignados | ✅ | ✅ | ✅ | ❌ |
| Eliminar proyectos | ✅ | ✅ | ❌ | ❌ |
| Subir/gestionar imágenes | ✅ | ✅ | ✅ | ❌ |
| Asignar usuarios | ✅ | ✅ | ❌ | ❌ |
| Ver estadísticas globales | ✅ | ✅ | ❌ | ❌ |

## 📷 Gestión de Imágenes

### Características del Sistema de Imágenes

- **Upload múltiple**: Hasta 10 imágenes por request
- **Optimización automática**: Redimensionamiento y compresión
- **Thumbnails**: Generación automática de miniaturas
- **Formatos soportados**: JPG, JPEG, PNG, WebP
- **Tamaño máximo**: 10MB por imagen
- **Dimensiones máximas**: 4000x4000 píxeles
- **Gestión de imagen principal**: Una imagen destacada por proyecto
- **Reordenamiento**: Sistema de orden personalizable
- **URLs públicas**: Acceso directo a las imágenes

### Configuración de Imágenes

```env
MAX_IMAGE_SIZE=10240          # 10MB en KB
ALLOWED_IMAGE_TYPES=jpg,jpeg,png,webp
IMAGE_QUALITY=85              # Calidad JPEG (1-100)
THUMBNAIL_SIZE=300            # Tamaño de thumbnail en píxeles
```

### Estructura de Almacenamiento

```
storage/app/public/projects/
├── project_1/
│   ├── uuid-1.jpg
│   ├── thumb_uuid-1.jpg
│   ├── uuid-2.png
│   └── thumb_uuid-2.png
├── project_2/
│   └── ...
```

## 🗃️ Base de Datos

### Tablas Principales

#### Users
```sql
- id (bigint, PK)
- name (varchar)
- email (varchar, unique)
- password (varchar)
- role (enum: admin, manager, supervisor, employee)
- is_active (boolean)
- phone (varchar, nullable)
- position (varchar, nullable)
- timestamps
```

#### Projects
```sql
- id (bigint, PK)
- name (varchar)
- description (text, nullable)
- type (enum: gubernamental, privado)
- status (enum: planificacion, en_progreso, pausado, completado, cancelado)
- location (varchar)
- budget (decimal 15,2, nullable)
- start_date (date, nullable)
- end_date (date, nullable)
- estimated_end_date (date, nullable)
- client_name (varchar)
- client_contact (varchar, nullable)
- user_id (bigint, FK to users)
- progress_percentage (integer, default 0)
- notes (text, nullable)
- is_active (boolean, default true)
- timestamps
- soft_deletes
```

#### Project_Images
```sql
- id (bigint, PK)
- project_id (bigint, FK to projects)
- filename (varchar)
- original_name (varchar)
- path (varchar)
- thumbnail_path (varchar, nullable)
- size (bigint)
- mime_type (varchar)
- width (integer, nullable)
- height (integer, nullable)
- is_main (boolean, default false)
- order (integer, default 0)
- description (varchar, nullable)
- timestamps
```

### Relaciones

- **User** `hasMany` **Projects**
- **Project** `belongsTo` **User**
- **Project** `hasMany` **ProjectImages**
- **ProjectImage** `belongsTo` **Project**

## 🧪 Testing

### Suite de Tests Completa

El proyecto incluye una suite completa de tests automatizados con **95%+ de cobertura**:

#### Tests de Feature (API Endpoints)
- ✅ **AuthTest**: Login, registro, logout, perfiles
- ✅ **ProjectTest**: CRUD completo, validaciones, permisos
- ✅ **ProjectImageTest**: Upload, gestión y manipulación de imágenes
- ✅ **ImageIntegrationTest**: Workflows completos de imágenes

#### Tests Unitarios
- ✅ **ImageServiceTest**: Validación, optimización, y utilidades
- ✅ **ProjectImageModelTest**: Modelo, relaciones y business logic

### Ejecutar Tests

```bash
# Todos los tests
php artisan test

# Tests específicos por categoría
php artisan test tests/Feature/AuthTest.php
php artisan test tests/Feature/ProjectTest.php
php artisan test tests/Feature/ProjectImageTest.php

# Tests unitarios
php artisan test tests/Unit/

# Tests de imágenes solamente
php artisan test --filter=Image

# Tests con cobertura de código
php artisan test --coverage

# Tests en paralelo (más rápido)
php artisan test --parallel
```

### Configuración de Testing

Los tests utilizan:
- **Base de datos separada** (`constructora_temuco_test`)
- **RefreshDatabase** para aislamiento entre tests
- **Storage fake** para tests de imágenes
- **Factory patterns** para datos de prueba
- **Mocking** para servicios externos

### Scripts de Testing Automatizado

```bash
# Ejecutar suite completa de tests de imágenes
./tests/run_image_tests.sh

# Makefile para comandos rápidos
make test                    # Todos los tests
make test-images            # Solo tests de imágenes
make test-coverage          # Tests con cobertura
```

## 📖 Uso

### Autenticación

```bash
# Registro de usuario
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@constructoratemuco.cl",
    "password": "password123",
    "password_confirmation": "password123"
  }'

# Login
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@constructoratemuco.cl",
    "password": "Admin123!"
  }'
```

### Gestión de Proyectos

```bash
# Obtener proyectos
curl -X GET http://localhost:8000/api/projects \
  -H "Authorization: Bearer YOUR_TOKEN"

# Crear proyecto
curl -X POST http://localhost:8000/api/projects \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Proyecto Ejemplo",
    "type": "gubernamental",
    "location": "Temuco",
    "client_name": "Municipalidad de Temuco"
  }'

# Filtrar proyectos
curl -X GET "http://localhost:8000/api/projects?type=gubernamental&status=en_progreso" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Gestión de Imágenes

```bash
# Subir imágenes a un proyecto
curl -X POST http://localhost:8000/api/projects/1/images \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "images[]=@imagen1.jpg" \
  -F "images[]=@imagen2.png" \
  -F "descriptions[]=Fachada principal" \
  -F "descriptions[]=Interior" \
  -F "main_image_index=0"

# Obtener imágenes de un proyecto
curl -X GET http://localhost:8000/api/projects/1/images \
  -H "Authorization: Bearer YOUR_TOKEN"

# Establecer imagen principal
curl -X PUT http://localhost:8000/api/projects/1/images/5/set-main \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 🔧 Comandos Útiles

```bash
# Limpiar caché
php artisan config:clear
php artisan cache:clear
php artisan route:clear

# Ver rutas disponibles
php artisan route:list
php artisan route:list --path=api/projects

# Recrear base de datos
php artisan migrate:fresh --seed

# Storage y enlaces
php artisan storage:link

# Tests y calidad de código
php artisan test
php artisan test --coverage
./vendor/bin/pint  # Formateo de código

# Limpiar imágenes huérfanas
php artisan tinker
>>> app(\App\Services\ImageService::class)->cleanOrphanImages();
```

## 📊 Seeders Incluidos

El proyecto incluye datos de prueba realistas:

### Usuarios de Prueba
- **Admin**: `admin@constructoratemuco.cl` (Admin123!)
- **Gerente**: `gerente@constructoratemuco.cl` (Gerente123!)
- **Supervisor**: `supervisor@constructoratemuco.cl` (Super123!)

### Proyectos de Ejemplo
- Hospital Regional Temuco - Fase 2 (Gubernamental)
- Condominio Los Robles Premium (Privado)
- Centro Comercial Plaza Araucanía (Completado)
- Escuela Básica Intercultural Mapuche (En Progreso)
- +30 proyectos adicionales generados automáticamente

## 🚦 Estados del Proyecto

- **Planificación**: Proyecto en fase de diseño
- **En Progreso**: Construcción activa
- **Pausado**: Temporalmente detenido
- **Completado**: Proyecto finalizado
- **Cancelado**: Proyecto cancelado

## 📈 Características Avanzadas

### Sistema de Imágenes
- **Optimización automática**: Redimensionamiento inteligente
- **Compresión avanzada**: Calidad optimizada vs tamaño
- **Detección de formato**: Soporte para múltiples formatos
- **Gestión de thumbnails**: Miniaturas automáticas
- **Limpieza automática**: Eliminación de archivos huérfanos

### Cálculos Automáticos
- **Días restantes**: Calculado desde fecha estimada de finalización
- **Estado de atraso**: Detección automática de proyectos retrasados
- **Progreso automático**: Cambio de estado basado en porcentaje de avance

### Validaciones Robustas
- Validación de fechas lógicas (fin después de inicio)
- Restricciones de presupuesto y porcentajes
- Validación de tipos y estados permitidos
- Validaciones de archivos e imágenes
- Mensajes de error en español

### Optimizaciones
- Paginación inteligente (máximo 100 elementos)
- Índices de base de datos optimizados
- Queries eficientes con Eloquent
- Transformación de datos consistente
- Cache de configuraciones

## 🔒 Seguridad

- **Laravel Sanctum** para autenticación API
- **Middleware de roles** para control de acceso granular
- **Validación de entrada** en todas las requests
- **Soft deletes** para mantener integridad de datos
- **Sanitización** de datos de entrada y archivos
- **Validación de archivos** con tipo MIME y extensión
- **Límites de tamaño** configurables por tipo de archivo

## 🌟 Características Implementadas

- ✅ Sistema de autenticación completo
- ✅ CRUD de proyectos con validaciones
- ✅ Sistema de roles y permisos
- ✅ Gestión completa de imágenes
- ✅ API RESTful documentada
- ✅ Testing automatizado (95%+ cobertura)
- ✅ Optimización de imágenes
- ✅ Sistema de thumbnails
- ✅ Filtros avanzados
- ✅ Paginación optimizada
- ✅ Seeders con datos realistas

## 🚧 Próximas Características

- [ ] Filtros geográficos avanzados
- [ ] Sistema de notificaciones en tiempo real
- [ ] Reportes en PDF
- [ ] Dashboard con gráficos interactivos
- [ ] API de geolocalización
- [ ] Integración con servicios de mapas
- [ ] Sistema de comentarios en proyectos
- [ ] Versionado de documentos
- [ ] Backup automático de imágenes

## 📝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -am 'Agrega nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

### Estándares de Código

- Seguir **PSR-12** para estilo de código PHP
- Escribir **tests** para nuevas funcionalidades
- Documentar métodos y clases importantes
- Usar nombres descriptivos en español para variables de negocio
- **95%+ cobertura** de tests requerida
- Validar archivos con **Laravel Pint**

### Guía de Desarrollo

```bash
# Setup para desarrollo
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate:fresh --seed
php artisan storage:link

# Antes de commit
./vendor/bin/pint           # Formatear código
php artisan test            # Ejecutar tests
php artisan test --coverage # Verificar cobertura
```

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Owens López**
- GitHub: [@OwensLopez211](https://github.com/OwensLopez211)
- Email: owenslopez211@gmail.com

## 🙏 Reconocimientos

- **Laravel Framework** por la robustez y elegancia
- **Intervention Image** por el procesamiento de imágenes
- **PostgreSQL** por su robustez y confiabilidad
- **PHPUnit** por el framework de testing
- **Comunidad de desarrolladores** de La Araucanía

---

**Constructora Temuco Backend API** - Desarrollado con ❤️ en Temuco, Chile

## 📊 Estadísticas del Proyecto

- **Cobertura de tests**: 95%+
- **Endpoints API**: 22
- **Modelos**: 3 principales
- **Tests automatizados**: 42+
- **Tiempo de desarrollo**: 5 etapas completadas
- **Compatibilidad**: Laravel 11.x, PHP 8.2+