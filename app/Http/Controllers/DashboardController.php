<?php

namespace App\Http\Controllers;

use App\Models\Apartment;
use Inertia\Inertia;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        // Fetch apartments with the count of their owners
        $apartments = Apartment::withCount('owners')->get();

        // Prepare the data in the desired format
        $data = $apartments->map(function ($apartment) {
            return [
                'apartment_name' => $apartment->name,
                'owner_count' => $apartment->owners_count
            ];
        });

        // Return the data to the Inertia view
        return Inertia::render('Dashboard/Dashboard', [
            'data' => $data
        ]);
    }
}
