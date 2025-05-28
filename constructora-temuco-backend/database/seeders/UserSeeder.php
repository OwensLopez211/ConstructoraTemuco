<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Usuario administrador
        User::create([
            'name' => 'Administrador Constructora',
            'email' => 'admin@constructoratemuco.cl',
            'password' => Hash::make('Admin123!'),
            'role' => 'admin',
            'is_active' => true,
            'phone' => '+56912345678',
            'position' => 'Administrador General',
        ]);

        // Usuario gerente
        User::create([
            'name' => 'Gerente Proyectos',
            'email' => 'gerente@constructoratemuco.cl',
            'password' => Hash::make('Gerente123!'),
            'role' => 'manager',
            'is_active' => true,
            'phone' => '+56987654321',
            'position' => 'Gerente de Proyectos',
        ]);

        // Usuario supervisor
        User::create([
            'name' => 'Supervisor Obras',
            'email' => 'supervisor@constructoratemuco.cl',
            'password' => Hash::make('Super123!'),
            'role' => 'supervisor',
            'is_active' => true,
            'phone' => '+56955555555',
            'position' => 'Supervisor de Obras',
        ]);
    }
}