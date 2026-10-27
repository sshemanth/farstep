import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/page-hero";
import { UniversitySearch } from "@/components/university-search";
import { CtaBand } from "@/components/cta-band";
import { universities } from "@/lib/universities";

export const metadata: Metadata = {
  title: "Universities",
  description:
    "Browse universities and colleges in the UK, USA, Canada, Australia, Ireland, Germany and New Zealand.",
};

export default function UniversitiesPage() {
  const total = Math.floor(universities.length / 100) * 100;
  return (
    <>
      <PageHero
        tone="cobalt"
        title="Find your university."
        lede={`Browse ${total.toLocaleString("en")}+ universities and colleges across 7 countries. Found one you like? Ask a counsellor if it’s a good fit for you.`}
      />
      <Suspense fallback={<div className="mx-auto h-96 max-w-7xl px-4 sm:px-6" />}>
        <UniversitySearch />
      </Suspense>
      <CtaBand title="Not sure which university is right?" />
    </>
  );
}
