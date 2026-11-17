import { ShopView } from "@/components/shop/ShopView";
import { NotFoundView } from "@/components/NotFoundView";
import { Seo } from "@/components/Seo";
import { shopSearchSchema } from "@/lib/shopSearch";
import { useUrlSearch } from "@/lib/nav";
import { findCategory } from "@/lib/products";

export default function ShopCategory({ category }: { category: string }) {
  const [search, setSearch] = useUrlSearch(shopSearchSchema);
  const cat = findCategory([category]);
  if (!cat) return <><Seo title="Not found" description="This category could not be found." path={`/shop/${category}`} noindex /><NotFoundView /></>;
  return (
    <>
      <Seo title={cat.name} description={cat.description ?? `Shop ${cat.name} from Safe HR Consultants.`} path={`/shop/${category}`} />
      <ShopView path={[category]} title={cat.name} description={cat.description} search={search} onSearch={(s) => setSearch(s, { replace: true })} />
    </>
  );
}
