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
  media: "ad-report" | "verba-demo";
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
    title: string;
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
  };
  experience: {
    label: string;
    headline: string;
    media: LocalizedExperienceMedia;
    items: LocalizedExperience[];
  };
  work: {
    label: string;
    headline: string;
    previewAction: string;
    items: LocalizedWork[];
  };
  contact: {
    label: string;
    headline: string;
    body: string;
    emailLabel: string;
    phoneLabel: string;
    footerRole: string;
    backToTop: string;
  };
};

export const portfolioContent: Record<Language, PortfolioContent> = {
  en: {
    meta: {
      title: "Justin Li — Solutions Architect & FDE",
      description:
        "Justin Li — AI product and solution design. Projects: AI ad-report automation, Verba, Lark and Tableau dashboards.",
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
      headline: "AI product and",
      headlineAccent: "solution design.",
      bodyLineOne: "I write PRDs, turn manual workflows into AI pipelines,",
      bodyLineTwo: " and build and test prototypes with developers.",
      primaryAction: "View experience",
      secondaryAction: "Contact",
    },
    experience: {
      label: "01 — 2 PROJECTS",
      headline: "Work experience",
      media: {
        demoLabel: "PRODUCT DEMO",
        demoCaption: "Input: weekly ad data folder. Output: editable PowerPoint report.",
        outputsLabel: "GENERATED SLIDES",
        interactionHint: "DRAG OR USE ARROWS · CLICK TO INSPECT",
        carouselLabel: "Generated advertising report slides",
        previousSlide: "Previous output",
        nextSlide: "Next output",
        openFullscreen: "Inspect full-size output",
        closeFullscreen: "Close detailed view",
        fullscreenLabel: "Detailed advertising report output",
        verba: {
          title: "Verba — Interactive solution and presentation demo",
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
            "Wrote the PRDs. Broke a manual Meta and Google Ads reporting workflow into data inputs, transformation rules, slide templates and few-shot examples for an LLM report generator.",
            "Built and tested two alpha versions in one month with a University of Chicago developer; improved output quality from peer feedback.",
          ],
          metrics: [
            { value: "2", label: "ALPHA VERSIONS" },
            { value: "1 MONTH", label: "BUILD CYCLE" },
          ],
        },
        {
          number: "02",
          eyebrow: "AI SOLUTION DESIGN",
          title: "Verba — AI solution design tool",
          meta: "",
          media: "verba-demo",
          bullets: [
            "Input: a client brief. Output: a solution write-up with cited sources and a three-slide presentation.",
            "English and Chinese. Five built-in examples (school, course, support, restaurant, sales) plus live generation with an LLM.",
          ],
          metrics: [
            { value: "300+", label: "AGENT RUNS" },
            { value: "30+", label: "USERS PROVIDED FEEDBACK" },
          ],
        },
      ],
    },
    work: {
      label: "02 — 3 PROJECTS",
      headline: "Other works",
      previewAction: "View full image",
      items: [
        {
          type: "PRODUCT OPERATIONS · LARK BASE",
          title: "R&D Project Dashboards",
          summary:
            "R&D project dashboard in Lark Base: task status, priority, team ranking and task keywords.",
          imageAlt:
            "Lark Base R&D project dashboard showing task status, priority, team ranking, and task keyword charts",
          features: ["Task status and priority", "Team ranking", "Task keyword patterns"],
        },
      ],
    },
    contact: {
      label: "03 — NEW YORK, NY",
      headline: "Contact",
      body: "Open to Solutions Architect and Forward Deployed Engineer roles.",
      emailLabel: "EMAIL",
      phoneLabel: "PHONE",
      footerRole: "JUSTIN LI / SOLUTIONS × FDE",
      backToTop: "BACK TO TOP ↑",
    },
  },
  zh: {
    meta: {
      title: "李泽霆 — 解决方案与前线部署工程师",
      description: "李泽霆 — AI 产品与方案设计。项目：AI 广告报告自动化、Verba、飞书与 Tableau 看板。",
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
      headline: "AI 产品",
      headlineAccent: "与方案设计。",
      bodyLineOne: "编写 PRD，把人工流程拆解成 AI 流水线，",
      bodyLineTwo: "并与开发者一起构建和测试原型。",
      primaryAction: "查看经历",
      secondaryAction: "联系我",
    },
    experience: {
      label: "01 — 2 个项目",
      headline: "工作经历",
      media: {
        demoLabel: "产品演示",
        demoCaption: "输入：每周广告数据文件夹。输出：可编辑的 PowerPoint 报告。",
        outputsLabel: "生成的报告页面",
        interactionHint: "拖动或点击箭头 · 点击查看细节",
        carouselLabel: "自动生成的广告报告幻灯片",
        previousSlide: "上一张成果",
        nextSlide: "下一张成果",
        openFullscreen: "放大查看成果",
        closeFullscreen: "关闭细节查看",
        fullscreenLabel: "广告报告成果细节查看",
        verba: {
          title: "Verba — 方案与演示互动试玩",
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
            "编写 PRD，将人工 Meta 与 Google Ads 报告流程拆解为数据输入、转换规则、幻灯片模板和少样本示例，用于大语言模型生成报告。",
            "与芝加哥大学开发者在一个月内完成并测试两个内测版本，根据同行反馈改进输出质量。",
          ],
          metrics: [
            { value: "2 个", label: "内测版本" },
            { value: "1 个月", label: "构建周期" },
          ],
        },
        {
          number: "02",
          eyebrow: "人工智能方案设计",
          title: "Verba — AI 方案设计工具",
          meta: "",
          media: "verba-demo",
          bullets: [
            "输入：客户需求。输出：附来源引用的方案说明和三页演示文稿。",
            "支持中英文；内置 5 个示例（学校、课程、客服、餐饮、销售），并可调用大语言模型实时生成。",
          ],
          metrics: [
            { value: "300+", label: "智能体运行次数" },
            { value: "30+", label: "用户反馈" },
          ],
        },
      ],
    },
    work: {
      label: "02 — 3 个项目",
      headline: "其他作品",
      previewAction: "查看完整图片",
      items: [
        {
          type: "产品运营 · 飞书多维表格",
          title: "研发项目仪表盘",
          summary: "飞书多维表格研发项目仪表盘：任务状态、优先级、团队排名与任务关键词。",
          imageAlt: "展示任务状态、优先级、团队排名与任务关键词图表的飞书多维表格研发项目仪表盘",
          features: ["任务状态与优先级", "团队排名", "任务关键词分布"],
        },
      ],
    },
    contact: {
      label: "03 — 美国纽约",
      headline: "联系方式",
      body: "寻找解决方案架构师与前线部署工程师岗位。",
      emailLabel: "邮箱",
      phoneLabel: "电话",
      footerRole: "李泽霆 / 解决方案 × 前线部署",
      backToTop: "返回顶部 ↑",
    },
  },
};
