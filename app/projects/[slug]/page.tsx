import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getPublicDomainsCached,
  getPublicProjectBySlugCached,
} from "@/src/lib/portfolio/publicData";
import { buildPageTitle, SITE_DESCRIPTION } from "@/src/lib/site";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

function formatStatusLabel(status: string) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPublicProjectBySlugCached(slug);

  if (!project) {
    return {
      title: "Project",
      description: SITE_DESCRIPTION,
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const description = project.tagline || project.summary || SITE_DESCRIPTION;
  const title = buildPageTitle(project.title);

  return {
    title: project.title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

function formatProjectLinkLabel(label: string) {
  switch (label) {
    case "github":
      return "GitHub";
    case "live":
      return "Live Site";
    case "demo":
      return "Demo";
    case "caseStudy":
      return "Case Study";
    default:
      return label;
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const [project, domains] = await Promise.all([
    getPublicProjectBySlugCached(slug),
    getPublicDomainsCached(),
  ]);

  if (!project) {
    notFound();
  }

  const projectDomains = project.domains
    .map((placement) =>
      domains.find((domain) => domain.id === placement.domainId) ?? null
    )
    .filter((domain): domain is (typeof domains)[number] => Boolean(domain));
  const projectLinks = Object.entries(project.links ?? {}).filter(
    (entry): entry is [string, string] => Boolean(entry[1])
  );
  const contentSections = [
    {
      title: "Overview",
      body: project.content?.overview,
    },
    {
      title: "Problem",
      body: project.content?.problem,
    },
    {
      title: "Solution",
      body: project.content?.solution,
    },
  ].filter((section) => section.body?.trim());
  const listSections = [
    {
      title: "Highlights",
      items: project.highlights,
    },
    {
      title: "Features",
      items: project.content?.features ?? [],
    },
    {
      title: "Technical Details",
      items: project.content?.technicalDetails ?? [],
    },
    {
      title: "Challenges",
      items: project.content?.challenges ?? [],
    },
    {
      title: "Lessons",
      items: project.content?.lessons ?? [],
    },
    {
      title: "Future Plans",
      items: project.content?.futurePlans ?? [],
    },
  ].filter((section) => section.items.length > 0);

  return (
    <main className="min-h-dvh bg-[#030407] px-6 py-16 text-slate-100">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-emerald-300/18 bg-emerald-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-emerald-200">
              {formatStatusLabel(project.status)}
            </span>
            {projectDomains.map((domain) => (
              <Link
                key={domain.id}
                href={`/${domain.slug}`}
                className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-slate-200 transition hover:border-white/18 hover:bg-white/10"
              >
                {domain.label}
              </Link>
            ))}
          </div>

          <p className="mt-6 text-xs uppercase tracking-[0.28em] text-slate-400">
            Project Overview
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {project.title}
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-200">
            {project.tagline}
          </p>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300">
            {project.summary}
          </p>

          {project.techStack.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {project.techStack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-slate-200"
                >
                  {item}
                </span>
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/"
              className="inline-flex rounded-full border border-white/12 bg-white/8 px-5 py-3 text-sm font-medium uppercase tracking-[0.18em] text-slate-100 transition hover:border-white/24 hover:bg-white/12"
            >
              Return Home
            </Link>
            {projectLinks.map(([label, href]) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${formatProjectLinkLabel(label)} for ${project.title}`}
                className="inline-flex rounded-full border border-sky-300/18 bg-sky-400/10 px-5 py-3 text-sm font-medium uppercase tracking-[0.18em] text-sky-100 transition hover:border-sky-200/28 hover:bg-sky-400/16"
              >
                {formatProjectLinkLabel(label)}
              </a>
            ))}
          </div>
        </section>

        {(contentSections.length > 0 || listSections.length > 0) && (
          <section className="grid gap-6 lg:grid-cols-2">
            {contentSections.map((section) => (
              <article
                key={section.title}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-7 shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-sm"
              >
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                  {section.title}
                </p>
                <p className="mt-4 text-base leading-7 text-slate-300">
                  {section.body}
                </p>
              </article>
            ))}

            {listSections.map((section) => (
              <article
                key={section.title}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-7 shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-sm"
              >
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                  {section.title}
                </p>
                <ul className="mt-4 grid gap-3 text-base leading-7 text-slate-300">
                  {section.items.map((item) => (
                    <li key={item} className="rounded-2xl border border-white/8 bg-black/20 px-4 py-3">
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
