<?php

namespace App\Http\Controllers;

use App\Models\Apartment;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;


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

    public function add()
    {

        $apartment = Apartment::pluck('name', 'id')->map(function ($apartmentName, $apartementId) {
            return ['label' => $apartmentName, 'value' => $apartementId];
        })->prepend(['label' => 'Pilih Apartemen', 'value' => ''])->values()->toArray();


        return Inertia::render("Admin/AddAdmin", [
            'apartmenetData' => $apartment,
        ]);
    }

    public function store(Request $request)
    {
        // Validate the incoming data
        $validatedData = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:255|unique:users,email',
            'apartment_id' => 'required|integer|exists:apartments,id',
            'password' => 'required|string|min:8',
        ]);

        // Hash the password
        $validatedData['password'] = Hash::make($validatedData['password']);

        // Add user role and email verification timestamp
        $validatedData['role'] = 'ADMIN';
        $validatedData['email_verified_at'] = now(); // You can use Carbon::now() or now() helper function

        // Store the validated data in the users table
        $user = User::create($validatedData);

        return redirect('/admin')->with('success', 'Admin data has been created!');
    }

    public function edit(User $user, Request $request)
    {
        $apartment = Apartment::pluck('name', 'id')->map(function ($apartmentName, $apartementId) {
            return ['label' => $apartmentName, 'value' => $apartementId];
        })->prepend(['label' => 'Pilih Apartemen', 'value' => ''])->values()->toArray();


        return Inertia::render('Admin/EditAdmin', [
            "adminData" => $user->find($request->id),
            'apartmenetData' => $apartment,
        ]);
    }

    public function update(Request $request, $id)
    {
        // Find the apartment by its ID
        $user = User::findOrFail($id);

        // Validate the incoming data
        $validatedData = $request->validate([
            'name' => 'required|string|max:100',
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('users')->ignore($user->id), // Use the Rule facade to ignore the current user's ID
            ],
            'apartment_id' => 'required|integer|exists:apartments,id',
            'new_password' => $request->filled('new_password') ? 'string|min:8' : '', // Conditionally apply the rule
        ]);

        if ($request->filled('new_password')) {
            $validatedData['password'] = Hash::make($validatedData['new_password']);
        }


        $user->update($validatedData);

        return redirect('/admin')->with('success', 'Admin data has been updated!');
    }

    public function resetPassword(Request $request)
    {
        // Validate the incoming data
        $validatedData = $request->validate([
            'id' => 'required|exists:users,id',

        ]);

        // Find the user by ID
        $user = User::findOrFail($validatedData['id']);

        dd($user);

        // Update the user's password
        $user->password = Hash::make($validatedData['password']);
        $user->save();

        // Optionally, you may want to send a response indicating success
        return redirect('/admin')->with('success', 'Password has been updated!');
    }
}
