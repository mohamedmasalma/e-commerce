<?php

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

Route::get('/', function () {
    return view('admin.home');
});
Route::get('admin/show/cat{id?}','admin\catController@index')->name('admin.show.cat');
Route::get('admin/all_departments/json{id?}','admin\catController@create')->name('admin.all_departments.json');