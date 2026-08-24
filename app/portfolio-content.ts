export type Language = "en" | "zh";

export type LocalizedWork = {
  type: string;
  title: string;
  summary: string;
  imageAlt: string;
  features: string[];
};

export type LocalizedExperience = {
  number: string;
  eyebrow: string;
  title: string;
  meta?: string;
  media: "ad-report" | "verba-system";
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
  verba: {
    label: string;
    headline: string;
    body: string;
    diagramLabel: string;
    knowledgeLane: string;
    requestLane: string;
    retrievalBridge: string;
    evidenceLabel: string;
    boundary: string;
    knowledgeNodes: Array<{
      step: string;
      title: string;
      detail: string;
    }>;
    requestNodes: Array<{
      step: string;
      title: string;
      detail: string;
    }>;
    evidence: Array<{
      value: string;
      label: string;
    }>;
  };
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
    closeWorkPreview: string;
    workPreview: (title: string) => string;
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
    previewAction: string;
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
      closeWorkPreview: "Close project image",
      workPreview: (title) => `${title} image preview`,
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
        verba: {
          label: "VERBA / SOLUTION INTELLIGENCE",
          headline: "From scattered case files to a source-aware solution draft.",
          body:
            "Verba evolved from a rapid sales-agent MVP into a local-first RAG workspace. It turns historical solution PDFs into reusable evidence, retrieves relevant passages for a new brief, and drafts a structured proposal with source and page references.",
          diagramLabel: "Verba solution-matching system architecture",
          knowledgeLane: "01 / BUILD ONCE",
          requestLane: "02 / RUN FOR EACH NEW BRIEF",
          retrievalBridge: "KNOWLEDGE BASE GROUNDS RETRIEVAL",
          evidenceLabel: "PROTOTYPE EVIDENCE",
          boundary:
            "Prototype boundary — local, single-user workflow. Generated citations remain human-reviewed rather than automatically verified.",
          knowledgeNodes: [
            { step: "01", title: "Historical Case PDFs", detail: "15 reusable solution files" },
            {
              step: "02",
              title: "Build Local Knowledge Base",
              detail: "Parse → chunk → BGE embeddings → ChromaDB",
            },
          ],
          requestNodes: [
            { step: "03", title: "Client Brief", detail: "New industry and requirements" },
            { step: "04", title: "Retrieve Evidence", detail: "Top-k passages · file + page" },
            { step: "05", title: "Reason Locally", detail: "Gemma · FastAPI orchestration" },
            {
              step: "06",
              title: "Draft Solution",
              detail: "Diagnosis → architecture → plan → risks → sources",
            },
          ],
          evidence: [
            { value: "15", label: "CASE PDFS" },
            { value: "111", label: "INDEXED CHUNKS" },
            { value: "11/11", label: "CORE TESTS" },
            { value: "LOCAL", label: "DEFAULT INFERENCE" },
          ],
        },
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
            title: "Creative Analysis · Product Alpha",
            alt: "Product Alpha creative analysis slide with campaign metrics and a pinned robotic lawn mower creative",
          },
          {
            title: "Creative Analysis · Product Beta",
            alt: "Product Beta creative analysis slide with campaign metrics and a pinned robot vacuum creative",
          },
          {
            title: "Creative Analysis · Product Gamma",
            alt: "Product Gamma creative analysis slide with campaign metrics and a pinned window-cleaning robot creative",
          },
          {
            title: "Paid Media Traffic Analysis",
            alt: "Paid media traffic analysis slide comparing campaigns, clicks, landing-page views, and costs",
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
          media: "verba-system",
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
      libraryLabel: "REAL PROJECT SNAPSHOT",
      libraryNote: "Select the dashboard to inspect the full-size view.",
      previewAction: "View full image",
      items: [
        {
          type: "PRODUCT OPERATIONS · LARK BASE",
          title: "R&D Project Dashboards (Lark Base)",
          summary:
            "A Lark Base project overview that brings task status, priority, team ranking, and recurring work themes into one operational dashboard.",
          imageAlt:
            "Lark Base R&D project dashboard showing task status, priority, team ranking, and task keyword charts",
          features: ["Task status and priority", "Team ranking", "Task keyword patterns"],
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
      closeWorkPreview: "关闭项目图片",
      workPreview: (title) => `${title}图片预览`,
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
        verba: {
          label: "VERBA / 方案智能",
          headline: "把分散的案例文件，转化为有来源依据的方案初稿。",
          body:
            "Verba 从快速验证的销售助手原型演进为本地优先的 RAG 工作台：把历史方案 PDF 转化为可复用证据，为新需求检索相关段落，并生成带文件名和页码来源的结构化方案。",
          diagramLabel: "Verba 方案匹配系统架构",
          knowledgeLane: "01 / 一次性构建",
          requestLane: "02 / 每次新需求运行",
          retrievalBridge: "知识库为证据检索提供依据",
          evidenceLabel: "原型验证",
          boundary:
            "原型边界——当前为本地单用户工作流；生成的引用仍需人工复核，尚未实现自动真实性验证。",
          knowledgeNodes: [
            { step: "01", title: "历史方案 PDF", detail: "15 份可复用案例文件" },
            {
              step: "02",
              title: "构建本地知识库",
              detail: "解析 → 分块 → BGE 向量化 → ChromaDB",
            },
          ],
          requestNodes: [
            { step: "03", title: "客户需求", detail: "新的行业场景与业务要求" },
            { step: "04", title: "检索证据", detail: "Top-K 段落 · 文件名与页码" },
            { step: "05", title: "本地推理", detail: "Gemma · FastAPI 编排" },
            {
              step: "06",
              title: "生成方案初稿",
              detail: "诊断 → 架构 → 实施 → 风险 → 来源",
            },
          ],
          evidence: [
            { value: "15", label: "案例 PDF" },
            { value: "111", label: "已索引切片" },
            { value: "11/11", label: "核心测试" },
            { value: "本地", label: "默认推理方式" },
          ],
        },
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
            title: "创意分析 · 产品 Alpha",
            alt: "包含活动指标与重点割草机器人素材的产品 Alpha 创意分析页面",
          },
          {
            title: "创意分析 · 产品 Beta",
            alt: "包含活动指标与重点扫地机器人素材的产品 Beta 创意分析页面",
          },
          {
            title: "创意分析 · 产品 Gamma",
            alt: "包含活动指标与重点擦窗机器人素材的产品 Gamma 创意分析页面",
          },
          {
            title: "付费媒体流量分析",
            alt: "对比广告活动、点击、落地页浏览与成本的付费媒体流量分析页面",
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
          media: "verba-system",
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
      libraryLabel: "真实项目快照",
      libraryNote: "点击仪表盘即可查看完整大图。",
      previewAction: "查看完整图片",
      items: [
        {
          type: "产品运营 · 飞书多维表格",
          title: "研发项目仪表盘（飞书多维表格）",
          summary: "通过一个项目总览集中呈现任务状态、优先级、团队排名与重复出现的工作主题。",
          imageAlt: "展示任务状态、优先级、团队排名与任务关键词图表的飞书多维表格研发项目仪表盘",
          features: ["任务状态与优先级", "团队排名", "任务关键词分布"],
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
  },
};
