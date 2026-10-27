export type Service = {
  id: string;
  title: string;
  short: string;
  long: string;
  includes: string[];
  forWho: string;
  tone: "sun" | "flamingo" | "mint" | "white";
};

export const services: Service[] = [
  {
    id: "applications",
    title: "University applications",
    short: "Shortlists, statements of purpose, CVs and deadlines, handled with you.",
    long: "We help you choose where to apply and then build each application with you. Your counsellor reviews every draft and keeps track of every deadline, so nothing slips.",
    includes: [
      "Course and university shortlist based on your grades, budget and goals",
      "Statement of purpose and CV reviews, line by line",
      "Advice on recommendation letters",
      "Deadline tracking across every application",
      "Help comparing offers and accepting the right one",
    ],
    forWho: "Students applying for bachelor's, master's or PhD programs.",
    tone: "sun",
  },
  {
    id: "test-prep",
    title: "Test prep",
    short: "IELTS, TOEFL, PTE, Duolingo English Test, GRE, GMAT and SAT.",
    long: "Live classes, mock tests in real exam conditions and a study plan built around your target score and your test date.",
    includes: [
      "English tests: IELTS, TOEFL, PTE and Duolingo English Test",
      "Admission tests: GRE, GMAT and SAT",
      "Full-length mock tests with feedback",
      "Speaking and writing practice with a tutor",
      "A week-by-week study plan",
    ],
    forWho: "Anyone who needs a test score for their application or visa.",
    tone: "flamingo",
  },
  {
    id: "visas",
    title: "Student visas",
    short: "Checklists, document reviews and mock visa interviews.",
    long: "Visa rules change often. We keep up so you don't have to, and we check your file before you submit it.",
    includes: [
      "A document checklist for your country and course",
      "Review of your financial documents",
      "Mock visa interviews where they are part of the process",
      "Help booking appointments and biometrics",
      "Pre-departure briefing: housing, banking, phone, first week",
    ],
    forWho: "Students with an offer who are getting ready to travel.",
    tone: "mint",
  },
  {
    id: "loans",
    title: "Education loans",
    short: "Compare loans from partner lenders and get help with the paperwork.",
    long: "We explain your options in plain words, compare offers side by side and help you prepare the documents lenders ask for.",
    includes: [
      "Secured and unsecured loan options explained",
      "Side-by-side comparison of lender offers",
      "Help preparing loan documents",
      "A budget for tuition, rent and living costs",
      "Loan sanction letters for your visa file",
    ],
    forWho: "Students and families planning how to pay for study abroad.",
    tone: "white",
  },
];

export const journey = [
  {
    step: 1,
    title: "Find the right course",
    body: "We match your grades, budget and goals to courses and countries. Start with the Course finder, then refine it with a counsellor.",
    result: "A shortlist you trust",
    tone: "sun",
  },
  {
    step: 2,
    title: "Get your test scores",
    body: "IELTS, TOEFL, PTE, GRE or GMAT. Live classes, mock tests and a plan that fits around school or work.",
    result: "A score plan with a test date",
    tone: "flamingo",
  },
  {
    step: 3,
    title: "Send strong applications",
    body: "Help with your statement of purpose, CV and recommendation letters, and every deadline tracked.",
    result: "Applications in on time",
    tone: "mint",
  },
  {
    step: 4,
    title: "Sort out your funding",
    body: "Compare education loans from partner lenders, plan your budget and get help with the paperwork.",
    result: "A clear funding plan",
    tone: "white",
  },
  {
    step: 5,
    title: "Get your visa and go",
    body: "Document checklists, mock visa interviews and a pre-departure briefing, so you land ready.",
    result: "Visa filed, bags packed",
    tone: "sun",
  },
] as const;

export const faqs = [
  {
    q: "Is the first session really free?",
    a: "Yes. Your first session with a counsellor is free, with no obligation. You leave with a clear idea of your options either way.",
  },
  {
    q: "When should I start?",
    a: "Ideally 12 to 18 months before your intake. That leaves time for tests, applications and your visa. If your intake is sooner, talk to us anyway — we will tell you honestly what is still possible.",
  },
  {
    q: "Can you guarantee an offer or a visa?",
    a: "No one can, and you should be careful of anyone who says they can. Universities and visa offices make those decisions. What we do is help you send the strongest application you can.",
  },
  {
    q: "Do I have to use all of your services?",
    a: "No. Many students come to us for one thing, like test prep or a visa check. Pick what you need.",
  },
  {
    q: "Can my parents join the sessions?",
    a: "Of course. Funding and visa sessions often go better when the whole family is there.",
  },
];
