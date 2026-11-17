<?php

use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    $this->withoutVite();
});

it('renders each storefront page with the expected Inertia component', function (string $url, string $component, array $props) {
    $this->get($url)
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component($component)
            ->where('appUrl', rtrim(config('app.url'), '/'))
            ->whereAll($props));
})->with([
    ['/', 'Home', []],
    ['/shop', 'Shop/Index', []],
    ['/shop/safety-gloves', 'Shop/Category', ['category' => 'safety-gloves']],
    ['/shop/safety-gloves/cut-resistance', 'Shop/Subcategory', ['category' => 'safety-gloves', 'subcategory' => 'cut-resistance']],
    ['/product/some-product', 'Product/Show', ['slug' => 'some-product']],
    ['/cart', 'Cart', []],
    ['/checkout', 'Checkout', []],
    ['/contact?topic=bulk', 'Contact', []],
    ['/bulk-orders', 'BulkOrders', []],
    ['/about', 'About', []],
    ['/technology/air-quality-monitoring', 'Technology/AirQuality', []],
    ['/technology/ai-safety-camera-system', 'Technology/AiCamera', []],
    ['/blog', 'Blog/Index', []],
    ['/blog/an-article', 'Blog/Show', ['slug' => 'an-article']],
    ['/privacy', 'Privacy', []],
    ['/terms', 'Terms', []],
    ['/shipping-returns', 'ShippingReturns', []],
]);

it('renders the React 404 page for unknown URLs', function () {
    $this->get('/does-not-exist')
        ->assertNotFound()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Error')
            ->where('status', 404));
});
