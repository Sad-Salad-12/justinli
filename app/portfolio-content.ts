export type Language = "en" | "zh";

export type Fact = {
  label: string;
  value: string;
  href?: string;
};

export type Entry = {
  id: string;
  kind: string;
  title: string;
  /** Short lines for the left rail: role, dates, tool, counts. */
  meta: string[];
  body: string[];
};

export type StillWork = {
  id: "rd-dashboard" | "supplier-dashboard";
  title: string;
  summary: string;
  note: string;
  imageAlt: string;
};

export type LegalFeature = {
  id: "wiki" | "base" | "updates";
  tab: string;
  title: string;
  description: string;
};

export type MediaCopy = {
  demoLabel: string;
  demoCaption: string;
  slidesLabel: string;
  slidesHint: string;
  slidesGroupLabel: string;
  enlargeSlide: string;
  verbaFrameTitle: string;
  verbaLabel: string;
  slides: Array<{ title: string; alt: string }>;
};

export type DashboardCopy = {
  frameTitle: string;
  countryLabel: string;
  campaignLabel: string;
  countries: Array<{ code: "FR" | "IT" | "UK"; label: string }>;
};

export type LegalCopy = {
  tabsLabel: string;
  screenshotAlt: (tab: string) => string;
  viewFull: string;
  features: LegalFeature[];
};

export type LightboxCopy = {
  close: string;
  previous: string;
  next: string;
  viewFull: string;
};

type PortfolioContent = {
  meta: {
    title: string;
    description: string;
  };
  identity: {
    name: string;
    email: string;
    phone: string;
    phoneHref: string;
    location: string;
  };
  a11y: {
    mainNavigation: string;
    backToTop: string;
    languageSelector: string;
    portraitAlt: string;
  };
  nav: {
    experience: string;
    work: string;
    contact: string;
  };
  hero: {
    descriptor: string;
    body: string;
    facts: Fact[];
  };
  experience: {
    headline: string;
    media: MediaCopy;
    items: Entry[];
  };
  work: {
    headline: string;
    dashboard: Entry;
    dashboardControls: DashboardCopy;
    legal: Entry;
    legalGallery: LegalCopy;
    stills: StillWork[];
  };
  contact: {
    headline: string;
    body: string;
    emailLabel: string;
    phoneLabel: string;
    backToTop: string;
  };
  lightbox: LightboxCopy;
};

const email = "justinli@stern.nyu.edu";

