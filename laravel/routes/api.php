<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\CustomerController;
use \App\Http\Controllers\ChannelController;
use \App\Http\Controllers\NotesController;
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

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});





Route::prefix('customer')->controller(CustomerController::class)->group(function () {
    Route::post('/add','store');
    Route::get('/add/{id}','getCustomerName');
    Route::get('/','index');

    Route::delete('/delete/{id}','destroy');
    Route::patch('/update/{id}','update');
    Route::get('/update/{id}','getItem');

    Route::delete('/delete/','destroyBulk');
    Route::delete('/trash/{id}','trash');
    Route::put('/update/activate','activateBulk');
    Route::put('/update/deactivate','deactivateBulk');
    Route::delete('/trash/','trashBulk');
    Route::post('/restore/','bulkRestore');
    Route::patch('/update/active/{id}','toggleIsActivate');

});

Route::prefix('channel')->controller(ChannelController::class)->group(function () {

    Route::post('/add/','store');
    Route::get('/','index');
    Route::delete('/delete/{id}','destroy');
    Route::delete('/trash/{id}','trash');
    Route::patch('/update/{id}','update');
    Route::get('/update/{id}','getItem');

    Route::delete('/delete/','destroyBulk');
    Route::put('/update/activate','activateBulk');
    Route::put('/update/deactivate','deactivateBulk');
    Route::delete('/trash/','trashBulk');
    Route::post('/restore/','bulkRestore');
    Route::patch('/update/active/{id}','toggleIsActivate');
});

Route::controller(NotesController::class)->group(function () {
    Route::post('customer/notes/add/{id}','addCustomerNotes');
    Route::get('customer/notes/{id}','getCustomerNotes');
    Route::delete('customer/notes/delete/{id}','deleteCustomerNotes');

    Route::post('channel/notes/add/{id}','addChannelNotes');
    Route::get('channel/notes/{id}','getChannelNotes');
    Route::delete('channel/notes/delete/{id}','deleteChannelNotes');


});
