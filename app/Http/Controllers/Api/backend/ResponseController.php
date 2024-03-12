<?php

namespace App\Http\Controllers\Api\backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ResponseController extends Controller
{
    public function sendResponse($data, $message, $code = 200){
        $response = [
            'status' => true,
            'responseCode' => $code,
            'message' => $message,
            'timestamp' => date('d-m-Y H:m:s'),
            'data'    => $data
        ];
        // dd(json($response));
        return response()->json($response);
    }

    public function sendError($errorMessages = 'Something Went Worng.Please try Again !',$data = [], $code = 402)
    {
        // dd($data, $errorMessages);
        $response = [
            'status' => false,
            'responseCode' => $code,
            'message' => $errorMessages,
            'timestamp' => date('d-m-Y H:m:s'),
            'data' => $data
        ];

        return response()->json($response);
    }
}
