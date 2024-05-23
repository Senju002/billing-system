<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Billing;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function showPaid(Request $request)
    {
        return Inertia::render('Report/PaidReport', [
            'filters' => $request->only('search'),  // Remove 'status' from the filters
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
}
