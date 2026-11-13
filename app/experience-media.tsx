"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { Lightbox } from "./lightbox";
import type { LightboxCopy, MediaCopy } from "./portfolio-content";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/justinli";
const withBasePath = (path: string) => `${basePath}${path}`;

const slideAssets = ["01", "02", "03", "04", "05", "06", "07", "08"].map((number) =>
  withBasePath(`/experience/ad-report/slide-${number}.jpg`),
);

type AdReportMediaProps = {
  copy: MediaCopy;
  lightboxCopy: LightboxCopy;
};

export function AdReportMedia({ copy, lightboxCopy }: AdReportMediaProps) {
  const [expandedSlide, setExpandedSlide] = useState<number | null>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // The 14 MB recording is requested only after the page itself has loaded.
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

  // Play only while the recording is on screen, and never under reduced motion.
  useEffect(() => {
    if (!shouldLoadVideo) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const video = videoRef.current;
    if (!video) return;

    let isVisible = false;
    const syncPlayback = () => {
      if (motionPreference.matches || !isVisible) {
        video.pause();
        return;
      }
      void video.play().catch(() => undefined);
    };

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting && entry.intersectionRatio >= 0.24;
        syncPlayback();
      },
      { threshold: [0, 0.24, 0.6] },
    );

    visibilityObserver.observe(video);
    motionPreference.addEventListener("change", syncPlayback);
    return () => {
      visibilityObserver.disconnect();
      motionPreference.removeEventListener("change", syncPlayback);
    };
  }, [shouldLoadVideo]);

  const slides = slideAssets.map((src, index) => ({ src, ...copy.slides[index] }));

  return (
    <>
      <figure className="figure figure-inset">
        <figcaption>
          <strong>{copy.demoLabel}</strong>
          <span>{copy.demoCaption}</span>
        </figcaption>
        <div className="mat">
          <video
            ref={videoRef}
            className="frame"
            src={
              shouldLoadVideo
                ? withBasePath("/experience/ad-report/report-agent-demo.mp4")
                : undefined
            }
            poster={withBasePath("/experience/ad-report/report-agent-poster.jpg")}
            width={1600}
            height={1032}
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

      <figure className="figure figure-inset">
        <figcaption>
          <strong>{copy.slidesLabel}</strong>
          <span>{copy.slidesHint}</span>
        </figcaption>
        <div className="mat">
          <ul className="slide-grid" aria-label={copy.slidesGroupLabel}>
            {slides.map((slide, index) => (
              <li key={slide.src}>
                <button
                  type="button"
                  className="frame"
                  onClick={() => setExpandedSlide(index)}
                  aria-label={`${copy.enlargeSlide}: ${slide.title}`}
                >
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    width={1920}
                    height={1080}
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </figure>

      <Lightbox
        items={slides}
        index={expandedSlide}
        copy={lightboxCopy}
        onIndexChange={setExpandedSlide}
      />
    </>
  );
}
