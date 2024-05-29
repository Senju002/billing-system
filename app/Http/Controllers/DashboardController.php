<?php

namespace App\Http\Controllers;

use App\Models\Apartment;
use App\Models\Billing;
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

        //! Fetch the latest 10 successful billings ordered by descending ID
        $paidData = Billing::where('status', 'success')
            ->with('owner') // Eager load the 'owner' relationship
            ->orderBy('id', 'desc')
            ->take(10)
            ->get();

        //! Fetch the latest 10 pending billings ordered by descending ID
        $unpaidData = Billing::where('status', 'pending')
            ->where('due_date', '>=', today()) // Add the due date condition
            ->with('owner') // Eager load the 'owner' relationship
            ->orderBy('id', 'desc')
            ->take(10)
            ->get();

        $penaltyData = Billing::where('status', 'pending')
            ->where('due_date', '<', today()) // Add the due date condition
            ->with('owner') // Eager load the 'owner' relationship
            ->orderBy('id', 'desc')
            ->take(10)
            ->get();

        return Inertia::render('Dashboard/Dashboard', [
            'data' => $data,
            'paidData' => $paidData,
            'unpaidData' => $unpaidData,
            'penaltyData' => $penaltyData
        ]);
    }
}
