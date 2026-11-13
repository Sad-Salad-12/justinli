"use client";

/* eslint-disable @next/next/no-img-element */
import { type ReactNode, useEffect, useState } from "react";
import { AdvertisingDashboard } from "./advertising-dashboard";
import { AdReportMedia } from "./experience-media";
import { type Entry, type Language, portfolioContent } from "./portfolio-content";
import { LegalWorkspace, StillWorks } from "./selected-projects";
import { VerbaDemo } from "./verba-demo";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/justinli";
const withBasePath = (path: string) => `${basePath}${path}`;

/** A project: metadata in the left rail, title and text beside it, media below at full width. */
function ProjectEntry({ entry, children }: { entry: Entry; children: ReactNode }) {
  return (
    <article className="entry" id={entry.id} aria-labelledby={`${entry.id}-title`}>
      <div className="entry-head grid">
        <h3 className="entry-title" id={`${entry.id}-title`}>
          {entry.title}
        </h3>
        <ul className="entry-meta">
          <li>{entry.kind}</li>
          {entry.meta.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <div className="entry-body">
          {entry.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
      <div className="entry-media">{children}</div>
    </article>
  );
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [preferenceReady, setPreferenceReady] = useState(false);
  const t = portfolioContent[language];

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

  const [adReport, verba] = t.experience.items;

  return (
    <div className="site" data-language={language}>
      <header className="site-header">
        <div className="wrap grid">
          <a className="brand" href="#top" aria-label={t.a11y.backToTop}>
            {t.identity.name}
          </a>
          <nav className="site-nav" aria-label={t.a11y.mainNavigation}>
            <a href="#experience">{t.nav.experience}</a>
            <a href="#work">{t.nav.work}</a>
            <a href="#contact">{t.nav.contact}</a>
          </nav>
          <div className="language-switch" role="group" aria-label={t.a11y.languageSelector}>
            <button
              type="button"
              lang="en"
              aria-pressed={language === "en"}
              onClick={() => setLanguage("en")}
            >
              English
            </button>
            <button
              type="button"
              lang="zh-CN"
              aria-pressed={language === "zh"}
              onClick={() => setLanguage("zh")}
            >
              简体中文
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero wrap grid" aria-labelledby="hero-name">
          <figure className="hero-portrait">
            <img
              src={withBasePath("/justin-shanghai-portrait.jpg")}
              alt={t.a11y.portraitAlt}
              width={1080}
              height={1619}
              fetchPriority="high"
            />
          </figure>
          <div className="hero-text">
            <h1 id="hero-name">{t.identity.name}</h1>
            <p className="hero-descriptor">{t.hero.descriptor}</p>
            <p className="hero-body">{t.hero.body}</p>
            <dl className="facts">
              {t.hero.facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.href ? <a href={fact.href}>{fact.value}</a> : fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="section wrap" id="experience" aria-labelledby="experience-title">
          <h2 className="section-title" id="experience-title">
            {t.experience.headline}
          </h2>
          <ProjectEntry entry={adReport}>
            <AdReportMedia copy={t.experience.media} lightboxCopy={t.lightbox} />
          </ProjectEntry>
          <ProjectEntry entry={verba}>
            <VerbaDemo copy={t.experience.media} language={language} />
          </ProjectEntry>
        </section>

        <section className="section wrap" id="work" aria-labelledby="work-title">
          <h2 className="section-title" id="work-title">
            {t.work.headline}
          </h2>
          <ProjectEntry entry={t.work.dashboard}>
            <AdvertisingDashboard
              copy={t.work.dashboardControls}
              language={language}
              basePath={basePath}
            />
          </ProjectEntry>
          <ProjectEntry entry={t.work.legal}>
            <LegalWorkspace
              copy={t.work.legalGallery}
              lightboxCopy={t.lightbox}
              language={language}
              basePath={basePath}
            />
          </ProjectEntry>
          <StillWorks items={t.work.stills} lightboxCopy={t.lightbox} basePath={basePath} />
        </section>
      </main>

      <footer className="contact" id="contact" aria-labelledby="contact-title">
        <div className="wrap grid">
          <h2 className="section-title" id="contact-title">
            {t.contact.headline}
          </h2>
          <div className="contact-main">
            <p>{t.contact.body}</p>
            <address>
              <a className="contact-email" href={`mailto:${t.identity.email}`}>
                {t.identity.email}
              </a>
              <a className="contact-phone" href={`tel:${t.identity.phoneHref}`}>
                {t.identity.phone}
              </a>
            </address>
          </div>
          <p className="colophon">
            <span>
              {t.identity.name} · {t.identity.location}
            </span>
            <a href="#top">{t.contact.backToTop}</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
