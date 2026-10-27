"use client";

import dynamic from "next/dynamic";

// Three.js only runs in the browser, so load the scene on the client only.
const GlobeScene = dynamic(() => import("./globe-scene"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center" aria-hidden="true">
      <div className="aspect-square w-[62%] rounded-full bg-[#4252ff]" />
    </div>
  ),
});

export function Globe() {
  return <GlobeScene />;
}
