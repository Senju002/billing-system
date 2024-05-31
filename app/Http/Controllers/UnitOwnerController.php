<?php

namespace App\Http\Controllers;

use App\Models\Apartment;
use App\Models\ApartmentOwner;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UnitOwnerController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        $role = $user->role;

        $query = ApartmentOwner::with(['apartment', 'createdBy'])
            ->when($role !== 'SUPER ADMIN', function ($query) use ($user) {
                return $query->where('apartment_id', $user->apartment_id);
            })
            ->when($request->has('search'), function ($query) use ($request) {
                return $query->where('owner_name', 'like', "%" . $request->input('search') . "%");
            })
            ->orderByDesc('id')
            ->paginate(10);

        return Inertia::render('Unit Owner/UnitOwner', [
            'filters' => $request->only('search'),
            'data' => $query,
        ]);
    }

    public function add()
    {

        $apartment = Apartment::pluck('name', 'id')->map(function ($apartmentName, $apartementId) {
            return ['label' => $apartmentName, 'value' => $apartementId];
        })->prepend(['label' => 'Pilih Apartemen', 'value' => ''])->values()->toArray();


        return Inertia::render("Unit Owner/AddUnitOwner", [
            'apartmenetData' => $apartment,
        ]);
    }

    public function store(Request $request)
    {
        // Validate the incoming data

        // dd($request);
        $validatedData = $request->validate([
            'owner_name' => 'required|string|max:100',
            'phone' => 'required|string|regex:/^[0-9]{10,15}$/',
            'email' => 'required|email|max:255',
            'identity_no' => 'required|integer|min:1', // Adjust the max value as per your requirement
            'room_no' => 'required|integer|min:1|max:999999999999999',
            'apartment_id' => 'required|integer|exists:apartments,id',
        ]);

        // Add user_id to the validated data from the authenticated user
        $validatedData['created_by'] = Auth::id();

        // Store the validated data in the apartments table
        $apartment = ApartmentOwner::create($validatedData);

        return redirect('/unit-owner')->with('success', 'Unit Owner data has been created!');
    }

    public function edit(ApartmentOwner $apartmentOwner, Request $request)
    {
        $apartment = Apartment::pluck('name', 'id')->map(function ($apartmentName, $apartementId) {
            return ['label' => $apartmentName, 'value' => $apartementId];
        })->prepend(['label' => 'Pilih Apartemen', 'value' => ''])->values()->toArray();

        $user = Auth::user();
        $unitOwnerData = $apartmentOwner->find($request->id);
        $unitOwnerApartmentData = $unitOwnerData->apartment_id;

        $userApartmentId = $user->apartment_id;
        $role = $user->role;

        if ($role === 'SUPER ADMIN') {
            return Inertia::render('Unit Owner/EditUnitOwner', [
                "unitOwnerData" => $apartmentOwner->find($request->id),
                'apartmenetData' => $apartment,
            ]);
        } else {
            if ($userApartmentId == $unitOwnerApartmentData) {
                return Inertia::render('Unit Owner/EditUnitOwner', [
                    "unitOwnerData" => $apartmentOwner->find($request->id),
                    'apartmenetData' => $apartment,
                ]);
            } else {
                return redirect('/unauthorized');
            }
        }
    }

    public function update(Request $request, $id)
    {
        // Find the apartment by its ID
        $apartmentOwner = ApartmentOwner::findOrFail($id);

        // Validate the incoming data
        $validatedData = $request->validate([
            'owner_name' => 'required|string|max:100',
            'phone' => 'required|string|regex:/^[0-9]{10,15}$/',
            'email' => 'required|email|max:255',
            'identity_no' => 'required|integer|min:1', // Adjust the max value as per your requirement
            'room_no' => 'required|integer|min:1|max:999999999999999',
            'apartment_id' => 'required|integer|exists:apartments,id',
        ]);

        $apartmentOwner->update($validatedData);

        return redirect('/unit-owner')->with('success', 'Unit owner data has been updated!');
    }
}
