<?php

namespace App\Http\Controllers\Api\backend;

use App\Http\Controllers\Controller;
use App\Models\backend\AllocatePackage;
use Illuminate\Http\Request;
use App\Models\backend\Package;
use App\Models\User;
use App\Http\Controllers\Api\backend\ResponseController;
use Illuminate\Support\Facades\Validator;

class AllocatePackageController extends ResponseController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $allocate_packages = AllocatePackage::latest()->get();
            $members = User::where('status', 1)->latest()->get();
            $packages = Package::where('status', 1)->latest()->get();

            $data['packages'] = $packages;
            $data['members'] = $members;
            // dd($allocate_packages);
            $data['allocated_packages'] = $allocate_packages;
            return $this->sendResponse($data, 'Allocate Packages Fetched Successfully', 200);
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
        $validator = Validator::make($data, [
            'member_id' => 'required|integer',
            'package_id' => 'required|integer'
        ]);
        if ($validator->fails()) {
            return response(['error' => $validator->errors(),  'responseCode' => 403]);
        }

        try {
            // dd($data);
            $member = User::find($request->member_id);
            $package = Package::find($request->package_id);
            $data['package_name'] = $package->name;
            $data['member_name'] = $member->name;
            $allocate_packages = AllocatePackage::create($data);
            return $this->sendResponse($allocate_packages, 'Allocate Package to User Successfully', 200);
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage(), [], 402);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $allocate_package = AllocatePackage::find($id);
            $members = User::where('status', 1)->latest()->get();
            $packages = Package::where('status', 1)->latest()->get();

            $data['packages'] = $packages;
            $data['members'] = $members;
            // dd($allocate_packages);
            $data['allocated_package'] = $allocate_package;
            return $this->sendResponse($data, 'Allocate Package Fetched Successfully', 200);
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage(), [], 402);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = $request->all();
        $validator = Validator::make($data, [
            'member_id' => 'required|integer',
            'package_id' => 'required|integer'
        ]);
        if ($validator->fails()) {
            return response(['error' => $validator->errors(),  'responseCode' => 403]);
        }

        try {
            // dd($data);
            $allocate_package = AllocatePackage::find($id);
            $member = User::find($request->member_id);
            $package = Package::find($request->package_id);
            $data['package_name'] = $package->name;
            $data['member_name'] = $member->name;

            $allocate_package->update($data);
            return $this->sendResponse($allocate_package, 'Package to User Updated Successfully', 200);
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
