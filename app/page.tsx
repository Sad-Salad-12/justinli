"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { type Language, portfolioContent } from "./portfolio-content";

const workAssets = [
  {
    index: "01",
    pdf: "/works/solution-blueprint-sample.pdf",
    color: "blue",
  },
  {
    index: "02",
    pdf: "/works/field-discovery-sample.pdf",
    color: "ink",
  },
  {
    index: "03",
    pdf: "/works/production-readiness-sample.pdf",
    color: "silver",
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
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 },
    );

    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (activeWorkIndex === null) return;

    const handleModalKeys = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveWorkIndex(null);
        return;
      }

      if (event.key !== "Tab") return;

      const dialog = document.querySelector<HTMLElement>(".pdf-dialog");
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

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow hero-enter hero-enter-1">
            {t.hero.roleLeft} <span>×</span> {t.hero.roleRight}
          </p>
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
          <figcaption>{t.hero.portraitCaption}</figcaption>
        </figure>

        <div className="hero-index hero-enter hero-enter-5">
          <span>{t.identity.location}</span>
          <a className="hero-index-email" href={`mailto:${t.identity.email}`}>
            {t.identity.email}
          </a>
          <span>{t.hero.scroll}</span>
        </div>
      </section>

      <section className="positioning" aria-labelledby="positioning-title">
        <p className="section-label" data-reveal>
          {t.positioning.label}
        </p>
        <div className="positioning-copy" data-reveal>
          <h2 id="positioning-title">
            {t.positioning.headline}
            <br />
            <span>{t.positioning.headlineAccent}</span>
          </h2>
          <p>{t.positioning.body}</p>
        </div>
        <div className="positioning-note" data-reveal>
          <span className="pulse-dot" aria-hidden="true" />
          {t.positioning.note}
        </div>
      </section>

      <section className="experience" id="experience" aria-labelledby="experience-title">
        <div className="section-head experience-head" data-reveal>
          <p className="section-label">{t.experience.label}</p>
          <h2 id="experience-title">{t.experience.headline}</h2>
          <p>{t.experience.intro}</p>
        </div>
        <div className="experience-list">
          {t.experience.items.map((experience) => (
            <article className="experience-row" key={experience.number} data-reveal>
              <span className="experience-number">{experience.number}</span>
              <div className="experience-identity">
                <p>{experience.eyebrow}</p>
                <h3>{experience.title}</h3>
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
            </article>
          ))}
        </div>
      </section>

      <section className="work" id="work" aria-labelledby="work-title">
        <div className="section-head work-head" data-reveal>
          <p className="section-label">{t.work.label}</p>
          <h2 id="work-title">{t.work.headline}</h2>
          <p>{t.work.intro}</p>
          <div className="library-note">
            <span>{t.work.libraryLabel}</span>
            {t.work.libraryNote}
          </div>
        </div>

        <div className="work-list">
          {works.map((work, index) => (
            <article className="work-row" key={work.index} data-reveal>
              <button
                className={`document-cover document-${work.color}`}
                onClick={(event) => openWork(index, event.currentTarget)}
                aria-label={t.a11y.previewWork(work.title)}
              >
                <span className="document-top">
                  {work.index}
                  <i>PDF</i>
                </span>
                <span className="document-visual" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <b />
                </span>
                <span className="document-bottom">
                  <small>{work.type}</small>
                  <strong>{work.coverTitle}</strong>
                </span>
              </button>

              <div className="work-main">
                <div className="work-meta">
                  <span>{work.index}</span>
                  <span>{work.type}</span>
                </div>
                <h3>{work.title}</h3>
                <p>{work.summary}</p>
                <dl>
                  <div>
                    <dt>{t.work.roleLabel}</dt>
                    <dd>{work.role}</dd>
                  </div>
                  <div>
                    <dt>{t.work.outputLabel}</dt>
                    <dd>{work.deliverable}</dd>
                  </div>
                </dl>
              </div>

              <div className="work-actions">
                <button onClick={(event) => openWork(index, event.currentTarget)}>
                  {t.work.previewAction} <span aria-hidden="true">↗</span>
                </button>
                <a href={work.pdf} download>
                  {t.work.downloadAction} <span aria-hidden="true">↓</span>
                </a>
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
        <p className="section-label" data-reveal>
          {t.contact.label}
        </p>
        <div className="contact-main" data-reveal>
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
          className="pdf-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pdf-modal-title"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setActiveWorkIndex(null);
          }}
        >
          <div className="pdf-dialog">
            <div className="pdf-toolbar">
              <div>
                <span>{activeWork.type}</span>
                <strong id="pdf-modal-title">{activeWork.title}</strong>
              </div>
              <div className="pdf-toolbar-actions">
                <a href={activeWork.pdf} target="_blank" rel="noreferrer">
                  {t.pdf.openWindow}
                </a>
                <a href={activeWork.pdf} download>
                  {t.pdf.download}
                </a>
                <button
                  ref={closeButtonRef}
                  onClick={() => setActiveWorkIndex(null)}
                  aria-label={t.a11y.closePdf}
                >
                  {t.pdf.close}
                </button>
              </div>
            </div>
            <object
              data={activeWork.pdf}
              type="application/pdf"
              className="pdf-frame"
              title={t.a11y.pdfPreview(activeWork.title)}
            >
              <div className="pdf-fallback">
                <p>{t.pdf.unsupported}</p>
                <a href={activeWork.pdf} target="_blank" rel="noreferrer">
                  {t.pdf.openFallback}
                </a>
              </div>
            </object>
          </div>
        </div>
      )}
    </main>
  );
}
