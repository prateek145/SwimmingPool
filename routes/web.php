<?php

use App\Http\Controllers\backend\QrCodeController;
use App\Http\Controllers\frontend\FrontController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

// Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('generateId/{id}', [FrontController::class, 'generateId'])->name('generateId');
Route::get('UserDetails/{id}', [FrontController::class, 'UserDetails'])->name('UserDetails');
Route::get('qrcode/{id}', [QrCodeController::class, 'show']);

Route::get('{any?}', function () {
    return view('welcome');
})->where('any', '.*');
