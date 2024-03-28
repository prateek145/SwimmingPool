<?php

namespace App\Http\Controllers\Api\backend;

use App\Http\Controllers\Controller;
use App\Models\backend\PLaccount;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\backend\ResponseController;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\TransactionExport;
use App\Models\backend\AllocatePackage;
use App\Models\backend\member_slot;
use App\Models\backend\Package;
use App\Models\backend\Slot;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\URL;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class PLaccountController extends ResponseController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            // dd('prateek');
            $pl_accounts = PLaccount::latest()->get();
            $users = DB::table('users')
            ->join('allocate_packages', 'allocate_packages.member_id', '=', 'users.id')
            ->select('allocate_packages.package_price', 'users.name', 'users.id', 'allocate_packages.package_name',
            'allocate_packages.package_start_date','allocate_packages.package_end_date')
            ->get();

            // dd($users);
            $data['pl_accounts'] = $pl_accounts;
            $data['users'] = $users;
            $data['url'] = Url::to('/');
            // dd($pl_accounts);
            return $this->sendResponse($data, 'PL account Fetched Successfully', 200);
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
        $validator = Validator::make(
            $data,
            [
                'transaction_type' => 'required',
                'amount' => 'required|numeric',
                'date' => 'required',
                // 'user_id' => 'required'
            ],
            [
                'amount.required' => 'Numeric Field Required',
                // 'user_id.required' => 'User Name Field Required',
                // 'amount.numeric' => 'Numeric Field Required',
            ]

        );
        if ($validator->fails()) {
            return response(['error' => $validator->errors(),  'responseCode' => 403]);
        }

        try {
            // dd($data);
            if ($request->user_id) {
                # code...
                $user = User::find($request->user_id);
                $data['name'] = $user->name;
                $data['phone'] = $user->phone;
                $data['email'] = $user->email;
            }

            $allocate_package = AllocatePackage::where('member_id', $request->user_id)->first();
            $allocate_package->package_status = 1;
            $package = Package::find($allocate_package->package_id);
            $allocate_package->package_end_date = date('Y-m-d', strtotime($allocate_package->package_end_date. ' + ' . $package->days . 'days'));
            $allocate_package->save();
            $pl_account = PLaccount::create($data);
            return $this->sendResponse($pl_account, 'P&L account Saved Successfully', 200);
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
            // dd($id);
            $pl_account = PLaccount::find($id);
            $users = User::latest()->get();
            $data['pl_account'] = $pl_account;
            $data['users'] = $users;
            $allocate_package = AllocatePackage::where('member_id', $pl_account->user_id)->first();
            $slot = member_slot::where('member_id',$pl_account->user_id)->first();
            $data['slot'] = $slot;
            $data['package'] = $allocate_package;
            $data['url'] = URL::to('/backend/assets/img/1.png') ?? '';
            $data['qrcode'] = base64_encode(QrCode::size(200)->generate(url(URL::to('/') . '/UserDetails/' . $pl_account->user_id ?? "")));
            // dd($data);

            return $this->sendResponse($data, 'P&L account Fetched Successfully', 200);
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
        $validator = Validator::make($data, [
            'amount' => 'required',
            'date' => 'required',
            'user_id' => 'required|integer'
        ]);
        if ($validator->fails()) {
            return response(['error' => $validator->errors(),  'responseCode' => 403]);
        }

        try {
            // dd($data);
            $pl_account = PLaccount::find($id);
            $user = User::find($request->user_id);
            $data['name'] = $user->name;
            $data['phone'] = $user->phone;
            $data['email'] = $user->email;
            $pl_account->update($data);
            return $this->sendResponse($pl_account, 'P&L account Updated Successfully', 200);
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage(), [], 402);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            // dd($data);
            PLaccount::destroy($id);
            return $this->sendResponse('P&L account Deleted Successfully', 200);
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage(), [], 402);
        }
    }

    public function exportTransactions()
    {
        // dd('prateek');
        $queryTodo = PLaccount::query();

        if (request()->get('export_user_id') != "null") {
            # code...
            $queryTodo->where('user_id', request()->get('export_user_id'));
        }
        if (request()->get('start_date') != "null" && request()->get('end_date') != "null") {
            # code...
            $queryTodo->whereBetween('date', [request()->get('start_date'), request()->get('end_date')]);
        }
        $file_name = 'PLexport.xls';
        // dd($queryTodo->get(), request()->get('user_id'), request()->get('start_date'), request()->get('end_date'));
        $export = Excel::store(new TransactionExport($queryTodo->get()), $file_name, 'local');
        $file = storage_path() . '/app/PLexport.xls';
        return \Response::download($file, 'PLexport.xls');
    }

    public function fetchUserTransactions($id)
    {
        try {
            // dd($id);
            $user = User::find($id);
            $data = PLaccount::where('user_id', $id)->get();
            $data['bills'] = $data;
            $data['name'] = $user->name;
            $data['phone'] = $user->phone;
            $data['email'] = $user->email;
            $data['unique_id'] = $user->unique_id;
            // dd($data, $id);
            return $this->sendResponse($data, 'Allocate Packages Fetched Successfully', 200);
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage(), [], 402);
        }
    }
}
