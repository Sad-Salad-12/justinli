"use client";

import Image from "next/image";
import {
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import {
  getDraggedSlideIndex,
  getSlideStackPosition,
  wrapSlideIndex,
} from "./carousel-utils";
import type { LocalizedExperienceMedia } from "./portfolio-content";

const slideAssets = [
  "/experience/ad-report/slide-01.jpg",
  "/experience/ad-report/slide-02.jpg",
  "/experience/ad-report/slide-03.jpg",
  "/experience/ad-report/slide-04.jpg",
  "/experience/ad-report/slide-05.jpg",
  "/experience/ad-report/slide-06.jpg",
  "/experience/ad-report/slide-07.jpg",
  "/experience/ad-report/slide-08.jpg",
] as const;

type AdReportMediaProps = {
  copy: LocalizedExperienceMedia;
};

export function AdReportMedia({ copy }: AdReportMediaProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [expandedSlide, setExpandedSlide] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const pointerStartRef = useRef<number | null>(null);
  const dragDistanceRef = useRef(0);
  const suppressClickRef = useRef(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastSlideTriggerRef = useRef<HTMLButtonElement>(null);
  const slideTotal = slideAssets.length;
  const isLightboxOpen = expandedSlide !== null;

  const moveToSlide = (index: number) => {
    setActiveSlide(wrapSlideIndex(index, slideTotal));
  };

  const moveExpandedSlide = (delta: number) => {
    setExpandedSlide((current) =>
      current === null ? null : wrapSlideIndex(current + delta, slideTotal),
    );
  };

  const openExpandedSlide = (trigger: HTMLButtonElement) => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }

    lastSlideTriggerRef.current = trigger;
    setExpandedSlide(activeSlide);
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    pointerStartRef.current = event.clientX;
    dragDistanceRef.current = 0;
    suppressClickRef.current = false;
    setDragOffset(0);
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (pointerStartRef.current === null) return;

    const distance = event.clientX - pointerStartRef.current;
    dragDistanceRef.current = distance;
    if (Math.abs(distance) > 6) suppressClickRef.current = true;
    setDragOffset(Math.max(-110, Math.min(110, distance)));
  };

  const finishPointerGesture = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (pointerStartRef.current === null) return;

    const nextIndex = getDraggedSlideIndex(
      activeSlide,
      dragDistanceRef.current,
      slideTotal,
    );
    setActiveSlide(nextIndex);
    pointerStartRef.current = null;
    dragDistanceRef.current = 0;
    setDragOffset(0);
    setIsDragging(false);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  useEffect(() => {
    let loadTimer: number | undefined;
    const queueVideoLoad = () => {
      loadTimer = window.setTimeout(() => setShouldLoadVideo(true), 450);
    };

    if (document.readyState === "complete") {
      queueVideoLoad();
    } else {
      window.addEventListener("load", queueVideoLoad, { once: true });
    }

    return () => {
      window.removeEventListener("load", queueVideoLoad);
      if (loadTimer !== undefined) window.clearTimeout(loadTimer);
    };
  }, []);

  useEffect(() => {
    if (!shouldLoadVideo) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPlayback = () => {
      if (!videoRef.current) return;
      if (motionPreference.matches) {
        videoRef.current.pause();
        return;
      }
      void videoRef.current.play().catch(() => undefined);
    };

    syncPlayback();
    motionPreference.addEventListener("change", syncPlayback);
    return () => motionPreference.removeEventListener("change", syncPlayback);
  }, [shouldLoadVideo]);

  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleDialogKeys = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setExpandedSlide(null);
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setExpandedSlide((current) =>
          current === null ? null : wrapSlideIndex(current - 1, slideTotal),
        );
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setExpandedSlide((current) =>
          current === null ? null : wrapSlideIndex(current + 1, slideTotal),
        );
        return;
      }
      if (event.key !== "Tab") return;

      const dialog = document.querySelector<HTMLElement>(".output-lightbox-dialog");
      const focusable = Array.from(
        dialog?.querySelectorAll<HTMLElement>("button:not([disabled]), [tabindex='0']") ?? [],
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.body.classList.add("modal-open");
    closeButtonRef.current?.focus();
    window.addEventListener("keydown", handleDialogKeys);

    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", handleDialogKeys);
      lastSlideTriggerRef.current?.focus();
    };
  }, [isLightboxOpen, slideTotal]);

  return (
    <>
      <div className="ad-report-media" data-reveal>
        <figure className="demo-video-block">
        <div className="media-block-heading">
          <span>{copy.demoLabel}</span>
          <p>{copy.demoCaption}</p>
        </div>
        <div className="demo-video-frame">
          <video
            ref={videoRef}
            src={
              shouldLoadVideo
                ? "/experience/ad-report/report-agent-demo.mp4"
                : undefined
            }
            poster="/experience/ad-report/report-agent-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            controls
            preload="none"
            aria-busy={!shouldLoadVideo}
            title={copy.demoLabel}
          />
        </div>
        </figure>

        <section className="output-carousel" aria-label={copy.carouselLabel}>
        <div className="media-block-heading carousel-heading">
          <span>{copy.outputsLabel}</span>
          <p>{copy.interactionHint}</p>
        </div>

        <div className="output-stack">
          {slideAssets.map((src, index) => {
            const position = getSlideStackPosition(index, activeSlide, slideTotal);
            const isActive = position === "active";

            return (
              <button
                type="button"
                className={`output-card is-${position}${isDragging && isActive ? " is-dragging" : ""}`}
                key={src}
                style={
                  isActive
                    ? ({ "--drag-offset": `${dragOffset}px` } as CSSProperties)
                    : undefined
                }
                tabIndex={isActive ? 0 : -1}
                aria-hidden={!isActive}
                aria-label={`${copy.openFullscreen}: ${copy.slides[index].title}`}
                onClick={(event) => openExpandedSlide(event.currentTarget)}
                onKeyDown={(event) => {
                  if (event.key === "ArrowLeft") {
                    event.preventDefault();
                    moveToSlide(activeSlide - 1);
                  } else if (event.key === "ArrowRight") {
                    event.preventDefault();
                    moveToSlide(activeSlide + 1);
                  }
                }}
                onPointerDown={isActive ? handlePointerDown : undefined}
                onPointerMove={isActive ? handlePointerMove : undefined}
                onPointerUp={isActive ? finishPointerGesture : undefined}
                onPointerCancel={isActive ? finishPointerGesture : undefined}
              >
                <Image
                  src={src}
                  alt={copy.slides[index].alt}
                  width={720}
                  height={405}
                  sizes="(max-width: 700px) 92vw, (max-width: 980px) 68vw, 34vw"
                  draggable={false}
                  unoptimized
                />
              </button>
            );
          })}
        </div>

        <div className="carousel-controls">
          <div className="carousel-caption" aria-live="polite">
            <span>
              {String(activeSlide + 1).padStart(2, "0")} / {String(slideTotal).padStart(2, "0")}
            </span>
            <strong>{copy.slides[activeSlide].title}</strong>
          </div>
          <div className="carousel-arrows">
            <button
              type="button"
              onClick={() => moveToSlide(activeSlide - 1)}
              aria-label={copy.previousSlide}
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => moveToSlide(activeSlide + 1)}
              aria-label={copy.nextSlide}
            >
              →
            </button>
          </div>
        </div>
        </section>
      </div>

      {expandedSlide !== null &&
        createPortal(
        <div
          className="output-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={copy.fullscreenLabel}
          onPointerDown={(event) => {
            if (event.currentTarget === event.target) setExpandedSlide(null);
          }}
        >
          <div className="output-lightbox-dialog">
            <button
              ref={closeButtonRef}
              type="button"
              className="lightbox-close"
              onClick={() => setExpandedSlide(null)}
              aria-label={copy.closeFullscreen}
            >
              ×
            </button>
            <button
              type="button"
              className="lightbox-arrow lightbox-previous"
              onClick={() => moveExpandedSlide(-1)}
              aria-label={copy.previousSlide}
            >
              ←
            </button>
            <figure>
              <Image
                src={slideAssets[expandedSlide]}
                alt={copy.slides[expandedSlide].alt}
                width={720}
                height={405}
                sizes="80vw"
                unoptimized
              />
              <figcaption>
                <span>
                  {String(expandedSlide + 1).padStart(2, "0")} / {String(slideTotal).padStart(2, "0")}
                </span>
                {copy.slides[expandedSlide].title}
              </figcaption>
            </figure>
            <button
              type="button"
              className="lightbox-arrow lightbox-next"
              onClick={() => moveExpandedSlide(1)}
              aria-label={copy.nextSlide}
            >
              →
            </button>
          </div>
        </div>,
          document.body,
        )}
    </>
  );
}

