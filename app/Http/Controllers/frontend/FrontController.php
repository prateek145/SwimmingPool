<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\Controller;
use App\Models\backend\Attendance;
use App\Models\backend\Package;
use App\Models\backend\Slot;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\URL;


class FrontController extends Controller
{
    //
    public function generateId($id){
        $user = User::find($id);
        $package = Package::find($user->package->package_id);
        $slot = Slot::find($user->slot->slot_id);
        if ($user->image) {
            # code...
            $user->image = URL::to('/') . '/storage/'. $user->image;
        }

        //packages and slots
        $packages = Package::where('status', 1)->latest()->get();
        $slots = Slot::where('status', 1)->latest()->get();

        $data['packages'] = $packages;
        $data['slots'] = $slots;

        $data['user'] = $user;
        $data['package'] = $package;
        $data['slot'] = $slot;
        $data['maxi_pool'] = URL::to('/') . '/backend/assets/img/maxipool.jpg';
        $data['url'] = URL::to('/');
        // dd($data);
        return view('frontend.generateid', compact('data','id'));
    }

    public function UserDetails($id){
        // $user = User::find($id);
        $member = DB::table('users')
        ->join('allocate_packages', 'users.id','=', 'allocate_packages.member_id')
        ->join('member_slots', 'users.id', '=','member_slots.member_id')
        ->where("users.id",$id)
        ->first();
        $data['url'] = URL::to('/');

        return view('qrcode.show', compact('member', 'data'));
    }

    public function Attendance($id){

        try {
            $data['date'] = date('Y-m-d');
            $member = User::find($id);
            $data['name'] = $member->name;
            $data['phone'] = $member->phone;
            $data['email'] = $member->email;
            $data['member_id'] = $id;
            $data['attendance'] = 1;

            $attendance = Attendance::where('date', date('Y-m-d'))->where('member_id', $id)->first();
            if ($attendance) {
                # code...
                $attendance->update($data);
            } else {
                # code...
                $attendance = Attendance::create($data);
            }
            

            return redirect()->back()->with('success', 'Attendance Registered Success');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Error');

        }
    }
}
