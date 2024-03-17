<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\Controller;
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
        $members = DB::table('users')->find($id)
        ->join('allocate_packages', 'users.id', 'allocate_packages.member_id')
        ->get();
        dd($members);

    }
}
