/* Pure aggregation shared by the UI and the audit script. Currency sums use cents. */
(function (root) {
  "use strict";
  const DAY = 86400000;
  const iso = date => date.toISOString().slice(0, 10);
  const date = text => new Date(text + "T00:00:00Z");
  const ratio = (n, d) => d > 0 ? n / d : null;
  function aggregate(rows) {
    let costCents = 0, valueCents = 0, impressions = 0, clicks = 0, conversions = 0;
    for (const row of rows) {
      costCents += Math.round(row.cost * 100);
      valueCents += Math.round(row.value * 100);
      impressions += row.impressions;
      clicks += row.clicks;
      conversions += row.conversions;
    }
    const cost = costCents / 100, value = valueCents / 100;
    return { cost, impressions, clicks, conversions, value, ctr: ratio(clicks, impressions),
      cpc: ratio(cost, clicks), cpm: ratio(cost * 1000, impressions), roas: ratio(value, cost), count: rows.length };
  }
  function matchesPage(row, state) {
    const name = row.campaign.toUpperCase();
    return row.country === state.country && !name.includes("HQ") &&
      (state.channel === "Search" ? name.includes("SEM") : !name.includes("SEM"));
  }
  function periodBefore(start, end) {
    const days = Math.round((date(end) - date(start)) / DAY) + 1;
    return { start: iso(new Date(date(start) - days * DAY)), end: iso(new Date(date(start) - DAY)), days };
  }
  function dateRange(start, end) {
    const result = [];
    for (let t = +date(start); t <= +date(end); t += DAY) result.push(iso(new Date(t)));
    return result;
  }
  function report(rows, state) {
    const page = rows.filter(row => matchesPage(row, state));
    const currentRows = page.filter(row => row.date >= state.start && row.date <= state.end);
    const previous = periodBefore(state.start, state.end);
    const priorRows = page.filter(row => row.date >= previous.start && row.date <= previous.end);
    const available = new Set(priorRows.map(row => row.date));
    const missingDays = dateRange(previous.start, previous.end).filter(day => !available.has(day));
    const selected = row => !state.group || row.group === state.group;
    const current = aggregate(currentRows.filter(selected));
    const prior = aggregate(priorRows.filter(selected));
    const groups = new Map();
    for (const row of currentRows) {
      if (!groups.has(row.group)) groups.set(row.group, []);
      groups.get(row.group).push(row);
    }
    const table = [...groups].map(([group, data]) => ({ group, ...aggregate(data) })).filter(row => row.cost > 0);
    const totals = aggregate(currentRows.filter(row => table.some(item => item.group === row.group)));
    const comparisonAvailable = missingDays.length === 0 && current.count > 0 && prior.count > 0;
    return { current, prior, table, totals, previous, missingDays, comparisonAvailable, currentRows: currentRows.filter(selected) };
  }
  function change(current, previous, available) {
    return available && current !== null && previous !== null && previous !== 0 ? (current - previous) / Math.abs(previous) : null;
  }
  root.AdMetrics = { aggregate, report, periodBefore, change };
})(typeof window !== "undefined" ? window : globalThis);
