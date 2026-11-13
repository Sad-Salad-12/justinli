"use client";

import type { Language } from "./portfolio-content";
import { useRef, useState } from "react";

export function AdvertisingDashboard({ language, basePath }: { language: Language; basePath: string }) {
  const zh = language === "zh";
  const frame = useRef<HTMLIFrameElement>(null);
  const [country, setCountry] = useState("IT");
  const [channel, setChannel] = useState("Search");
  const updateReport = (nextCountry: string, nextChannel: string) => {
    setCountry(nextCountry);
    setChannel(nextChannel);
    frame.current?.contentWindow?.postMessage({ type: "ad-demo:set-report", country: nextCountry, channel: nextChannel }, window.location.origin);
  };
  const countries = [{ code: "FR", label: zh ? "法国" : "France" }, { code: "IT", label: zh ? "意大利" : "Italy" }, { code: "UK", label: zh ? "英国" : "UK" }];
  return (
    <article className="selected-project advertising-project" id="advertising-dashboard">
      <div className="advertising-demo">
        <iframe
          ref={frame}
          key={language}
          src={`${basePath}/works/ad-performance-demo/index.html?lang=${language}&v=3`}
          title={zh ? "广告投放交互看板：切换国家、投放类型和日期，滚动查看产品明细" : "Interactive advertising dashboard: filter by country, campaign and date, then scroll through product performance"}
          loading="lazy"
          tabIndex={0}
          onLoad={() => updateReport(country, channel)}
        />
      </div>
      <div className="selected-project-copy">
        <h3>{zh ? "广告投放分析看板" : "Advertising performance dashboard"}</h3>
        <p>{zh ? "使用模拟数据，将 Looker Studio 广告报表复刻为飞书妙搭应用。切换国家与投放类型，对比周期表现，点击广告组联动六项指标。" : "A Looker Studio advertising report recreated in Lark Miaoda with sample data. Switch markets and campaigns, compare periods, and select a product to update all six KPIs."}</p>
        <div className="advertising-controls">
          <fieldset><legend>{zh ? "国家" : "Country"}</legend><div className="advertising-options">
            {countries.map(item => <button type="button" key={item.code} aria-pressed={country === item.code} onClick={() => updateReport(item.code, channel)}>{item.label}</button>)}
          </div></fieldset>
          <fieldset><legend>{zh ? "投放类型" : "Campaign"}</legend><div className="advertising-options">
            {["Search", "PMax"].map(item => <button type="button" key={item} aria-pressed={channel === item} onClick={() => updateReport(country, item)}>{item === "PMax" ? "P-Max" : "Search"}</button>)}
          </div></fieldset>
        </div>
      </div>
    </article>
  );
}
