<?php

namespace App\Http\Controllers\Api\backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Controllers\Api\backend\ResponseController;
use App\Models\backend\AllocatePackage;
use App\Models\backend\member_slot;
use App\Models\backend\Package;
use App\Models\backend\Slot;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;

class UserController extends ResponseController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $members = User::where('status', 1)->where('role', '!=', 'admin')->latest()->get();
            $packages = Package::where('status', 1)->latest()->get();
            $slots = Slot::where('status', 1)->latest()->get();

            $data['packages'] = $packages;
            $data['slots'] = $slots;
            $data['members'] = $members;
            $data['url'] = Url::to('/');
            return $this->sendResponse($data, 'Members Fetched Successfully', 200);
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage(), [], 402);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->all();
        // dd($data);
        $validator = Validator::make($data, [
            'name' => 'required',
            'g_name' => 'required',
            'email' => 'required|unique:users',
            'phone' => 'required|unique:users',
            'address' => 'required',
            'dob' => 'required',
            'emergency_phone' => 'required|unique:users',
            'status' => 'required',
            'package_id' => 'required',
            'slot_id' => 'required',
        ]);
        if ($validator->fails()) {
            return response(['error' => $validator->errors(),  'responseCode' => 403]);
        }

        try {
            // dd($request->all());
            unset($data['package_id']);
            unset($data['document']);
            unset($data['slot_id']);
            $data['role'] = 'member';
            $data['unique_id'] = 'MSM0000' . count(User::all()) + 1;
            if ($request->image) {
                # code...
                $base64_image = $request->image; // your base64 encoded
                @[$type, $file_data] = explode(';', $base64_image);
                @[, $file_data] = explode(',', $file_data);
                $imageName = time() . '.' . 'png';
                // file_put_contents($storagePath, base64_decode($file_data));
                Storage::disk('public')->put($imageName, base64_decode($file_data));
                $data['image'] = $imageName;
            }

            if ($request->document) {
                # code...
                $documentArray = [];
                foreach ($request->document as $key => $value) {
                    # code...
                    $base64_document = $value; // your base64 encoded
                    @[$type, $file_data] = explode(';', $base64_document);
                    @[, $file_data] = explode(',', $file_data);
                    $documentName = time() . time() . $key . '.' . 'png';
                    // file_put_contents($storagePath, base64_decode($file_data));
                    Storage::disk('public')->put($documentName, base64_decode($file_data));
                    array_push($documentArray, $documentName);
                }
                $data['document'] = json_encode($documentArray);
            }
            $member = User::create($data);
            //allocate package
            $package = Package::find($request->package_id);
            $package_data = [
                'member_id' => $member->id,
                'package_id' => $package->id,

            ];
            $package_data['package_name'] = $package->name;
            $package_data['package_price'] = $package->price;
            $package_data['member_name'] = $member->name;
            $package_data['doj'] = date("Y-m-d");
            $package_data['package_status'] = 0;
            $package_data['package_start_date'] = date("Y-m-d");
            $package_data['package_end_date'] = date("Y-m-d", strtotime('+' . $package->days . 'days'));
            // dd($package_data);
            $allocate_packages = AllocatePackage::create($package_data);

            //allocate slot
            $slot = Slot::find($request->slot_id);
            $slot_data = [
                'member_id' => $member->id,
                'slot_id' => $slot->id,

            ];
            $slot_data['slot_start_time'] = $slot->start_time;
            $slot_data['slot_end_time'] = $slot->end_time;
            $slot_data['member_name'] = $member->name;
            $allocate_slot = member_slot::create($slot_data);
            // dd($data);
            return $this->sendResponse($member, 'Member Saved Successfully', 200);
        } catch (\Exception $e) {
            dd($e->getMessage());
            return $this->sendError($e->getMessage(), [], 402);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $user = User::find($id);
            // dd($user->package);
            $package = Package::find($user->package->package_id);
            $slot = Slot::find($user->slot->slot_id);
            if ($user->image) {
                # code...
                $user->image = URL::to('/') . '/storage/' . $user->image;
            }

            if ($user->document) {
                # code...
                $documentArray = [];
                foreach (json_decode($user->document) as $key => $value) {
                    # code...
                    array_push($documentArray,URL::to('/') . '/storage/' . $value);
                }
                $user->document = $documentArray;
            }

            //packages and slots
            $packages = Package::where('status', 1)->latest()->get();
            $slots = Slot::where('status', 1)->latest()->get();

            $data['packages'] = $packages;
            $data['slots'] = $slots;

            $data['user'] = $user;
            $data['package'] = $package;
            $data['slot'] = $slot;
            $data['maxi_pool'] = asset('public/backend/assets/img/maxipool.jpg');

            // dd($data);
            return $this->sendResponse($data, 'Member Fetched Successfully', 200);
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage(), [], 402);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = $request->all();
        // dd($data);
        $validator = Validator::make($data, [
            'name' => 'required',
            'g_name' => 'required',
            'email' => 'required|unique:users,email,' . $id . "'",
            'phone' => 'required|unique:users,phone,' . $id . "'",
            'address' => 'required',
            'dob' => 'required',
            'emergency_phone' => 'required',
            'status' => 'required',
            'package_id' => 'required',
            'slot_id' => 'required',
        ]);
        if ($validator->fails()) {
            return response(['error' => $validator->errors(),  'responseCode' => 403]);
        }

        try {
            // dd($data);
            unset($data['package_id']);
            unset($data['slot_id']);
        
            $member = User::find($id);
            if ($request->image) {
                # code...
                $base64_image = $request->image; // your base64 encoded
                @[$type, $file_data] = explode(';', $base64_image);
                @[, $file_data] = explode(',', $file_data);
                $imageName = time() . '.' . 'png';
                // file_put_contents($storagePath, base64_decode($file_data));
                Storage::disk('public')->put($imageName, base64_decode($file_data));
                $data['image'] = $imageName;
            }

            // dd($request->document);
            if ($request->document) {
                # code...
                unset($data['document']);
                $documentArray = [];
                foreach ($request->document as $key => $value) {
                    # code...
                    $base64_document = $value; // your base64 encoded
                    @[$type, $file_data] = explode(';', $base64_document);
                    @[, $file_data] = explode(',', $file_data);
                    $documentName = time() . time() . $key . '.' . 'png';
                    // file_put_contents($storagePath, base64_decode($file_data));
                    Storage::disk('public')->put($documentName, base64_decode($file_data));
                    array_push($documentArray, $documentName);
                }
                $data['document'] = json_encode($documentArray);
            }

            // dd($data);
            //allocate package
            $package = Package::find($request->package_id);
            $allocate_package = AllocatePackage::where('member_id', $member->id)->first();
            $package_data = [
                'member_id' => $member->id,
                'package_id' => $package->id,

            ];
            $package_data['package_name'] = $package->name;
            $package_data['package_price'] = $package->price;

            $package_data['member_name'] = $member->name;
            $package_data['package_status'] = 0;
            $package_data['package_start_date'] = date("Y-m-d");
            $package_data['package_end_date'] = date("Y-m-d", strtotime($allocate_package->package_end_date . '+' . $package->days . 'days'));

            $allocate_package->update($package_data);


            //allocate slot
            $slot = Slot::find($request->slot_id);
            $slot_data = [
                'member_id' => $member->id,
                'slot_id' => $slot->id,

            ];
            $slot_data['slot_start_time'] = $slot->start_time;
            $slot_data['slot_end_time'] = $slot->end_time;
            $slot_data['member_name'] = $member->name;
            $allocate_slot = member_slot::where('member_id', $member->id)->first();
            $allocate_slot->update($slot_data);

// dd($data);
            $member->update($data);
            return $this->sendResponse($member, 'Member Updated Successfully', 200);
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage(), [], 402);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
