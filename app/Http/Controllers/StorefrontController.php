<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

/**
 * Renders the storefront pages. Product, category and article data currently lives in the
 * React front end (resources/js/data); as the back end is built, load it here and pass it
 * to the page as props instead.
 */
class StorefrontController extends Controller
{
    public function home(): Response
    {
        return Inertia::render('Home');
    }

    public function shop(): Response
    {
        return Inertia::render('Shop/Index');
    }

    public function category(string $category): Response
    {
        return Inertia::render('Shop/Category', ['category' => $category]);
    }

    public function subcategory(string $category, string $subcategory): Response
    {
        return Inertia::render('Shop/Subcategory', ['category' => $category, 'subcategory' => $subcategory]);
    }

    public function product(string $slug): Response
    {
        return Inertia::render('Product/Show', ['slug' => $slug]);
    }

    public function cart(): Response
    {
        return Inertia::render('Cart');
    }

    public function checkout(): Response
    {
        return Inertia::render('Checkout');
    }

    public function contact(): Response
    {
        return Inertia::render('Contact');
    }

    public function bulkOrders(): Response
    {
        return Inertia::render('BulkOrders');
    }

    public function about(): Response
    {
        return Inertia::render('About');
    }

    public function airQuality(): Response
    {
        return Inertia::render('Technology/AirQuality');
    }

    public function aiCamera(): Response
    {
        return Inertia::render('Technology/AiCamera');
    }

    public function blog(): Response
    {
        return Inertia::render('Blog/Index');
    }

    public function article(string $slug): Response
    {
        return Inertia::render('Blog/Show', ['slug' => $slug]);
    }

    public function privacy(): Response
    {
        return Inertia::render('Privacy');
    }

    public function terms(): Response
    {
        return Inertia::render('Terms');
    }

    public function shippingReturns(): Response
    {
        return Inertia::render('ShippingReturns');
    }
}
