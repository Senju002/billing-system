<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Billing;
use App\Models\ApartmentOwner;
use Carbon\Carbon;

class BillingController extends Controller
{
    public function getBilling(Request $request)
    {
        $email = $request->input('email');


        $apartmentOwner = ApartmentOwner::where('email', $email)->first();


        if ($apartmentOwner) {
            // Retrieve all billing records where owner_id matches $apartmentOwner->id and status is 'pending'

            $billings = Billing::where('owner_id', $apartmentOwner->id)
                ->where('status', 'Pending')
                ->get();

            // Process each billing record to adjust the fine based on due_date
            foreach ($billings as $billing) {
                $dueDate = Carbon::parse($billing->due_date);

                // Compare due_date with today's date
                $daysUntilDue = $dueDate->diffInDays(Carbon::now(), false); // Calculate difference in days

                if ($daysUntilDue <= 0) {
                    // If due_date has passed or is today, set fine to 0
                    $billing->fine = 0;
                } else {
                    // Otherwise, keep the original fine value from the database
                    // No action needed since fine is already fetched from the database
                }
            }

            $data = [
                'owner_data' => $apartmentOwner,
                'billing_data' => $billings,
            ];


            // Check if there are any billing records found
            if ($billings->isEmpty()) {
                return response()->json(['message' => 'Tidak Ada Tagihan'], 404);
            } else {
                return response()->json($data);
            }
        } else {
            return response()->json(['message' => 'Email kamu belum terdaftar pada billing sistem'], 404);
        }
    }
}
