<?php

namespace Database\Factories;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProjectFactory extends Factory
{
    protected $model = Project::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->randomElement([
                'Construcción Edificio Residencial Los Andes',
                'Proyecto Habitacional Vista Hermosa',
                'Centro Comercial Plaza Temuco',
                'Complejo Deportivo Municipal',
                'Remodelación Hospital Regional',
                'Construcción Escuela Básica',
                'Edificio Corporativo Torre Norte',
                'Parque Industrial Sur',
                'Condominios Los Robles',
                'Centro de Salud Familiar'
            ]),
            'description' => $this->faker->paragraph(3),
            'type' => $this->faker->randomElement(['gubernamental', 'privado']),
            'status' => $this->faker->randomElement([
                'planificacion',
                'en_progreso',
                'pausado',
                'completado'
            ]),
            'location' => $this->faker->randomElement([
                'Temuco Centro',
                'Pedro de Valdivia',
                'Labranza',
                'Padre Las Casas',
                'Nueva Imperial',
                'Freire',
                'Vilcún',
                'Lautaro',
                'Perquenco',
                'Galvarino'
            ]),
            'budget' => $this->faker->randomFloat(2, 50000000, 2000000000),
            'start_date' => $this->faker->dateTimeBetween('-6 months', 'now'),
            'end_date' => null,
            'estimated_end_date' => $this->faker->dateTimeBetween('now', '+1 year'),
            'client_name' => $this->faker->randomElement([
                'Municipalidad de Temuco',
                'Gobierno Regional de La Araucanía',
                'Constructora del Sur SpA',
                'Inmobiliaria Los Andes Ltda',
                'SERVIU Araucanía',
                'Universidad de La Frontera',
                'Hospital Regional de Temuco',
                'Corporación de Desarrollo',
                'Empresa Privada XYZ',
                'Fundación Social Araucanía'
            ]),
            'client_contact' => $this->faker->phoneNumber(),
            'user_id' => User::factory(),
            'progress_percentage' => $this->faker->numberBetween(0, 100),
            'notes' => $this->faker->optional()->paragraph(),
            'is_active' => true,
        ];
    }

    public function governmental()
    {
        return $this->state([
            'type' => 'gubernamental',
            'client_name' => 'Municipalidad de Temuco',
        ]);
    }

    public function private()
    {
        return $this->state([
            'type' => 'privado',
            'client_name' => 'Constructora del Sur SpA',
        ]);
    }

    public function inProgress()
    {
        return $this->state([
            'status' => 'en_progreso',
            'progress_percentage' => $this->faker->numberBetween(1, 99),
        ]);
    }

    public function completed()
    {
        return $this->state([
            'status' => 'completado',
            'progress_percentage' => 100,
        ]);
    }

    public function planning()
    {
        return $this->state([
            'status' => 'planificacion',
            'progress_percentage' => 0,
        ]);
    }
}