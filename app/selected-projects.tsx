"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { Lightbox } from "./lightbox";
import type { Language, LegalCopy, LightboxCopy, StillWork } from "./portfolio-content";

const legalSizes: Record<string, [number, number]> = {
  "wiki-en": [2250, 1294],
  "wiki-zh": [2570, 1526],
  "base-en": [2260, 1290],
  "base-zh": [2570, 1396],
  "updates-en": [1640, 1436],
  "updates-zh": [1646, 1428],
};

type LegalWorkspaceProps = {
  copy: LegalCopy;
  lightboxCopy: LightboxCopy;
  language: Language;
  basePath: string;
};

/** Three modules of the Lark legal mock; each screenshot is shown whole. */
export function LegalWorkspace({ copy, lightboxCopy, language, basePath }: LegalWorkspaceProps) {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState<number | null>(null);
  const feature = copy.features[active];

  const screenshots = copy.features.map((item) => ({
    src: `${basePath}/works/legal/${item.id}-${language}.png`,
    alt: copy.screenshotAlt(item.tab),
    title: item.title,
    size: legalSizes[`${item.id}-${language}`],
  }));
  const screenshot = screenshots[active];

  return (
    <figure className="figure figure-inset">
      <div className="rail-tabs" role="group" aria-label={copy.tabsLabel}>
        {copy.features.map((item, index) => (
          <button
            type="button"
            key={item.id}
            aria-pressed={index === active}
            onClick={() => setActive(index)}
          >
            <strong>{item.tab}</strong>
            <span>{item.title}</span>
            <span>{item.description}</span>
          </button>
        ))}
      </div>
      <div className="figure-main">
        <div className="mat">
          <button
            type="button"
            className="stage legal-stage"
            onClick={() => setExpanded(active)}
            aria-label={`${copy.viewFull}: ${feature.title}`}
          >
            <img
              key={screenshot.src}
              className="frame"
              src={screenshot.src}
              alt={screenshot.alt}
              width={screenshot.size[0]}
              height={screenshot.size[1]}
              loading="lazy"
              decoding="async"
            />
          </button>
        </div>
        <figcaption aria-live="polite">
          <p className="legal-caption">
            <strong>{feature.title}</strong>
            <span>{feature.description}</span>
          </p>
          <button type="button" className="text-action" onClick={() => setExpanded(active)}>
            {copy.viewFull}
          </button>
        </figcaption>
      </div>
      <Lightbox
        items={screenshots}
        index={expanded}
        copy={lightboxCopy}
        onIndexChange={(index) => {
          setExpanded(index);
          if (index !== null) setActive(index);
        }}
      />
    </figure>
  );
}

const stillAssets: Record<StillWork["id"], { file: string; size: [number, number] }> = {
  "rd-dashboard": { file: "rd-project-dashboard-lark-base.png", size: [2940, 1380] },
  "supplier-dashboard": { file: "tableau-supplier.png", size: [1430, 910] },
};

type StillWorksProps = {
  items: StillWork[];
  lightboxCopy: LightboxCopy;
  basePath: string;
};

/** Static dashboard images, shown side by side in the text column. */
export function StillWorks({ items, lightboxCopy, basePath }: StillWorksProps) {
  const [expanded, setExpanded] = useState<number | null>(null);
  const images = items.map((item) => ({
    src: `${basePath}/works/${stillAssets[item.id].file}`,
    alt: item.imageAlt,
    title: item.title,
  }));

  return (
    <div className="stills grid">
      <div className="stills-list">
        {items.map((item, index) => (
          <article className="still" id={item.id} key={item.id}>
            <div className="mat">
              <button
                type="button"
                className="stage still-stage"
                onClick={() => setExpanded(index)}
                aria-label={`${lightboxCopy.viewFull}: ${item.title}`}
              >
                <img
                  className="frame"
                  src={images[index].src}
                  alt={item.imageAlt}
                  width={stillAssets[item.id].size[0]}
                  height={stillAssets[item.id].size[1]}
                  loading="lazy"
                  decoding="async"
                />
              </button>
            </div>
            <h3>{item.title}</h3>
            <p>{item.summary}</p>
            <p className="still-note">{item.note}</p>
          </article>
        ))}
      </div>
      <Lightbox items={images} index={expanded} copy={lightboxCopy} onIndexChange={setExpanded} />
    </div>
  );
}
