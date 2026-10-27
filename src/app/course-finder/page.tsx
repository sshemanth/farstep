import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/page-hero";
import { CourseFinder } from "@/components/course-finder";

export const metadata: Metadata = {
  title: "Course finder",
  description: "Search study abroad courses by country, level and subject. Free, no sign-up.",
};

export default function CourseFinderPage() {
  return (
    <>
      <PageHero
        tone="cobalt"
        title="Find your course."
        lede="Search by subject, university or country. When something looks right, ask a counsellor about entry requirements, costs and intakes."
      />
      <Suspense fallback={<div className="mx-auto h-96 max-w-7xl px-4 sm:px-6" />}>
        <CourseFinder />
      </Suspense>
    </>
  );
}
