import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
import test from "node:test";
import {
  getDraggedSlideIndex,
  getSlideStackPosition,
  wrapSlideIndex,
} from "../app/carousel-utils.ts";

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
  assert.match(html, /01 — WORK EXPERIENCE/);
  assert.match(html, /Business-aware\./);
  assert.match(html, /Built to deliver\./);
  assert.match(html, /02 — SELECTED WORK/);
  assert.match(html, /03 — LET&#x27;S TALK/);
  assert.doesNotMatch(html, /SCROLL — 01 \/ 03|JUSTIN LI \/ PORTRAIT/);
  assert.match(html, /AI Advertisement Report Automation/);
  assert.match(html, /Verba — Internal AI Sales Agent/);
  assert.equal((html.match(/class="experience-project"/g) ?? []).length, 2);
  assert.match(html, /poster="\/justinli\/experience\/ad-report\/report-agent-poster\.jpg"/);
  assert.match(html, /preload="none"/i);
  assert.doesNotMatch(html, /src="\/justinli\/experience\/ad-report\/report-agent-demo\.mp4"/);
  assert.match(html, /autoplay=""/i);
  assert.match(html, /muted=""/i);
  assert.match(html, /loop=""/i);
  assert.match(html, /playsinline=""/i);
  assert.match(html, /controls=""/i);
  assert.match(html, /Generated advertising report slides/);
  assert.match(html, /How Verba turns a new brief into a source-linked solution draft/);
  assert.match(html, /Verba source-linked solution workflow/);
  assert.doesNotMatch(
    html,
    /A new brief moves through local evidence retrieval and structured drafting/,
  );
  assert.match(html, /CASE PDFS/);
  assert.match(html, /SOURCE-LINKED WORKFLOW/);
  assert.match(html, /Structured Solution/);
  assert.match(html, /Human Review &amp; Refine/);
  assert.match(html, /111/);
  assert.doesNotMatch(html, /Visual documentation coming next|verba-visual-placeholder/);
  assert.match(html, /src="\/justinli\/justin-shanghai-portrait\.jpg"/);
  assert.match(html, /R&amp;D Project Dashboards \(Lark Base\)/);
  assert.doesNotMatch(html, /class="contact-identity"/);
  assert.match(html, /src="\/justinli\/works\/rd-project-dashboard-lark-base\.png"/);
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
  assert.match(html, /href="mailto:justinli@stern\.nyu\.edu"/);
  assert.match(html, /href="tel:\+16462284995"/);
  assert.match(html, /\/justinli\/_next\//);
});

