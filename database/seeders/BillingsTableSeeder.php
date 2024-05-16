<?php

namespace Database\Seeders;

use App\Models\Billing;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;



class BillingsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        $billingTypes = ['Air', 'Listrik', 'Maintenance', 'Parkir'];

        foreach (range(1, 20) as $index) {
            $billingType = $faker->randomElement($billingTypes);
            $meterReading = in_array($billingType, ['Air', 'Listrik']) ? $faker->numberBetween(100, 1000) : null;
            $ownerId = $faker->numberBetween(1, 5);
            $billingDate = $faker->dateTimeBetween('-2 months', 'now')->format('Y-m-d'); // Store the generated billing date


            Billing::create([
                'billing_type' => $billingType,
                'billing_fee' => $faker->numberBetween(10000, 100000),
                'billing_date' => $billingDate, // Use the stored billing date
                'owner_id' => $ownerId,
                'meter_reading' => $meterReading,
                'is_paid' => false,
                'paid_date' => null,
                'status' => 'Pending',
                'fine' => '50000',
                'due_date' => date('Y-m-d', strtotime($billingDate . ' +1 week')), // Calculate due date
                'created_by' => 1,
            ]);
        }
    }
}
