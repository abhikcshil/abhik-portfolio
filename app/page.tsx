import { SolarSystemScene } from "@/src/components/home/SolarSystemScene";
import { getPublicPortfolioSceneDataCached } from "@/src/lib/portfolio/publicData";

export default async function Home() {
  const { domains, projectsByDomain } = await getPublicPortfolioSceneDataCached();

  return (
    <SolarSystemScene
      domains={domains}
      projectsByDomain={projectsByDomain}
    />
  );
}
