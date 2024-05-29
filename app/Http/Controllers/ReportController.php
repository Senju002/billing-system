<?php

namespace App\Http\Controllers;

use App\Models\ApartmentOwner;
use Illuminate\Http\Request;
use App\Models\Billing;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function showPaid(Request $request)
    {
        return Inertia::render('Report/PaidReport', [
            'filters' => $request->only('search'),
            'data' => Billing::with(['owner', 'createdBy'])
                ->where('status', 'success')  // Only include records where status is "success"
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

    public function showUnpaid(Request $request)
    {
        return Inertia::render('Report/UnpaidReport', [
            'filters' => $request->only('search'),  // Remove 'status' from the filters
            'data' => Billing::with(['owner', 'createdBy'])
                ->where('status', 'pending')  // Only include records where status is "pending"
                ->where('due_date', '>=', today()) // Only include records where due_date is today or in the future
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

    public function showPenalties(Request $request)
    {
        return Inertia::render('Report/PenaltiesReport', [
            'filters' => $request->only('search'),  // Remove 'status' from the filters
            'data' => Billing::with(['owner', 'createdBy'])
                ->where('status', 'pending')  // Only include records where status is "pending"
                ->where('due_date', '<', today()) // Only include records where due_date is today or in the future
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

    public function ownerReport(Request $request)
    {

        return Inertia::render('Report/OwnerReport', [
            'filters' => $request->only('search'),
            'data' => ApartmentOwner::with(['apartment', 'createdBy']) // Eager load the apartment and createdBy relationships
                ->when($request->has('search'), function ($query) use ($request) {
                    $query->where('owner_name', 'like', "%" . $request->input('search') . "%");
                })
                ->orderByDesc('id')
                ->paginate(10),
        ]);
    }

    public function show(Request $request)
    {
        // Retrieve the user_id from the request
        $userId = $request->id;

        // Fetch the owner name based on the user_id
        $ownerName = ApartmentOwner::where('id', $userId)->value('owner_name');

        // Fetch all billing records where user_id equals owner_id and order by billing_date in descending order, with pagination
        $data = Billing::where('owner_id', $userId)
            ->orderBy('billing_date', 'desc')
            ->with('owner') // Eager load the owner relationship
            ->paginate(10);


        // Pass the fetched data to the Inertia component
        return Inertia::render('Report/OwnerBillingHistory', [
            "data" => $data,
            'filters' => $request->only('search', 'status'),  // Include 'status' in the filters
            'ownerId' => $userId,
            'ownerName' => $ownerName,
        ]);
    }
}
