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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
