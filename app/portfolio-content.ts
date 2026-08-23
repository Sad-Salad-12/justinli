export type Language = "en" | "zh";

export type LocalizedWork = {
  type: string;
  title: string;
  coverTitle: string;
  summary: string;
  role: string;
  deliverable: string;
};

export type LocalizedExperience = {
  number: string;
  eyebrow: string;
  title: string;
  meta?: string;
  media: "ad-report" | "verba-placeholder";
  bullets: string[];
  metrics: Array<{
    value: string;
    label: string;
  }>;
};

export type LocalizedExperienceMedia = {
  demoLabel: string;
  demoCaption: string;
  outputsLabel: string;
  interactionHint: string;
  carouselLabel: string;
  previousSlide: string;
  nextSlide: string;
  openFullscreen: string;
  closeFullscreen: string;
  fullscreenLabel: string;
  pendingLabel: string;
  pendingHeadline: string;
  pendingBody: string;
  slides: Array<{
    title: string;
    alt: string;
  }>;
};

type PortfolioContent = {
  meta: {
    title: string;
    description: string;
  };
  identity: {
    name: string;
    heroName: string;
    email: string;
    phone: string;
    phoneHref: string;
    location: string;
  };
  a11y: {
    mainNavigation: string;
    pageNavigation: string;
    backToTop: string;
    languageSelector: string;
    portraitAlt: string;
    previewWork: (title: string) => string;
    closePdf: string;
    pdfPreview: (title: string) => string;
  };
  nav: {
    experience: string;
    work: string;
    contact: string;
  };
  hero: {
    disciplines: string[];
    headline: string;
    headlineAccent: string;
    bodyLineOne: string;
    bodyLineTwo: string;
    primaryAction: string;
    secondaryAction: string;
    portraitCaption: string;
    scroll: string;
  };
  experience: {
    label: string;
    headline: string;
    headlineAccent: string;
    intro: string;
    media: LocalizedExperienceMedia;
    items: LocalizedExperience[];
  };
  work: {
    label: string;
    headline: string;
    intro: string;
    libraryLabel: string;
    libraryNote: string;
    roleLabel: string;
    outputLabel: string;
    previewAction: string;
    downloadAction: string;
    items: LocalizedWork[];
  };
  contact: {
    label: string;
    headline: string;
    headlineAccent: string;
    body: string;
    emailLabel: string;
    phoneLabel: string;
    footerRole: string;
    footerStatement: string;
    backToTop: string;
  };
  pdf: {
    openWindow: string;
    download: string;
    close: string;
    unsupported: string;
    openFallback: string;
  };
};

