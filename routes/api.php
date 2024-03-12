<?php

use App\Http\Controllers\Api\backend\AllocatePackageController;
use App\Http\Controllers\Api\backend\AttendanceController;
use App\Http\Controllers\Api\backend\GroupController;
use App\Http\Controllers\Api\backend\HomeController;
use App\Http\Controllers\Api\backend\MemberSlotController;
use App\Http\Controllers\Api\backend\PackageController;
use App\Http\Controllers\Api\backend\PLaccountController;
use App\Http\Controllers\Api\backend\SlotController;
use App\Http\Controllers\Api\backend\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'v1'], function(){
    Route::resource('members', UserController::class);
    Route::resource('packages', PackageController::class);
    Route::resource('groups', GroupController::class);
    Route::resource('slots', SlotController::class);
    Route::resource('allocate-package', AllocatePackageController::class);
    Route::resource('allocate-slots', MemberSlotController::class);
    Route::resource('attendance', AttendanceController::class);
    Route::get('attendance1/export', [AttendanceController::class, 'attendance_export']);
    Route::get('attendance2/export', [AttendanceController::class, 'exportAttendance']);
    Route::resource('placcount', PLaccountController::class);

    //Pl Export Functionality
    Route::get('plAccount/export', [PLaccountController::class, 'exportTransactions'])->name('PL_exportTransactions');

    //HomePage Controller
    Route::get('home', [HomeController::class, 'home']);
    Route::get('memberBill/{id}', [HomeController::class, 'memberBill']);


});
