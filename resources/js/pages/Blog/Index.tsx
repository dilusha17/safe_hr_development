import { BlogView } from "@/components/blog/BlogView";
import { Seo } from "@/components/Seo";
import { blogCopy } from "@/data/blog";

export default function BlogIndex() {
  return (
    <>
      <Seo title="Safety Insights — Blog" description={blogCopy.intro} path="/blog" />
      <BlogView />
    </>
  );
}
