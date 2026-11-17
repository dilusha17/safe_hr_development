import { privacy } from "@/data/legal";
import { Seo } from "@/components/Seo";
import { LegalView } from "@/components/layout/LegalView";

export default function Privacy() {
  return (
    <>
      <Seo title="Privacy" description="How the Safe HR Consultants website handles your information." path="/privacy" />
      <LegalView page={privacy} />
    </>
  );
}
