<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ApartmentOwner;
use Illuminate\Http\Request;

class UnitOwnerController extends Controller
{
    public function checkOwner(Request $request)
    {
        // $request->validate([
        //     'owner_name' => 'required|string',
        // ]);

        $ownerName = $request->input('owner_name');
        $owner = ApartmentOwner::where('owner_name', $ownerName)->first();


        if ($owner) {
            return response()->json([
                'owner_name' => $owner->owner_name,
                'identity_no' => $owner->identity_no,
            ]);
        } else {
            return response()->json(['message' => 'User not found'], 404);
        }
    }
}
