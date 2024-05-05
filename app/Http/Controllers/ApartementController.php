<?php

namespace App\Http\Controllers;

use App\Models\Apartment;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


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

    public function store(Request $request)
    {
        // Validate the incoming data
        $validatedData = $request->validate([
            'name' => [
                'required',
                'string',
                'max:100',
            ],
            'address' => [
                'required',
                'string',
                'max:100',
            ],
        ]);

        // Add user_id to the validated data from the authenticated user
        $validatedData['created_by'] = Auth::id();

        // Store the validated data in the apartments table
        $apartment = Apartment::create($validatedData);

        return redirect('/apartement')->with('success', 'Apartement data has been created!');
    }

    public function edit(Apartment $apartment, Request $request)
    {
        return Inertia::render('Apartement/EditApartement', [
            "apartementData" => $apartment->find($request->id),
        ]);
    }

    public function update(Request $request, $id)
    {
        // Find the apartment by its ID
        $apartment = Apartment::findOrFail($id);

        // Validate the incoming data
        $validatedData = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'address' => ['required', 'string', 'max:100'],
        ]);

        // Update the apartment with the validated data
        $apartment->update($validatedData);

        return redirect('/apartement')->with('success', 'Apartment data has been updated!');
    }
}
