import { ShopView } from "@/components/shop/ShopView";
import { Seo } from "@/components/Seo";
import { shopSearchSchema } from "@/lib/shopSearch";
import { useUrlSearch } from "@/lib/nav";

export default function ShopIndex() {
  const [search, setSearch] = useUrlSearch(shopSearchSchema);
  return (
    <>
      <Seo title="Shop All Products" description="Browse every safety glove from Safe HR Consultants. Prices in NZD, bulk pricing on request." path="/shop" />
      <ShopView path={[]} title="All products" search={search} onSearch={(s) => setSearch(s, { replace: true })} />
    </>
  );
}
