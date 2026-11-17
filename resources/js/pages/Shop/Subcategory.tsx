import { ShopView } from "@/components/shop/ShopView";
import { NotFoundView } from "@/components/NotFoundView";
import { Seo } from "@/components/Seo";
import { shopSearchSchema } from "@/lib/shopSearch";
import { useUrlSearch } from "@/lib/nav";
import { findCategory } from "@/lib/products";

export default function ShopSubcategory({ category, subcategory }: { category: string; subcategory: string }) {
  const [search, setSearch] = useUrlSearch(shopSearchSchema);
  const sub = findCategory([category, subcategory]);
  const top = findCategory([category]);
  if (!sub || !top) return <><Seo title="Not found" description="This category could not be found." path={`/shop/${category}/${subcategory}`} noindex /><NotFoundView /></>;
  return (
    <>
      <Seo title={`${sub.name} ${top.name}`} description={`Shop ${sub.name.toLowerCase()} ${top.name.toLowerCase()} from Safe HR Consultants, Auckland. Prices in NZD.`} path={`/shop/${category}/${subcategory}`} />
      <ShopView path={[category, subcategory]} title={sub.name} search={search} onSearch={(s) => setSearch(s, { replace: true })} />
    </>
  );
}
