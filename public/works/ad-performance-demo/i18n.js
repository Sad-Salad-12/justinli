(() => {
  const zh = new URLSearchParams(location.search).get("lang") === "zh";
  window.DemoText = (en, cn) => zh ? cn : en;
  document.documentElement.lang = zh ? "zh-CN" : "en";
  const tr = window.DemoText;
  const text = (selector, value) => {
    const element = document.querySelector(selector);
    const node = [...element.childNodes].find(child => child.nodeType === Node.TEXT_NODE && child.textContent.trim());
    if (node) node.textContent = value;
    else element.textContent = value;
  };
  [
    [".app-title", tr("Advertising performance", "广告投放分析")],
    [".demo-badge", tr("Sample data", "模拟数据")],
    ["#source-open", tr("Data & metrics", "数据与口径")],
    [".nav-caption", tr("PERFORMANCE", "投放总览")],
    [".report-context > span:last-child", tr("USD · Synthetic data", "USD · 模拟测试数据")],
    ["#group-filter > span", tr("Product", "广告组")],
    [".popover-heading", tr("Date range", "日期范围")],
    ["[data-period='last-week']", tr("Oct 12–18", "10/12—10/18")],
    ["[data-period='previous-week']", tr("Oct 5–11", "10/05—10/11")],
    ["[data-period='all']", tr("All 14 days", "全部14天")],
    [".date-fields label:first-child", tr("Start", "开始日期")],
    [".date-fields label:last-child", tr("End", "结束日期")],
    [".date-hint", tr("Compared with the previous equal-length period. Sample data covers Oct 5–18.", "与前一个等长周期比较，模拟数据覆盖10/05—10/18。")],
    ["#date-cancel", tr("Cancel", "取消")],
    ["#date-apply", tr("Apply", "应用")],
    [".table-footer > span:first-child", tr("Select a product to filter the six KPIs; select again to clear.", "点击广告组联动上方指标；再次点击取消")],
    [".heatmap-legend > span:first-child", tr("Darker = higher within each column", "列内色深表示数值大小")],
    [".heatmap-legend > span:nth-child(2)", tr("Spend & traffic", "投入与流量")],
    [".heatmap-legend > span:nth-child(3)", tr("Conversion", "转化表现")],
    [".canvas-footer > span:last-child", tr("Sample snapshot · Not live data", "模拟数据快照 · 非实时数据")],
    ["#empty-state", tr("No products in this range. Change the dates or reset.", "当前范围没有广告组，请调整日期或点击Reset。")],
    ["#country-label", tr("Country", "国家")],
    ["#channel-label", tr("Campaign", "投放类型")],
    ["#portfolio-country option[value='FR']", tr("France · FR", "法国 · FR")],
    ["#portfolio-country option[value='IT']", tr("Italy · IT", "意大利 · IT")],
    ["#portfolio-country option[value='UK']", tr("United Kingdom · UK", "英国 · UK")],
  ].forEach(([selector, value]) => text(selector, value));
  document.querySelector(".sidebar-footer").innerHTML = `<span class="status-dot"></span>${tr("Sample data", "模拟数据快照")}<br><span>2026.10.05 — 10.18 · USD</span>`;
  document.querySelector("#reset").title = tr("Restore this report's default dates, product and sort", "恢复当前报表页的默认日期、广告组和排序");
  document.querySelector("#export-csv").title = tr("Export the current summary", "导出当前汇总");
  document.querySelector("#report-nav").setAttribute("aria-label", tr("Country and campaign", "国家与投放类型"));
  document.querySelector("#date-popover").setAttribute("aria-label", tr("Choose a date range", "选择日期范围"));
  document.querySelector(".table-scroll").setAttribute("aria-label", tr("Product heatmap; scroll horizontally for all metrics", "产品热力明细，可横向滚动查看全部指标"));
  document.querySelector("#source-dialog").innerHTML = `
    <div class="dialog-heading"><h2 id="source-title">${tr("Demo data & metrics", "模拟数据与计算口径")}</h2><button class="icon-button" id="source-close" aria-label="${tr("Close data notes", "关闭数据说明")}">×</button></div>
    <p class="notice">${tr("All figures are synthetic, created for this demo. They do not represent any real business or brand.", "所有数字均为编撰的测试数据，不代表任何真实企业或品牌的经营表现。")}</p>
    <dl class="source-facts"><dt>${tr("Dataset", "数据规模")}</dt><dd>${tr("1,092 records · 14 days · 3 countries · 2 campaign types · 13 products", "1,092条 · 14天 · 3个国家 · 2类投放 · 13个广告组")}</dd><dt>${tr("Grain", "明细粒度")}</dt><dd>${tr("Date × country × campaign type × product", "日期 × 国家 × 投放类型 × 广告组")}</dd><dt>${tr("Dates", "可用日期")}</dt><dd>2026-10-05 — 2026-10-18</dd><dt>${tr("Currency", "货币")}</dt><dd>USD</dd><dt>${tr("Connection", "数据连接")}</dt><dd>${tr("An embedded sample snapshot. No live advertising or Lark connection is required.", "内置模拟数据快照，演示无需连接真实广告账户或登录飞书。")}</dd></dl>
    <div class="formula-grid"><div><strong>CTR</strong><span>Σ Clicks ÷ Σ Impr.</span></div><div><strong>ROAS</strong><span>Σ Conversion Value ÷ Σ Cost</span></div><div><strong>CPC</strong><span>Σ Cost ÷ Σ Clicks</span></div><div><strong>CPM</strong><span>1,000 × Σ Cost ÷ Σ Impr.</span></div></div>
    <p>${tr("Ratios use the sum of their inputs. Missing prior periods or zero denominators show —. Heatmap colors show relative values within a column, not good or bad outcomes.", "比率先汇总分子与分母再计算；上期缺数据或分母为零时显示—。热力颜色按每列独立归一化，仅代表数值大小，不代表好坏。")}</p>`;
})();
