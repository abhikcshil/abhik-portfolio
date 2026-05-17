"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { saveProjectAction } from "@/app/admin/(protected)/projects/actions";
import {
  CONTENT_VISIBILITIES,
  INITIAL_PROJECT_FORM_STATE,
  PROJECT_STATUSES,
  type ProjectFormState,
  type ProjectFormValues,
} from "@/src/lib/cms/projectForm";

type ProjectFormProps = {
  mode: "create" | "edit";
  cancelHref: string;
  domains: Array<{
    id: string;
    label: string;
    shortLabel?: string;
    description: string;
    visibility: string;
    enabled: boolean;
  }>;
  initialValues: ProjectFormValues;
};

const inputClassName =
  "mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/40";

const textareaClassName = `${inputClassName} min-h-28 resize-y`;

function FieldError({
  state,
  field,
}: {
  state: ProjectFormState;
  field: keyof NonNullable<ProjectFormState["fieldErrors"]>;
}) {
  const message = state.fieldErrors?.[field];

  if (!message) {
    return null;
  }

  return <p className="mt-2 text-sm text-rose-200">{message}</p>;
}

function SubmitButton({ mode }: { mode: ProjectFormProps["mode"] }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-400/10 px-5 py-3 text-sm font-medium uppercase tracking-[0.16em] text-cyan-100 transition hover:border-cyan-300/40 hover:bg-cyan-400/16 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Saving..." : mode === "create" ? "Create Project" : "Save Changes"}
    </button>
  );
}

