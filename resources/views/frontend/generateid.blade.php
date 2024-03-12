<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Generate ID</title>
</head>

<body style="padding: 0 auto; width:100%; text-align:center;">



    <div class="card-container"
        style="width: 638px; overflow: hidden; background-size:cover; text-align: center; padding: 50px; margin: 0 auto; background-image:http://127.0.0.1:8000/backend/assets/img/maxipool.jpg;">
        <h1 style="font-family: sans-serif; font-size: 100px; color: #fff;">Maxi Pool</h1>

        {{-- {{dd(URL::to('/'))}} --}}
        <img src="{{ asset(URL::to('/'). $data['user']['image'])}}" style="width:30%; border: 1px solid; border-radius: 50%; background:#fff;" />

        <h2 style="color: #fff; font-size: 50px;">{{ $data['user']['name'] ?? ""}}</h2>
        <h2 style="color: #fff; font-size: 50px;">{{ $data['user']['unique_id'] ?? ""}}</h2>
        <h2 style="color: #fff; font-size: 50px;">{{ $data['user']['phone'] ?? ""}}</h2>
        <h2 style="color: #fff; font-size: 50px;">{{ $data['user']['email'] ?? ""}}</h2>

        {{ QrCode::size(200)->generate(url('https://stackoverflow.com/questions/40682748/assets-not-referencing-to-public-folder-laravel')) }}


    </div>


</body>

</html>
