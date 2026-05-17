import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublicProjectBySlugCached } from "@/src/lib/portfolio/publicData";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getPublicProjectBySlugCached(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-dvh bg-[#030407] px-6 py-16 text-slate-100">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm">
        <p className="text-sm uppercase tracking-[0.26em] text-slate-400">
          Project Placeholder
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">
          {project.title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">
          {project.summary} This placeholder route keeps project moon links
          working while the full project pages are still being designed.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full border border-white/12 bg-white/8 px-5 py-3 text-sm font-medium uppercase tracking-[0.18em] text-slate-100 transition hover:border-white/24 hover:bg-white/12"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}
