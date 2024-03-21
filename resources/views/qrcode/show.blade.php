<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>ICARD</title>
    <style type="text/css">
    * {
        margin: 0;
        padding: 0;
    }
    </style>
</head>

<body>
    <table style="border: 1px solid; width: 1012px; height: 638px;">
        
            <thead>
                <tr>
                    <td colspan="2"><img src="{{URL::to('/backend/assets/img/1.png') ?? ''}}" style="display: block; height: inherit; float: left; max-width: 20%;"> <img src="logo.png" style="display: block; height: inherit; float: right; max-width: 20%;"> </td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="width:30%; border:1px solid; padding:10px">
                        <img src="{{URL::to('storage/' . $member->image) ?? ''}}" style="float: left; width: 100%;">
                    </td>
                    <td style="width:70%; padding-left: 20px;" >
                        <h1 style="border-bottom: 2px dotted; margin-bottom:10px ;">Membership no.:</h1>
                        <h1 style="border-bottom: 2px dotted; margin-bottom:10px ;">Name:</h1>
                        <h1 style="border-bottom: 2px dotted; margin-bottom:10px ;">S/O, D/O, W/O:</h1>
                        <h1 style="border-bottom: 2px dotted; margin-bottom:10px ;">Address:</h1>
                        <h1 style="border-bottom: 2px dotted; margin-bottom:10px ;">Phone:</h1>
                        <h1 style="border-bottom: 2px dotted; margin-bottom:10px ;">Time:</h1>
                        <h1 style="border-bottom: 2px dotted; margin-bottom:10px ;">Days:</h1>
                    </td>
                </tr>
            </tbody>
        
    </table>
</body>

</html>

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
