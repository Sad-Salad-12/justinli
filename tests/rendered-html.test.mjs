import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
import test from "node:test";
import {
  getDraggedSlideIndex,
  getSlideStackPosition,
  wrapSlideIndex,
} from "../app/carousel-utils.ts";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the streamlined English portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="en"/i);
  assert.match(html, /<title>Justin Li — Solutions Architect &amp; FDE<\/title>/i);
  assert.match(html, /JUSTIN LI\./);
  assert.match(html, /01 — WORK EXPERIENCE/);
  assert.match(html, /Business-aware\./);
  assert.match(html, /Built to deliver\./);
  assert.match(html, /02 — SELECTED WORK/);
  assert.match(html, /03 — LET&#x27;S TALK/);
  assert.match(html, /SCROLL — 01 \/ 03/);
  assert.match(html, /AI Advertisement Report Automation/);
  assert.match(html, /Verba — Internal AI Sales Agent/);
  assert.equal((html.match(/class="experience-project"/g) ?? []).length, 2);
  assert.match(html, /src="\/experience\/ad-report\/report-agent-demo\.mp4"/);
  assert.match(html, /autoplay=""/i);
  assert.match(html, /muted=""/i);
  assert.match(html, /loop=""/i);
  assert.match(html, /playsinline=""/i);
  assert.match(html, /controls=""/i);
  assert.match(html, /Generated advertising report slides/);
  assert.match(html, /From scattered case files to a source-aware solution draft/);
  assert.match(html, /Verba solution-matching system architecture/);
  assert.match(html, /15 historical solution PDFs/);
  assert.match(html, /111/);
  assert.doesNotMatch(html, /Visual documentation coming next|verba-visual-placeholder/);
  assert.match(html, /src="\/justin-shanghai-portrait\.jpg"/);
  assert.match(html, /href="\/works\/solution-blueprint-sample\.pdf"/);
  assert.doesNotMatch(html, /01 — POSITIONING|BUILT FOR AMBIGUITY|Built in ambiguity/);
  assert.doesNotMatch(html, /class="positioning"/);
  assert.doesNotMatch(html, /\/justinli\//);
});

test("keeps bilingual content and hosted assets wired correctly", async () => {
  const [page, content, media, layout, packageJson, nextConfig] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/portfolio-content.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/experience-media.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../next.config.ts", import.meta.url), "utf8"),
  ]);

  const pdfs = [
    "solution-blueprint-sample.pdf",
    "field-discovery-sample.pdf",
    "production-readiness-sample.pdf",
  ];

  for (const filename of pdfs) {
    assert.match(page, new RegExp(filename.replaceAll(".", "\\.")));
    await access(new URL(`../public/works/${filename}`, import.meta.url));
  }

  assert.match(page, /type="application\/pdf"/);
  assert.match(page, /portfolio-language/);
  assert.match(page, /setLanguage\("en"\)/);
  assert.match(page, /setLanguage\("zh"\)/);
  assert.match(page, /src="\/justin-shanghai-portrait\.jpg"/);
  assert.doesNotMatch(page, /withBasePath|NEXT_PUBLIC_BASE_PATH|positioning-title/);
  assert.match(content, /懂业务。/);
  assert.match(content, /为交付而生。/);
  assert.match(content, /01 — 工作经历/);
  assert.match(content, /02 — 精选作品/);
  assert.match(content, /03 — 联系/);
  assert.match(content, /产品实时演示/);
  assert.match(content, /生成成果/);
  assert.match(content, /拖动或点击箭头/);
  assert.match(content, /VERBA \/ 方案智能/);
  assert.match(content, /本地优先的 RAG 工作台/);
  assert.match(content, /15 份历史方案 PDF/);
  assert.match(content, /生成的引用仍需人工复核/);
  assert.doesNotMatch(content, /Built in ambiguity|BUILT FOR AMBIGUITY/);
  assert.match(media, /autoplay|autoPlay/);
  assert.match(media, /muted/);
  assert.match(media, /playsInline/);
  assert.match(media, /prefers-reduced-motion: reduce/);
  assert.match(media, /createPortal/);
  assert.match(media, /role="dialog"/);
  assert.match(media, /aria-modal="true"/);
  assert.match(media, /event\.key === "Escape"/);
  assert.match(media, /VerbaSystemVisual/);
  assert.match(media, /verba-flow-nodes/);
  assert.match(media, /verba-evidence-strip/);
  assert.doesNotMatch(media, /\.gif/);
  assert.match(layout, /justin\.zl5626\.chatgpt\.site/);
  assert.match(layout, /next\/headers|generateMetadata/);
  assert.match(packageJson, /"build":\s*"[^"]*vinext build"/);
  assert.doesNotMatch(nextConfig, /output:\s*"export"|basePath/);
});

