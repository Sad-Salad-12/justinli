import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import vm from "node:vm";
import test from "node:test";

const demo = new URL("../out/works/ad-performance-demo/", import.meta.url);

test("publishes the interactive ad dashboard first in Other works, with portable assets", async () => {
  const html = await readFile(new URL("../out/index.html", import.meta.url), "utf8");
  const work = html.slice(html.indexOf('id="work"'));
  const advertising = work.indexOf('id="advertising-dashboard"');
  const legal = work.indexOf('id="legal-workspace"');
  const stills = work.indexOf('id="rd-dashboard"');
  assert.ok(advertising >= 0 && legal > advertising && stills > legal);
  assert.match(work, /src="\/justinli\/works\/ad-performance-demo\/index\.html\?lang=en&amp;v=4"/);
  const index = await readFile(new URL("index.html", demo), "utf8");
  assert.doesNotMatch(index, /https?:\/\/|localhost|127\.0\.0\.1/);
  // The demo sets its own sans type; it no longer inherits the page serif.
  assert.doesNotMatch(index, /typeface\.css/);
  for (const match of index.matchAll(/(?:src|href)="([^"#]+)"/g)) await access(new URL(match[1], demo));
});

test("the shipped demo reconciles filters against its anonymous synthetic source", async () => {
  const context = vm.createContext({ window: {} });
  vm.runInContext(await readFile(new URL("data.js", demo), "utf8"), context);
  vm.runInContext(await readFile(new URL("metrics.js", demo), "utf8"), context);
  const { AD_DATA: rows, AdMetrics: metrics } = context.window;
  assert.equal(rows.length, 1092);
  assert.ok(rows.every(row => /^产品\d{2}$/.test(row.group)));
  const state = { country: "IT", channel: "Search", start: "2026-10-12", end: "2026-10-18", group: null };
  const result = metrics.report(rows, state);
  assert.equal(result.current.cost, 6186.09);
  assert.equal(result.current.clicks, 4971);
  assert.equal(result.table.length, 13);
  assert.equal(metrics.report(rows, { ...state, group: "产品01" }).current.cost, 316.21);
  for (const country of ["FR", "IT", "UK"]) for (const channel of ["Search", "PMax"]) {
    const current = metrics.report(rows, { ...state, country, channel }).current;
    assert.equal(current.count, 91);
    assert.ok(current.cost > 0 && current.clicks > 0);
  }
});
