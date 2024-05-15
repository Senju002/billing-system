<?php

namespace App\Http\Controllers;

use App\Models\ApartmentOwner;
use App\Models\Billing;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BillingController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Billing/Billing', [
            'filters' => $request->only('search'),
            'data' => Billing::with(['owner', 'createdBy'])
                ->when($request->has('search'), function ($query) use ($request) {
                    $searchTerm = $request->input('search');
                    $query->whereHas('owner', function ($subQuery) use ($searchTerm) {
                        $subQuery->where('owner_name', 'like', "%$searchTerm%");
                    });
                })
                ->orderByDesc('id')
                ->paginate(10),
        ]);
    }

    public function add()
    {

        $owner_data = ApartmentOwner::pluck('owner_name', 'id')->map(function ($ownerName, $apartementId) {
            return ['label' => $ownerName, 'value' => $apartementId];
        })->prepend(['label' => 'Pilih Owner', 'value' => ''])->values()->toArray();


        return Inertia::render("Billing/AddBilling", [
            'ownerData' => $owner_data,
        ]);
    }

    public function store(Request $request)
    {
        // Define the base validation rules
        $rules = [
            'billing_date' => 'required|date',
            'billing_type' => 'required|string|in:Air,Listrik,Parkir,Maintenance',
            'billing_fee' => 'required|integer|min:1|max:999999999999999',
            'owner_id' => 'required|integer',
        ];

        // Conditionally add the meter_reading validation if billing_type is Air or Listrik
        if (in_array($request->input('billing_type'), ['Air', 'Listrik'])) {
            $rules['meter_reading'] = 'required|integer|min:1|max:999999999999999';
        }

        // Validate the incoming data with the dynamically adjusted rules
        $validatedData = $request->validate($rules);

        // Add user_id to the validated data from the authenticated user
        $validatedData['created_by'] = Auth::id();

        // Store the validated data in the billing table
        $billing = Billing::create($validatedData);

        return redirect('/billing')->with('success', 'New Billing has been created!');
    }
}
