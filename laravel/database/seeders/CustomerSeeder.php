<?php

namespace Database\Seeders;

use App\Models\Customer;
use Faker\Factory as faker;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = faker::create();
        $customer = new Customer();
        $customer->name = 'Ashish';
        $customer->country = 'Hungary';
        $customer->is_active = 1;

        $customer->save();
        for ($i=1; $i<=40; $i++){

            $customer = new Customer();
            $customer->name = $faker->name;
            $customer->country = 'Hungary';
            $customer->is_active = 1;

            $customer->save();
        }

    }
}
