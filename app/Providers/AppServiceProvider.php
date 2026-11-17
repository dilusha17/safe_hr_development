<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Absolute site URL (APP_URL) for canonical links, og:url and JSON-LD in the React pages.
        Inertia::share('appUrl', fn () => rtrim((string) config('app.url'), '/'));
    }
}
