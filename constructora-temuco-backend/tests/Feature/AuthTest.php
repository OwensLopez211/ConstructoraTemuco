<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Hash;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Crear usuario de prueba
        $this->user = User::create([
            'name' => 'Test User',
            'email' => 'test@constructoratemuco.cl',
            'password' => Hash::make('password123'),
            'role' => 'admin',
            'is_active' => true,
            'phone' => '+56912345678',
            'position' => 'Admin Test',
        ]);
    }

    #[Test]
    public function api_is_working(): void
    {
        $response = $this->getJson('/api/test');

        $response->assertStatus(200)
                ->assertJson([
                    'message' => 'API Constructora Temuco funcionando correctamente'
                ]);
    }

    #[Test]
    public function user_can_login_with_valid_credentials(): void
    {
        $response = $this->postJson('/api/auth/login', [
            'email' => 'test@constructoratemuco.cl',
            'password' => 'password123',
        ]);

        $response->assertStatus(200)
                ->assertJsonStructure([
                    'success',
                    'message',
                    'data' => [
                        'user' => [
                            'id', 'name', 'email', 'role'
                        ],
                        'token'
                    ]
                ]);
    }

    #[Test]
    public function user_cannot_login_with_invalid_credentials(): void
    {
        $response = $this->postJson('/api/auth/login', [
            'email' => 'test@constructoratemuco.cl',
            'password' => 'wrong_password',
        ]);

        $response->assertStatus(422)
                ->assertJsonValidationErrors(['email']);
    }

    #[Test]
    public function user_can_register(): void
    {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'New User',
            'email' => 'newuser@constructoratemuco.cl',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertStatus(201)
                ->assertJsonStructure([
                    'success',
                    'message',
                    'data' => [
                        'user',
                        'token'
                    ]
                ]);

        $this->assertDatabaseHas('users', [
            'email' => 'newuser@constructoratemuco.cl'
        ]);
    }

    #[Test]
    public function authenticated_user_can_get_profile(): void
    {
        $token = $this->user->createToken('test-token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->getJson('/api/auth/me');

        $response->assertStatus(200)
                ->assertJson([
                    'success' => true,
                    'data' => [
                        'user' => [
                            'email' => 'test@constructoratemuco.cl'
                        ]
                    ]
                ]);
    }

    #[Test]
    public function user_can_logout(): void
    {
        $token = $this->user->createToken('test-token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->postJson('/api/auth/logout');

        $response->assertStatus(200)
                ->assertJson([
                    'success' => true,
                    'message' => 'Logout exitoso'
                ]);
    }
}