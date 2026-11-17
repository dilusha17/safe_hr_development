import { ArticleView } from "@/components/blog/ArticleView";
import { NotFoundView } from "@/components/NotFoundView";
import { Seo } from "@/components/Seo";
import { findArticle } from "@/lib/blog";
import { company } from "@/data/company";

export default function BlogShow({ slug }: { slug: string }) {
  const article = findArticle(slug);
  if (!article) return <><Seo title="Article unavailable" description="This Safe HR article could not be found." path="/blog" noindex /><NotFoundView /></>;
  return (
    <>
      <Seo
        title={article.title}
        description={article.excerpt}
        path={`/blog/${article.slug}`}
        type="article"
        jsonLd={(baseUrl) => ({ "@context": "https://schema.org", "@type": "Article", headline: article.title, datePublished: article.publishedAt, author: { "@type": "Organization", name: company.name }, publisher: { "@type": "Organization", name: company.name }, mainEntityOfPage: `${baseUrl}/blog/${article.slug}` })}
      />
      <ArticleView key={article.slug} article={article} />
    </>
  );
}
