<?php

namespace App\Http\Controllers;

use App\Models\Apartment;
use App\Models\Billing;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Carbon;


class DashboardController extends Controller
{
    public function index(Request $request)
    {

        $user = Auth::user();
        $role = $user->role;



        if ($role === 'SUPER ADMIN') {
            // Fetch data for all apartments
            $apartments = Apartment::withCount('owners')->get();
            $data = [];

            foreach ($apartments as $apartment) {
                $totalRooms = $apartment->total_room;
                $occupiedRooms = $apartment->owners_count;
                $occupiedPercentage = $occupiedRooms / $totalRooms * 100;
                $vacantPercentage = 100 - $occupiedPercentage;

                $pieData = [
                    'labels' => ['Sudah Terdirisi', 'Kosong'],
                    'datasets' => [
                        [
                            'data' => [$occupiedPercentage, $vacantPercentage],
                            'backgroundColor' => ['#7e4efb', '#FF6384'],
                            'hoverBackgroundColor' => ['#7e4efb', '#FF6384'],
                        ],
                    ],
                ];

                $data[] = [
                    'occupied' => $occupiedPercentage,
                    'vacant' => $vacantPercentage,
                    'labels' => ['Sudah Terdirisi', 'Kosong'],
                    'apartmentName' => $apartment->name,
                    'pieData' => $pieData, // Include pieData
                ];
            }
        } else {
            // Fetch data for the user's apartment
            $apartmentId = $user->apartment_id;
            $apartment = Apartment::where('id', $apartmentId)
                ->withCount('owners')
                ->first();

            if ($apartment) {
                $totalRooms = $apartment->total_room;
                $occupiedRooms = $apartment->owners_count;
                $occupiedPercentage = $occupiedRooms / $totalRooms * 100;
                $vacantPercentage = 100 - $occupiedPercentage;

                $pieData = [
                    'labels' => ['Sudah Terdirisi', 'Kosong'],
                    'datasets' => [
                        [
                            'data' => [$occupiedPercentage, $vacantPercentage],
                            'backgroundColor' => ['#7e4efb', '#FF6384'],
                            'hoverBackgroundColor' => ['#7e4efb', '#FF6384'],
                        ],
                    ],
                ];

                $data = [
                    'occupied' => $occupiedPercentage,
                    'vacant' => $vacantPercentage,
                    'labels' => ['Sudah Terdirisi', 'Kosong'],
                    'apartmentName' => $apartment->name,
                    'pieData' => $pieData, // Include pieData
                ];
            } else {
                $data = [
                    'occupied' => 0,
                    'vacant' => 100,
                    'labels' => ['Sudah Terdirisi', 'Kosong']
                ];
            }
        }

        //! Fetch the latest 10 successful billings ordered by descending ID

        $paidData = Billing::where('status', 'success')
            ->when($role !== 'SUPER ADMIN', function ($query) use ($user) {
                return $query->where('apartment_id', $user->apartment_id);
            })
            ->whereMonth('billing_date', Carbon::now()->month) // Filter by current month
            ->with('owner') // Eager load the 'owner' relationship
            ->orderBy('id', 'desc')
            ->take(10)
            ->get();

        //! Fetch the latest 10 pending billings ordered by descending ID
        $unpaidData = Billing::where('status', 'pending')
            ->when($role !== 'SUPER ADMIN', function ($query) use ($user) {
                return $query->where('apartment_id', $user->apartment_id);
            })
            ->whereMonth('billing_date', Carbon::now()->month) // Filter by current month
            ->where('due_date', '>=', today()) // Add the due date condition
            ->with('owner') // Eager load the 'owner' relationship
            ->orderBy('id', 'desc')
            ->take(10)
            ->get();

        //! Fetch the latest 10 pending with penalties billings ordered by descending ID
        $penaltyData = Billing::where('status', 'pending')
            ->when($role !== 'SUPER ADMIN', function ($query) use ($user) {
                return $query->where('apartment_id', $user->apartment_id);
            })
            ->whereMonth('billing_date', Carbon::now()->month) // Filter by current month
            ->where('due_date', '<', today()) // Add the due date condition
            ->with('owner') // Eager load the 'owner' relationship
            ->orderBy('id', 'desc')
            ->take(10)
            ->get();

        $paidCount = $paidData->count();
        $unpaidCount = $unpaidData->count();
        $penaltyCount = $penaltyData->count();

        $totalCount = $paidCount + $unpaidCount + $penaltyCount;

        // Prepare the data for the Pie chart
        $billingChartData = [
            [
                'label' => 'Telah Lunas',
                'count' => $paidCount,
                'percentage' => $totalCount != 0 ? ($paidCount / $totalCount) * 100 : 0,
            ],
            [
                'label' => 'Belum Lunas',
                'count' => $unpaidCount,
                'percentage' => $totalCount != 0 ? ($unpaidCount / $totalCount) * 100 : 0,
            ],
            [
                'label' => 'Belum Lunas dan terkena Denda',
                'count' => $penaltyCount,
                'percentage' => $totalCount != 0 ? ($penaltyCount / $totalCount) * 100 : 0,
            ],
        ];

        return Inertia::render('Dashboard/Dashboard', [
            'data' => $data,
            'paidData' => $paidData,
            'unpaidData' => $unpaidData,
            'penaltyData' => $penaltyData,
            'billingChartData' => $billingChartData,
        ]);
    }
}
