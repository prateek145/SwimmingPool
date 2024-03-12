<?php

namespace App\Http\Controllers\Api\backend;

use App\Http\Controllers\Controller;
use App\Models\backend\member_slot;
use App\Models\backend\Package;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\backend\ResponseController;
use App\Models\backend\Slot;
use Illuminate\Support\Facades\Validator;

class MemberSlotController extends ResponseController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $member_slots = member_slot::latest()->get();
            $members = User::where('status', 1)->latest()->get();
            $slots = Slot::where('status', 1)->latest()->get();
            $data['slots'] = $slots;
            $data['members'] = $members;
            $data['member_slots'] = $member_slots;

            return $this->sendResponse($data, 'Member Slots Fetched Successfully', 200);
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
            'member_id' => 'required|integer|unique:member_slots',
            'slot_id' => 'required|integer'
        ],
         [
            'member_id.unique' => 'Already Slot Assign To Member'
        ]);

        if ($validator->fails()) {
            return response(['error' => $validator->errors(),  'responseCode' => 403]);
        }

        try {
            // dd($data);
            $member = User::find($request->member_id);
            $slot = Slot::find($request->slot_id);
            $data['slot_start_time'] = $slot->start_time;
            $data['slot_end_time'] = $slot->end_time;
            $data['member_name'] = $member->name;
            $allocate_slot = member_slot::create($data);
            return $this->sendResponse($allocate_slot, 'Allocate Slot to User Successfully', 200);
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
            $member_slots = member_slot::find($id);
            $members = User::where('status', 1)->latest()->get();
            $slots = Slot::where('status', 1)->latest()->get();

            $data['slots'] = $slots;
            $data['members'] = $members;
            // dd($allocate_packages);
            $data['member_slot'] = $member_slots;
            return $this->sendResponse($data, 'Allocate Slot Fetched Successfully', 200);
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
            'slot_id' => 'required|integer'
        ],
         [
            'member_id.unique' => 'Already Slot Assign To Member'
        ]);

        if ($validator->fails()) {
            return response(['error' => $validator->errors(),  'responseCode' => 403]);
        }

        try {
            // dd($data);
            $allocate_slot = member_slot::find($id);
            $member = User::find($request->member_id);
            $slot = Slot::find($request->slot_id);
            $data['slot_start_time'] = $slot->start_time;
            $data['slot_end_time'] = $slot->end_time;
            $data['member_name'] = $member->name;
            $allocate_slot->update($data);

            return $this->sendResponse($allocate_slot, 'Allocate Slot to User Successfully', 200);
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
