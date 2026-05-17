import {
  getMoonLayout,
  getPublicDomains,
  getPublicProjectsForDomain,
  type PortfolioProject,
  type ProjectStatus,
} from "@/src/lib/portfolio";

export type ProjectMoonStatus = ProjectStatus;

export type ProjectMoon = {
  id: string;
  label: string;
  href: string;
  description: string;
  orbitRadius: number;
  orbitDuration?: number;
  moonSize: number;
  initialAngle: number;
  color?: string;
  status?: ProjectMoonStatus;
};

function toLegacyProjectMoon(
  project: PortfolioProject,
  domainId: string,
  index: number,
  total: number
): ProjectMoon {
  const layout = getMoonLayout({ project, domainId, index, total });

  return {
    id: project.slug,
    label: layout.displayLabel,
    href: `/projects/${project.slug}`,
    description: project.summary,
    orbitRadius: layout.orbitRadius,
    orbitDuration: layout.orbitDuration,
    moonSize: layout.moonSize,
    initialAngle: layout.initialAngle,
    color: layout.color ?? project.visual?.moonColor,
    status: project.status,
  };
}

export const projectMoonsByDomain: Record<string, ProjectMoon[]> =
  Object.fromEntries(
    getPublicDomains().map((domain) => {
      const projects = getPublicProjectsForDomain(domain.id);

      return [
        domain.id,
        projects.map((project, index) =>
          toLegacyProjectMoon(project, domain.id, index, projects.length)
        ),
      ];
    })
  );
