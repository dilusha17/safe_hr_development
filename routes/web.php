<?php

use App\Http\Controllers\StorefrontController;
use Illuminate\Support\Facades\Route;

Route::controller(StorefrontController::class)->group(function () {
    Route::get('/', 'home')->name('home');

    Route::get('/shop', 'shop')->name('shop');
    Route::get('/shop/{category}', 'category')->name('shop.category');
    Route::get('/shop/{category}/{subcategory}', 'subcategory')->name('shop.subcategory');
    Route::get('/product/{slug}', 'product')->name('product');

    Route::get('/cart', 'cart')->name('cart');
    Route::get('/checkout', 'checkout')->name('checkout');

    Route::get('/contact', 'contact')->name('contact');
    Route::get('/bulk-orders', 'bulkOrders')->name('bulk-orders');
    Route::get('/about', 'about')->name('about');

    Route::get('/technology/air-quality-monitoring', 'airQuality')->name('technology.air-quality');
    Route::get('/technology/ai-safety-camera-system', 'aiCamera')->name('technology.ai-camera');

    Route::get('/blog', 'blog')->name('blog');
    Route::get('/blog/{slug}', 'article')->name('blog.show');

    Route::get('/privacy', 'privacy')->name('privacy');
    Route::get('/terms', 'terms')->name('terms');
    Route::get('/shipping-returns', 'shippingReturns')->name('shipping-returns');
});