export const portfolioContent: Record<Language, PortfolioContent> = {
  en: {
    meta: {
      title: "Justin Li — Solutions Architect & FDE",
      description:
        "Justin Li’s Solutions Architect and Forward Deployed Engineer portfolio, featuring applied AI experience, system design, and production delivery.",
    },
    identity: {
      name: "JUSTIN LI",
      heroName: "JUSTIN LI.",
      email: "justinli@stern.nyu.edu",
      phone: "(646) 228-4995",
      phoneHref: "+16462284995",
      location: "NEW YORK, NY",
    },
    a11y: {
      mainNavigation: "Main navigation",
      pageNavigation: "Page navigation",
      backToTop: "Back to top",
      languageSelector: "Choose display language",
      portraitAlt: "Portrait of Justin in Shanghai",
      previewWork: (title) => `Preview ${title}`,
      closePdf: "Close PDF preview",
      pdfPreview: (title) => `${title} PDF preview`,
    },
    nav: {
      experience: "Experience",
      work: "Work",
      contact: "Contact",
    },
    hero: {
      disciplines: ["Solution Architect", "Product Management", "AI Operations"],
      headline: "Complex systems,",
      headlineAccent: "made useful.",
      bodyLineOne: "I work where business reality meets technical systems —",
      bodyLineTwo: "finding the real problem, proving the path, and shipping to production.",
      primaryAction: "View experience",
      secondaryAction: "Start a conversation",
      portraitCaption: "JUSTIN LI / PORTRAIT",
      scroll: "SCROLL — 01 / 03",
    },
    experience: {
      label: "01 — WORK EXPERIENCE",
      headline: "Business-aware.",
      headlineAccent: "Built to deliver.",
      intro: "Selected work turning operational pain points into testable AI products and real user outcomes.",
      media: {
        demoLabel: "LIVE PRODUCT DEMO",
        demoCaption: "From a validated input folder to an editable weekly report.",
        outputsLabel: "GENERATED OUTPUTS",
        interactionHint: "DRAG OR USE ARROWS · CLICK TO INSPECT",
        carouselLabel: "Generated advertising report slides",
        previousSlide: "Previous output",
        nextSlide: "Next output",
        openFullscreen: "Inspect full-size output",
        closeFullscreen: "Close detailed view",
        fullscreenLabel: "Detailed advertising report output",
        pendingLabel: "VERBA PRODUCT VISUALS",
        pendingHeadline: "Visual documentation coming next.",
        pendingBody:
          "This space is reserved for real product screens and workflow evidence — no invented interface in the meantime.",
        slides: [
          {
            title: "Brand A Advertising Performance",
            alt: "Cover slide for the Brand A advertising performance weekly report",
          },
          {
            title: "Paid Media Overall Performance",
            alt: "Paid media overall performance dashboard with daily and product-level charts",
          },
          {
            title: "Paid Media Creative Analysis",
            alt: "Creative analysis slide with campaign metrics and a pinned product creative",
          },
          {
            title: "Paid Media Audience Analysis",
            alt: "Audience analysis slide comparing add-to-cart, purchases, ROAS, and spend",
          },
          {
            title: "Paid Search Keyword Analysis",
            alt: "Paid search keyword analysis slide with cost, conversion, and value charts",
          },
        ],
      },
      items: [
        {
          number: "01",
          eyebrow: "AI PRODUCT DEVELOPMENT",
          title: "AI Advertisement Report Automation Project",
          meta: "Product Lead · Virtual · May 2025 — Aug 2025",
          media: "ad-report",
          bullets: [
            "Authored PRDs and decomposed a repetitive Meta and Google Ads reporting workflow into data inputs, transformation rules, slide templates, and few-shot examples for an LLM-generated reporting prototype.",
            "Partnered with a University of Chicago developer to prototype and evaluate two alpha versions in one month, refining output quality through peer feedback.",
          ],
          metrics: [
            { value: "2", label: "ALPHA VERSIONS" },
            { value: "1 MONTH", label: "BUILD CYCLE" },
          ],
        },
        {
          number: "02",
          eyebrow: "AI SALES ENABLEMENT",
          title: "Verba — Internal AI Sales Agent",
          media: "verba-placeholder",
          bullets: [
            "Designed and launched Verba using Coze and a local database, enabling sales team members to retrieve prior industry solutions and generate tailored outreach messages. More than 300 agent runs and feedback from 30+ users informed ongoing iteration.",
          ],
          metrics: [
            { value: "300+", label: "AGENT RUNS" },
            { value: "30+", label: "USERS IN FEEDBACK LOOP" },
          ],
        },
      ],
    },
    work: {
      label: "02 — SELECTED WORK",
      headline: "Work is more than a file.",
      intro: "It should reveal how you think, the trade-offs you make, and how you move the work forward.",
      libraryLabel: "PDF LIBRARY",
      libraryNote: "Demo documents shown. Replace them with your own de-identified work.",
      roleLabel: "ROLE",
      outputLabel: "OUTPUT",
      previewAction: "Preview online",
      downloadAction: "Download PDF",
      items: [
        {
          type: "SOLUTION DESIGN",
          title: "Enterprise Knowledge System",
          coverTitle: "Solution Blueprint",
          summary:
            "A structured path from business framing to RAG evaluation, permission boundaries, and a production rollout plan.",
          role: "Discovery · Architecture",
          deliverable: "Solution blueprint / Demo PDF",
        },
        {
          type: "FIELD ENGINEERING",
          title: "Field Discovery & Validation",
          coverTitle: "Field Discovery Notes",
          summary:
            "A method for turning interviews, system signals, and blockers into clear hypotheses that can be tested with a focused prototype.",
          role: "Field discovery · Prototyping",
          deliverable: "Discovery notes / Demo PDF",
        },
        {
          type: "DELIVERY SYSTEM",
          title: "Production Readiness",
          coverTitle: "Production Readiness",
          summary:
            "A practical checklist across integration, quality, monitoring, rollback, and adoption — moving a demo into a dependable workflow.",
          role: "Production delivery · Launch",
          deliverable: "Readiness checklist / Demo PDF",
        },
      ],
    },
    contact: {
      label: "03 — LET'S TALK",
      headline: "Let’s solve",
      headlineAccent: "something real.",
      body:
        "I’m exploring Solutions Architect and Forward Deployed Engineer roles — and I’m always open to discussing a hard problem worth solving.",
      emailLabel: "EMAIL",
      phoneLabel: "PHONE",
      footerRole: "JUSTIN LI / SOLUTIONS × FDE",
      footerStatement: "DESIGNED FOR THE REAL WORLD",
      backToTop: "BACK TO TOP ↑",
    },
    pdf: {
      openWindow: "New window",
      download: "Download",
      close: "Close ×",
      unsupported: "This browser cannot display the PDF inline.",
      openFallback: "Open it in a new window",
    },
  },
  zh: {
    meta: {
      title: "李泽霆 — 解决方案与前线部署工程师",
      description: "李泽霆的解决方案架构师与前线部署工程师个人作品集：包含人工智能项目经历、系统设计与生产交付。",
    },
    identity: {
      name: "李泽霆",
      heroName: "李泽霆",
      email: "justinli@stern.nyu.edu",
      phone: "18019052377",
      phoneHref: "+8618019052377",
      location: "美国纽约",
    },
    a11y: {
      mainNavigation: "主导航",
      pageNavigation: "页面导航",
      backToTop: "返回顶部",
      languageSelector: "选择显示语言",
      portraitAlt: "李泽霆在上海的个人照片",
      previewWork: (title) => `预览${title}`,
      closePdf: "关闭文档预览",
      pdfPreview: (title) => `${title}文档预览`,
    },
    nav: {
      experience: "经历",
      work: "作品",
      contact: "联系",
    },
    hero: {
      disciplines: ["解决方案架构师", "产品管理", "AI 运营"],
      headline: "把复杂的系统，",
      headlineAccent: "落成可用的答案。",
      bodyLineOne: "我在业务现场与技术系统之间工作——发现真正的问题，",
      bodyLineTwo: "设计可验证的路径，并把方案送进生产。",
      primaryAction: "查看经历",
      secondaryAction: "聊聊机会",
      portraitCaption: "李泽霆 / 个人照片",
      scroll: "向下浏览 — 01 / 03",
    },
    experience: {
      label: "01 — 工作经历",
      headline: "懂业务。",
      headlineAccent: "为交付而生。",
      intro: "把业务中的重复问题转化为可验证的人工智能产品，并用真实使用反馈推动迭代。",
      media: {
        demoLabel: "产品实时演示",
        demoCaption: "从完成校验的输入文件夹，到可编辑的每周报告。",
        outputsLabel: "生成成果",
        interactionHint: "拖动或点击箭头 · 点击查看细节",
        carouselLabel: "自动生成的广告报告幻灯片",
        previousSlide: "上一张成果",
        nextSlide: "下一张成果",
        openFullscreen: "放大查看成果",
        closeFullscreen: "关闭细节查看",
        fullscreenLabel: "广告报告成果细节查看",
        pendingLabel: "VERBA 产品视觉",
        pendingHeadline: "真实产品素材将在下一版补充。",
        pendingBody: "这里将用于展示真实界面与工作流证据；在素材就绪前，不使用虚构产品截图。",
        slides: [
          {
            title: "品牌 A 广告表现",
            alt: "品牌 A 广告表现周报的封面页",
          },
          {
            title: "付费媒体整体表现",
            alt: "包含每日及产品维度图表的付费媒体整体表现页面",
          },
          {
            title: "付费媒体创意分析",
            alt: "包含活动指标与重点产品创意的付费媒体创意分析页面",
          },
          {
            title: "付费媒体受众分析",
            alt: "对比加购、购买、广告回报与花费的受众分析页面",
          },
          {
            title: "付费搜索关键词分析",
            alt: "包含成本、转化与价值图表的付费搜索关键词分析页面",
          },
        ],
      },
      items: [
        {
          number: "01",
          eyebrow: "人工智能产品开发",
          title: "人工智能广告报告自动化项目",
          meta: "产品负责人 · 远程 · 2025 年 5 月—8 月",
          media: "ad-report",
          bullets: [
            "编写产品需求文档，将重复的 Meta 与 Google Ads 报告流程拆解为数据输入、转换规则、演示文稿模板和少样本示例，用于构建大语言模型自动生成报告原型。",
            "与芝加哥大学开发者合作，在一个月内完成并评估两个内测版本，并结合同行反馈持续优化输出质量。",
          ],
          metrics: [
            { value: "2 个", label: "内测版本" },
            { value: "1 个月", label: "构建周期" },
          ],
        },
        {
          number: "02",
          eyebrow: "人工智能销售赋能",
          title: "Verba — 内部人工智能销售助手",
          media: "verba-placeholder",
          bullets: [
            "使用 Coze 与本地数据库设计并上线内部人工智能销售助手 Verba，帮助销售团队检索既往行业方案并生成定制化外联信息；累计运行 300 多次，并收集 30 多位用户的反馈用于持续迭代。",
          ],
          metrics: [
            { value: "300+", label: "运行次数" },
            { value: "30+", label: "反馈用户" },
          ],
        },
      ],
    },
    work: {
      label: "02 — 精选作品",
      headline: "作品，不只是一份文件。",
      intro: "它应该让人看见你如何思考、如何取舍，以及如何推动事情发生。",
      libraryLabel: "文档作品库",
      libraryNote: "以下为示例文档，正式发布前可替换为脱敏后的真实作品。",
      roleLabel: "角色",
      outputLabel: "交付物",
      previewAction: "在线预览",
      downloadAction: "下载 PDF",
      items: [
        {
          type: "方案设计",
          title: "企业知识智能系统方案",
          coverTitle: "方案蓝图",
          summary: "从业务问题拆解到检索增强生成评估、权限边界与上线节奏，形成一份可讨论、可验证的系统方案。",
          role: "需求澄清 · 架构设计",
          deliverable: "方案蓝图 / 示例 PDF",
        },
        {
          type: "现场工程",
          title: "现场发现与验证手册",
          coverTitle: "现场发现纪要",
          summary: "把访谈、系统信号和障碍压缩成清晰假设，用最小可行原型验证真正值得解决的问题。",
          role: "现场发现 · 原型验证",
          deliverable: "发现纪要 / 示例 PDF",
        },
        {
          type: "交付体系",
          title: "生产上线准备清单",
          coverTitle: "生产准备清单",
          summary: "覆盖集成、质量、监控、回滚和用户采用，让方案从演示环境稳稳走进真实工作流程。",
          role: "交付推进 · 上线保障",
          deliverable: "交付清单 / 示例 PDF",
        },
      ],
    },
    contact: {
      label: "03 — 联系",
      headline: "一起解决",
      headlineAccent: "真实的问题。",
      body: "正在寻找解决方案架构师或前线部署工程师相关机会，也愿意聊聊值得落地的复杂问题。",
      emailLabel: "邮箱",
      phoneLabel: "电话",
      footerRole: "李泽霆 / 解决方案 × 前线部署",
      footerStatement: "为真实世界而设计",
      backToTop: "返回顶部 ↑",
    },
    pdf: {
      openWindow: "新窗口",
      download: "下载",
      close: "关闭 ×",
      unsupported: "当前浏览器无法直接显示这份文档。",
      openFallback: "在新窗口打开",
    },
  },
};
