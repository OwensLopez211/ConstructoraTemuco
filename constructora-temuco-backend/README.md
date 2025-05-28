# Backend API - Constructora Temuco

API RESTful desarrollada con Laravel para la gestión de proyectos de construcción, diseñada específicamente para empresas constructoras en la región de La Araucanía, Chile.

## 🚀 Características Principales

- **Sistema de autenticación** completo con Laravel Sanctum
- **Gestión de proyectos** con tipos gubernamentales y privados
- **Sistema de roles** jerárquico (Admin, Manager, Supervisor, Employee)
- **API RESTful** con documentación completa
- **Base de datos PostgreSQL** para máximo rendimiento
- **Testing automatizado** con PHPUnit
- **Validaciones robustas** con mensajes en español
- **Filtrado avanzado** y paginación optimizada

## 📋 Tabla de Contenidos

- [Tecnologías](#tecnologías)
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [API Endpoints](#api-endpoints)
- [Sistema de Roles](#sistema-de-roles)
- [Base de Datos](#base-de-datos)
- [Testing](#testing)
- [Uso](#uso)
- [Contribución](#contribución)

## 🛠️ Tecnologías

- **Framework**: Laravel 11.x
- **Base de Datos**: PostgreSQL 15+
- **Autenticación**: Laravel Sanctum
- **Testing**: PHPUnit
- **PHP**: 8.2+
- **Cache**: Redis (opcional)

## 📋 Requisitos

- PHP 8.2 o superior
- Composer
- PostgreSQL 15 o superior
- Extensiones PHP: `pdo_pgsql`, `pgsql`, `mbstring`, `json`, `bcmath`

## 🚀 Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/constructora-temuco-backend.git
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

### 5. Ejecutar migraciones y seeders
```bash
php artisan migrate --seed
```

### 6. Iniciar servidor de desarrollo
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
```

### Configuración para Testing

Crear `.env.testing`:
```env
DB_CONNECTION=pgsql
DB_DATABASE=constructora_temuco_test
# ... otras configuraciones
```

## 📁 Estructura del Proyecto

```
app/
├── Http/
│   ├── Controllers/
│   │   └── Api/
│   │       ├── AuthController.php
│   │       └── ProjectController.php
│   ├── Middleware/
│   │   └── CheckRole.php
│   └── Requests/
│       ├── Auth/
│       │   ├── LoginRequest.php
│       │   └── RegisterRequest.php
│       └── Project/
│           ├── StoreProjectRequest.php
│           └── UpdateProjectRequest.php
├── Models/
│   ├── User.php
│   ├── Project.php
│   └── ProjectImage.php
└── Services/

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
│   └── ProjectTest.php
└── Unit/
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
| Asignar usuarios | ✅ | ✅ | ❌ | ❌ |
| Ver estadísticas globales | ✅ | ✅ | ❌ | ❌ |

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
- size (bigint)
- mime_type (varchar)
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

### Ejecutar Tests

```bash
# Todos los tests
php artisan test

# Tests específicos
php artisan test tests/Feature/AuthTest.php
php artisan test tests/Feature/ProjectTest.php

# Tests con cobertura
php artisan test --coverage
```

### Configuración de Testing

El proyecto incluye tests automatizados para:

- ✅ **Autenticación**: Login, registro, logout, perfiles
- ✅ **Proyectos**: CRUD completo, validaciones, permisos
- ✅ **Filtros**: Búsqueda y filtrado de proyectos
- ✅ **Estadísticas**: Métricas de proyectos
- ✅ **Permisos**: Verificación de roles y accesos

### Base de Datos de Testing

Los tests utilizan una base de datos separada (`constructora_temuco_test`) con `RefreshDatabase` para garantizar aislamiento entre tests.

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

## 🔧 Comandos Útiles

```bash
# Limpiar caché
php artisan config:clear
php artisan cache:clear
php artisan route:clear

# Ver rutas
php artisan route:list

# Recrear base de datos
php artisan migrate:fresh --seed

# Generar documentación API
php artisan route:list --path=api
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

### Cálculos Automáticos
- **Días restantes**: Calculado desde fecha estimada de finalización
- **Estado de atraso**: Detección automática de proyectos retrasados
- **Progreso automático**: Cambio de estado basado en porcentaje de avance

### Validaciones Robustas
- Validación de fechas lógicas (fin después de inicio)
- Restricciones de presupuesto y porcentajes
- Validación de tipos y estados permitidos
- Mensajes de error en español

### Optimizaciones
- Paginación inteligente (máximo 100 elementos)
- Índices de base de datos optimizados
- Queries eficientes con Eloquent
- Transformación de datos consistente

## 🔒 Seguridad

- **Laravel Sanctum** para autenticación API
- **Middleware de roles** para control de acceso
- **Validación de entrada** en todas las requests
- **Soft deletes** para mantener integridad de datos
- **Sanitización** de datos de entrada

## 🌟 Próximas Características

- [ ] Subida de imágenes de proyectos
- [ ] Sistema de notificaciones
- [ ] Reportes en PDF
- [ ] Dashboard con gráficos
- [ ] API de geolocalización
- [ ] Integración con servicios externos

## 📝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -am 'Agrega nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

### Estándares de Código

- Seguir PSR-12 para estilo de código PHP
- Escribir tests para nuevas funcionalidades
- Documentar métodos y clases importantes
- Usar nombres descriptivos en español para variables de negocio

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Tu Nombre**
- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- Email: tu-email@ejemplo.com

## 🙏 Reconocimientos

- Laravel Framework
- Comunidad de desarrolladores de La Araucanía
- PostgreSQL por su robustez y confiabilidad

---

**Constructora Temuco Backend API** - Desarrollado con ❤️ en Temuco, Chile