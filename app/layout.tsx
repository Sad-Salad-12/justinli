import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

const defaultTitle = "Justin Li — Solutions Architect & FDE";
const defaultDescription =
  "Justin Li’s Solutions Architect and Forward Deployed Engineer portfolio, featuring applied AI experience, system design, and production delivery.";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const forwardedHost = requestHeaders.get("x-forwarded-host");
  const rawHost = forwardedHost ?? requestHeaders.get("host") ?? "justin.zl5626.chatgpt.site";
  const host = rawHost.split(",")[0].trim();
  const forwardedProtocol = requestHeaders.get("x-forwarded-proto");
  const protocol = forwardedProtocol?.split(",")[0].trim() ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const socialImage = new URL("/og.png", origin).toString();

  return {
    metadataBase: new URL(origin),
    title: defaultTitle,
    description: defaultDescription,
    openGraph: {
      title: defaultTitle,
      description: defaultDescription,
      type: "website",
      locale: "en_US",
      alternateLocale: ["zh_CN"],
      url: origin,
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
}

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