export function VerbaSystemVisual({ copy }: AdReportMediaProps) {
  const verba = copy.verba;

  return (
    <figure className="verba-system-visual" aria-label={verba.diagramLabel} data-reveal>
      <header className="verba-system-header">
        <div>
          <span>{verba.label}</span>
          <h4>{verba.headline}</h4>
        </div>
        <p>{verba.body}</p>
      </header>

      <div className="verba-system-map">
        <div className="verba-grid" aria-hidden="true" />
        <section className="verba-prepare" aria-labelledby="verba-prepare-label">
          <p id="verba-prepare-label" className="verba-lane-label">
            {verba.prepareLabel}
          </p>
          <ol className="verba-prepare-track">
            {verba.prepareNodes.map((node) => (
              <li key={node.step}>
                <span>{node.step}</span>
                <strong>{node.title}</strong>
                <p>{node.detail}</p>
              </li>
            ))}
          </ol>
          <p className="verba-prepare-note">{verba.prepareNote}</p>
          <div className="verba-evidence-feed" aria-hidden="true">
            <span>{verba.reusableEvidence}</span>
            <i>↓</i>
          </div>
        </section>

        <section className="verba-run" aria-labelledby="verba-run-label">
          <p id="verba-run-label" className="verba-lane-label">
            {verba.runLabel}
          </p>
          <ol className="verba-run-track">
            <li className="verba-run-node is-brief">
              <span>{verba.brief.step}</span>
              <small>{verba.brief.eyebrow}</small>
              <strong>{verba.brief.title}</strong>
              <p>{verba.brief.detail}</p>
            </li>
            <li className="verba-run-node is-retrieval">
              <span>{verba.retrieval.step}</span>
              <small>{verba.retrieval.eyebrow}</small>
              <strong>{verba.retrieval.title}</strong>
              <p>{verba.retrieval.detail}</p>
              <ul className="verba-retrieval-signals">
                {verba.retrieval.signals.map((signal) => (
                  <li key={signal}>{signal}</li>
                ))}
              </ul>
            </li>
            <li className="verba-run-node is-reasoning">
              <span>{verba.reasoning.step}</span>
              <small>{verba.reasoning.eyebrow}</small>
              <strong>{verba.reasoning.title}</strong>
              <p>{verba.reasoning.detail}</p>
              <div className="verba-model-route" aria-hidden="true">
                <b>FASTAPI</b>
                <i>→</i>
                <b>GEMMA</b>
              </div>
            </li>
            <li className="verba-run-node is-output">
              <span>{verba.output.step}</span>
              <small>{verba.output.eyebrow}</small>
              <strong>{verba.output.title}</strong>
              <p>{verba.output.detail}</p>
              <ol className="verba-output-sections">
                {verba.output.sections.map((section, index) => (
                  <li key={section}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {section}
                  </li>
                ))}
              </ol>
            </li>
          </ol>
        </section>
      </div>

      <div className="verba-evidence-strip">
        <span>{verba.evidenceLabel}</span>
        <dl>
          {verba.evidence.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <figcaption>{verba.boundary}</figcaption>
    </figure>
  );
}
