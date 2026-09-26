import type { Metadata } from "next";
import "./globals.css";
import "./variant-v2.css";
import "./verba-demo.css";
import "./spacing.css";
import "./orbit-motion.css";

const defaultTitle = "Justin Li — Solutions Architect & FDE";
const defaultDescription =
  "Justin Li — AI product and solution design. Projects: AI ad-report automation, Verba, Lark and Tableau dashboards.";
const siteUrl = new URL("https://sad-salad-12.github.io/justinli/");
const socialImage = new URL("og.png", siteUrl).toString();

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: defaultTitle,
  description: defaultDescription,
  alternates: {
    canonical: "https://sad-salad-12.github.io/justinli/",
  },
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    type: "website",
    locale: "en_US",
    alternateLocale: ["zh_CN"],
    url: siteUrl,
    siteName: "Justin Li — Solutions & FDE",
    images: [
      {
        url: socialImage,
        width: 1731,
        height: 909,
        alt: "Justin Li — Complex systems, made useful.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [socialImage],
  },
};

// Decides before first paint whether this visit gets the intro: first visit only, English,
// no deep link, no reduced motion, not a crawler. `?intro` forces it. If the intro script
// never starts, the class is removed so the page cannot stay hidden.
const introGate = `(function(){try{var d=document.documentElement,s=window.localStorage,f=/[?&]intro\\b/.test(location.search),b=navigator.webdriver||/bot|crawl|spider|slurp|headless|lighthouse|preview/i.test(navigator.userAgent);if(f||(!b&&!s.getItem("portfolio-intro-seen")&&s.getItem("portfolio-language")!=="zh"&&!location.hash&&!matchMedia("(prefers-reduced-motion: reduce)").matches)){d.classList.add("intro");setTimeout(function(){if(!window.__introStarted)d.classList.remove("intro")},4000)}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introGate }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
