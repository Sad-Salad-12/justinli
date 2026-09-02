"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AdReportMedia, VerbaSystemVisual } from "./experience-media";
import { type Language, portfolioContent } from "./portfolio-content";

const workAssets = [
  {
    index: "01",
    image: "/works/rd-project-dashboard-lark-base.png",
  },
] as const;

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [preferenceReady, setPreferenceReady] = useState(false);
  const [activeWorkIndex, setActiveWorkIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement>(null);

  const t = portfolioContent[language];
  const works = workAssets.map((asset, index) => ({
    ...asset,
    ...t.work.items[index],
  }));
  const activeWork = activeWorkIndex === null ? null : works[activeWorkIndex];

  const openWork = (index: number, trigger: HTMLButtonElement) => {
    lastTriggerRef.current = trigger;
    setActiveWorkIndex(index);
  };

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("portfolio-language");
    if (savedLanguage === "en" || savedLanguage === "zh") {
      setLanguage(savedLanguage);
    }
    setPreferenceReady(true);
  }, []);

  useEffect(() => {
    if (!preferenceReady) return;

    window.localStorage.setItem("portfolio-language", language);
    document.documentElement.lang = language === "en" ? "en" : "zh-CN";
    document.title = t.meta.title;
    document
      .querySelector<HTMLMetaElement>('meta[name="description"]')
      ?.setAttribute("content", t.meta.description);
  }, [language, preferenceReady, t.meta.description, t.meta.title]);

  useEffect(() => {
    const root = document.documentElement;
    const header = document.querySelector<HTMLElement>(".site-header");
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrame = 0;

    const updateScrollEffects = () => {
      animationFrame = 0;
      const scrollTop = Math.max(window.scrollY, 0);
      const scrollRange = Math.max(root.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(scrollTop / scrollRange, 1);
      const heroProgress = Math.min(scrollTop / Math.max(window.innerHeight * 0.9, 1), 1);
      const allowDepth = !motionPreference.matches && window.innerWidth > 700;

      root.style.setProperty("--scroll-progress", progress.toFixed(4));
      root.style.setProperty(
        "--hero-grid-shift",
        `${allowDepth ? heroProgress * 18 : 0}px`,
      );
      root.style.setProperty(
        "--hero-portrait-shift",
        `${allowDepth ? heroProgress * 14 : 0}px`,
      );
      root.style.setProperty(
        "--hero-portrait-scale",
        allowDepth ? (1 - heroProgress * 0.008).toFixed(4) : "1",
      );
      root.style.setProperty(
        "--hero-grid-opacity",
        allowDepth ? (0.44 - heroProgress * 0.13).toFixed(3) : "0.44",
      );
      root.style.setProperty(
        "--v2-name-shift",
        `${allowDepth ? heroProgress * -42 : 0}px`,
      );
      root.style.setProperty(
        "--v2-copy-shift",
        `${allowDepth ? heroProgress * -18 : 0}px`,
      );
      root.style.setProperty(
        "--v2-portrait-shift",
        `${allowDepth ? heroProgress * 34 : 0}px`,
      );
      root.style.setProperty(
        "--v2-hero-fade",
        allowDepth ? (1 - heroProgress * 0.34).toFixed(3) : "1",
      );
      header?.classList.toggle("is-scrolled", scrollTop > 24);
    };

    const queueScrollEffects = () => {
      if (animationFrame !== 0) return;
      animationFrame = window.requestAnimationFrame(updateScrollEffects);
    };

    updateScrollEffects();
    window.addEventListener("scroll", queueScrollEffects, { passive: true });
    window.addEventListener("resize", queueScrollEffects);
    motionPreference.addEventListener("change", queueScrollEffects);

    return () => {
      if (animationFrame !== 0) window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", queueScrollEffects);
      window.removeEventListener("resize", queueScrollEffects);
      motionPreference.removeEventListener("change", queueScrollEffects);
      root.style.removeProperty("--scroll-progress");
      root.style.removeProperty("--hero-grid-shift");
      root.style.removeProperty("--hero-portrait-shift");
      root.style.removeProperty("--hero-portrait-scale");
      root.style.removeProperty("--hero-grid-opacity");
      root.style.removeProperty("--v2-name-shift");
      root.style.removeProperty("--v2-copy-shift");
      root.style.removeProperty("--v2-portrait-shift");
      root.style.removeProperty("--v2-hero-fade");
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const revealElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    root.classList.add("motion-ready");

    if (motionPreference.matches || !("IntersectionObserver" in window)) {
      revealElements.forEach((element) => element.classList.add("is-visible"));
      return () => root.classList.remove("motion-ready");
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -10% 0px" },
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
      root.classList.remove("motion-ready");
    };
  }, []);

  useEffect(() => {
    if (activeWorkIndex === null) return;

    const handleModalKeys = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveWorkIndex(null);
        return;
      }

      if (event.key !== "Tab") return;

      const dialog = document.querySelector<HTMLElement>(".work-image-dialog");
      const focusable = Array.from(
        dialog?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex="0"]') ?? [],
      ).filter((element) => !element.hasAttribute("hidden"));

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
    window.addEventListener("keydown", handleModalKeys);

    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", handleModalKeys);
      lastTriggerRef.current?.focus();
    };
  }, [activeWorkIndex]);

  return (
    <main data-language={language}>
      <header className="site-header" aria-label={t.a11y.mainNavigation}>
        <a className="brand" href="#top" aria-label={t.a11y.backToTop}>
          {t.identity.name}<span> / 01</span>
        </a>
        <nav className="nav-links" aria-label={t.a11y.pageNavigation}>
          <a href="#experience">{t.nav.experience}</a>
          <a href="#work">{t.nav.work}</a>
        </nav>
        <div className="header-actions">
          <div
            className={`language-switch is-${language}`}
            role="group"
            aria-label={t.a11y.languageSelector}
          >
            <span className="language-switch-thumb" aria-hidden="true" />
            <button
              type="button"
              className={language === "en" ? "is-active" : undefined}
              aria-pressed={language === "en"}
              onClick={() => setLanguage("en")}
            >
              English
            </button>
            <button
              type="button"
              className={language === "zh" ? "is-active" : undefined}
              aria-pressed={language === "zh"}
              onClick={() => setLanguage("zh")}
            >
              简体中文
            </button>
          </div>
          <a className="header-contact" href="#contact">
            {t.nav.contact} <span aria-hidden="true">↘</span>
          </a>
        </div>
      </header>
      <div className="scroll-progress" aria-hidden="true">
        <span />
      </div>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <ul className="hero-disciplines hero-enter hero-enter-1">
            {t.hero.disciplines.map((discipline) => (
              <li key={discipline}>{discipline}</li>
            ))}
          </ul>
          <h1 className="hero-name hero-enter hero-enter-2">{t.identity.heroName}</h1>
          <div className="hero-statement hero-enter hero-enter-3">
            <h2 id="hero-title">
              {t.hero.headline}
              <br />
              <span>{t.hero.headlineAccent}</span>
            </h2>
            <p>
              {t.hero.bodyLineOne}
              <br className="desktop-only" />
              {t.hero.bodyLineTwo}
            </p>
            <div className="hero-actions">
              <a className="primary-link" href="#experience">
                {t.hero.primaryAction} <span aria-hidden="true">↓</span>
              </a>
              <a className="text-link" href="#contact">
                {t.hero.secondaryAction} <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>

        <figure className="hero-portrait hero-enter hero-enter-4">
          <span className="portrait-orbit" aria-hidden="true" />
          <span className="portrait-frame">
            <Image
              src="/justin-shanghai-portrait.jpg"
              alt={t.a11y.portraitAlt}
              width={1080}
              height={1619}
              sizes="(max-width: 700px) 54vw, (max-width: 980px) 32vw, 24vw"
              priority
              unoptimized
            />
          </span>
        </figure>
      </section>

      <section className="experience" id="experience" aria-labelledby="experience-title">
        <div className="section-head experience-head" data-reveal="title">
          <p className="section-label">{t.experience.label}</p>
          <h2 id="experience-title">
            {t.experience.headline}
            <br />
            <span>{t.experience.headlineAccent}</span>
          </h2>
        </div>
        <div className="experience-list">
          {t.experience.items.map((experience) => (
            <section
              className="experience-project"
              key={experience.number}
              aria-labelledby={`experience-project-${experience.number}`}
            >
              <div className="experience-row" data-reveal="project">
                <span className="experience-number">{experience.number}</span>
                <div className="experience-identity">
                  <p>{experience.eyebrow}</p>
                  <h3 id={`experience-project-${experience.number}`}>{experience.title}</h3>
                  {experience.meta && <p className="experience-meta">{experience.meta}</p>}
                </div>
                <ul className="experience-bullets">
                  {experience.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <div className="experience-metrics">
                  {experience.metrics.map((metric) => (
                    <div key={metric.label}>
                      <strong>{metric.value}</strong>
                      <span>{metric.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {experience.media === "ad-report" ? (
                <AdReportMedia copy={t.experience.media} />
              ) : (
                <VerbaSystemVisual copy={t.experience.media} />
              )}
            </section>
          ))}
        </div>
      </section>

      <section className="work" id="work" aria-labelledby="work-title">
        <div className="section-head work-head" data-reveal="title">
          <p className="section-label">{t.work.label}</p>
          <h2 id="work-title">{t.work.headline}</h2>
        </div>

        <div className="work-list">
          {works.map((work, index) => (
            <article className="work-row" key={work.index} data-reveal="media">
              <button
                className="work-image-preview"
                onClick={(event) => openWork(index, event.currentTarget)}
                aria-label={t.a11y.previewWork(work.title)}
              >
                <Image
                  src={work.image}
                  alt={work.imageAlt}
                  width={2940}
                  height={1380}
                  sizes="(max-width: 700px) 100vw, 66vw"
                  unoptimized
                />
                <span className="work-image-index">
                  {work.index} / LARK BASE
                </span>
                <span className="work-image-action">
                  {t.work.previewAction} <i aria-hidden="true">↗</i>
                </span>
              </button>

              <div className="work-main">
                <div className="work-meta">
                  <span>{work.index}</span>
                  <span>{work.type}</span>
                </div>
                <h3>{work.title}</h3>
                <p>{work.summary}</p>
                <ul className="work-features">
                  {work.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <button
                  className="work-preview-action"
                  onClick={(event) => openWork(index, event.currentTarget)}
                >
                  {t.work.previewAction} <span aria-hidden="true">↗</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="contact" id="contact" aria-labelledby="contact-title">
        <div className="contact-orbit" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <p className="section-label" data-reveal="copy">
          {t.contact.label}
        </p>
        <div className="contact-main" data-reveal="title">
          <h2 id="contact-title">
            {t.contact.headline}
            <br />
            <span>{t.contact.headlineAccent}</span>
          </h2>
          <p>{t.contact.body}</p>
          <address className="contact-details">
            <div className="contact-identity">
              <strong>{t.identity.name}</strong>
              <span>{t.identity.location}</span>
            </div>
            <div className="contact-channels">
              <a className="contact-email" href={`mailto:${t.identity.email}`}>
                <span>{t.contact.emailLabel}</span>
                <strong>{t.identity.email}</strong>
                <i aria-hidden="true">↗</i>
              </a>
              <a className="contact-phone" href={`tel:${t.identity.phoneHref}`}>
                <span>{t.contact.phoneLabel}</span>
                <strong>{t.identity.phone}</strong>
              </a>
            </div>
          </address>
        </div>
        <footer>
          <span>{t.contact.footerRole}</span>
          <span>{t.contact.footerStatement}</span>
          <a href="#top">{t.contact.backToTop}</a>
        </footer>
      </section>

      {activeWork && (
        <div
          className="work-image-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="work-image-modal-title"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setActiveWorkIndex(null);
          }}
        >
          <div className="work-image-dialog">
            <div className="work-image-toolbar">
              <div>
                <span>{activeWork.type}</span>
                <strong id="work-image-modal-title">{activeWork.title}</strong>
              </div>
              <button
                ref={closeButtonRef}
                onClick={() => setActiveWorkIndex(null)}
                aria-label={t.a11y.closeWorkPreview}
              >
                {t.a11y.closeWorkPreview} <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="work-image-stage">
              <Image
                src={activeWork.image}
                alt={activeWork.imageAlt}
                width={2940}
                height={1380}
                sizes="96vw"
                unoptimized
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
