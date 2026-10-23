"use client";

import { useEffect, useState } from "react";

export function PortfolioMotion({ contact, email }: { contact: string; email: string }) {
  const [showDock, setShowDock] = useState(false);

  useEffect(() => {
    const root = document.querySelector("main.portfolio-america");
    if (!root) return;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const nodes = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal], .selected-project"));
    const reveal = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) {
        entry.target.classList.add("america-visible");
        reveal.unobserve(entry.target);
      }
    }, { threshold: 0.06, rootMargin: "0px 0px -36px 0px" });
    const syncMotion = () => {
      root.classList.toggle("america-motion-ready", !media.matches);
      if (media.matches) nodes.forEach(node => node.classList.add("america-visible"));
    };
    nodes.forEach(node => reveal.observe(node));
    syncMotion();
    media.addEventListener("change", syncMotion);

    let heroAbove = false;
    let contactVisible = false;
    const visibility = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target.id === "top") heroAbove = !entry.isIntersecting && entry.boundingClientRect.bottom < 0;
        if (entry.target.id === "contact") contactVisible = entry.isIntersecting;
      }
      setShowDock(heroAbove && !contactVisible);
    });
    for (const id of ["top", "contact"]) {
      const target = document.getElementById(id);
      if (target) visibility.observe(target);
    }
    return () => {
      reveal.disconnect();
      visibility.disconnect();
      media.removeEventListener("change", syncMotion);
      root.classList.remove("america-motion-ready");
    };
  }, []);

  return (
    <div className={`america-contact-dock${showDock ? " is-visible" : ""}`} inert={!showDock} aria-hidden={!showDock}>
      <a className="america-dock-email" href={`mailto:${email}`}>{email}</a>
      <a className="america-dock-action" href="#contact">{contact}<span aria-hidden="true">↗</span></a>
    </div>
  );
}
