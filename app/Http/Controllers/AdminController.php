<?php

namespace App\Http\Controllers;

use App\Models\Apartment;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function index(Request $request)
    {
        $apartment = Apartment::pluck('name', 'id')->map(function ($apartmentName, $apartementId) {
            return ['label' => $apartmentName, 'value' => $apartementId];
        })->prepend(['label' => 'Pilih Apartemen', 'value' => ''])->values()->toArray();

        return Inertia::render('Admin/Admin', [
            'apartmenetData' => $apartment,
            'filters' => $request->only('search', 'apartment_id'),  // Include 'status' in the filters
            'data' => User::with('apartment')
                ->when($request->has('search'), function ($query) use ($request) {
                    $searchTerm = $request->input('search');
                    $query->where('name', 'like', "%$searchTerm%");
                })
                ->when($request->filled('apartment_id'), function ($query) use ($request) {  // Check if 'apartment_id' is not only present but also filled
                    $apartment_id = $request->input('apartment_id');
                    $query->where('apartment_id', $apartment_id);
                })
                ->where('role', '!=', 'SUPER ADMIN')
                ->orderByDesc('id')
                ->paginate(10),
        ]);
    }
}
