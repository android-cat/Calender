<?php

require __DIR__ . '/../vendor/autoload.php';

use App\Controllers\MeetingController;

// Enable CORS
Flight::route('OPTIONS /*', function() {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Access-Control-Max-Age: 86400');
    Flight::halt(200);
});

// Add CORS headers to all responses
Flight::before('start', function() {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
});

// Routes
Flight::route('/', function() {
    Flight::json(['message' => 'MIXTEND Calendar API']);
});

Flight::route('GET /api/meetings', function() {
    $controller = new MeetingController();
    $controller->index();
});

Flight::start();
