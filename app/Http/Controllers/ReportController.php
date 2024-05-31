<?php

namespace App\Http\Controllers;

use App\Models\ApartmentOwner;
use Illuminate\Http\Request;
use App\Models\Billing;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class ReportController extends Controller
{
    public function showPaid(Request $request)
    {
        $user = Auth::user();
        $role = $user->role;
        return Inertia::render('Report/PaidReport', [
            'filters' => $request->only('search'),
            'data' => Billing::with(['owner', 'createdBy'])
                ->where('status', 'success')  // Only include records where status is "success"
                ->when($role !== 'SUPER ADMIN', function ($query) use ($user) {
                    return $query->where('apartment_id', $user->apartment_id);
                })
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
        $user = Auth::user();
        $role = $user->role;
        return Inertia::render('Report/UnpaidReport', [
            'filters' => $request->only('search'),  // Remove 'status' from the filters
            'data' => Billing::with(['owner', 'createdBy'])
                ->where('status', 'pending')  // Only include records where status is "pending"
                ->where('due_date', '>=', today()) // Only include records where due_date is today or in the future
                ->when($role !== 'SUPER ADMIN', function ($query) use ($user) {
                    return $query->where('apartment_id', $user->apartment_id);
                })
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
        $user = Auth::user();
        $role = $user->role;
        return Inertia::render('Report/PenaltiesReport', [
            'filters' => $request->only('search'),  // Remove 'status' from the filters
            'data' => Billing::with(['owner', 'createdBy'])
                ->where('status', 'pending')  // Only include records where status is "pending"
                ->where('due_date', '<', today()) // Only include records where due_date is today or in the future
                ->when($role !== 'SUPER ADMIN', function ($query) use ($user) {
                    return $query->where('apartment_id', $user->apartment_id);
                })
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
        $user = Auth::user();
        $role = $user->role;
        return Inertia::render('Report/OwnerReport', [
            'filters' => $request->only('search'),
            'data' => ApartmentOwner::with(['apartment', 'createdBy']) // Eager load the apartment and createdBy relationships
                ->when($role !== 'SUPER ADMIN', function ($query) use ($user) {
                    return $query->where('apartment_id', $user->apartment_id);
                })
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

        $user = Auth::user();
        $role = $user->role;
        $apartemntId = $user->apartment_id;
        $ownerApartId = ApartmentOwner::where('id', $userId)->value('apartment_id');

        // Initialize the query builder with basic conditions
        $query = DB::table('billings')
            ->where('owner_id', $userId)
            ->orderBy('billing_date', 'desc');

        // Parse from_date and until_date from request
        $fromDate = $request->from_date ? date('Y-m-d', strtotime($request->from_date)) : null;
        $untilDate = $request->until_date ? date('Y-m-d', strtotime($request->until_date)) : null;

        // Apply date range filter if provided
        if ($fromDate && $untilDate) {
            $query->whereBetween('billing_date', [$fromDate, $untilDate]);
        } elseif ($fromDate) {
            $query->whereDate('billing_date', '>=', $fromDate);
        } elseif ($untilDate) {
            $query->whereDate('billing_date', '<=', $untilDate);
        } else {
            // If neither from_date nor until_date provided, use default range
            $defaultFromDate = now()->subMonths(12)->toDateString();
            $query->whereDate('billing_date', '>=', $defaultFromDate)
                ->whereDate('billing_date', '<=', now()->endOfDay());
        }

        // Apply status filter if provided
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Fetch data with pagination
        $data = $query->paginate(20);

        if ($role === 'SUPER ADMIN') {
            // Pass the fetched data to the Inertia component
            return Inertia::render('Report/OwnerBillingHistory', [
                "data" => $data,
                'filters' => $request->only('status', 'from_date', 'until_date'),
                'ownerId' => $userId,
                'ownerName' => $ownerName,
            ]);
        } else {
            if ($apartemntId == $ownerApartId) {
                // Pass the fetched data to the Inertia component
                return Inertia::render('Report/OwnerBillingHistory', [
                    "data" => $data,
                    'filters' => $request->only('status', 'from_date', 'until_date'),
                    'ownerId' => $userId,
                    'ownerName' => $ownerName,
                ]);
            } else {
                return redirect('/unauthorized');
            }
        }
    }
}
