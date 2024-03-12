<?php

namespace App\Http\Controllers\Api\backend;

use App\Http\Controllers\Controller;
use App\Models\backend\Group;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\backend\ResponseController;
use App\Models\backend\User_Group;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class GroupController extends ResponseController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $groups = Group::latest()->get();
            $members = User::whereNot('role', 'admin')->where('status', 1)->get();
            // dd($groups, $members);
            $data['groups'] = $groups;
            $data['members'] = $members;
            return $this->sendResponse($data, 'Groups Fetched Successfully', 200);
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
            'name' => 'required|unique:groups',
            'member_ids' => 'required|array',
            'status' => 'required',
        ]);
        if ($validator->fails()) {
            return response(['error' => $validator->errors(),  'responseCode' => 403]);
        }

        try {

            unset($data['member_ids']);
            
            $group = Group::create($data);
            if ($group) {
                # code...
                foreach (array_unique($request->member_ids) as $key => $value) {
                    # code...
                    $data1 = ['user_id' => $value, 'group_id' => $group->id];

                    $user_group = User_Group::create($data1);
                    if (!$user_group) {
                        # code...
                        throw new \Exception("User Group creation failed Contact to Developer");
                    }
                }
            } else {
                # code...
                throw new \Exception("Group creation failed Contact to Developer.");
            }

            return $this->sendResponse($group, 'Group Saved Successfully', 200);
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
            $group = Group::find($id);
            $group['member_ids'] = $group->group_users()->pluck('user_id');
            $group['members'] = User::whereNot('role', 'admin')->where('status', 1)->get();

            return $this->sendResponse($group, 'Group Fetched Successfully', 200);
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
            'name' => 'required|unique:users,name,' . $id . "'",
            'member_ids' => 'required|array',
            'status' => 'required',
        ]);
        if ($validator->fails()) {
            return response(['error' => $validator->errors(),  'responseCode' => 402]);
        }

        try {
            unset($data['member_ids']);
            $group = Group::find($id);
            if ($group) {
                # code...
                User_Group::destroy($group->group_users->pluck('id'));
                foreach ($request->member_ids as $key => $value) {
                    # code...
                    $data1 = ['user_id' => $value, 'group_id' => $group->id];

                    $user_group = User_Group::create($data1);
                    if (!$user_group) {
                        # code...
                        throw new \Exception("User Group creation failed Contact to Developer");
                    }
                }
            } else {
                # code...
                throw new \Exception("Group creation failed Contact to Developer.");
            }
            
            $group->update($data);
            return $this->sendResponse($group, 'Group Updated Successfully', 200);
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
