<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>How to Generate QR Code in Laravel 9</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"/>
</head>

<body>

    <div class="container mt-4">

        <div class="card">
            <div class="card-header">
                <h2>Member Details</h2>
            </div>
            <div class="card-body">
                Name - {{$member->name}}<br>
                Phone - {{$member->phone}}<br>
                Email - {{$member->email}}<br>
                Unique Id - {{$member->unique_id}}<br>
                Address - {{$member->address}}<br>
                Package Name - {{$member->package_name}}<br>
                Package Status - {{$member->package_status == 1 ? 'Active' : 'Inactive'}}<br>
                DOJ - {{$member->doj}}<br>
                Package Start Date - {{$member->package_start_date }}<br>
                Package End Date - {{$member->package_end_date }}<br>
            </div>
        </div>

    </div>
</body>
</html>