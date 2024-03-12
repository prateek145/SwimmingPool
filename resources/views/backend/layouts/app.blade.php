<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">

    <title>Swimming Pool</title>
    <meta content="" name="description">
    <meta content="" name="keywords">

    <!-- Favicons -->
    <link href="{{asset('public/backend/assets/img/favicon.png')}}" rel="icon">
    <link href="{{asset('public/backend/assets/img/apple-touch-icon.png')}}" rel="apple-touch-icon">

    <!-- Google Fonts -->
    <link href="https://fonts.gstatic.com" rel="preconnect">
    <link
        href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Nunito:300,300i,400,400i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i"
        rel="stylesheet">

    <!-- Vendor CSS Files -->
    <link href="{{asset('public/backend/assets/vendor/bootstrap/css/bootstrap.min.css')}}" rel="stylesheet">
    <link href="{{asset('public/backend/assets/vendor/bootstrap-icons/bootstrap-icons.css')}}" rel="stylesheet">
    <link href="{{asset('public/backend/assets/vendor/boxicons/css/boxicons.min.css')}}" rel="stylesheet">
    <link href="{{asset('public/backend/assets/vendor/quill/quill.snow.css')}}" rel="stylesheet">
    <link href="{{asset('public/backend/assets/vendor/quill/quill.bubble.css')}}" rel="stylesheet">
    <link href="{{asset('public/backend/assets/vendor/remixicon/remixicon.css')}}" rel="stylesheet">
    <link href="{{asset('public/backend/assets/vendor/simple-datatables/style.css')}}" rel="stylesheet">

    <!-- Template Main CSS File -->
    <link href="{{asset('public/backend/assets/css/style.css')}}" rel="stylesheet">
    @vite('resources/js/app.js')
</head>

<body>
    @include('backend/layouts/header')
    @include('backend/layouts/sidebar')
    <div id="app">
        <home />
    </div>
    @include('backend/layouts/footer')

    <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

    <!-- Vendor JS Files -->
    <script src="{{asset('public/backend/assets/vendor/apexcharts/apexcharts.min.js')}}"></script>
    <script src="{{asset('public/backend/assets/vendor/bootstrap/js/bootstrap.bundle.min.js')}}"></script>
    <script src="{{asset('public/backend/assets/vendor/chart.js/chart.umd.js')}}"></script>
    <script src="{{asset('public/backend/assets/vendor/echarts/echarts.min.js')}}"></script>
    <script src="{{asset('public/backend/assets/vendor/quill/quill.min.js')}}"></script>
    <script src="{{asset('public/backend/assets/vendor/simple-datatables/simple-datatables.js')}}"></script>
    <script src="{{asset('public/backend/assets/vendor/tinymce/tinymce.min.js')}}"></script>
    <script src="{{asset('public/backend/assets/vendor/php-email-form/validate.js')}}"></script>
  
    <!-- Template Main JS File -->
    <script src="{{asset('public/backend/assets/js/main.js')}}"></script>
</body>

</html>
