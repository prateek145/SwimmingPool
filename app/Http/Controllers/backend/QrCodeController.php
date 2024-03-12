<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class QrCodeController extends Controller
{
    //
    public function show($id){
        return view('qrcode.show', compact('id'));
    }
}
