import assert from "node:assert/strict";
import { access, readFile, readdir, stat } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(path, import.meta.url), "utf8");
const renderedHtml = () => read("../out/index.html");
const count = (text, pattern) => (text.match(pattern) ?? []).length;

test("server-renders the English portfolio in document order", async () => {
  const html = await renderedHtml();

  assert.match(html, /<html lang="en"/i);
  assert.match(html, /<title>Justin Li — Solutions Architect &amp; FDE<\/title>/i);
  assert.match(html, /href="https:\/\/sad-salad-12\.github\.io\/justinli\/"/);

  // Hero: name, descriptor, facts and the portrait.
  assert.match(html, /<h1 id="hero-name">Justin Li<\/h1>/);
  assert.match(html, /AI product and solution design\./);
  assert.match(html, /<dt>Based in<\/dt><dd>New York, NY<\/dd>/);
  assert.match(html, /<dt>Open to<\/dt><dd>Solutions Architect and Forward Deployed Engineer roles<\/dd>/);
  assert.match(html, /href="mailto:justinli@stern\.nyu\.edu"/);
  assert.match(html, /src="\/justinli\/justin-shanghai-portrait\.jpg"/);

  // Sections and projects appear once each, in this order.
  const order = [
    'id="experience"',
    'id="ad-report"',
    'id="verba"',
    'id="work"',
    'id="advertising-dashboard"',
    'id="legal-workspace"',
    'id="rd-dashboard"',
    'id="supplier-dashboard"',
    'id="contact"',
  ].map((marker) => {
    assert.equal(count(html, new RegExp(marker, "g")), 1, marker);
    return html.indexOf(marker);
  });
  assert.deepEqual(order, [...order].sort((a, b) => a - b));
  assert.equal(count(html, /class="entry"/g), 4);

  assert.match(html, /AI Advertisement Report Automation Project/);
  assert.match(html, /Verba — AI solution design tool/);
  assert.match(html, /300\+ agent runs/);
  assert.match(html, /30\+ users gave feedback/);
  assert.match(html, /Advertising performance dashboard/);
  assert.match(html, /Legal &amp; compliance workspace/);
  assert.match(html, /R&amp;D Project Dashboards/);
  assert.match(html, /Supplier dashboard/);
});

test("ships the demo recording lazily and all eight generated slides", async () => {
  const html = await renderedHtml();

  assert.match(html, /poster="\/justinli\/experience\/ad-report\/report-agent-poster\.jpg"/);
  assert.match(html, /preload="none"/i);
  assert.doesNotMatch(html, /src="\/justinli\/experience\/ad-report\/report-agent-demo\.mp4"/);
  for (const attribute of ["autoplay", "muted", "loop", "playsinline", "controls"]) {
    assert.match(html, new RegExp(`${attribute}=""`, "i"));
  }
  assert.match(html, /Generated advertising report slides/);
  assert.equal(count(html, /src="\/justinli\/experience\/ad-report\/slide-0[1-8]\.jpg"/g), 8);

  const mediaDirectory = new URL("../public/experience/ad-report/", import.meta.url);
  const videoStats = await stat(new URL("report-agent-demo.mp4", mediaDirectory));
  assert.ok(videoStats.size > 10_000_000);
  assert.ok(videoStats.size < 20_000_000);
  assert.ok((await stat(new URL("report-agent-poster.jpg", mediaDirectory))).size < 200_000);
  for (const number of ["01", "02", "03", "04", "05", "06", "07", "08"]) {
    await access(new URL(`slide-${number}.jpg`, mediaDirectory));
  }
  await assert.rejects(access(new URL("report-agent-demo.gif", mediaDirectory)));
});

test("embeds Verba from its own origin and checks every message", async () => {
  const [html, demo] = await Promise.all([renderedHtml(), read("../app/verba-demo.tsx")]);

  assert.match(
    html,
    /<iframe[^>]*src="https:\/\/justin\.zl5626\.chatgpt\.site\/verba\/index\.html\?lang=en&amp;parentOrigin=[^" ]+&amp;embed=1&amp;typeface=1"/,
  );
  assert.match(html, /scrolling="no"/);
  assert.match(demo, /parentOrigin=https%3A%2F%2Fsad-salad-12\.github\.io/);
  assert.match(demo, /event\.origin !== demoOrigin/);
  assert.match(demo, /event\.source !== frame\.current\?\.contentWindow/);
  assert.match(demo, /verba:resize/);
});