test("keeps bilingual content and GitHub Pages assets wired correctly", async () => {
  const [page, content, media, layout, packageJson, nextConfig, workflow, html] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/portfolio-content.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/experience-media.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../next.config.ts", import.meta.url), "utf8"),
    readFile(new URL("../.github/workflows/pages.yml", import.meta.url), "utf8"),
    renderedHtml(),
  ]);

  const dashboard = new URL(
    "../public/works/rd-project-dashboard-lark-base.png",
    import.meta.url,
  );
  assert.ok((await stat(dashboard)).size > 100_000);
  await access(new URL("../out/works/rd-project-dashboard-lark-base.png", import.meta.url));
  assert.match(html, /\/justinli\/works\/rd-project-dashboard-lark-base\.png/);
  assert.match(page, /rd-project-dashboard-lark-base\.png/);
  assert.doesNotMatch(page, /sample\.pdf|application\/pdf/);
  assert.match(page, /work-image-preview/);
  assert.match(page, /work-image-modal/);
  assert.match(page, /portfolio-language/);
  assert.match(page, /setLanguage\("en"\)/);
  assert.match(page, /setLanguage\("zh"\)/);
  assert.match(page, /NEXT_PUBLIC_BASE_PATH/);
  assert.match(page, /withBasePath\("\/justin-shanghai-portrait\.jpg"\)/);
  assert.match(page, /withBasePath\("\/works\/rd-project-dashboard-lark-base\.png"\)/);
  assert.match(media, /withBasePath\("\/experience\/ad-report\/report-agent-demo\.mp4"\)/);
  assert.doesNotMatch(page, /positioning-title/);
  assert.match(content, /懂业务。/);
  assert.match(content, /为交付而生。/);
  assert.match(content, /01 — 工作经历/);
  assert.match(content, /02 — 精选作品/);
  assert.match(content, /03 — 联系/);
  assert.match(content, /产品实时演示/);
  assert.match(content, /生成成果/);
  assert.match(content, /拖动或点击箭头/);
  assert.match(content, /VERBA \/ 本地优先 RAG/);
  assert.doesNotMatch(content, /每个新需求都会经过本地证据检索/);
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
  assert.match(layout, /https:\/\/sad-salad-12\.github\.io\/justinli\//);
  assert.doesNotMatch(layout, /next\/headers|generateMetadata|chatgpt\.site/);
  assert.match(nextConfig, /output:\s*"export"/);
  assert.match(nextConfig, /basePath/);
  assert.match(nextConfig, /\/justinli/);
  assert.match(nextConfig, /unoptimized:\s*true/);
  assert.match(packageJson, /"build":\s*"next build(?: --webpack)?"/);
  assert.doesNotMatch(packageJson, /"build":\s*[^\n]*vinext/);
  assert.match(workflow, /actions\/configure-pages@v5/);
  assert.match(workflow, /actions\/upload-pages-artifact@v4/);
  assert.match(workflow, /actions\/deploy-pages@v4/);
  assert.match(workflow, /NEXT_PUBLIC_BASE_PATH:\s*\/justinli/);
  await access(new URL("../out/.nojekyll", import.meta.url));
  await access(new URL("../out/justin-shanghai-portrait.jpg", import.meta.url));
  await access(new URL("../out/og.png", import.meta.url));
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
  assert.match(
    css,
    /\.experience\s*\{[^}]*padding-top:\s*clamp\(64px,\s*6\.5vw,\s*96px\)/s,
  );
  assert.match(
    css,
    /\.section-head\s*\{[^}]*margin-bottom:\s*clamp\(36px,\s*3\.8vw,\s*60px\)/s,
  );
  assert.match(css, /\.work\s*\{[^}]*background:\s*var\(--white\)/s);
  assert.match(css, /\.contact\s*\{[^}]*background:\s*var\(--ink\)/s);
  assert.match(css, /\.experience-head h2 span\s*\{[^}]*color:\s*var\(--blue\)/s);
  assert.match(css, /\.work-image-preview\s*\{/);
  assert.match(css, /\.work-image-modal\s*\{/);
  assert.doesNotMatch(css, /\.document-cover|\.pdf-modal/);
});

test("keeps the enlarged portrait and omits retired sections", async () => {
  const [html, css] = await Promise.all([
    renderedHtml(),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(html, /id="positioning-title"|id="capabilities"|id="approach"/);
  assert.match(css, /\.hero-portrait\s*\{[^}]*width:\s*clamp\(310px,\s*26vw,\s*430px\)/s);
  assert.match(css, /\.portrait-frame\s*\{[^}]*border-radius:\s*clamp\(/s);
  assert.match(css, /\.portrait-orbit\s*\{[^}]*width:\s*142%/s);
  assert.doesNotMatch(css, /\.hero-index|\.hero-portrait figcaption|\.library-note/);
});

test("keeps scroll feedback while rendering section content immediately", async () => {
  const [html, page, media, css] = await Promise.all([
    renderedHtml(),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/experience-media.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(html, /class="scroll-progress"/);
  assert.match(page, /--scroll-progress/);
  assert.match(page, /requestAnimationFrame/);
  assert.doesNotMatch(page, /root\.classList\.add\("motion-ready"\)/);
  assert.doesNotMatch(page, /document\.querySelectorAll<HTMLElement>\("\[data-reveal\]"\)/);
  assert.match(css, /\.site-header\.is-scrolled/);
  assert.match(css, /\.motion-ready \.experience-row\[data-reveal\]/);
  assert.match(css, /\.verba-cycle-nodes > li:nth-child\(6\)/);
  assert.match(css, /@media \(prefers-reduced-motion:\s*reduce\)/);
  assert.match(media, /intersectionRatio >= 0\.24/);
  assert.match(media, /visibilityObserver\.disconnect\(\)/);
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

test("keeps the design-reference variant isolated and motion-accessible", async () => {
  const [layout, page, media, variant] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/experience-media.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/variant-v2.css", import.meta.url), "utf8"),
  ]);

  assert.match(layout, /import\s+"\.\/variant-v2\.css"/);
  assert.match(variant, /--v2-sans:/);
  assert.match(variant, /--v2-serif:/);
  assert.doesNotMatch(variant, /SFMono|Roboto Mono|monospace/);
  assert.match(variant, /Two-family hierarchy/);
  assert.match(
    variant,
    /\.hero-statement > p\s*\{[^}]*font-size:\s*clamp\(13px,\s*1\.05vw,\s*16px\)/s,
  );
  assert.match(variant, /\.primary-link,[\s\S]*?font-size:\s*10px/);
  assert.match(variant, /\.experience-bullets\s*\{[^}]*font-size:\s*14px/s);
  assert.match(variant, /--v2-name-scale-x:\s*0\.84/);
  assert.match(
    variant,
    /\.hero-name,[\s\S]*?font-size:\s*clamp\(128px,\s*15\.62vw,\s*289px\)/,
  );
  assert.match(variant, /scaleX\(var\(--v2-name-scale-x\)\)/);
  assert.match(variant, /\.site-header\s*\{[^}]*border-radius:\s*14px/s);
  assert.match(variant, /@keyframes v2-name-in/);
  assert.match(variant, /@keyframes v2-portrait-in/);
  assert.doesNotMatch(variant, /Scroll appearance logic/);
  assert.match(variant, /Scrolling content stays immediately readable/);
  assert.match(variant, /\.carousel-controls\s*\{[^}]*display:\s*flex/s);
  assert.match(variant, /\.carousel-controls\s*\{[^}]*border-bottom:\s*1px solid var\(--line\)/s);
  assert.match(variant, /\.carousel-active-title\s*\{/);
  assert.match(media, /className="carousel-controls"[\s\S]*?className="output-stack"/);
  assert.doesNotMatch(media, /className="carousel-caption"/);
  assert.match(variant, /@media \(prefers-reduced-motion:\s*reduce\)/);
  assert.match(page, /--v2-name-shift/);
  assert.match(page, /--v2-hero-fade/);
  assert.match(page, /data-reveal="title"/);
  assert.match(page, /data-reveal="project"/);
  assert.match(page, /data-reveal="media"/);
  assert.match(media, /data-reveal="media"/);
  assert.doesNotMatch(variant, /#[0-9a-f]{3,8}\b/i);
});
