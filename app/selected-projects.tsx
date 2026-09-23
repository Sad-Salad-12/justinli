"use client";

import { useRef, useState, type ReactNode } from "react";
import type { Language } from "./portfolio-content";
import "./selected-projects.css";

const features = [
  { id: "wiki", iconX: 748, iconY: 170, en: ["Knowledge Base", "Legal knowledge base", "Contract templates, governance guidance and IP procedures, organized by topic."], zh: ["知识库", "法务知识库", "合同模板、公司治理指引和知识产权流程，按主题分类整理。"] },
  { id: "base", iconX: 748, iconY: 338, en: ["Lark Base", "Compliance task tracker", "Task types, priorities and status views. Linked license and seal requests, plus an assignment reminder workflow."], zh: ["多维表格", "合规任务台账", "任务类型、优先级和状态视图；关联证照印章申请与任务分配提醒流程。"] },
  { id: "updates", iconX: 750, iconY: 503, en: ["Subscriptions", "Compliance channel", "Policy updates, risk reminders and training announcements, with sample posts in English and Chinese."], zh: ["订阅号", "合规订阅号", "发布制度更新、风险提示和培训公告，含中英文示例内容。"] },
] as const;

export function SelectedProjects({ language, basePath = "", children }: { language: Language; basePath?: string; children?: ReactNode }) {
  const [active, setActive] = useState(0);
  const [preview, setPreview] = useState<{ src: string; title: string } | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const dragStart = useRef<number | null>(null);
  const zh = language === "zh", feature = features[active], text = feature[language];
  const path = (file: string) => `${basePath}/works/${file}`;
  const move = (delta: number) => setActive(value => (value + delta + features.length) % features.length);
  const open = (src: string, title: string) => { setPreview({ src, title }); dialog.current?.showModal(); };
  return <>
    <article className="selected-project legal-project">
      <div className="legal-gallery">
        <div className="legal-controls">
          <span>{String(active + 1).padStart(2, "0")} / 03</span>
          <div><button type="button" onClick={() => move(-1)} aria-label={zh ? "上一张" : "Previous card"}>←</button><button type="button" onClick={() => move(1)} aria-label={zh ? "下一张" : "Next card"}>→</button></div>
        </div>
        <div className="legal-stack" onPointerDown={e => { dragStart.current = e.clientX; }} onPointerUp={e => { const distance = e.clientX - (dragStart.current ?? e.clientX); dragStart.current = null; if (Math.abs(distance) > 45) move(distance < 0 ? 1 : -1); }} onPointerCancel={() => { dragStart.current = null; }}>
          {features.map((item, index) => {
            const position = (index - active + features.length) % features.length;
            const src = path(`legal/${item.id}-${language}.png`);
            return <div key={item.id} className="legal-card" data-position={position} aria-hidden={position !== 0}>
              {/* User-provided screenshots are shown whole, without fabricated interface content. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`${item[language][0]} — ${zh ? "法务系统 mock" : "legal system mock"}`} draggable={false} />
              <button type="button" tabIndex={position === 0 ? 0 : -1} onClick={() => open(src, item[language][1])}>{zh ? "查看完整截图" : "View full screenshot"} ↗</button>
            </div>;
          })}
        </div>
      </div>
      <div className="selected-project-copy">
        <h3>{zh ? "法务与合规协作系统" : "Legal & compliance workspace"}</h3>
        <p>{zh ? "用飞书搭建的公司法务系统 mock：知识库、合规任务台账和订阅号。" : "Mock company legal system built in Lark: knowledge base, compliance task tracker and subscription channel."}</p>
        <div className="legal-feature" key={feature.id} aria-live="polite">
          <div className="legal-feature-brand"><span className="legal-feature-icon" role="img" aria-label={text[0]} style={{ backgroundImage: `url("${path("legal/reference.png")}")`, backgroundPosition: `-${feature.iconX * .8}px -${feature.iconY * .8}px` }} /><span>{text[0]}</span></div>
          <h4>{text[1]}</h4><p>{text[2]}</p>
        </div>
      </div>
    </article>
    {children}
    <article className="selected-project tableau-project">
      <button className="tableau-preview" type="button" onClick={() => open(path("tableau-supplier.png"), zh ? "供应商分析看板" : "Supplier dashboard")} aria-label={zh ? "查看完整 Tableau 看板" : "View full Tableau dashboard"}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={path("tableau-supplier.png")} alt={zh ? "Tableau 供应商看板：销售额、月度趋势、订单国家分布和供应商地理分布" : "Tableau supplier dashboard: sales, monthly trends, order geography and supplier footprint"} loading="lazy" />
        <span>{zh ? "查看完整看板" : "View full dashboard"} ↗</span>
      </button>
      <div className="selected-project-copy"><h3>{zh ? "供应商看板" : "Supplier dashboard"}</h3><p>{zh ? "Data Science 课程作业，Tableau 看板：供应商销售额、月度销售、订单国家分布、供应商地理分布与平均建议零售价。" : "Tableau dashboard for a Data Science course: supplier revenue, monthly sales, order geography, supplier locations and average MSRP."}</p><p className="selected-project-note">{zh ? "课程作业 · 静态图片" : "Coursework · static image"}</p></div>
    </article>
    <dialog ref={dialog} className="selected-preview-dialog" onClick={event => { if(event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className="selected-preview-toolbar"><strong>{preview?.title}</strong><button type="button" onClick={() => dialog.current?.close()} aria-label={zh ? "关闭图片" : "Close image"}>×</button></div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {preview && <img src={preview.src} alt={preview.title} />}
    </dialog>
  </>;
}
