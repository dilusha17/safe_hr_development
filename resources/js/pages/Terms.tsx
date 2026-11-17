import { terms } from "@/data/legal";
import { Seo } from "@/components/Seo";
import { LegalView } from "@/components/layout/LegalView";

export default function Terms() {
  return (
    <>
      <Seo title="Terms" description="Terms of use for the Safe HR Consultants website." path="/terms" />
      <LegalView page={terms} />
    </>
  );
}
