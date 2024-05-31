<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;


class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Admin A',
            'email' => 'podomoro@gmail.com',
            'role' => 'ADMIN',
            'password' => Hash::make('Password123'),
            'email_verified_at' => now(),
            'apartment_id' => 1,
        ]);

        User::create([
            'name' => 'Admin B',
            'email' => 'marriot@gmail.com',
            'role' => 'ADMIN',
            'password' => Hash::make('Password123'),
            'email_verified_at' => now(),
            'apartment_id' => 2,
        ]);
    }
}
