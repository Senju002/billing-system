<?php

namespace Database\Seeders;

use App\Models\ApartmentOwner;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;


class ApartmentOwnerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        // Define the number of apartment owners you want to generate
        $numberOfOwners = 10;

        for ($i = 0; $i < $numberOfOwners; $i++) {
            // Generate fake data for each apartment owner
            ApartmentOwner::create([
                'owner_name' => $faker->name,
                'phone' => $faker->phoneNumber,
                'email' => $faker->unique()->safeEmail,
                'identity_no' => $faker->randomNumber(8),
                'apartment_id' => $faker->numberBetween(1, 2), // Assuming there are 3 apartments
                'room_no' => $faker->numberBetween(1, 100), // Assuming there are 100 rooms
                'created_by' => $faker->numberBetween(1, 1), // Assuming there are 10 users
            ]);
        }
    }
}
