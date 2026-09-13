"use client";

import { useRef, useState } from "react";
import type { Language } from "./portfolio-content";
import "./selected-projects.css";

const features = [
  { id: "wiki", iconY: 151, en: ["Knowledge Base", "A shared legal reference", "Organized contract templates, governance guidance and intellectual property procedures in a navigable knowledge space. The mock shows how teams can find the right document before starting a task."], zh: ["知识库", "让法务知识有统一入口", "把合同模板、公司治理和知识产权流程整理进分层知识库。通过清晰目录连接制度与操作指引，让团队在开展任务前找到对应资料。"] },
  { id: "base", iconY: 317, en: ["Base", "From policy to assigned work", "Built a compliance task tracker with task types, priorities and status views. Related license and seal requests and an assignment reminder workflow bring operational follow-up into the same workspace."], zh: ["多维表格", "把制度落实为可跟进的任务", "搭建合规任务台账，按任务类型、优先级和状态组织工作，并关联证照印章申请及任务分配提醒流程，让制度落地有记录、可跟进。"] },
  { id: "updates", iconY: 488, en: ["Subscriptions", "Bring compliance into the daily feed", "Created a compliance subscription channel for policy updates, risk reminders and training announcements. Bilingual sample posts show how legal information can reach colleagues in their regular workflow."], zh: ["订阅号", "让合规信息进入日常工作", "搭建合规订阅号，集中发布制度更新、风险提示和培训公告。通过中英文示例内容，把法务信息送到同事日常使用的工作入口。"] },
] as const;

export function SelectedProjects({ language, basePath = "" }: { language: Language; basePath?: string }) {
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
        <p className="selected-project-label">02 / {zh ? "飞书 · 系统 MOCK" : "FEISHU · SYSTEM MOCK"}</p>
        <h3>{zh ? "法务与合规协作系统" : "Legal & compliance workspace"}</h3>
        <p>{zh ? "用飞书连接知识沉淀、任务管理与信息触达的公司法务系统 mock。" : "A company legal-system mock connecting shared knowledge, task management and compliance communications in Feishu."}</p>
        <div className="legal-feature" key={feature.id} aria-live="polite">
          <div className="legal-feature-brand"><span className="legal-feature-icon" role="img" aria-label={text[0]} style={{ backgroundImage: `url("${path("legal/reference.png")}")`, backgroundPosition: `-464px -${feature.iconY * .64}px` }} /><span>{text[0]}</span></div>
          <h4>{text[1]}</h4><p>{text[2]}</p>
        </div>
      </div>
    </article>
    <article className="selected-project tableau-project">
      <button className="tableau-preview" type="button" onClick={() => open(path("tableau-supplier.png"), zh ? "供应商分析看板" : "Supplier dashboard")} aria-label={zh ? "查看完整 Tableau 看板" : "View full Tableau dashboard"}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={path("tableau-supplier.png")} alt={zh ? "Tableau 供应商看板：销售额、月度趋势、订单国家分布和供应商地理分布" : "Tableau supplier dashboard: sales, monthly trends, order geography and supplier footprint"} loading="lazy" />
        <span>{zh ? "查看完整看板" : "View full dashboard"} ↗</span>
      </button>
      <div className="selected-project-copy"><p className="selected-project-label">03 / TABLEAU · {zh ? "课程项目" : "COURSE PROJECT"}</p><h3>{zh ? "供应商数据，一览全局。" : "A closer look at supplier performance."}</h3><p>{zh ? "在 Data Science 课程中制作的 Tableau 静态看板，将供应商销售额、月度销售趋势、订单国家分布、地理覆盖与建议零售价汇集在同一视图。" : "A static Tableau dashboard built for my Data Science course, bringing together supplier revenue, monthly sales, order geography, geographic footprint and average MSRP."}</p><p className="selected-project-note">{zh ? "静态课程看板 · 点击查看原图" : "Static coursework dashboard · Open the original image"}</p></div>
    </article>
    <dialog ref={dialog} className="selected-preview-dialog" onClick={event => { if(event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className="selected-preview-toolbar"><strong>{preview?.title}</strong><button type="button" onClick={() => dialog.current?.close()} aria-label={zh ? "关闭图片" : "Close image"}>×</button></div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {preview && <img src={preview.src} alt={preview.title} />}
    </dialog>
  </>;
}
