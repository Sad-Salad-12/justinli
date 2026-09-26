"use client";

import { useEffect, useRef, useState } from "react";
import { runIntro } from "./intro-engine";
import "./intro.css";

// Plays once per browser. The inline script in layout.tsx decides before first paint
// by adding `intro` to <html>; without it the overlay stays hidden.
export function IntroOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const skipRef = useRef<() => void>(() => {});
  const [active, setActive] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    const canvas = canvasRef.current;
    if (!root.classList.contains("intro") || !canvas) {
      setActive(false);
      return;
    }
    (window as Window & { __introStarted?: boolean }).__introStarted = true;
    try {
      window.localStorage.setItem("portfolio-intro-seen", "1");
    } catch {}
    window.scrollTo(0, 0);

    const intro = runIntro(canvas, {
      onHandoff: () => root.classList.add("intro-leaving"),
      onDone: () => {
        root.classList.remove("intro", "intro-leaving");
        setActive(false);
      },
    });
    skipRef.current = intro.skip;

    const skip = () => intro.skip();
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Tab" && event.key !== "Shift") skip();
    };
    window.addEventListener("wheel", skip, { passive: true });
    window.addEventListener("touchmove", skip, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", skip);
    return () => {
      intro.stop();
      window.removeEventListener("wheel", skip);
      window.removeEventListener("touchmove", skip);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", skip);
      root.classList.remove("intro", "intro-leaving");
    };
  }, []);

  if (!active) return null;
  return (
    <div className="intro-overlay" onPointerDown={() => skipRef.current()}>
      <canvas ref={canvasRef} aria-hidden="true" />
      <button type="button" className="intro-skip" onClick={() => skipRef.current()}>
        Skip intro
      </button>
    </div>
  );
}
