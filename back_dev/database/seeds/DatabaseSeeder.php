<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        //ADD ADMIN ROLES
        $arr = ['Super Admin', 'Administrator', 'Encoder'];
        foreach($arr as $row){
            \App\Role::create([
                'name' => $row,
                'created_by' => 1,
                'updated_by' => 1
            ]);
        }

        //ADD SUPER ADMIN USER
        \App\User::create(['last_name' => 'Super Admin','first_name' => 'Super Admin','email' => 'a@a.com','password' => bcrypt('secret'),'role_id' => 1]);



    }
}
