import { shippingReturns } from "@/data/legal";
import { Seo } from "@/components/Seo";
import { LegalView } from "@/components/layout/LegalView";

export default function ShippingReturns() {
  return (
    <>
      <Seo title="Shipping and Returns" description="Delivery and returns information for Safe HR Consultants orders." path="/shipping-returns" />
      <LegalView page={shippingReturns} />
    </>
  );
}
