<?php

return [
    'driver' => 'gd',
    'cache' => [
        'enabled' => env('IMAGE_CACHE_ENABLED', true),
        'lifetime' => env('IMAGE_CACHE_LIFETIME', 43200),
    ],
];