<?php

namespace Database\Seeders;

use App\Models\Channel;
use App\Models\Customer;
use Faker\Factory as faker;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ChannelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = faker::create();
        for ($i=1; $i<=40; $i++){

            $channel = new Channel();
            $customer = Customer::where('id',40)->get();

            $channel->customer_id = 1;
            $channel->name = $faker->name;
            $channel->customer_name= 'Ashish';
            $channel->primary_locale= 'EN';
            $channel->currency= 'USD';
            $channel->store_url= 'url';
            $channel->api_type= 'Shopify';


            $channel->api_data = '';
            $channel->is_active= 1;

            $channel->save();
        }
    }
}
