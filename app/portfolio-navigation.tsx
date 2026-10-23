"use client";

import { useEffect, useRef, useState } from "react";
import type { Language } from "./portfolio-content";

type Theme = "system" | "light" | "dark";
type Props = {
  language: Language;
  name: string;
  labels: { experience: string; work: string; contact: string };
  a11y: { mainNavigation: string; pageNavigation: string; backToTop: string; languageSelector: string };
  onEnglish: () => void;
  onChinese: () => void;
};

export function PortfolioNavigation({ language, name, labels, a11y, onEnglish, onChinese }: Props) {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("system");
  const [themeReady, setThemeReady] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const zh = language === "zh";

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme");
    if (saved === "light" || saved === "dark") setTheme(saved);
    setThemeReady(true);
  }, []);

  useEffect(() => {
    if (!themeReady) return;
    const media = matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
      document.documentElement.dataset.portfolioTheme = theme === "system" ? (media.matches ? "dark" : "light") : theme;
    };
    localStorage.setItem("portfolio-theme", theme);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, [theme, themeReady]);

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (open && !element.open) {
      element.showModal();
      document.body.classList.add("portfolio-menu-open");
    } else if (!open && element.open) {
      element.close();
    }
    return () => document.body.classList.remove("portfolio-menu-open");
  }, [open]);

  return (
    <>
      <header className="site-header america-header" aria-label={a11y.mainNavigation}>
        <a className="brand" href="#top" aria-label={a11y.backToTop}>{name}<span> / 01</span></a>
        <button ref={trigger} className="america-menu-trigger" type="button" aria-expanded={open} aria-controls="portfolio-menu" aria-haspopup="dialog" onClick={() => setOpen(true)}>
          {zh ? "菜单" : "Menu"}
        </button>
      </header>
      <dialog ref={dialog} id="portfolio-menu" className="america-menu" aria-label={zh ? "菜单" : "Menu"} onCancel={() => setOpen(false)} onClose={() => { setOpen(false); trigger.current?.focus({ preventScroll: true }); }} onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const r = event.currentTarget.getBoundingClientRect();
        if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) setOpen(false);
      }}>
        <div className="america-menu-top">
          <div className="america-theme-control" role="radiogroup" aria-label={zh ? "外观" : "Appearance"} onKeyDown={(event) => {
            if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
            event.preventDefault();
            const themes: Theme[] = ["system", "light", "dark"];
            const index = event.key === "Home" ? 0 : event.key === "End" ? 2 : (themes.indexOf(theme) + (event.key === "ArrowRight" ? 1 : 2)) % 3;
            setTheme(themes[index]);
            event.currentTarget.querySelectorAll<HTMLButtonElement>("button")[index]?.focus();
          }}>
            {(["system", "light", "dark"] as const).map((value, index) => (
              <button key={value} type="button" role="radio" aria-checked={theme === value} aria-label={zh ? ["跟随系统", "浅色", "深色"][index] : ["System theme", "Light theme", "Dark theme"][index]} onClick={() => setTheme(value)}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                  {value === "system" ? <><rect x="4" y="4" width="16" height="12" rx="2" /><path d="M9 20h6m-3-4v4" /></> : value === "light" ? <><circle cx="12" cy="12" r="3.5" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></> : <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />}
                </svg>
              </button>
            ))}
          </div>
          <button type="button" className="america-menu-close" aria-label={zh ? "关闭菜单" : "Close menu"} onClick={() => setOpen(false)}><span aria-hidden="true">×</span></button>
        </div>
        <nav className="america-menu-links" aria-label={a11y.pageNavigation}>
          <a href="#experience" onClick={() => setOpen(false)}>{labels.experience}</a>
          <a href="#work" onClick={() => setOpen(false)}>{labels.work}</a>
          <a href="#contact" onClick={() => setOpen(false)}>{labels.contact}</a>
        </nav>
        <div className="america-menu-language" role="group" aria-label={a11y.languageSelector}>
          <button type="button" aria-pressed={language === "en"} onClick={onEnglish}>English</button>
          <button type="button" aria-pressed={language === "zh"} onClick={onChinese}>简体中文</button>
        </div>
      </dialog>
    </>
  );
}
