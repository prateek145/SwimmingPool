<?php

namespace App\Http\Controllers\Api\backend;

use App\Http\Controllers\Controller;
use App\Models\backend\Package;
use App\Models\backend\Slot;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Api\backend\ResponseController;
use App\Models\backend\AllocatePackage;
use App\Models\backend\member_slot;
use App\Models\backend\PLaccount;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\URL;


class HomeController extends ResponseController
{
    public function home()
    {
        try {
            $members = DB::table('users')
                ->where('users.role', '!=', 'admin')
                ->orderBy('users.created_at', 'desc')
                // ->latest()
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
            $data['url'] = URL::to('/');
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


            $allocate_package = AllocatePackage::where('member_id', $id)->first();
            $slot = member_slot::where('member_id', $id)->first();
            $data1['slot'] = $slot;
            $data1['package'] = $allocate_package;
            $data1['url'] = URL::to('/backend/assets/img/1.png') ?? '';

            // dd($data1, $id);
            return $this->sendResponse($data1, 'Allocate Packages Fetched Successfully', 200);
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage(), [], 402);
        }
    }

    public function header()
    {
        try {
            $data['icon'] = URL::to('/') . '/backend/assets/img/1.png';
            return $this->sendResponse($data, 'Header Icons Success', 200);
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage(), [], 402);
        }
    }
}
