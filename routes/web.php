<?php

use App\Http\Controllers\ApartementController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UnitOwnerController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', function () {
    return redirect(route('login'));
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    // !Apartement
    Route::get('/apartement/add', function () {
        return Inertia::render('Apartement/AddApartement');
    })->name('apartement.add');
    Route::get('/apartement', [ApartementController::class, 'index'])->name('apartement.index');
    Route::post('/apartement/store', [ApartementController::class, 'store'])->name('apartement.store');
    Route::get('/apartement/{id}/edit', [ApartementController::class, 'edit'])->name('apartement.edit');
    Route::post('/apartement/{id}/update', [ApartementController::class, 'update'])->name('apartement.update');



    // !Unit Owner
    Route::get('/unit-owner/add', function () {
        return Inertia::render('Unit Owner/AddUnitOwner');
    })->name('unitowner.add');
    Route::get('/unit-owner', [UnitOwnerController::class, 'index'])->name('unitowner.index');
    Route::post('/unit-owner/store', [UnitOwnerController::class, 'store'])->name('unitowner.store');
    Route::get('/unit-owner/{id}/edit', [UnitOwnerController::class, 'edit'])->name('unitowner.edit');
    Route::post('/unit-owner/{id}/update', [UnitOwnerController::class, 'update'])->name('unitowner.update');





    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