export const portfolioContent: Record<Language, PortfolioContent> = {
  en: {
    meta: {
      title: "Justin Li — Solutions Architect & FDE",
      description:
        "Justin Li — AI product and solution design. Projects: AI ad-report automation, Verba, Lark and Tableau dashboards.",
    },
    identity: {
      name: "Justin Li",
      email,
      phone: "(646) 228-4995",
      phoneHref: "+16462284995",
      location: "New York, NY",
    },
    a11y: {
      mainNavigation: "Main navigation",
      backToTop: "Back to top",
      languageSelector: "Choose display language",
      portraitAlt: "Portrait of Justin in Shanghai",
    },
    nav: {
      experience: "Experience",
      work: "Work",
      contact: "Contact",
    },
    hero: {
      descriptor: "AI product and solution design.",
      body: "I write PRDs, turn manual workflows into AI pipelines, and build and test prototypes with developers.",
      facts: [
        { label: "Focus", value: "Solutions architecture, product management, AI operations" },
        { label: "Based in", value: "New York, NY" },
        { label: "Open to", value: "Solutions Architect and Forward Deployed Engineer roles" },
        { label: "Email", value: email, href: `mailto:${email}` },
      ],
    },
    experience: {
      headline: "Work experience",
      media: {
        demoLabel: "Product demo",
        demoCaption: "Input: weekly ad data folder. Output: editable PowerPoint report.",
        slidesLabel: "Generated slides",
        slidesHint: "Eight pages from one generated report. Click a slide to enlarge.",
        slidesGroupLabel: "Generated advertising report slides",
        enlargeSlide: "Enlarge slide",
        verbaFrameTitle: "Verba — Interactive solution and presentation demo",
        verbaLabel: "Interactive demo",
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
          id: "ad-report",
          kind: "AI product development",
          title: "AI Advertisement Report Automation Project",
          meta: [
            "Product Lead · Virtual",
            "May 2025 — Aug 2025",
            "2 alpha versions",
            "1-month build cycle",
          ],
          body: [
            "Wrote the PRDs. Broke a manual Meta and Google Ads reporting workflow into data inputs, transformation rules, slide templates and few-shot examples for an LLM report generator.",
            "Built and tested two alpha versions in one month with a University of Chicago developer; improved output quality from peer feedback.",
          ],
        },
        {
          id: "verba",
          kind: "AI solution design",
          title: "Verba — AI solution design tool",
          meta: ["300+ agent runs", "30+ users gave feedback", "English and Chinese"],
          body: [
            "Input: a client brief. Output: a solution write-up with cited sources and a three-slide presentation.",
            "Five built-in examples (school, course, support, restaurant, sales) plus live generation with an LLM.",
          ],
        },
      ],
    },
    work: {
      headline: "Other works",
      dashboard: {
        id: "advertising-dashboard",
        kind: "Interactive dashboard",
        title: "Advertising performance dashboard",
        meta: ["Lark Miaoda", "1,092 rows of sample data", "3 markets · 2 campaign types"],
        body: [
          "A Looker Studio advertising report recreated in Lark Miaoda with sample data. Switch markets and campaigns, compare periods, and select a product to update all six KPIs.",
        ],
      },
      dashboardControls: {
        frameTitle:
          "Interactive advertising dashboard: filter by country, campaign and date, then scroll through product performance",
        countryLabel: "Country",
        campaignLabel: "Campaign",
        countries: [
          { code: "FR", label: "France" },
          { code: "IT", label: "Italy" },
          { code: "UK", label: "UK" },
        ],
      },
      legal: {
        id: "legal-workspace",
        kind: "Mock system",
        title: "Legal & compliance workspace",
        meta: ["Built in Lark", "3 modules"],
        body: [
          "Mock company legal system built in Lark: knowledge base, compliance task tracker and subscription channel.",
        ],
      },
      legalGallery: {
        tabsLabel: "Workspace module",
        screenshotAlt: (tab) => `${tab} — legal system mock`,
        viewFull: "View full screenshot",
        features: [
          {
            id: "wiki",
            tab: "Knowledge Base",
            title: "Legal knowledge base",
            description:
              "Contract templates, governance guidance and IP procedures, organized by topic.",
          },
          {
            id: "base",
            tab: "Lark Base",
            title: "Compliance task tracker",
            description:
              "Task types, priorities and status views. Linked license and seal requests, plus an assignment reminder workflow.",
          },
          {
            id: "updates",
            tab: "Subscriptions",
            title: "Compliance channel",
            description:
              "Policy updates, risk reminders and training announcements, with sample posts in English and Chinese.",
          },
        ],
      },
      stills: [
        {
          id: "rd-dashboard",
          title: "R&D Project Dashboards",
          summary:
            "R&D project dashboard in Lark Base: task status, priority, team ranking and task keywords.",
          note: "Lark Base",
          imageAlt:
            "Lark Base R&D project dashboard showing task status, priority, team ranking, and task keyword charts",
        },
        {
          id: "supplier-dashboard",
          title: "Supplier dashboard",
          summary:
            "Tableau dashboard for a Data Science course: supplier revenue, monthly sales, order geography, supplier locations and average MSRP.",
          note: "Tableau · Coursework",
          imageAlt:
            "Tableau supplier dashboard: sales, monthly trends, order geography and supplier footprint",
        },
      ],
    },
    contact: {
      headline: "Contact",
      body: "Open to Solutions Architect and Forward Deployed Engineer roles.",
      emailLabel: "Email",
      phoneLabel: "Phone",
      backToTop: "Back to top",
    },
    lightbox: {
      close: "Close",
      previous: "Previous image",
      next: "Next image",
      viewFull: "View full image",
    },
  },
  zh: {
    meta: {
      title: "李泽霆 — 解决方案与前线部署工程师",
      description: "李泽霆 — AI 产品与方案设计。项目：AI 广告报告自动化、Verba、飞书与 Tableau 看板。",
    },
    identity: {
      name: "李泽霆",
      email,
      phone: "18019052377",
      phoneHref: "+8618019052377",
      location: "美国纽约",
    },
    a11y: {
      mainNavigation: "主导航",
      backToTop: "返回顶部",
      languageSelector: "选择显示语言",
      portraitAlt: "李泽霆在上海的个人照片",
    },
    nav: {
      experience: "经历",
      work: "作品",
      contact: "联系",
    },
    hero: {
      descriptor: "AI 产品与方案设计。",
      body: "编写 PRD，把人工流程拆解成 AI 流水线，并与开发者一起构建和测试原型。",
      facts: [
        { label: "方向", value: "解决方案架构、产品管理、AI 运营" },
        { label: "所在地", value: "美国纽约" },
        { label: "求职意向", value: "解决方案架构师与前线部署工程师岗位" },
        { label: "邮箱", value: email, href: `mailto:${email}` },
      ],
    },
    experience: {
      headline: "工作经历",
      media: {
        demoLabel: "产品演示",
        demoCaption: "输入：每周广告数据文件夹。输出：可编辑的 PowerPoint 报告。",
        slidesLabel: "生成的报告页面",
        slidesHint: "同一份生成报告中的 8 页。点击查看大图。",
        slidesGroupLabel: "自动生成的广告报告幻灯片",
        enlargeSlide: "放大查看",
        verbaFrameTitle: "Verba — 方案与演示互动试玩",
        verbaLabel: "互动演示",
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
          id: "ad-report",
          kind: "人工智能产品开发",
          title: "人工智能广告报告自动化项目",
          meta: ["产品负责人 · 远程", "2025 年 5 月—8 月", "2 个内测版本", "1 个月构建周期"],
          body: [
            "编写 PRD，将人工 Meta 与 Google Ads 报告流程拆解为数据输入、转换规则、幻灯片模板和少样本示例，用于大语言模型生成报告。",
            "与芝加哥大学开发者在一个月内完成并测试两个内测版本，根据同行反馈改进输出质量。",
          ],
        },
        {
          id: "verba",
          kind: "人工智能方案设计",
          title: "Verba — AI 方案设计工具",
          meta: ["300+ 次智能体运行", "30+ 位用户提供反馈", "支持中英文"],
          body: [
            "输入：客户需求。输出：附来源引用的方案说明和三页演示文稿。",
            "内置 5 个示例（学校、课程、客服、餐饮、销售），并可调用大语言模型实时生成。",
          ],
        },
      ],
    },
    work: {
      headline: "其他作品",
      dashboard: {
        id: "advertising-dashboard",
        kind: "交互看板",
        title: "广告投放分析看板",
        meta: ["飞书妙搭", "1,092 条模拟数据", "3 个市场 · 2 种投放类型"],
        body: [
          "使用模拟数据，将 Looker Studio 广告报表复刻为飞书妙搭应用。切换国家与投放类型，对比周期表现，点击广告组联动六项指标。",
        ],
      },
      dashboardControls: {
        frameTitle: "广告投放交互看板：切换国家、投放类型和日期，滚动查看产品明细",
        countryLabel: "国家",
        campaignLabel: "投放类型",
        countries: [
          { code: "FR", label: "法国" },
          { code: "IT", label: "意大利" },
          { code: "UK", label: "英国" },
        ],
      },
      legal: {
        id: "legal-workspace",
        kind: "系统 mock",
        title: "法务与合规协作系统",
        meta: ["用飞书搭建", "3 个模块"],
        body: ["用飞书搭建的公司法务系统 mock：知识库、合规任务台账和订阅号。"],
      },
      legalGallery: {
        tabsLabel: "系统模块",
        screenshotAlt: (tab) => `${tab} — 法务系统 mock`,
        viewFull: "查看完整截图",
        features: [
          {
            id: "wiki",
            tab: "知识库",
            title: "法务知识库",
            description: "合同模板、公司治理指引和知识产权流程，按主题分类整理。",
          },
          {
            id: "base",
            tab: "多维表格",
            title: "合规任务台账",
            description: "任务类型、优先级和状态视图；关联证照印章申请与任务分配提醒流程。",
          },
          {
            id: "updates",
            tab: "订阅号",
            title: "合规订阅号",
            description: "发布制度更新、风险提示和培训公告，含中英文示例内容。",
          },
        ],
      },
      stills: [
        {
          id: "rd-dashboard",
          title: "研发项目仪表盘",
          summary: "飞书多维表格研发项目仪表盘：任务状态、优先级、团队排名与任务关键词。",
          note: "飞书多维表格",
          imageAlt: "展示任务状态、优先级、团队排名与任务关键词图表的飞书多维表格研发项目仪表盘",
        },
        {
          id: "supplier-dashboard",
          title: "供应商看板",
          summary:
            "Data Science 课程作业，Tableau 看板：供应商销售额、月度销售、订单国家分布、供应商地理分布与平均建议零售价。",
          note: "Tableau · 课程作业",
          imageAlt: "Tableau 供应商看板：销售额、月度趋势、订单国家分布和供应商地理分布",
        },
      ],
    },
    contact: {
      headline: "联系方式",
      body: "寻找解决方案架构师与前线部署工程师岗位。",
      emailLabel: "邮箱",
      phoneLabel: "电话",
      backToTop: "返回顶部",
    },
    lightbox: {
      close: "关闭",
      previous: "上一张",
      next: "下一张",
      viewFull: "查看完整图片",
    },
  },
};
