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
                Name - {{$member->name}}
                Phone - {{$member->phone}}
                Email - {{$member->email}}
                Unique Id - {{$member->unique_id}}
                Address - {{$member->address}}
                Package Name - {{$member->package_name}}
                Package Status - {{$member->package_status == 1 ? 'Active' : 'Inactive'}}
                DOJ - {{$member->doj}}
                Package Start Date - {{$member->package_start_date }}
                Package End Date - {{$member->package_end_date }}
            </div>
        </div>

    </div>
</body>
</html>