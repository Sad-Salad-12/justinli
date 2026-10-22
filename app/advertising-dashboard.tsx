"use client";

import type { Language } from "./portfolio-content";

export function AdvertisingDashboard({ language, basePath }: { language: Language; basePath: string }) {
  const zh = language === "zh";
  return (
    <article className="selected-project advertising-project" id="advertising-dashboard">
      <div className="advertising-demo">
        <div className="advertising-demo-caption">
          <span>{zh ? "交互演示" : "Interactive demo"}</span>
          <span>{zh ? "拖动或滚动探索 ↓" : "Drag or scroll to explore ↓"}</span>
        </div>
        <iframe
          key={language}
          src={`${basePath}/works/ad-performance-demo/index.html?lang=${language}`}
          title={zh ? "广告投放交互看板：切换国家、投放类型和日期，滚动查看产品明细" : "Interactive advertising dashboard: filter by country, campaign and date, then scroll through product performance"}
          loading="lazy"
          tabIndex={0}
        />
      </div>
      <div className="selected-project-copy">
        <h3>{zh ? "广告投放分析看板" : "Advertising performance dashboard"}</h3>
        <p>{zh ? "将 Looker Studio 广告报表复刻为飞书妙搭应用。切换国家与投放类型，对比周期表现，点击广告组联动六项指标。" : "A Looker Studio advertising report recreated as a Lark Miaoda app. Switch markets and campaigns, compare periods, and select a product to update all six KPIs."}</p>
        <p className="selected-project-note">{zh ? "法国、意大利、英国 · Search / P-Max · 脱敏模拟数据" : "France, Italy, United Kingdom · Search / P-Max · Anonymous sample data"}</p>
      </div>
    </article>
  );
}
