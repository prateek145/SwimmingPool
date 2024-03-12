<?php

namespace App\Console\Commands;

use App\Models\backend\AllocatePackage;
use Illuminate\Console\Command;

class PackageCheck extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'package-check';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        //
        $date = date('Y-m-d');
        $allocatedPackages = AllocatePackage::latest()->get();
        // dd($date, $allocatedPackages);
        foreach ($allocatedPackages as $key => $value) {
            # code...
            // dd($value);
            if ($date > $value->package_end_date) {
                # code...
                $value->package_status = 0;
                $value->save();
            }
        }
    }
}
