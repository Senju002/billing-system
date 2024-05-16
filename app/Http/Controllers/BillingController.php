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
        // dd($request);
        return Inertia::render('Billing/Billing', [
            'filters' => $request->only('search', 'status'),  // Include 'status' in the filters
            'data' => Billing::with(['owner', 'createdBy'])
                ->when($request->has('search'), function ($query) use ($request) {
                    $searchTerm = $request->input('search');
                    $query->whereHas('owner', function ($subQuery) use ($searchTerm) {
                        $subQuery->where('owner_name', 'like', "%$searchTerm%");
                    });
                })
                ->when($request->filled('status'), function ($query) use ($request) {  // Check if 'status' is not only present but also filled
                    $status = $request->input('status');
                    $query->where('status', $status);
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
            'due_date' => 'required|date',
            'fine' => 'required|integer|min:1|max:999999999999999',
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

    public function edit(Billing $billing, Request $request)
    {
        $owner_data = ApartmentOwner::pluck('owner_name', 'id')->map(function ($ownerName, $apartementId) {
            return ['label' => $ownerName, 'value' => $apartementId];
        })->prepend(['label' => 'Pilih Owner', 'value' => ''])->values()->toArray();

        return Inertia::render('Billing/EditBilling', [
            "billingData" => $billing->find($request->id),
            'ownerData' => $owner_data,
        ]);
    }

    public function update(Request $request, $id)
    {
        $billing = Billing::findOrFail($id);
        // Define the base validation rules
        $rules = [
            'billing_date' => 'required|date',
            'due_date' => 'required|date',
            'fine' => 'required|integer|min:1|max:999999999999999',
            'billing_type' => 'required|string|in:Air,Listrik,Parkir,Maintenance',
            'billing_fee' => 'required|integer|min:1|max:999999999999999',
            'owner_id' => 'required|integer',
            'status' => 'required|string|in:Success,Cancel,Pending',
        ];

        // Conditionally add the meter_reading validation if billing_type is Air or Listrik
        if (in_array($request->input('billing_type'), ['Air', 'Listrik'])) {
            $rules['meter_reading'] = 'required|integer|min:1|max:999999999999999';
        }

        // Conditionally add the paid_date validation if status is Success
        if ($request->input('status') === 'Success') {
            $rules['paid_date'] = 'required|date';
        }

        // Validate the incoming data with the dynamically adjusted rules
        $validatedData = $request->validate($rules);

        // Set meter_reading to null if billing_type is Parkir or Maintenance
        if (in_array($request->input('billing_type'), ['Parkir', 'Maintenance'])) {
            $validatedData['meter_reading'] = null;
        }

        if ($request->input('status') !== 'Success') {
            $validatedData['paid_date'] = null;
            $validatedData['is_paid'] = 0;
        } else {
            $validatedData['is_paid'] = 1;
        }

        // dd($validatedData); // Debugging the validated data

        // Update the billing record
        $billing->update($validatedData);

        return redirect('/billing')->with('success', 'Billing data has been updated!');
    }
}
