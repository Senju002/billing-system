<?php

namespace App\Http\Controllers;

use App\Models\Billing;
use Inertia\Inertia;
use Illuminate\Http\Request;

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
}
