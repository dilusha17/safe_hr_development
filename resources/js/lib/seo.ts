/**
 * Head metadata for a page. Used by the <Seo> component, which feeds Inertia's <Head>.
 * `baseUrl` comes from the `appUrl` shared prop (config('app.url')), never hard-coded.
 */
export function absoluteUrl(baseUrl: string, path: string) {
  return new URL(path, baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`).href;
}

export function seo(title: string, description: string, path: string, baseUrl: string, type = "website") {
  const full = `${title} | Safe HR Consultants`;
  const url = absoluteUrl(baseUrl, path);
  return {
    title: full,
    meta: [
      { name: "description", content: description },
      { property: "og:title", content: full },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
