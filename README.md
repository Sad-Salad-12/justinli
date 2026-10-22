# Justin Li — Solutions & FDE Portfolio

白底、科技风的双语求职个人网站，面向 Solution Architect、Product Management 与 AI Operations 岗位。

网站包含：

- 英文优先、简体中文切换
- AI Advertisement Report Automation 产品演示与成果轮播
- Verba 本地优先 RAG 项目流程与验证数据
- Other works 第二项：可交互的广告投放看板（法国 / 意大利 / 英国，Search / P-Max）
- R&D Project Dashboards（Lark Base）真实项目快照
- 响应式移动端布局
- 联系方式与招聘导向的个人定位

线上地址：[sad-salad-12.github.io/justinli](https://sad-salad-12.github.io/justinli/)

## 本地运行

```sh
npm install
npm run dev
```

## 正式构建

```sh
npm run build
```

## 广告投放交互作品

`app/advertising-dashboard.tsx` 在法务作品之后嵌入 `public/works/ad-performance-demo/`，研发看板和 Tableau 作品依次保留。演示使用1092条匿名模拟记录，随 GitHub Pages 发布，无需飞书登录或本地服务器；不连接真实广告账户。支持国家与渠道筛选、日期比较、产品联动、排序、CSV导出和鼠标拖动 / 原生滚动。

页面语言通过 `?lang=en` / `?lang=zh` 传入。国家与投放类型由作品说明下的两组按钮控制。看板内移除标题栏、侧栏、面包屑及重复提示，父页面通过仅接收同源父窗口消息的接口更新报表；语言切换会保留所选国家和投放类型。配色保留浅蓝指标框、红涨绿跌、黑色表头、蓝橙热力图。

运行 `npm test` 执行生产构建及全部测试。若本地依赖使用跨目录符号链接，开发预览可用 `npm run dev -- --webpack`。
