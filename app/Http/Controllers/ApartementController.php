<?php

namespace App\Http\Controllers;

use App\Models\Apartment;
use Inertia\Inertia;
use Illuminate\Http\Request;

class ApartementController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Apartement/Apartement', [
            'filters' => $request->only('search'),
            'data' => Apartment::with('user') // Eager load the user relationship
                ->when($request->has('search'), function ($query) use ($request) {
                    $query->where('name', 'like', "%" . $request->input('search') . "%");
                })
                ->orderByDesc('created_at')
                ->paginate(5),
        ]);
    }
}
