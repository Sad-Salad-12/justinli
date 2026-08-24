import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function renderedHtml() {
  return readFile(new URL("../out/index.html", import.meta.url), "utf8");
}

test("static export renders English as the default portfolio language", async () => {
  const html = await renderedHtml();
  assert.match(html, /<html lang="en"/i);
  assert.match(html, /<title>Justin Li — Solutions Architect &amp; FDE<\/title>/i);
  assert.ok(
    html.includes(
      '<link rel="canonical" href="https://sad-salad-12.github.io/justinli/"/>',
    ),
    "canonical link must preserve the /justinli/ GitHub Pages path",
  );
  assert.match(html, /JUSTIN LI\./);
  assert.match(html, /Solution Architect/);
  assert.match(html, /Product Management/);
  assert.match(html, /AI Operations/);
  assert.match(html, /Complex systems/);
  assert.match(html, /SELECTED WORK/);
  assert.match(html, /WORK EXPERIENCE/);
  assert.match(html, /AI Advertisement Report Automation/);
  assert.match(html, /Verba — Internal AI Sales Agent/);
  assert.match(html, /justin-shanghai-portrait\.jpg/);
  assert.match(html, /class="portrait-frame"/);
  assert.match(html, /03 — SELECTED WORK/);
  assert.match(html, /04 — LET&#x27;S TALK/);
  assert.match(html, /SCROLL — 01 \/ 04/);
  assert.match(html, /Preview online/);
  assert.match(html, /English/);
  assert.match(html, /简体中文/);
  assert.match(html, /href="mailto:justinli@stern\.nyu\.edu"/);
  assert.match(html, /href="tel:\+16462284995"/);
  assert.match(html, /\(646\) 228-4995/);
  assert.match(html, /NEW YORK, NY/);
  assert.match(html, /\/justinli\/_next\//);
  assert.match(html, /\/justinli\/justin-shanghai-portrait\.jpg/);
  assert.match(html, /\/justinli\/works\/solution-blueprint-sample\.pdf/);
  assert.doesNotMatch(html, /YOUR EMAIL HERE|Zeting Li/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/);
});

test("keeps bilingual content and PDF work samples wired correctly", async () => {
  const [page, content, layout, packageJson, nextConfig, workflow, html] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/portfolio-content.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../next.config.ts", import.meta.url), "utf8"),
    readFile(new URL("../.github/workflows/pages.yml", import.meta.url), "utf8"),
    renderedHtml(),
  ]);

  const pdfs = [
    "solution-blueprint-sample.pdf",
    "field-discovery-sample.pdf",
    "production-readiness-sample.pdf",
  ];

  for (const filename of pdfs) {
    assert.match(page, new RegExp(filename.replaceAll(".", "\\.")));
    await access(new URL(`../public/works/${filename}`, import.meta.url));
    await access(new URL(`../out/works/${filename}`, import.meta.url));
    assert.match(
      html,
      new RegExp(`/justinli/works/${filename.replaceAll(".", "\\.")}`),
    );
  }

  assert.match(page, /type="application\/pdf"/);
  assert.match(page, /download/);
  assert.match(page, /portfolio-language/);
  assert.match(page, /setLanguage\("en"\)/);
  assert.match(page, /setLanguage\("zh"\)/);
  assert.match(page, /href="#experience"/);
  assert.doesNotMatch(page, /href="#capabilities"|href="#approach"/);
  await access(new URL("../public/justin-shanghai-portrait.jpg", import.meta.url));
  assert.match(content, /把复杂的系统/);
  assert.match(content, /解决方案架构师/);
  assert.match(content, /产品管理/);
  assert.match(content, /AI 运营/);
  assert.match(content, /人工智能广告报告自动化/);
  assert.match(content, /运行 300 多次/);
  assert.match(content, /李泽霆/);
  assert.match(content, /18019052377/);
  assert.match(content, /justinli@stern\.nyu\.edu/);
  assert.match(page, /mailto:\$\{t\.identity\.email\}/);
  assert.match(page, /tel:\$\{t\.identity\.phoneHref\}/);
  assert.match(page, /NEXT_PUBLIC_BASE_PATH/);
  assert.match(page, /withBasePath\("\/justin-shanghai-portrait\.jpg"\)/);
  assert.match(layout, /lang="en"/);
  assert.match(layout, /Justin Li — Solutions Architect & FDE/);
  assert.match(layout, /https:\/\/sad-salad-12\.github\.io\/justinli\//);
  assert.doesNotMatch(layout, /next\/headers|generateMetadata|chatgpt\.site/);
  assert.match(nextConfig, /output:\s*"export"/);
  assert.match(nextConfig, /basePath/);
  assert.match(nextConfig, /\/justinli/);
  assert.match(nextConfig, /unoptimized:\s*true/);
  assert.match(packageJson, /"build":\s*"next build(?: --webpack)?"/);
  assert.doesNotMatch(packageJson, /"build":\s*[^\n]*vinext/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.match(workflow, /actions\/configure-pages@v5/);
  assert.match(workflow, /actions\/upload-pages-artifact@v4/);
  assert.match(workflow, /actions\/deploy-pages@v4/);
  assert.match(workflow, /NEXT_PUBLIC_BASE_PATH:\s*\/justinli/);
  await access(new URL("../out/.nojekyll", import.meta.url));
  await access(new URL("../out/justin-shanghai-portrait.jpg", import.meta.url));
  await access(new URL("../out/og.png", import.meta.url));
});

test("keeps the retained main sections white except the final contact section", async () => {
  const css = await readFile(
    new URL("../app/globals.css", import.meta.url),
    "utf8",
  );

  assert.match(css, /\.experience\s*\{[^}]*background:\s*var\(--white\)/s);
  assert.match(css, /\.work\s*\{[^}]*background:\s*var\(--white\)/s);
  assert.match(css, /\.contact\s*\{[^}]*background:\s*var\(--ink\)/s);
});

test("omits the former capability and approach sections", async () => {
  const html = await renderedHtml();

  assert.doesNotMatch(html, /id="capabilities"|id="approach"/);
  assert.doesNotMatch(html, />Capabilities<|>Approach</);
});

test("keeps the PDF library note below the selected work headline", async () => {
  const css = await readFile(
    new URL("../app/globals.css", import.meta.url),
    "utf8",
  );

  assert.match(css, /\.library-note\s*\{[^}]*grid-column:\s*2\s*\/\s*3/s);
  assert.doesNotMatch(css, /\.library-note\s*\{[^}]*margin-top:\s*-/s);
});

test("uses a compact rounded portrait card with an orbit", async () => {
  const css = await readFile(
    new URL("../app/globals.css", import.meta.url),
    "utf8",
  );

  assert.match(css, /\.hero-portrait\s*\{[^}]*width:\s*clamp\(280px,\s*24vw,\s*390px\)/s);
  assert.match(css, /\.portrait-frame\s*\{[^}]*border-radius:\s*clamp\(/s);
  assert.match(css, /\.portrait-orbit\s*\{[^}]*width:\s*142%/s);
  assert.doesNotMatch(css, /width:\s*82vw|height:\s*430px/);
});

test("keeps the hero compact on tall screens", async () => {
  const css = await readFile(
    new URL("../app/globals.css", import.meta.url),
    "utf8",
  );

  assert.match(css, /\.hero\s*\{[^}]*min-height:\s*clamp\(760px,\s*100svh,\s*980px\)/s);
  assert.match(css, /\.hero-statement\s*\{[^}]*margin-top:\s*clamp\(34px,\s*4\.5vh,\s*58px\)/s);
  assert.match(css, /\.hero-disciplines\s*\{[^}]*display:\s*flex/s);
});
