import { airQuality } from "@/data/content";
import { Seo } from "@/components/Seo";
import { TechnologyPage } from "@/components/tech/TechnologyPage";
import { IllustrativeSensor } from "@/components/tech/IllustrativeSensor";

export default function AirQuality() {
  return (
    <>
      <Seo title="Air Quality Monitoring Device" description={airQuality.summary} path="/technology/air-quality-monitoring" />
      <TechnologyPage content={airQuality} visual={<IllustrativeSensor />} />
    </>
  );
}
