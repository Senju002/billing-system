<?php

namespace App\Http\Controllers\Api;

use App\Events\OwnerChecked;
use App\Http\Controllers\Controller;
use App\Models\ApartmentOwner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Broadcast;


class UnitOwnerController extends Controller
{
    public function checkOwner(Request $request)
    {
        $ownerName = $request->input('owner_name');
        $owner = ApartmentOwner::where('owner_name', $ownerName)->first();

        if ($owner) {
            $response = [
                'owner_name' => $owner->owner_name,
                'identity_no' => $owner->identity_no,
            ];
            Broadcast::event(new OwnerChecked($response)); // Custom event
            return response()->json($response);
        } else {
            return response()->json(['message' => 'User not found'], 404);
        }
    }
}
