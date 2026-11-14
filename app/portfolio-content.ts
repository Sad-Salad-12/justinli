export type Language = "en" | "zh";

export type LocalizedWork = {
  title: string;
  summary: string;
  imageAlt: string;
};

export type LocalizedExperience = {
  number: string;
  title: string;
  meta?: string;
  metaNote?: string;
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
      location: "New York, NY",
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
      disciplines: ["Solutions Architect", "Product Management", "AI Operations"],
      headline: "AI product and",
      headlineAccent: "solution design.",
      bodyLineOne: "I write PRDs, turn manual workflows into AI pipelines,",
      bodyLineTwo: " and build and test prototypes with developers.",
      primaryAction: "View experience",
      secondaryAction: "Contact",
    },
    experience: {
      label: "",
      headline: "Work experience",
      media: {
        demoLabel: "Product demo",
        demoCaption: "Input: weekly ad data folder. Output: editable PowerPoint report.",
        outputsLabel: "Generated slides",
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
          title: "AI Advertisement Report Automation Project",
          meta: "Product Lead · Virtual · May 2025 — Aug 2025",
          metaNote: "2 alpha versions · 1-month build cycle",
          media: "ad-report",
          bullets: [
            "Wrote the PRDs. Broke a manual Meta and Google Ads reporting workflow into data inputs, transformation rules, slide templates and few-shot examples for an LLM report generator.",
            "Built and tested two alpha versions in one month with a University of Chicago developer; improved output quality from peer feedback.",
          ],
          metrics: [],
        },
        {
          number: "02",
          title: "Verba — AI solution design tool",
          meta: "",
          media: "verba-demo",
          bullets: [
            "Input: a client brief. Output: a solution write-up with cited sources and a three-slide presentation.",
            "English and Chinese. Five built-in examples (school, course, support, restaurant, sales) plus live generation with an LLM.",
          ],
          metrics: [
            { value: "300+", label: "Agent runs" },
            { value: "30+", label: "Users provided feedback" },
          ],
        },
      ],
    },
    work: {
      label: "",
      headline: "Other works",
      previewAction: "View full image",
      items: [
        {
          title: "R&D Project Dashboards",
          summary:
            "R&D project dashboard in Lark Base: task status, priority, team ranking and task keywords.",
          imageAlt:
            "Lark Base R&D project dashboard showing task status, priority, team ranking, and task keyword charts",
        },
      ],
    },
    contact: {
      label: "New York, NY",
      headline: "Contact",
      body: "Open to Solutions Architect and Forward Deployed Engineer roles.",
      emailLabel: "Email",
      phoneLabel: "Phone",
      backToTop: "Back to top",
    },
  },
  zh: {
    meta: {
      title: "李泽霆 — 解决方案架构师 & FDE",
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
      disciplines: ["解决方案架构师", "产品管理", "产品运营"],
      headline: "AI 产品",
      headlineAccent: "与方案设计",
      bodyLineOne: "写 PRD，将人工流程转为 AI pipeline，",
      bodyLineTwo: "并与开发共同搭建、测试原型。",
      primaryAction: "查看经历",
      secondaryAction: "联系",
    },
    experience: {
      label: "",
      headline: "工作经历",
      media: {
        demoLabel: "产品演示",
        demoCaption: "输入：周度广告数据文件夹。输出：可编辑的 PowerPoint 报告。",
        outputsLabel: "生成的幻灯片",
        carouselLabel: "自动生成的广告报告幻灯片",
        previousSlide: "上一张",
        nextSlide: "下一张",
        openFullscreen: "放大查看",
        closeFullscreen: "关闭大图",
        fullscreenLabel: "广告报告幻灯片大图",
        verba: {
          title: "Verba 在线演示：方案与幻灯片",
        },
        slides: [
          {
            title: "品牌 A 广告效果",
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
          title: "AI 广告报告自动化项目",
          meta: "产品负责人 · 远程 · 2025 年 5 月—8 月",
          metaNote: "2 个 Alpha 版 · 1 个月开发周期",
          media: "ad-report",
          bullets: [
            "写 PRD，将 Meta 和 Google Ads 的人工报告流程拆成数据输入、转换规则、幻灯片模板和 few-shot 示例，用于 LLM 生成报告。",
            "与芝加哥大学的一位开发者在一个月内完成 2 个 Alpha 版的搭建和测试，并根据试用反馈优化输出质量。",
          ],
          metrics: [],
        },
        {
          number: "02",
          title: "Verba — AI 方案设计工具",
          meta: "",
          media: "verba-demo",
          bullets: [
            "输入：客户 brief。输出：带引用来源的方案说明和 3 页 PPT。",
            "中英文双语；内置 5 个示例（学校、课程、客服、餐饮、销售），也支持用 LLM 实时生成方案。",
          ],
          metrics: [
            { value: "300+", label: "次 Agent 运行" },
            { value: "30+", label: "位用户提供反馈" },
          ],
        },
      ],
    },
    work: {
      label: "",
      headline: "其他作品",
      previewAction: "查看完整图片",
      items: [
        {
          title: "研发项目仪表盘",
          summary: "飞书多维表格研发项目仪表盘：任务状态、优先级、团队排名和任务关键词。",
          imageAlt: "展示任务状态、优先级、团队排名与任务关键词图表的飞书多维表格研发项目仪表盘",
        },
      ],
    },
    contact: {
      label: "美国纽约",
      headline: "联系方式",
      body: "求职方向：解决方案架构师 / Forward Deployed Engineer（FDE）。",
      emailLabel: "邮箱",
      phoneLabel: "电话",
      backToTop: "返回顶部",
    },
  },
};