test("keeps both languages and the base path wired through the source", async () => {
  const [page, content, layout, packageJson, nextConfig] = await Promise.all([
    read("../app/page.tsx"),
    read("../app/portfolio-content.ts"),
    read("../app/layout.tsx"),
    read("../package.json"),
    read("../next.config.ts"),
  ]);

  assert.match(page, /portfolio-language/);
  assert.match(page, /setLanguage\("en"\)/);
  assert.match(page, /setLanguage\("zh"\)/);
  assert.match(page, /NEXT_PUBLIC_BASE_PATH/);
  assert.match(page, /withBasePath\("\/justin-shanghai-portrait\.jpg"\)/);

  for (const phrase of [
    "李泽霆",
    "AI 产品与方案设计。",
    "工作经历",
    "其他作品",
    "联系方式",
    "美国纽约",
    "人工智能广告报告自动化项目",
    "Verba — AI 方案设计工具",
    "广告投放分析看板",
    "法务与合规协作系统",
    "研发项目仪表盘",
    "供应商看板",
  ]) {
    assert.ok(content.includes(phrase), phrase);
  }

  // English and Chinese carry the same structure.
  assert.equal(count(content, /id: "ad-report"/g), 2);
  assert.equal(count(content, /id: "verba"/g), 2);
  assert.equal(count(content, /id: "advertising-dashboard"/g), 2);
  assert.equal(count(content, /id: "legal-workspace"/g), 2);
  assert.equal(count(content, /id: "wiki",/g), 2);
  assert.equal(count(content, /id: "updates",/g), 2);

  for (const file of ["wiki-en", "wiki-zh", "base-en", "base-zh", "updates-en", "updates-zh"]) {
    await access(new URL(`../public/works/legal/${file}.png`, import.meta.url));
  }
  assert.ok(
    (await stat(new URL("../public/works/rd-project-dashboard-lark-base.png", import.meta.url)))
      .size > 100_000,
  );
  await access(new URL("../public/works/tableau-supplier.png", import.meta.url));

  assert.match(layout, /sad-salad-12\.github\.io\/justinli/);
  assert.match(packageJson, /next build/);
  assert.match(nextConfig, /output:\s*"export"/);
  assert.match(nextConfig, /basePath/);
});

test("uses one stylesheet built on a single grid and two type roles", async () => {
  const [layout, css, appFiles] = await Promise.all([
    read("../app/layout.tsx"),
    read("../app/site.css"),
    readdir(new URL("../app/", import.meta.url)),
  ]);

  assert.deepEqual(
    appFiles.filter((file) => file.endsWith(".css")),
    ["site.css"],
  );
  assert.equal(count(layout, /import "\.\/[\w-]+\.css"/g), 1);
  assert.doesNotMatch(css, /@import/);

  assert.match(css, /\.grid\s*\{[^}]*grid-template-columns:\s*repeat\(12,\s*minmax\(0,\s*1fr\)\)/s);
  assert.match(css, /--serif:\s*"Rhymes Text"/);
  assert.match(css, /--sans:\s*"Helvetica Neue"/);
  assert.match(css, /body\s*\{[^}]*font-family:\s*var\(--sans\)/s);
  assert.match(css, /h1,\s*h2,\s*h3\s*\{[^}]*font-family:\s*var\(--serif\)/s);

  // Headings and text share column 4; the rail holds metadata and labels.
  assert.match(css, /\.hero-text\s*\{[^}]*grid-column:\s*4 \/ 13/s);
  assert.match(css, /\.entry-title\s*\{[^}]*grid-column:\s*4 \/ 13/s);
  assert.match(css, /\.entry-meta\s*\{[^}]*grid-column:\s*1 \/ 4/s);
  assert.match(css, /\.contact-main\s*\{[^}]*grid-column:\s*4 \/ 13/s);

  assert.match(css, /@media \(max-width: 760px\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.doesNotMatch(css, /!important[^}]*font-family|text-transform:\s*uppercase|@keyframes/);
});

test("leaves out the retired decoration, taglines and intro", async () => {
  const [html, page, layout] = await Promise.all([
    renderedHtml(),
    read("../app/page.tsx"),
    read("../app/layout.tsx"),
  ]);

  assert.doesNotMatch(html, /orbit|scroll-progress|hero-enter|data-reveal/);
  assert.doesNotMatch(
    html,
    /Business-aware|Built to deliver|Work is more than a file|Let’s solve|Complex systems|DESIGNED FOR THE REAL WORLD/,
  );
  assert.doesNotMatch(html, /ALPHA VERSIONS|AGENT RUNS|PRODUCT DEMO|GENERATED SLIDES|SOLUTIONS × FDE/);
  assert.doesNotMatch(html, /Open full demo|Updated September|sample\.pdf|application\/pdf/);
  assert.doesNotMatch(
    html + page + layout,
    /IntroOverlay|intro-overlay|introGate|portfolio-intro-seen|Skip intro/,
  );
  assert.doesNotMatch(page, /requestAnimationFrame|addEventListener\("scroll"/);
});

test("enlarges every image through one native dialog", async () => {
  const [html, lightbox, media, projects] = await Promise.all([
    renderedHtml(),
    read("../app/lightbox.tsx"),
    read("../app/experience-media.tsx"),
    read("../app/selected-projects.tsx"),
  ]);

  assert.equal(count(html, /<dialog class="lightbox"/g), 3);
  assert.match(lightbox, /showModal\(\)/);
  assert.match(lightbox, /event\.key === "ArrowLeft"/);
  assert.match(lightbox, /event\.key === "ArrowRight"/);
  assert.match(media, /<Lightbox/);
  assert.equal(count(projects, /<Lightbox/g), 2);

  assert.match(media, /prefers-reduced-motion: reduce/);
  assert.match(media, /document\.readyState === "complete"/);
  assert.match(media, /intersectionRatio >= 0\.24/);
  assert.match(media, /visibilityObserver\.disconnect\(\)/);
});
