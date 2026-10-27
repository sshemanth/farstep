// Stats, partner universities and student reviews.
//
// Everything below is SAMPLE content so you can see the design.
// While `isSample` is true, these sections only appear when you run `npm run dev`
// (with a "Sample" label) and are HIDDEN on the live site, so no made-up
// numbers, partnerships or reviews are ever published.
//
// To go live: replace the data with your real figures, partner universities
// and real student reviews (with their permission), then set `isSample = false`.

export const isSample = true;

/** True when the proof sections should render. */
export const showProof = !isSample || process.env.NODE_ENV !== "production";

export const stats = [
  { value: 1200, suffix: "+", label: "Students placed" },
  { value: 450, suffix: "+", label: "Partner universities" },
  { value: 7, suffix: "", label: "Study destinations" },
  { value: 15, suffix: "", label: "Years of counselling" },
];

// Partner universities. Add `logo: "/partners/name.svg"` to show a logo image
// (put the file in /public/partners). Only list universities you have an agreement with.
export const partners: { name: string; logo?: string }[] = [
  { name: "Sample University One" },
  { name: "Sample Institute of Technology" },
  { name: "Sample College London" },
  { name: "Sample State University" },
  { name: "University of Sample" },
  { name: "Sample Tech Munich" },
  { name: "Sample University Dublin" },
  { name: "Sample University Toronto" },
];

export type Review = {
  name: string;
  course: string;
  university: string;
  countryCode: string;
  quote: string;
};

export const reviews: Review[] = [
  {
    name: "Student name",
    course: "Master’s course name",
    university: "University name",
    countryCode: "UK",
    quote:
      "Your student’s own words go here. Ask them what was hardest about applying, and how your team helped. Two or three sentences works best.",
  },
  {
    name: "Student name",
    course: "Master’s course name",
    university: "University name",
    countryCode: "CAN",
    quote:
      "A second real review goes here. Specific details — a deadline you saved, a visa interview you prepared them for — make reviews believable.",
  },
  {
    name: "Student name",
    course: "Bachelor’s course name",
    university: "University name",
    countryCode: "AUS",
    quote: "A third real review goes here. Always get the student’s permission before publishing their name and words.",
  },
  {
    name: "Student name",
    course: "Master’s course name",
    university: "University name",
    countryCode: "USA",
    quote: "A fourth real review goes here. Short quotes from different countries show the range of students you help.",
  },
];
