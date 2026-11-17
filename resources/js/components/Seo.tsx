import { Head, usePage } from "@inertiajs/react";
import { seo } from "@/lib/seo";

type SeoProps = {
  title: string;
  description: string;
  path: string;
  type?: string;
  /** Absolute or site-relative image URL for og:image / twitter:image. */
  image?: string;
  noindex?: boolean;
  /** Builds a JSON-LD object; receives the absolute site URL (the `appUrl` shared prop). */
  jsonLd?: (baseUrl: string) => unknown;
};

/** Per-page <title>, meta tags, canonical link and optional JSON-LD, rendered through Inertia's <Head>. */
export function Seo({ title, description, path, type = "website", image, noindex, jsonLd }: SeoProps) {
  const { appUrl } = usePage<{ appUrl: string }>().props;
  const data = seo(title, description, path, appUrl, type);
  return (
    <Head title={data.title}>
      {data.meta.map((m) => <meta key={"name" in m ? m.name : m.property} head-key={"name" in m ? m.name : m.property} {...m} />)}
      {data.links.map((l) => <link key={l.rel} head-key={l.rel} {...l} />)}
      {image && <meta head-key="og:image" property="og:image" content={image} />}
      {image && <meta head-key="twitter:image" name="twitter:image" content={image} />}
      {noindex && <meta head-key="robots" name="robots" content="noindex" />}
      {jsonLd && <script head-key="ld-json" type="application/ld+json">{JSON.stringify(jsonLd(appUrl))}</script>}
    </Head>
  );
}
