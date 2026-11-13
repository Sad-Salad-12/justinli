"use client";

import { useEffect, useRef, useState } from "react";
import type { Language, MediaCopy } from "./portfolio-content";

export function VerbaDemo({ copy, language }: { copy: MediaCopy; language: Language }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(900);
  const demoOrigin = "https://justin.zl5626.chatgpt.site";
  const url = `${demoOrigin}/verba/index.html?lang=${language}&parentOrigin=https%3A%2F%2Fsad-salad-12.github.io`;

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== demoOrigin || event.source !== frame.current?.contentWindow) return;
      if (event.data?.type !== "verba:resize" || !Number.isFinite(event.data.height)) return;
      setHeight(Math.max(560, Math.ceil(event.data.height) + 2));
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [demoOrigin]);

  return (
    <figure className="figure figure-wide" id="verba-demo">
      <div className="mat">
        <div className="frame verba-frame">
          <div className="verba-wordmark" aria-label="Verba">
            verba<span aria-hidden="true">.</span>
          </div>
          <iframe
            ref={frame}
            key={language}
            src={`${url}&embed=1&typeface=1`}
            title={copy.verbaFrameTitle}
            loading="lazy"
            scrolling="no"
            onLoad={() =>
              frame.current?.contentWindow?.postMessage({ type: "verba:measure" }, demoOrigin)
            }
            style={{ height }}
          />
        </div>
      </div>
      <figcaption>
        <strong>{copy.verbaLabel}</strong>
      </figcaption>
    </figure>
  );
}
