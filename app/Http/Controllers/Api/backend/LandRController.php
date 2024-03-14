<?php

namespace App\Http\Controllers\Api\backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\backend\ResponseController;
use App\Models\backend\PLaccount;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;


class LandRController extends ResponseController
{
    //
    function login(Request $request)
    {
        try {
            $data = $request->all();
            $validator = Validator::make(
                $data,
                [
                    'email' => 'required|email',
                    'password' => 'required|min:8'
                ],
                []
            );

            if ($validator->fails()) {
                return response(['error' => $validator->errors(),  'responseCode' => 403]);
            }

            if (!Auth::attempt($request->only(['email', 'password']))) {
                return response()->json([
                    'status' => false,
                    'message' => 'Email & Password does not match with our record.',
                ], 401);
            }

            $user = User::where('email', $request->email)->first();

            $data = [
                'user' => $user,
                'toke' => $user->createToken("API TOKEN")->plainTextToken
            ];

            return $this->sendResponse($data, 'User Logged In Successfully', 200);
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage(), [], 402);
        }
    }

    function register(Request $request)
    {
        try {
            $data = $request->all();
            $validator = Validator::make(
                $data,
                [
                    'email' => 'required|email',
                    'password' => 'required|min:8'
                ],
                []
            );

            if ($validator->fails()) {
                return response(['error' => $validator->errors(),  'responseCode' => 403]);
            }

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password)
            ]);

            $data = [
                'email' => $user->email,
                'toke' => $user->createToken("API TOKEN")->plainTextToken
            ];

            return $this->sendResponse($data, 'User Created Successfully', 200);
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage(), [], 402);
        }
    }
}
