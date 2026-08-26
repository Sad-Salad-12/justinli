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
  assert.doesNotMatch(html, /SCROLL — 01 \/ 03|JUSTIN LI \/ PORTRAIT/);
  assert.match(html, /AI Advertisement Report Automation/);
  assert.match(html, /Verba — Internal AI Sales Agent/);
  assert.equal((html.match(/class="experience-project"/g) ?? []).length, 2);
  assert.match(html, /poster="\/experience\/ad-report\/report-agent-poster\.jpg"/);
  assert.match(html, /preload="none"/i);
  assert.doesNotMatch(html, /src="\/experience\/ad-report\/report-agent-demo\.mp4"/);
  assert.match(html, /autoplay=""/i);
  assert.match(html, /muted=""/i);
  assert.match(html, /loop=""/i);
  assert.match(html, /playsinline=""/i);
  assert.match(html, /controls=""/i);
  assert.match(html, /Generated advertising report slides/);
  assert.match(html, /How Verba turns a new brief into a source-linked solution draft/);
  assert.match(html, /Verba source-linked solution workflow/);
  assert.match(html, /CASE PDFS/);
  assert.match(html, /SOURCE-LINKED WORKFLOW/);
  assert.match(html, /Structured Solution/);
  assert.match(html, /Human Review &amp; Refine/);
  assert.match(html, /111/);
  assert.doesNotMatch(html, /Visual documentation coming next|verba-visual-placeholder/);
  assert.match(html, /src="\/justin-shanghai-portrait\.jpg"/);
  assert.match(html, /R&amp;D Project Dashboards \(Lark Base\)/);
  assert.match(html, /src="\/works\/rd-project-dashboard-lark-base\.png"/);
  assert.doesNotMatch(
    html,
    /REAL PROJECT SNAPSHOT|Select the dashboard to inspect|It should reveal how you think|Selected work turning operational pain points/,
  );
  assert.equal((html.match(/class="work-row"/g) ?? []).length, 1);
  assert.doesNotMatch(
    html,
    /Enterprise Knowledge System|Field Discovery &amp; Validation|Production Readiness/,
  );
  assert.doesNotMatch(html, /sample\.pdf|application\/pdf/);
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

  const dashboard = new URL(
    "../public/works/rd-project-dashboard-lark-base.png",
    import.meta.url,
  );
  assert.ok((await stat(dashboard)).size > 100_000);
  assert.match(page, /rd-project-dashboard-lark-base\.png/);
  assert.doesNotMatch(page, /sample\.pdf|application\/pdf/);
  assert.match(page, /work-image-preview/);
  assert.match(page, /work-image-modal/);
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
  assert.match(content, /VERBA \/ 本地优先 RAG/);
  assert.match(content, /每个新需求都会经过本地证据检索/);
  assert.match(content, /15 份案例 PDF/);
  assert.match(content, /有来源依据的方案流程/);
  assert.match(content, /人工复核与完善/);
  assert.match(content, /系统会展示来源供人工核验/);
  assert.match(content, /R&D Project Dashboards \(Lark Base\)/);
  assert.match(content, /研发项目仪表盘（飞书多维表格）/);
  assert.doesNotMatch(
    content,
    /JUSTIN LI \/ PORTRAIT|SCROLL — 01 \/ 03|REAL PROJECT SNAPSHOT|Select the dashboard to inspect|It should reveal how you think|Selected work turning operational pain points|李泽霆 \/ 个人照片|向下浏览 — 01 \/ 03|真实项目快照|点击仪表盘即可查看完整大图|它应该让人看见你如何思考|把业务中的重复问题转化为可验证的人工智能产品/,
  );
  assert.doesNotMatch(
    content,
    /Enterprise Knowledge System|Field Discovery & Validation|Production Readiness/,
  );
  assert.doesNotMatch(content, /Built in ambiguity|BUILT FOR AMBIGUITY/);
  assert.match(media, /autoplay|autoPlay/);
  assert.match(media, /muted/);
  assert.match(media, /playsInline/);
  assert.match(media, /prefers-reduced-motion: reduce/);
  assert.match(media, /document\.readyState === "complete"/);
  assert.match(media, /setShouldLoadVideo\(true\)/);
  assert.match(media, /report-agent-poster\.jpg/);
  assert.match(media, /preload="none"/);
  assert.match(media, /createPortal/);
  assert.match(media, /role="dialog"/);
  assert.match(media, /aria-modal="true"/);
  assert.match(media, /event\.key === "Escape"/);
  assert.match(media, /VerbaSystemVisual/);
  assert.match(media, /verba-cycle-canvas/);
  assert.match(media, /verba-cycle-nodes/);
  assert.doesNotMatch(media, /verba-arrow-loop|verba-cycle-band|verba-cycle-heads|verba-cycle-core/);
  assert.match(content, /retrieve the five most relevant passages from 111 locally indexed chunks/i);
  assert.match(content, /从 111 个本地索引切片中召回最相关的五段内容/);
  assert.doesNotMatch(media, /\["↘", "↓", "↙", "↖", "↑", "↗"\]/);
  assert.doesNotMatch(media, /verba-prepare-track|verba-run-track|verba-evidence-feed/);
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
  const poster = new URL("report-agent-poster.jpg", mediaDirectory);
  const slides = ["01", "02", "03", "04", "05", "06", "07", "08"].map(
    (number) => new URL(`slide-${number}.jpg`, mediaDirectory),
  );

  const videoStats = await stat(video);
  assert.ok(videoStats.size > 10_000_000);
  assert.ok(videoStats.size < 20_000_000);
  assert.ok((await stat(poster)).size < 200_000);
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
  assert.match(css, /\.work-image-preview\s*\{/);
  assert.match(css, /\.work-image-modal\s*\{/);
  assert.doesNotMatch(css, /\.document-cover|\.pdf-modal/);
});

