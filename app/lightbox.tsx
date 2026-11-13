"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from "react";
import type { LightboxCopy } from "./portfolio-content";

export type LightboxItem = {
  src: string;
  alt: string;
  title: string;
};

type LightboxProps = {
  items: LightboxItem[];
  index: number | null;
  copy: LightboxCopy;
  onIndexChange: (index: number | null) => void;
};

/** One native dialog for every enlargeable image on the page. */
export function Lightbox({ items, index, copy, onIndexChange }: LightboxProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const isOpen = index !== null;
  const item = index === null ? null : items[index];
  const hasSiblings = items.length > 1;

  const step = (delta: number) => {
    if (index === null) return;
    onIndexChange((index + delta + items.length) % items.length);
  };

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;

    if (isOpen && !element.open) element.showModal();
    if (!isOpen && element.open) element.close();
    document.documentElement.classList.toggle("has-lightbox", isOpen);

    return () => document.documentElement.classList.remove("has-lightbox");
  }, [isOpen]);

  return (
    <dialog
      ref={dialog}
      className="lightbox"
      aria-label={item?.title}
      onClose={() => onIndexChange(null)}
      onClick={(event) => {
        // Anything that is not the image or a control counts as the backdrop.
        if (!(event.target as HTMLElement).closest("img, button")) onIndexChange(null);
      }}
      onKeyDown={(event) => {
        if (!hasSiblings) return;
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          step(-1);
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          step(1);
        }
      }}
    >
      {item && (
        <div className="lightbox-inner">
          <div className="lightbox-bar">
            <p>{item.title}</p>
            <div className="lightbox-actions">
              {hasSiblings && (
                <>
                  <button type="button" onClick={() => step(-1)} aria-label={copy.previous}>
                    ←
                  </button>
                  <span aria-hidden="true">
                    {(index ?? 0) + 1} / {items.length}
                  </span>
                  <button type="button" onClick={() => step(1)} aria-label={copy.next}>
                    →
                  </button>
                </>
              )}
              <button type="button" className="lightbox-close" onClick={() => onIndexChange(null)}>
                {copy.close}
              </button>
            </div>
          </div>
          <img key={item.src} src={item.src} alt={item.alt} />
        </div>
      )}
    </dialog>
  );
}
