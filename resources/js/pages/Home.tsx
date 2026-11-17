import { HeroSlider } from "@/components/home/HeroSlider";
import { CategoryTiles, ClosingCta, FeaturedProducts, IndustriesStrip, TechTeaser, WhyShop } from "@/components/home/HomeSections";
import { BulkOrderCta } from "@/components/shop/BulkOrderCta";
import { Seo } from "@/components/Seo";

export default function Home() {
  return (
    <>
      <Seo title="Safety Gloves & Equipment NZ" description="Shop cut, chemical, impact, general-use and garden safety gloves from Safe HR Consultants in Parnell, Auckland. Bulk orders welcome." path="/" />
      <HeroSlider />
      <CategoryTiles />
      <FeaturedProducts />
      <WhyShop />
      <div className="container-page"><BulkOrderCta /></div>
      <div className="pt-16 md:pt-20"><TechTeaser /></div>
      <IndustriesStrip />
      <ClosingCta />
    </>
  );
}
