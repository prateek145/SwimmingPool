<?php

namespace App\Http\Controllers\Api\backend;

use App\Exports\AttendanceExport;
use App\Http\Controllers\Controller;
use App\Models\backend\member_slot;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\backend\ResponseController;
use App\Models\backend\Attendance;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\URL;


class AttendanceController extends ResponseController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $data['members'] = User::where('role', '!=', 'admin')->get();
            $data['attendance'] = Attendance::whereDate('date', date('Y-m-d'))->where('attendance', 1)->pluck('member_id');

            // dd($data['attendance'], date('d-m-Y'));
            return $this->sendResponse($data, 'Attendance Fetched Successfully', 200);
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
            'member_id' => 'required|integer',
            // 'attendance' => 'required|integer'
        ]);
        if ($validator->fails()) {
            return response(['error' => $validator->errors(),  'responseCode' => 403]);
        }

        try {
            $data['date'] = date('Y-m-d');
            $member = User::find($request->member_id);
            $data['name'] = $member->name;
            $data['phone'] = $member->phone;
            $data['email'] = $member->email;
            $data['comment'] = $request->comment;

            $attendance = Attendance::where('date', date('Y-m-d'))->where('member_id', $request->member_id)->first();
            if ($attendance) {
                # code...
                $attendance->update($data);
            } else {
                # code...
                $attendance = Attendance::create($data);
            }
            

            return $this->sendResponse($attendance, 'Allocate Date to User Successfully', 200);
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage(), [], 402);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function attendance_export(){
        try {
            // dd('prateek');
            $members = User::latest()->get();
            $data['members'] = $members;
            $data['url'] = Url::to('/');

            return $this->sendResponse($data, 'Attendance Members Fetched Successfully', 200);
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage(), [], 402);
        }
    }

    public function exportAttendance()
    {
        $queryTodo = Attendance::query();
        if (request()->get('user_id') != null) {
            # code...
            $queryTodo->where('member_id', request()->get('user_id'));
        }
        if (request()->get('start_date') != null && request()->get('end_date') != null) {
            # code...
            $queryTodo->whereBetween('date', [request()->get('start_date'), request()->get('end_date')]);
        }
        $file_name = 'attendanceExport.xls';
        // dd($queryTodo->get(), request()->get('user_id'), request()->get('start_date'), request()->get('end_date'));
        // dd($queryTodo->get(), request()->get('user_id'), request()->get('start_date'), request()->get('end_date'));
        $export = Excel::store(new AttendanceExport($queryTodo->get()), $file_name, 'local');
        $file = storage_path() . '/app/attendanceExport.xls';
        return \Response::download($file, 'attendanceExport.xls');
    }

}
