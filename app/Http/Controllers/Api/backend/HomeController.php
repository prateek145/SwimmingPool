<?php

namespace App\Http\Controllers\Api\backend;

use App\Http\Controllers\Controller;
use App\Models\backend\Package;
use App\Models\backend\Slot;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Api\backend\ResponseController;
use App\Models\backend\PLaccount;
use Illuminate\Support\Facades\Validator;

class HomeController extends ResponseController
{
    public function home()
    {
        try {
            $members = DB::table('users')
                ->join('allocate_packages', 'users.id', 'allocate_packages.member_id')
                ->join('member_slots', 'users.id', 'member_slots.member_id')
                ->get();
            $total_members = $members->count();
            $total_packages = Package::all()->count();
            $total_slots = Slot::all()->count();

            // dd($members);
            $data['members'] = $members;
            $data['total_members'] = $total_members;
            $data['total_packages'] = $total_packages;
            $data['total_slots'] = $total_slots;
            // dd($data);
            return $this->sendResponse($data, 'Allocate Packages Fetched Successfully', 200);
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage(), [], 402);
        }
    }

    public function memberBill($id)
    {
        try {
            // dd($id);
            $user = User::find($id);
            $data = PLaccount::where('user_id', $id)->get();
            // dd($data, $user);
            $data1['bills'] = $data;
            $data1['name'] = $user->name;
            $data1['phone'] = $user->phone;
            $data1['email'] = $user->email;
            $data1['unique_id'] = $user->unique_id;
            $data1['address'] = $user->address;
            $data1['date'] = date('Y-m-d');
            // dd($data1, $id);
            return $this->sendResponse($data1, 'Allocate Packages Fetched Successfully', 200);
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage(), [], 402);
        }
    }
}
