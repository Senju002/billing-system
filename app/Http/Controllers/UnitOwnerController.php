<?php

namespace App\Http\Controllers;

use App\Models\ApartmentOwner;
use Inertia\Inertia;
use Illuminate\Http\Request;

class UnitOwnerController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Unit Owner/UnitOwner', [
            'filters' => $request->only('search'),
            'data' => ApartmentOwner::with(['apartment', 'createdBy']) // Eager load the apartment and createdBy relationships
                ->when($request->has('search'), function ($query) use ($request) {
                    $query->where('owner_name', 'like', "%" . $request->input('search') . "%");
                })
                ->orderByDesc('created_at')
                ->paginate(5),
        ]);
    }
}
