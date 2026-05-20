"use client";

import type { CSSProperties } from "react";
import type { PortfolioDomain, PortfolioProject, ProjectStatus } from "@/src/data/portfolio";
import type { MoonLayout } from "@/src/lib/portfolio";

type ProjectPreviewPanelProps = {
  activeProject: PortfolioProject | null;
  activeLayout: MoonLayout | null;
  domain: PortfolioDomain;
};

const MAX_TECH_STACK_ITEMS = 4;
const MAX_HIGHLIGHTS = 2;

function formatStatus(status: ProjectStatus) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function getPreviewCopy(project: PortfolioProject) {
  return (
    project.content?.overview?.trim() ||
    project.summary.trim() ||
    project.tagline.trim()
  );
}

function getPreviewTitle(project: PortfolioProject) {
  return project.title.trim();
}

export function ProjectPreviewPanel({
  activeProject,
  activeLayout,
  domain,
}: ProjectPreviewPanelProps) {
  const accentColor =
    activeLayout?.color ??
    activeProject?.visual?.moonColor ??
    domain.visual.label;
  const previewStyle = {
    "--preview-accent": accentColor,
  } as CSSProperties;
  const imageSource = activeProject?.visual?.image?.trim();
  const previewCopy = activeProject ? getPreviewCopy(activeProject) : null;
  const previewHighlights = activeProject?.highlights.slice(0, MAX_HIGHLIGHTS) ?? [];
  const previewTechStack = activeProject?.techStack.slice(0, MAX_TECH_STACK_ITEMS) ?? [];

  return (
    <aside
      aria-label="Project preview"
      className="project-preview-panel"
    >
      <div
        className={`project-preview-card ${
          activeProject ? "project-preview-card-active" : "project-preview-card-idle"
        }`}
        style={previewStyle}
      >
        {activeProject ? (
          <>
            <div className="project-preview-media">
              {imageSource ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageSource}
                  alt={`${getPreviewTitle(activeProject)} preview`}
                  className="project-preview-image"
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="project-preview-placeholder"
                >
                  <span className="project-preview-placeholder-orbit" />
                  <span className="project-preview-placeholder-ring" />
                  <span className="project-preview-placeholder-title">
                    {activeLayout?.displayLabel ?? activeProject.shortTitle ?? activeProject.title}
                  </span>
                </div>
              )}
            </div>

            <div className="project-preview-content">
              <div className="project-preview-meta">
                <span className="project-preview-status">
                  {formatStatus(activeProject.status)}
                </span>
                <span className="project-preview-domain">
                  {domain.label}
                </span>
              </div>

              <h3 className="project-preview-title">
                {getPreviewTitle(activeProject)}
              </h3>
              <p className="project-preview-tagline">{activeProject.tagline}</p>
              <p className="project-preview-summary">{previewCopy}</p>

              {previewTechStack.length > 0 && (
                <div className="project-preview-tech">
                  {previewTechStack.map((item) => (
                    <span key={item} className="project-preview-chip">
                      {item}
                    </span>
                  ))}
                </div>
              )}

              {previewHighlights.length > 0 && (
                <ul className="project-preview-highlights">
                  {previewHighlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}

              <p className="project-preview-cta">
                Click the moon to view the full project.
              </p>
            </div>
          </>
        ) : (
          <div className="project-preview-idle-copy">
            <p className="project-preview-idle-title">
              Hover or focus a project moon for details.
            </p>
            <p className="project-preview-idle-body">
              The active project will preview here while its orbit keeps moving.
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
