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
        $ownerName = $request->input('email');
        $owner = ApartmentOwner::with('apartment')->where('email', $ownerName)->first();
        if ($owner) {
            $response = [
                'owner_name' => $owner->owner_name,
                'email' => $owner->email,
                'identity_no' => $owner->identity_no,
                'phone' => $owner->phone,
                'room_no' => $owner->room_no,
                'apartment' => $owner->apartment ? $owner->apartment->name : null

            ];
            Broadcast::event(new OwnerChecked($response)); // Custom event
            return response()->json($response);
        } else {
            return response()->json(['message' => 'Email kamu belum terdaftar pada billing sistem'], 404);
        }
    }
}
