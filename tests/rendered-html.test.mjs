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

test("server-renders English as the default portfolio language", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="en"/i);
  assert.match(html, /<title>Justin — Solutions Architect &amp; FDE<\/title>/i);
  assert.match(html, /FORWARD DEPLOYED ENGINEER/);
  assert.match(html, /Complex systems/);
  assert.match(html, /SELECTED WORK/);
  assert.match(html, /WORK EXPERIENCE/);
  assert.match(html, /AI Advertisement Report Automation/);
  assert.match(html, /Verba — Internal AI Sales Agent/);
  assert.match(html, /justin-shanghai-portrait\.jpg/);
  assert.match(html, /Preview online/);
  assert.match(html, /English/);
  assert.match(html, /简体中文/);
  assert.match(html, /YOUR EMAIL HERE/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/);
});

test("keeps bilingual content and PDF work samples wired correctly", async () => {
  const [page, content, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/portfolio-content.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
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
  assert.match(page, /download/);
  assert.match(page, /portfolio-language/);
  assert.match(page, /setLanguage\("en"\)/);
  assert.match(page, /setLanguage\("zh"\)/);
  assert.match(page, /href="#experience"/);
  await access(new URL("../public/justin-shanghai-portrait.jpg", import.meta.url));
  assert.match(content, /把复杂的系统/);
  assert.match(content, /解决方案架构师/);
  assert.match(content, /人工智能广告报告自动化/);
  assert.match(content, /运行 300 多次/);
  assert.match(layout, /lang="en"/);
  assert.match(layout, /justin\.zl5626\.chatgpt\.site/);
  assert.doesNotMatch(layout, /justin-solutions-fde\.zl5626\.chatgpt\.site/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});

test("keeps every main section white except the final contact section", async () => {
  const css = await readFile(
    new URL("../app/globals.css", import.meta.url),
    "utf8",
  );

  assert.match(css, /\.capabilities\s*\{[^}]*background:\s*var\(--white\)/s);
  assert.match(css, /\.experience\s*\{[^}]*background:\s*var\(--white\)/s);
  assert.match(css, /\.work\s*\{[^}]*background:\s*var\(--white\)/s);
  assert.match(css, /\.approach\s*\{[^}]*background:\s*var\(--white\)/s);
  assert.match(css, /\.contact\s*\{[^}]*background:\s*var\(--ink\)/s);
});

test("keeps the PDF library note below the selected work headline", async () => {
  const css = await readFile(
    new URL("../app/globals.css", import.meta.url),
    "utf8",
  );

  assert.match(css, /\.library-note\s*\{[^}]*grid-column:\s*2\s*\/\s*3/s);
  assert.doesNotMatch(css, /\.library-note\s*\{[^}]*margin-top:\s*-/s);
});