export function ProjectForm({
  mode,
  cancelHref,
  domains,
  initialValues,
}: ProjectFormProps) {
  const [state, formAction] = useActionState(
    saveProjectAction,
    INITIAL_PROJECT_FORM_STATE
  );

  return (
    <form action={formAction} className="grid gap-6">
      <input
        type="hidden"
        name="projectId"
        defaultValue={initialValues.projectId ?? ""}
      />

      {state.message ? (
        <section className="rounded-[1.75rem] border border-rose-300/20 bg-rose-400/10 px-5 py-4 text-sm text-rose-100">
          {state.message}
        </section>
      ) : null}

      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-semibold text-white">Project Basics</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <label className="block">
            <span className="text-sm text-slate-300">Title</span>
            <input
              name="title"
              defaultValue={initialValues.title}
              className={inputClassName}
              placeholder="Portfolio Site"
            />
            <FieldError state={state} field="title" />
          </label>

          <label className="block">
            <span className="text-sm text-slate-300">Short title</span>
            <input
              name="shortTitle"
              defaultValue={initialValues.shortTitle}
              className={inputClassName}
              placeholder="Optional short label"
            />
          </label>

          <label className="block">
            <span className="text-sm text-slate-300">Slug</span>
            <input
              name="slug"
              defaultValue={initialValues.slug}
              className={inputClassName}
              placeholder="portfolio-site"
            />
            <FieldError state={state} field="slug" />
          </label>

          <label className="block">
            <span className="text-sm text-slate-300">Status</span>
            <select
              name="status"
              defaultValue={initialValues.status}
              className={inputClassName}
            >
              {PROJECT_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <FieldError state={state} field="status" />
          </label>

          <label className="block md:col-span-2">
            <span className="text-sm text-slate-300">Tagline</span>
            <input
              name="tagline"
              defaultValue={initialValues.tagline}
              className={inputClassName}
              placeholder="This interface and its surrounding design system."
            />
            <FieldError state={state} field="tagline" />
          </label>

          <label className="block md:col-span-2">
            <span className="text-sm text-slate-300">Summary</span>
            <textarea
              name="summary"
              defaultValue={initialValues.summary}
              className={textareaClassName}
              placeholder="Short admin summary used by project cards and lists."
            />
            <FieldError state={state} field="summary" />
          </label>

          <label className="block">
            <span className="text-sm text-slate-300">Visibility</span>
            <select
              name="visibility"
              defaultValue={initialValues.visibility}
              className={inputClassName}
            >
              {CONTENT_VISIBILITIES.map((visibility) => (
                <option key={visibility} value={visibility}>
                  {visibility}
                </option>
              ))}
            </select>
            <FieldError state={state} field="visibility" />
          </label>

          <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-slate-200">
            <input
              type="checkbox"
              name="enabled"
              defaultChecked={initialValues.enabled}
              className="h-4 w-4 rounded border-white/20 bg-transparent"
            />
            Enabled in CMS
          </label>

          <label className="block md:col-span-2">
            <span className="text-sm text-slate-300">
              Tech stack
            </span>
            <input
              name="techStack"
              defaultValue={initialValues.techStack}
              className={inputClassName}
              placeholder="Next.js, TypeScript, Tailwind CSS"
            />
          </label>

          <label className="block md:col-span-2">
            <span className="text-sm text-slate-300">
              Highlights
            </span>
            <textarea
              name="highlights"
              defaultValue={initialValues.highlights}
              className={textareaClassName}
              placeholder="One highlight per line"
            />
          </label>
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-semibold text-white">Project Links</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <label className="block">
            <span className="text-sm text-slate-300">Live</span>
            <input
              name="linkLive"
              defaultValue={initialValues.links.live}
              className={inputClassName}
              placeholder="https://..."
            />
          </label>

          <label className="block">
            <span className="text-sm text-slate-300">GitHub</span>
            <input
              name="linkGithub"
              defaultValue={initialValues.links.github}
              className={inputClassName}
              placeholder="https://github.com/..."
            />
          </label>

          <label className="block">
            <span className="text-sm text-slate-300">Demo</span>
            <input
              name="linkDemo"
              defaultValue={initialValues.links.demo}
              className={inputClassName}
              placeholder="Optional demo URL"
            />
          </label>

          <label className="block">
            <span className="text-sm text-slate-300">Case study</span>
            <input
              name="linkCaseStudy"
              defaultValue={initialValues.links.caseStudy}
              className={inputClassName}
              placeholder="Optional case study URL"
            />
          </label>
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-semibold text-white">Detailed Content</h2>
        <div className="mt-5 grid gap-5">
          <label className="block">
            <span className="text-sm text-slate-300">Overview</span>
            <textarea
              name="contentOverview"
              defaultValue={initialValues.content.overview}
              className={textareaClassName}
            />
          </label>

          <label className="block">
            <span className="text-sm text-slate-300">Problem</span>
            <textarea
              name="contentProblem"
              defaultValue={initialValues.content.problem}
              className={textareaClassName}
            />
          </label>

          <label className="block">
            <span className="text-sm text-slate-300">Solution</span>
            <textarea
              name="contentSolution"
              defaultValue={initialValues.content.solution}
              className={textareaClassName}
            />
          </label>

          <label className="block">
            <span className="text-sm text-slate-300">Features</span>
            <textarea
              name="contentFeatures"
              defaultValue={initialValues.content.features}
              className={textareaClassName}
              placeholder="One feature per line"
            />
          </label>

          <label className="block">
            <span className="text-sm text-slate-300">Technical details</span>
            <textarea
              name="contentTechnicalDetails"
              defaultValue={initialValues.content.technicalDetails}
              className={textareaClassName}
              placeholder="One item per line"
            />
          </label>

          <label className="block">
            <span className="text-sm text-slate-300">Challenges</span>
            <textarea
              name="contentChallenges"
              defaultValue={initialValues.content.challenges}
              className={textareaClassName}
              placeholder="One challenge per line"
            />
          </label>

          <label className="block">
            <span className="text-sm text-slate-300">Lessons</span>
            <textarea
              name="contentLessons"
              defaultValue={initialValues.content.lessons}
              className={textareaClassName}
              placeholder="One lesson per line"
            />
          </label>

          <label className="block">
            <span className="text-sm text-slate-300">Future plans</span>
            <textarea
              name="contentFuturePlans"
              defaultValue={initialValues.content.futurePlans}
              className={textareaClassName}
              placeholder="One idea per line"
            />
          </label>
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-semibold text-white">Domain Placements</h2>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          Select the domains this project belongs to and set the moon ordering
          for each placement. Public projects should have at least one selected
          placement.
        </p>
        <FieldError state={state} field="domains" />
        <FieldError state={state} field="domainOrders" />

        <div className="mt-5 grid gap-4">
          {domains.map((domain) => {
            const placement = initialValues.placements.find(
              (entry) => entry.domainId === domain.id
            );

            return (
              <div
                key={domain.id}
                className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-2xl">
                    <label className="flex items-center gap-3 text-sm text-slate-100">
                      <input
                        type="checkbox"
                        name="domains"
                        value={domain.id}
                        defaultChecked={Boolean(placement)}
                        className="h-4 w-4 rounded border-white/20 bg-transparent"
                      />
                      <span className="font-medium">
                        {domain.label}
                        {domain.shortLabel ? ` (${domain.shortLabel})` : ""}
                      </span>
                    </label>
                    <p className="mt-3 text-sm leading-7 text-slate-300">
                      {domain.description}
                    </p>
                    <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-500">
                      {domain.visibility} / {domain.enabled ? "enabled" : "disabled"}
                    </p>
                  </div>

                  <div className="grid min-w-[18rem] gap-4 md:grid-cols-2">
                    <label className="block">
                      <span className="text-sm text-slate-300">Order</span>
                      <input
                        type="number"
                        min="1"
                        step="1"
                        name={`domainOrder.${domain.id}`}
                        defaultValue={placement?.order ?? "1"}
                        className={inputClassName}
                      />
                    </label>

                    <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-200">
                      <input
                        type="checkbox"
                        name={`domainFeatured.${domain.id}`}
                        defaultChecked={placement?.featured ?? false}
                        className="h-4 w-4 rounded border-white/20 bg-transparent"
                      />
                      Featured placement
                    </label>

                    <label className="block md:col-span-2">
                      <span className="text-sm text-slate-300">
                        Label override
                      </span>
                      <input
                        name={`domainLabelOverride.${domain.id}`}
                        defaultValue={placement?.labelOverride ?? ""}
                        className={inputClassName}
                        placeholder="Optional display label"
                      />
                    </label>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="flex flex-wrap items-center gap-3">
        <SubmitButton mode={mode} />
        <Link
          href={cancelHref}
          className="inline-flex rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium uppercase tracking-[0.16em] text-slate-200 transition hover:border-white/20 hover:bg-white/10"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
