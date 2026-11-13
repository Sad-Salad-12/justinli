"use client";

import { useRef, useState } from "react";
import type { DashboardCopy, Language } from "./portfolio-content";

const campaigns = [
  { code: "Search", label: "Search" },
  { code: "PMax", label: "P-Max" },
] as const;

type AdvertisingDashboardProps = {
  copy: DashboardCopy;
  language: Language;
  basePath: string;
};

export function AdvertisingDashboard({ copy, language, basePath }: AdvertisingDashboardProps) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [country, setCountry] = useState("IT");
  const [channel, setChannel] = useState("Search");

  // The page owns report selection; the same-origin demo validates each message.
  const updateReport = (nextCountry: string, nextChannel: string) => {
    setCountry(nextCountry);
    setChannel(nextChannel);
    frame.current?.contentWindow?.postMessage(
      { type: "ad-demo:set-report", country: nextCountry, channel: nextChannel },
      window.location.origin,
    );
  };

  return (
    <figure className="figure">
      <div className="toolbar">
        <fieldset>
          <legend>{copy.countryLabel}</legend>
          <div className="segmented">
            {copy.countries.map((item) => (
              <button
                type="button"
                key={item.code}
                aria-pressed={country === item.code}
                onClick={() => updateReport(item.code, channel)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend>{copy.campaignLabel}</legend>
          <div className="segmented">
            {campaigns.map((item) => (
              <button
                type="button"
                key={item.code}
                aria-pressed={channel === item.code}
                onClick={() => updateReport(country, item.code)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </fieldset>
      </div>
      <div className="mat">
        <iframe
          ref={frame}
          key={language}
          className="frame dashboard-frame"
          src={`${basePath}/works/ad-performance-demo/index.html?lang=${language}&v=4`}
          title={copy.frameTitle}
          loading="lazy"
          tabIndex={0}
          onLoad={() => updateReport(country, channel)}
        />
      </div>
    </figure>
  );
}
