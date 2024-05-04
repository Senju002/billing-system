<?php

namespace Database\Seeders;

use App\Models\Apartment;
use Faker\Factory as Faker;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ApartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        // Define the number of apartments you want to generate
        $numberOfApartments = 10;

        for ($i = 0; $i < $numberOfApartments; $i++) {
            // Generate fake data for each apartment
            Apartment::create([
                'name' => $faker->company,
                'address' => $faker->address,
                'role' => 'SUPER ADMIN',
                'created_by' => 1,
            ]);
        }
    }
}
