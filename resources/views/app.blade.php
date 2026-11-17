<!DOCTYPE html>
<html lang="en-NZ">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="theme-color" content="#F5B027">

        {{-- Defaults. Each page overrides these through <Seo> (head-key keeps tags from duplicating). --}}
        <title inertia>Safe HR Consultants | Safety Gloves NZ</title>
        <meta head-key="description" name="description" content="Safety gloves and workplace safety technology from Safe HR Consultants, Parnell, Auckland.">
        <meta head-key="og:title" property="og:title" content="Safe HR Consultants">
        <meta head-key="og:description" property="og:description" content="Safety gloves and workplace safety technology from Safe HR Consultants, Parnell, Auckland.">
        <meta head-key="og:type" property="og:type" content="website">
        <meta head-key="twitter:card" name="twitter:card" content="summary_large_image">
        <meta property="og:site_name" content="Safe HR Consultants">

        <link rel="icon" href="/favicon.png" type="image/png">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow:wght@600;700&family=Inter:wght@400;500;600&display=swap">

        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body>
        @inertia
    </body>
</html>
