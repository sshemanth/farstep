// Country pages (/study-abroad/[slug]).
// Facts here are general and slow-changing. Visa and work rules change often —
// review this file regularly and keep your counsellors' advice as the source of truth.

import type { Country as CourseCountry } from "./courses";

export type Tone = "sun" | "flamingo" | "mint" | "cobalt";

export type CountryPage = {
  slug: string;
  name: CourseCountry;
  code: string;
  tone: Tone;
  headline: string;
  intro: string;
  why: { title: string; body: string }[];
  facts: { label: string; value: string }[];
  cities: string[];
  faq: { q: string; a: string }[];
};

export const countryPages: CountryPage[] = [
  {
    slug: "uk",
    name: "United Kingdom",
    code: "UK",
    tone: "sun",
    headline: "Study in the UK",
    intro:
      "World-famous universities, shorter degrees and cities full of students from everywhere. Many master’s courses take just one year.",
    why: [
      { title: "Finish sooner", body: "Most taught master’s courses take one year, so you save time and living costs." },
      { title: "Respected degrees", body: "UK universities are known around the world, and employers recognise them." },
      { title: "Work after you graduate", body: "The Graduate route lets eligible students stay and work after their course." },
    ],
    facts: [
      { label: "Main intakes", value: "September and January" },
      { label: "Typical master’s length", value: "1 year" },
      { label: "Student visa", value: "Student visa" },
      { label: "Work after study", value: "Graduate route" },
      { label: "English tests accepted", value: "IELTS, PTE, TOEFL and others, by university" },
    ],
    cities: ["London", "Manchester", "Edinburgh", "Birmingham", "Leeds", "Glasgow"],
    faq: [
      {
        q: "Can I work while I study in the UK?",
        a: "Most students on a Student visa can work part-time during term, with limits set by the visa. Your counsellor will check the current rules for your course.",
      },
      {
        q: "Is the January intake a good option?",
        a: "Yes, for many courses. There are fewer choices than in September, but it can give you more time to prepare.",
      },
    ],
  },
  {
    slug: "usa",
    name: "United States",
    code: "USA",
    tone: "flamingo",
    headline: "Study in the USA",
    intro:
      "More universities and course options than anywhere else, with flexible degrees and a strong focus on research and industry links.",
    why: [
      { title: "Huge choice", body: "Thousands of universities, from big research schools to small colleges." },
      { title: "Flexible study", body: "Choose electives and change direction more easily than in many countries." },
      { title: "Practical training", body: "OPT lets eligible students gain work experience in their field after study." },
    ],
    facts: [
      { label: "Main intakes", value: "Fall (Aug–Sep) and Spring (Jan)" },
      { label: "Typical master’s length", value: "1.5 to 2 years" },
      { label: "Student visa", value: "F-1 visa" },
      { label: "Work after study", value: "OPT (with STEM extension for eligible fields)" },
      { label: "Tests often asked for", value: "TOEFL or IELTS; GRE or GMAT for some courses" },
    ],
    cities: ["Boston", "New York", "Los Angeles", "Chicago", "Pittsburgh", "Dallas"],
    faq: [
      {
        q: "Do I need the GRE?",
        a: "It depends on the university and course. Many have made it optional. We check each course on your shortlist.",
      },
      {
        q: "What happens at the F-1 visa interview?",
        a: "A consular officer asks about your study plans, funding and ties to home. We run mock interviews so you know what to expect.",
      },
    ],
  },
  {
    slug: "canada",
    name: "Canada",
    code: "CAN",
    tone: "mint",
    headline: "Study in Canada",
    intro:
      "Welcoming cities, high quality of life and many courses with co-op work placements built in.",
    why: [
      { title: "Learn and work", body: "Co-op programs mix study terms with paid work terms in your field." },
      { title: "Safe and welcoming", body: "Diverse cities with large international student communities." },
      { title: "Work after you graduate", body: "Eligible graduates can apply for a Post-Graduation Work Permit (PGWP)." },
    ],
    facts: [
      { label: "Main intakes", value: "September, January and May" },
      { label: "Typical master’s length", value: "1 to 2 years" },
      { label: "Student visa", value: "Study permit" },
      { label: "Work after study", value: "Post-Graduation Work Permit (PGWP)" },
      { label: "English tests accepted", value: "IELTS, TOEFL, PTE, CELPIP and others, by university" },
    ],
    cities: ["Toronto", "Vancouver", "Montreal", "Ottawa", "Waterloo", "Calgary"],
    faq: [
      {
        q: "Are there limits on study permits?",
        a: "Canada has caps and extra steps for some applicants, and rules change often. We check what applies to you before you apply.",
      },
      {
        q: "Does every course qualify for a PGWP?",
        a: "No. Eligibility depends on the school, the program and other rules. We check this when building your shortlist.",
      },
    ],
  },
  {
    slug: "australia",
    name: "Australia",
    code: "AUS",
    tone: "cobalt",
    headline: "Study in Australia",
    intro:
      "Top-ranked universities, a relaxed outdoor lifestyle and work rights while you study.",
    why: [
      { title: "Strong universities", body: "Several Australian universities rank among the best in the world." },
      { title: "Work while you study", body: "Student visa holders can usually work part-time, within set limits." },
      { title: "Stay after study", body: "Eligible graduates can apply for the Temporary Graduate visa (subclass 485)." },
    ],
    facts: [
      { label: "Main intakes", value: "February and July" },
      { label: "Typical master’s length", value: "1.5 to 2 years" },
      { label: "Student visa", value: "Student visa (subclass 500)" },
      { label: "Work after study", value: "Temporary Graduate visa (subclass 485)" },
      { label: "English tests accepted", value: "IELTS, PTE, TOEFL and others, by university" },
    ],
    cities: ["Sydney", "Melbourne", "Brisbane", "Adelaide", "Perth", "Canberra"],
    faq: [
      {
        q: "What is the Genuine Student requirement?",
        a: "Visa applicants need to show they are genuine students. We help you write clear answers that match your study plans.",
      },
      {
        q: "How much money do I need to show?",
        a: "The government sets a minimum amount for living costs, and it changes. Your counsellor will give you the current figure.",
      },
    ],
  },
  {
    slug: "ireland",
    name: "Ireland",
    code: "IRL",
    tone: "mint",
    headline: "Study in Ireland",
    intro:
      "An English-speaking country in the EU, home to the European offices of many global tech and pharma companies.",
    why: [
      { title: "One-year master’s", body: "Many taught master’s courses take one year." },
      { title: "Industry on your doorstep", body: "Dublin hosts the European bases of many big tech and pharma firms." },
      { title: "Stay after study", body: "Eligible graduates can stay to look for work under Stamp 1G." },
    ],
    facts: [
      { label: "Main intakes", value: "September (some courses in January)" },
      { label: "Typical master’s length", value: "1 year" },
      { label: "Student visa", value: "Study visa (Stage D)" },
      { label: "Work after study", value: "Third Level Graduate Programme (Stamp 1G)" },
      { label: "English tests accepted", value: "IELTS, PTE, TOEFL and others, by university" },
    ],
    cities: ["Dublin", "Cork", "Galway", "Limerick"],
    faq: [
      {
        q: "Is housing hard to find in Dublin?",
        a: "It can be. Start early. We share options and tips in your pre-departure briefing.",
      },
    ],
  },
  {
    slug: "germany",
    name: "Germany",
    code: "GER",
    tone: "sun",
    headline: "Study in Germany",
    intro:
      "Strong engineering and science, many English-taught master’s courses, and low or no tuition at many public universities.",
    why: [
      { title: "Low tuition", body: "Many public universities charge low or no tuition fees, though some states and schools now charge non-EU students." },
      { title: "Engineering powerhouse", body: "Known for engineering, computer science and applied research." },
      { title: "Stay to find work", body: "Graduates can apply for a residence permit to look for a job after study." },
    ],
    facts: [
      { label: "Main intakes", value: "Winter (October) and Summer (April)" },
      { label: "Typical master’s length", value: "2 years" },
      { label: "Student visa", value: "National visa for study" },
      { label: "Money proof", value: "Usually a blocked bank account" },
      { label: "Language", value: "English-taught courses available; German helps for daily life" },
    ],
    cities: ["Munich", "Berlin", "Aachen", "Hamburg", "Frankfurt", "Stuttgart"],
    faq: [
      {
        q: "Do I need to speak German?",
        a: "Not for English-taught courses. But learning some German makes daily life and part-time jobs much easier.",
      },
      {
        q: "What is a blocked account?",
        a: "A bank account that holds money for your living costs, which you can draw from each month. It is often needed for the visa.",
      },
    ],
  },
  {
    slug: "new-zealand",
    name: "New Zealand",
    code: "NZ",
    tone: "flamingo",
    headline: "Study in New Zealand",
    intro: "Safe, friendly and beautiful, with smaller classes and a practical style of teaching.",
    why: [
      { title: "Smaller classes", body: "More time with lecturers and a close-knit student community." },
      { title: "Safe and friendly", body: "A calm, welcoming place to live and study." },
      { title: "Work after study", body: "Eligible graduates can apply for a post-study work visa." },
    ],
    facts: [
      { label: "Main intakes", value: "February and July" },
      { label: "Typical master’s length", value: "1 to 2 years" },
      { label: "Student visa", value: "Fee Paying Student Visa" },
      { label: "Work after study", value: "Post-study work visa" },
      { label: "English tests accepted", value: "IELTS, PTE, TOEFL and others, by university" },
    ],
    cities: ["Auckland", "Wellington", "Christchurch", "Dunedin", "Hamilton"],
    faq: [
      {
        q: "Can I work while I study?",
        a: "Most student visas allow part-time work during study, with limits. We check the conditions for your course.",
      },
    ],
  },
];

export function getCountry(slug: string) {
  return countryPages.find((c) => c.slug === slug);
}

/** "the United Kingdom", "Canada" — for use inside sentences. */
export function placeName(name: string) {
  return name.startsWith("United") ? `the ${name}` : name;
}
