import type {
  ContentVisibility,
  PortfolioDomain,
} from "@/src/lib/portfolio/schema";
import { CONTENT_VISIBILITIES } from "@/src/data/portfolio/types";
import { URL_SAFE_SLUG_PATTERN } from "./projectForm";

export { CONTENT_VISIBILITIES, URL_SAFE_SLUG_PATTERN };

export type DomainFormFieldErrors = Partial<
  Record<"label" | "slug" | "description" | "order" | "visibility", string>
>;

export type DomainFormState = {
  message?: string;
  fieldErrors?: DomainFormFieldErrors;
};

export const INITIAL_DOMAIN_FORM_STATE: DomainFormState = {};

export type DomainFormValues = {
  domainId?: string;
  label: string;
  shortLabel: string;
  slug: string;
  description: string;
  enabled: boolean;
  visibility: ContentVisibility;
  order: string;
  href: string;
  color: string;
  glowColor: string;
  gradient: string;
  orbitRadius: string;
  orbitDuration: string;
  planetSize: string;
  initialAngle: string;
};

function toOptionalString(value?: string) {
  return value ?? "";
}

function toOptionalNumberString(value?: number) {
  return typeof value === "number" ? String(value) : "";
}

export function createDomainFormValues(
  domain?: PortfolioDomain
): DomainFormValues {
  return {
    domainId: domain?.id,
    label: domain?.label ?? "",
    shortLabel: domain?.shortLabel ?? "",
    slug: domain?.slug ?? "",
    description: domain?.description ?? "",
    enabled: domain?.enabled ?? true,
    visibility: domain?.visibility ?? "draft",
    order: typeof domain?.order === "number" ? String(domain.order) : "1",
    href: domain?.href ?? "",
    color: domain?.visual.color ?? "",
    glowColor: toOptionalString(domain?.visual.glowColor),
    gradient: toOptionalString(domain?.visual.gradient),
    orbitRadius: toOptionalNumberString(domain?.visual.orbitRadius),
    orbitDuration: toOptionalNumberString(domain?.visual.orbitDuration),
    planetSize: toOptionalNumberString(domain?.visual.planetSize),
    initialAngle: toOptionalNumberString(domain?.visual.initialAngle),
  };
}
