(function () {
  "use strict";
  const $ = selector => document.querySelector(selector);
  const rows = window.AD_DATA;
  const tr = window.DemoText;
  const groupText = value => tr(value.replace(/^产品/, "Product "), value);
  const { report, change } = window.AdMetrics;
  const defaults = { country: "IT", channel: "Search", start: "2026-10-12", end: "2026-10-18", group: null, sort: "cost", direction: "desc" };
  const state = { ...defaults };
  const metrics = [
    { key: "cost", label: "Cost", kind: "currency", family: "traffic" },
    { key: "impressions", label: "Impr.", kind: "integer", family: "traffic" },
    { key: "clicks", label: "Clicks", kind: "integer", family: "traffic" },
    { key: "cpm", label: "CPM", kind: "currency", family: "traffic" },
    { key: "cpc", label: "CPC", kind: "currency", family: "traffic" },
    { key: "ctr", label: "CTR", kind: "percent", family: "conversion" },
    { key: "conversions", label: tr("Conversions", "转化次数"), kind: "integer", family: "conversion" },
    { key: "value", label: tr("Conv. value", "转化价值"), kind: "decimal", family: "conversion" },
    { key: "roas", label: "ROAS", kind: "decimal", family: "conversion" }
  ];
  const cards = [metrics[0], metrics[2], metrics[5], metrics[6], { ...metrics[7], label: "Conversion Value" }, metrics[8]];
  const nf = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
  const integers = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
  const escape = text => String(text).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  const format = (value, kind) => value === null || !Number.isFinite(value) ? "—" : kind === "integer" ? integers.format(value) : kind === "percent" ? nf.format(value * 100) + "%" : (kind === "currency" ? "$" : "") + nf.format(value);
  const shortDate = value => value.replaceAll("-", "/");
  let result;

  function renderNavigation() {
    const names = { FR: tr("France", "法国"), IT: tr("Italy", "意大利"), UK: tr("United Kingdom", "英国") };
    $("#portfolio-country").value = state.country;
    $("#portfolio-channel").value = state.channel;
    $("#report-nav").innerHTML = ["FR", "IT", "UK"].map(country => `<div class="nav-section">${names[country]} / ${country}</div>` + ["PMax", "Search"].map(channel => `<button class="nav-item" data-country="${country}" data-channel="${channel}" ${state.country === country && state.channel === channel ? 'aria-current="page"' : ""}><span class="nav-country">${country}</span><span>${channel === "PMax" ? "P-Max" : "Search"} Overview<span class="nav-subtitle">Brand &amp; Product</span></span></button>`).join("")).join("");
  }
  function deltaText(delta) {
    if (delta === null) return '<span class="kpi-delta neutral">—</span>';
    const sign = delta > 0.00005 ? "up" : delta < -0.00005 ? "down" : "neutral";
    const arrow = sign === "up" ? "↑" : sign === "down" ? "↓" : "";
    return `<span class="kpi-delta ${sign}" aria-label="${tr("Change vs previous period", "较上期变化")} ${delta >= 0 ? '+' : ''}${(delta * 100).toFixed(1)}%"><span class="delta-arrow" aria-hidden="true">${arrow}</span>${delta > 0 ? "+" : ""}${(delta * 100).toFixed(1)}%</span>`;
  }
  function heat(value, min, max, family) {
    if (value === null) return "";
    const amount = max > min ? (value - min) / (max - min) : 0;
    const low = family === "traffic" ? [247, 248, 252] : [255, 248, 244];
    const high = family === "traffic" ? [56, 91, 190] : [243, 103, 50];
    const rgb = low.map((n, i) => Math.round(n + (high[i] - n) * amount));
    const color = "#" + rgb.map(n => n.toString(16).padStart(2, "0")).join("");
    const linear = rgb.map(value => value / 255).map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
    const luminance = linear[0] * .2126 + linear[1] * .7152 + linear[2] * .0722;
    const textColor = 1.05 / (luminance + .05) > (luminance + .05) / .05 ? "#ffffff" : "#000000";
    return `background:${color};color:${textColor}`;
  }
  function renderTable() {
    const table = [...result.table].sort((a, b) => {
      const comparison = state.sort === "group" ? a.group.localeCompare(b.group) : (a[state.sort] ?? -Infinity) - (b[state.sort] ?? -Infinity);
      return (state.direction === "asc" ? comparison : -comparison) || a.group.localeCompare(b.group);
    });
    const columns = [{ key: "group", label: tr("Product", "广告组") }, ...metrics];
    $("thead").innerHTML = "<tr>" + columns.map(col => `<th scope="col"${state.sort === col.key ? ' aria-sort="' + (state.direction === "asc" ? "ascending" : "descending") + '"' : ""}><button data-sort="${col.key}" aria-label="${tr("Sort by", "排序")} ${col.label}">${col.label}<span class="sort-arrow" aria-hidden="true">${state.sort === col.key ? state.direction === "asc" ? "▴" : "▾" : ""}</span></button></th>`).join("") + "</tr>";
    const bounds = Object.fromEntries(metrics.map(metric => {
      const vals = table.map(row => row[metric.key]).filter(value => value !== null);
      return [metric.key, [Math.min(...vals), Math.max(...vals)]];
    }));
    $("tbody").innerHTML = table.map((row, index) => `<tr data-group="${escape(row.group)}" class="${state.group === row.group ? "selected" : state.group ? "unselected" : ""}"><td><button class="row-button" aria-pressed="${state.group === row.group}" title="${tr("Filter", "筛选")} ${escape(groupText(row.group))}"><span class="row-number">${index + 1}.</span><span class="row-name">${escape(groupText(row.group))}</span></button></td>${metrics.map(metric => `<td style="${heat(row[metric.key], ...bounds[metric.key], metric.family)}">${format(row[metric.key], metric.kind)}</td>`).join("")}</tr>`).join("");
    $("tfoot").innerHTML = table.length ? `<tr><td>${tr("All products", "全部广告组合计")}</td>${metrics.map(metric => `<td>${format(result.totals[metric.key], metric.kind)}</td>`).join("")}</tr>` : "";
    $("#empty-state").hidden = table.length > 0;
    $("#table-count").textContent = table.length ? `1 – ${table.length} / ${table.length}` : "0 / 0";
    $("#export-csv").disabled = table.length === 0;
  }
  function render() {
    result = report(rows, state);
    const prefix = state.channel === "Search" ? "SEM" : "PMax";
    $("#overview-title").textContent = `${prefix}-DTC-Brand & Product Overall`;
    $("#detail-title").textContent = `${prefix}-DTC-Brand & Product By Product`;
    $("#breadcrumb").textContent = `${state.country} / ${state.channel} / Brand & Product`;
    document.title = `${state.country} ${state.channel} · ${tr("Advertising dashboard demo", "广告投放分析（模拟）")}`;
    $("#date-label").textContent = `${shortDate(state.start)} – ${shortDate(state.end)}`;
    $("#kpi-band").innerHTML = cards.map(metric => `<div class="kpi-card" data-metric="${metric.key}"><span class="kpi-label">${metric.label}</span><span class="kpi-number">${format(result.current[metric.key], metric.kind)}</span>${deltaText(change(result.current[metric.key], result.prior[metric.key], result.comparisonAvailable))}</div>`).join("");
    $("#comparison-note").innerHTML = `<span>${tr("vs", "对比")} ${shortDate(result.previous.start)} – ${shortDate(result.previous.end)}</span>` + (result.missingDays.length ? `<span class="incomplete">${tr(`Missing ${result.missingDays.length} prior days; change unavailable`, `上期缺少 ${result.missingDays.length} 天数据，变化率未计算`)}</span>` : result.prior.count === 0 ? `<span class="incomplete">${tr('No prior records; change unavailable', '上期无记录，变化率未计算')}</span>` : "");
    $("#group-filter").hidden = !state.group;
    $("#clear-group").textContent = state.group ? `${groupText(state.group)} ×` : "";
    $("#clear-group").setAttribute("aria-label", `${tr("Clear product filter", "清除广告组筛选")} ${state.group || ""}`);
    $("#scope-note").textContent = `${state.country} · ${state.channel} · ${state.group ? groupText(state.group) : tr("All products", "全部广告组")} · ${result.current.count} ${tr("daily records", "条日明细")}`;
    renderTable();
  }
  function setPeriod(start, end) {
    $("#date-start").value = start;
    $("#date-end").value = end;
    $("#date-error").textContent = "";
  }
  function closeDates(focus = true) {
    $("#date-popover").hidden = true;
    $("#date-open").setAttribute("aria-expanded", "false");
    if (focus) $("#date-open").focus();
  }
  $("#report-nav").addEventListener("click", event => {
    const button = event.target.closest("[data-country]");
    if (!button) return;
    state.country = button.dataset.country;
    state.channel = button.dataset.channel;
    state.group = null;
    state.sort = "cost";
    state.direction = "desc";
    renderNavigation();
    render();
    $("#sidebar").classList.remove("open");
    $("#menu-toggle").setAttribute("aria-expanded", "false");
    if (getComputedStyle($("#sidebar")).display !== "none") $("#report-nav").querySelector('[aria-current="page"]').focus({ preventScroll: true });
  });
  $("#adgroup-table").addEventListener("click", event => {
    const sort = event.target.closest("[data-sort]");
    if (sort) {
      state.direction = state.sort === sort.dataset.sort && state.direction === "desc" ? "asc" : "desc";
      state.sort = sort.dataset.sort;
      renderTable();
      $("thead").querySelector(`[data-sort="${state.sort}"]`).focus();
      return;
    }
    const row = event.target.closest("tbody tr[data-group]");
    if (!row) return;
    state.group = state.group === row.dataset.group ? null : row.dataset.group;
    const focusedGroup = row.dataset.group;
    render();
    const selectedRow = [...document.querySelectorAll("tbody tr")].find(row => row.dataset.group === focusedGroup);
    if (selectedRow) selectedRow.querySelector("button").focus({ preventScroll: true });
    $("#announcement").textContent = state.group ? tr(`Filtered to ${groupText(state.group)}; six KPIs updated`, `已筛选广告组 ${state.group}，上方六项指标已更新`) : tr("Product filter cleared", "已清除广告组筛选");
  });
  $("#clear-group").addEventListener("click", () => { state.group = null; render(); $("#date-open").focus(); });
  $("#reset").addEventListener("click", () => {
    Object.assign(state, { start: defaults.start, end: defaults.end, group: null, sort: "cost", direction: "desc" });
    closeDates(false);
    render();
    $("#announcement").textContent = tr("Default filters restored for this report", "已恢复当前报表页的默认筛选");
  });
  $("#date-open").addEventListener("click", () => {
    const open = $("#date-popover").hidden;
    $("#date-popover").hidden = !open;
    $("#date-open").setAttribute("aria-expanded", String(open));
    if (open) { setPeriod(state.start, state.end); $("#date-start").focus(); }
  });
  $("#date-cancel").addEventListener("click", () => closeDates());
  $(".date-presets").addEventListener("click", event => {
    const preset = event.target.closest("[data-period]")?.dataset.period;
    if (preset === "last-week") setPeriod(defaults.start, defaults.end);
    if (preset === "previous-week") setPeriod("2026-10-05", "2026-10-11");
    if (preset === "all") setPeriod("2026-10-05", "2026-10-18");
  });
  $("#date-apply").addEventListener("click", () => {
    const start = $("#date-start").value, end = $("#date-end").value;
    if (!start || !end || start > end || start < "2026-10-05" || end > "2026-10-18") {
      $("#date-error").textContent = tr("Choose a valid range within Oct 5–18, 2026. End must follow start.", "请选择 2026/10/05—10/18 内的有效日期，结束日期不能早于开始日期。");
      return;
    }
    state.start = start; state.end = end;
    closeDates(); render();
  });
  document.addEventListener("click", event => { if (!event.target.closest(".date-control")) closeDates(false); });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !$("#date-popover").hidden) closeDates();
  });
  $("#menu-toggle").addEventListener("click", () => {
    const open = $("#sidebar").classList.toggle("open");
    $("#menu-toggle").setAttribute("aria-expanded", String(open));
  });
  $("#source-open").addEventListener("click", () => $("#source-dialog").showModal());
  $("#source-close").addEventListener("click", () => $("#source-dialog").close());
  $("#export-csv").addEventListener("click", () => {
    const table = [...result.table].filter(row => !state.group || state.group === row.group).sort((a,b) => b.cost-a.cost);
    const csvCell = value => '"' + String(value ?? "").replaceAll('"', '""') + '"';
    const csv = [[tr("Product", "广告组"), ...metrics.map(metric => metric.label)], ...table.map(row => [groupText(row.group), ...metrics.map(metric => row[metric.key])])].map(row => row.map(csvCell).join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url; anchor.download = `SIMULATED-${state.country}-${state.channel}-${state.start}-${state.end}.csv`;
    anchor.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
  $("#portfolio-country").addEventListener("change", event => {
    $("#report-nav").querySelector(`[data-country="${event.target.value}"][data-channel="${state.channel}"]`).click();
  });
  $("#portfolio-channel").addEventListener("change", event => {
    $("#report-nav").querySelector(`[data-country="${state.country}"][data-channel="${event.target.value}"]`).click();
  });
  renderNavigation(); render();
})();