test("keeps the enlarged portrait and omits retired sections", async () => {
  const [html, css] = await Promise.all([
    render().then((response) => response.text()),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(html, /id="positioning-title"|id="capabilities"|id="approach"/);
  assert.match(css, /\.hero-portrait\s*\{[^}]*width:\s*clamp\(310px,\s*26vw,\s*430px\)/s);
  assert.match(css, /\.portrait-frame\s*\{[^}]*border-radius:\s*clamp\(/s);
  assert.match(css, /\.portrait-orbit\s*\{[^}]*width:\s*142%/s);
  assert.doesNotMatch(css, /\.hero-index|\.hero-portrait figcaption|\.library-note/);
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
  assert.match(css, /\.demo-video-frame\s*\{[^}]*aspect-ratio:\s*1600\s*\/\s*1018/s);
  assert.match(css, /\.demo-video-frame video\s*\{[^}]*object-position:\s*center top/s);
  assert.match(css, /\.verba-cycle-canvas\s*\{[^}]*display:\s*grid/s);
  assert.match(css, /\.verba-cycle-canvas\s*\{[^}]*grid-template-columns:\s*1fr/s);
  assert.match(css, /\.verba-cycle-nodes\s*\{[^}]*grid-template-columns:\s*repeat\(3,/s);
  assert.doesNotMatch(css, /verba-arrow-loop|verba-cycle-band|verba-cycle-heads|verba-cycle-core/);
  assert.match(css, /@media \(max-width:\s*700px\)[\s\S]*?\.verba-cycle-nodes\s*\{[^}]*grid-template-columns:\s*repeat\(2,/s);
  assert.match(css, /\.experience-project:last-child\s*\{[^}]*padding-bottom:\s*clamp\(28px,\s*3vw,\s*44px\)/s);
  assert.match(css, /\.work\s*\{[^}]*padding-top:\s*clamp\(52px,\s*6vw,\s*84px\)/s);
});
