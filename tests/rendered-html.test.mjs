import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

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
  assert.match(html, /src="\/justin-shanghai-portrait\.jpg"/);
  assert.match(html, /href="\/works\/solution-blueprint-sample\.pdf"/);
  assert.doesNotMatch(html, /01 — POSITIONING|BUILT FOR AMBIGUITY|Built in ambiguity/);
  assert.doesNotMatch(html, /class="positioning"/);
  assert.doesNotMatch(html, /\/justinli\//);
});

test("keeps bilingual content and hosted assets wired correctly", async () => {
  const [page, content, layout, packageJson, nextConfig] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/portfolio-content.ts", import.meta.url), "utf8"),
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
  assert.doesNotMatch(content, /Built in ambiguity|BUILT FOR AMBIGUITY/);
  assert.match(layout, /justin\.zl5626\.chatgpt\.site/);
  assert.match(layout, /next\/headers|generateMetadata/);
  assert.match(packageJson, /"build":\s*"[^"]*vinext build"/);
  assert.doesNotMatch(nextConfig, /output:\s*"export"|basePath/);
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