test("packages the MP4 demo and all eight report outputs without the GIF", async () => {
  const mediaDirectory = new URL("../public/experience/ad-report/", import.meta.url);
  const video = new URL("report-agent-demo.mp4", mediaDirectory);
  const slides = ["01", "02", "03", "04", "05", "06", "07", "08"].map(
    (number) => new URL(`slide-${number}.jpg`, mediaDirectory),
  );

  const videoStats = await stat(video);
  assert.ok(videoStats.size > 10_000_000);
  assert.ok(videoStats.size < 20_000_000);
  for (const slide of slides) await access(slide);

  await assert.rejects(access(new URL("report-agent-demo.gif", mediaDirectory)));
});

test("wraps carousel navigation and only changes slides after a real drag", () => {
  assert.equal(wrapSlideIndex(-1, 8), 7);
  assert.equal(wrapSlideIndex(8, 8), 0);
  assert.equal(getDraggedSlideIndex(0, -60, 8), 1);
  assert.equal(getDraggedSlideIndex(0, 60, 8), 7);
  assert.equal(getDraggedSlideIndex(2, 20, 8), 2);
  assert.equal(getSlideStackPosition(0, 0, 8), "active");
  assert.equal(getSlideStackPosition(1, 0, 8), "next");
  assert.equal(getSlideStackPosition(2, 0, 8), "after");
  assert.equal(getSlideStackPosition(3, 0, 8), "hidden");
});

test("keeps retained sections white and the final contact section dark", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

  assert.match(css, /\.experience\s*\{[^}]*background:\s*var\(--white\)/s);
  assert.match(css, /\.work\s*\{[^}]*background:\s*var\(--white\)/s);
  assert.match(css, /\.contact\s*\{[^}]*background:\s*var\(--ink\)/s);
  assert.match(css, /\.experience-head h2 span\s*\{[^}]*color:\s*var\(--blue\)/s);
});

test("keeps the compact portrait and omits retired sections", async () => {
  const [html, css] = await Promise.all([
    render().then((response) => response.text()),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(html, /id="positioning-title"|id="capabilities"|id="approach"/);
  assert.match(css, /\.hero-portrait\s*\{[^}]*width:\s*clamp\(280px,\s*24vw,\s*390px\)/s);
  assert.match(css, /\.portrait-frame\s*\{[^}]*border-radius:\s*clamp\(/s);
  assert.match(css, /\.portrait-orbit\s*\{[^}]*width:\s*142%/s);
});

test("keeps the demo dominant on desktop and stacks media on phones", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

  assert.match(
    css,
    /\.ad-report-media\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1\.78fr\)\s*minmax\(300px,\s*1fr\)/s,
  );
  assert.match(css, /\.output-lightbox-dialog\s*\{[^}]*width:\s*min\(80vw,\s*1280px\)/s);
  assert.match(css, /@media \(max-width:\s*700px\)[\s\S]*?\.ad-report-media\s*\{[^}]*grid-template-columns:\s*1fr/s);
  assert.match(css, /@media \(max-width:\s*700px\)[\s\S]*?\.output-lightbox-dialog\s*\{[^}]*width:\s*92vw/s);
  assert.match(css, /body\.modal-open\s*\{[^}]*overflow:\s*hidden/s);
  assert.match(css, /\.verba-flow-knowledge\s*\{[^}]*grid-template-columns:\s*repeat\(3/s);
  assert.match(css, /\.verba-flow-request\s*\{[^}]*grid-template-columns:\s*repeat\(4/s);
  assert.match(css, /@media \(max-width:\s*700px\)[\s\S]*?\.verba-flow-knowledge,[\s\S]*?grid-template-columns:\s*1fr/s);
});
