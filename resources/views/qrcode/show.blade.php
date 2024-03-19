<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>SwimmingPool</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" />
</head>

<body>

    <div class="container mt-4">
        <main class="main" id="main">
            @if (Session::has('success'))
                <div class="alert alert-success alert-dismissible fade in show col-md-12">
                    <strong>Success!</strong> {{ session('success') }}
                    {{-- <button type="button" class="close" data-dismiss="alert">&times;</button> --}}
                </div>
            @endif

            @if (Session::has('error'))
                <div class="alert alert-danger alert-dismissible fade in show col-md-12">
                    <strong>Error!</strong> {{ session('error') }}
                    {{-- <button type="button" class="close" data-dismiss="alert">&times;</button> --}}
                </div>
            @endif

        </main>

        <div class="card col-md-12">
            <div class="card-header">
                <h2>Member Details</h2>
            </div>
            {{-- {{dd($member)}} --}}
            <div class="card-body">
                Name - {{ $member->name }}<br>
                Phone - {{ $member->phone }}<br>
                Email - {{ $member->email }}<br>
                Unique Id - {{ $member->unique_id }}<br>
                Address - {{ $member->address }}<br>
                Package Name - {{ $member->package_name }}<br>
                Slot Start Time - {{ $member->slot_start_time }}<br>
                Slot End Time - {{ $member->slot_end_time }}<br>
                Package Status - {{ $member->package_status == 1 ? 'Paid' : 'Due' }}<br>
                DOJ - {{ $member->doj }}<br>
                Package Start Date - {{ $member->package_start_date }}<br>
                Package End Date - {{ $member->package_end_date }}<br>
            </div>

            <div class="row col-md-12">
                @if ($member->package_status == 1)
                    <div class="col-md-6 row">
                        <label for="">Present</label>
                        <a href="{{ route('Attendance', $member->id) }}"><button
                                class="btn btn-success btn-sm">Present</button></a>
                    </div>
                @else
                    <p>{{ $member->name }} Payment Due </p>
                @endif


            </div>
        </div>

    </div>
</body>

</html>
