"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { saveDomainAction } from "@/app/admin/(protected)/domains/actions";
import {
  CONTENT_VISIBILITIES,
  INITIAL_DOMAIN_FORM_STATE,
  type DomainFormState,
  type DomainFormValues,
} from "@/src/lib/cms/domainForm";

type DomainFormProps = {
  mode: "create" | "edit";
  cancelHref: string;
  initialValues: DomainFormValues;
};

const inputClassName =
  "mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/40";

const textareaClassName = `${inputClassName} min-h-28 resize-y`;

function FieldError({
  state,
  field,
}: {
  state: DomainFormState;
  field: keyof NonNullable<DomainFormState["fieldErrors"]>;
}) {
  const message = state.fieldErrors?.[field];

  if (!message) {
    return null;
  }

  return <p className="mt-2 text-sm text-rose-200">{message}</p>;
}

function SubmitButton({ mode }: { mode: DomainFormProps["mode"] }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-400/10 px-5 py-3 text-sm font-medium uppercase tracking-[0.16em] text-cyan-100 transition hover:border-cyan-300/40 hover:bg-cyan-400/16 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Saving..." : mode === "create" ? "Create Domain" : "Save Changes"}
    </button>
  );
}

export function DomainForm({
  mode,
  cancelHref,
  initialValues,
}: DomainFormProps) {
  const [state, formAction] = useActionState(
    saveDomainAction,
    INITIAL_DOMAIN_FORM_STATE
  );
  const fieldErrors = Object.values(state.fieldErrors ?? {}).filter(Boolean);
  const publicRouteHref = initialValues.slug ? `/${initialValues.slug}` : null;

  return (
    <form action={formAction} className="grid gap-6">
      <input type="hidden" name="domainId" defaultValue={initialValues.domainId ?? ""} />

      {state.message ? (
        <section className="rounded-[1.75rem] border border-rose-300/20 bg-rose-400/10 px-5 py-4 text-sm text-rose-100">
          <p>{state.message}</p>
          {fieldErrors.length > 0 ? (
            <ul className="mt-3 list-disc space-y-1 pl-5">
              {fieldErrors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ) : null}

      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">Domain Basics</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
              Domains are the homepage planets. Public and enabled domains can
              appear on the solar-system homepage and power focused planet views.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {publicRouteHref ? (
              <Link
                href={publicRouteHref}
                className="inline-flex rounded-full border border-emerald-300/20 bg-emerald-400/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-emerald-100 transition hover:border-emerald-300/40 hover:bg-emerald-400/16"
              >
                Open Public Route
              </Link>
            ) : null}
            <Link
              href={cancelHref}
              className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-slate-200 transition hover:border-white/20 hover:bg-white/10"
            >
              Back to Domains
            </Link>
          </div>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <label className="block">
            <span className="text-sm text-slate-300">Label</span>
            <input
              name="label"
              defaultValue={initialValues.label}
              className={inputClassName}
              placeholder="Software"
            />
            <FieldError state={state} field="label" />
          </label>

          <label className="block">
            <span className="text-sm text-slate-300">Short label</span>
            <input
              name="shortLabel"
              defaultValue={initialValues.shortLabel}
              className={inputClassName}
              placeholder="SW"
            />
          </label>

          <label className="block">
            <span className="text-sm text-slate-300">Slug</span>
            <input
              name="slug"
              defaultValue={initialValues.slug}
              className={inputClassName}
              placeholder="software"
            />
            <FieldError state={state} field="slug" />
          </label>

          <label className="block">
            <span className="text-sm text-slate-300">Order</span>
            <input
              name="order"
              type="number"
              min="1"
              step="1"
              defaultValue={initialValues.order}
              className={inputClassName}
              placeholder="1"
            />
            <p className="mt-2 text-xs uppercase tracking-[0.16em] text-slate-500">
              Lower order appears closer to the sun.
            </p>
            <FieldError state={state} field="order" />
          </label>

          <label className="block md:col-span-2">
            <span className="text-sm text-slate-300">Description</span>
            <textarea
              name="description"
              defaultValue={initialValues.description}
              className={textareaClassName}
              placeholder="Applications, interfaces, systems design..."
            />
            <FieldError state={state} field="description" />
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
            <span className="text-sm text-slate-300">Href</span>
            <input
              name="href"
              defaultValue={initialValues.href}
              className={inputClassName}
              placeholder="/software"
            />
            <p className="mt-2 text-sm text-slate-400">
              Leave blank to default to `/{initialValues.slug || "slug"}`.
            </p>
          </label>
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-semibold text-white">Planet Visuals</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
          Color is the main required visual input. Missing orbit and size values
          fall back to deterministic defaults based on domain order so new
          planets can still render safely on the homepage.
        </p>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <label className="block">
            <span className="text-sm text-slate-300">Color</span>
            <input
              name="color"
              defaultValue={initialValues.color}
              className={inputClassName}
              placeholder="#22d3ee"
            />
          </label>

          <label className="block">
            <span className="text-sm text-slate-300">Glow color</span>
            <input
              name="glowColor"
              defaultValue={initialValues.glowColor}
              className={inputClassName}
              placeholder="Optional glow color"
            />
          </label>

          <label className="block md:col-span-2">
            <span className="text-sm text-slate-300">Gradient</span>
            <textarea
              name="gradient"
              defaultValue={initialValues.gradient}
              className={textareaClassName}
              placeholder="Optional custom CSS gradient for the planet surface"
            />
          </label>

          <label className="block">
            <span className="text-sm text-slate-300">Orbit radius</span>
            <input
              name="orbitRadius"
              type="number"
              step="0.1"
              defaultValue={initialValues.orbitRadius}
              className={inputClassName}
              placeholder="Optional"
            />
          </label>

          <label className="block">
            <span className="text-sm text-slate-300">Orbit duration</span>
            <input
              name="orbitDuration"
              type="number"
              step="0.1"
              defaultValue={initialValues.orbitDuration}
              className={inputClassName}
              placeholder="Optional"
            />
          </label>

          <label className="block">
            <span className="text-sm text-slate-300">Planet size</span>
            <input
              name="planetSize"
              type="number"
              step="0.1"
              defaultValue={initialValues.planetSize}
              className={inputClassName}
              placeholder="Optional"
            />
          </label>

          <label className="block">
            <span className="text-sm text-slate-300">Initial angle</span>
            <input
              name="initialAngle"
              type="number"
              step="0.1"
              defaultValue={initialValues.initialAngle}
              className={inputClassName}
              placeholder="Optional"
            />
          </label>
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
