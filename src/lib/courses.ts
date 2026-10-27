// Courses shown on the Course finder page. Add, remove or edit courses here.

export type Course = {
  id: string;
  title: string;
  university: string;
  city: string;
  country: Country;
  level: "Bachelor's" | "Master's";
  subject: Subject;
};

export const countries = [
  "United Kingdom",
  "United States",
  "Canada",
  "Australia",
  "Ireland",
  "Germany",
  "New Zealand",
] as const;
export type Country = (typeof countries)[number];

export const subjects = [
  "Computing & AI",
  "Data & Analytics",
  "Business",
  "Engineering",
  "Science",
] as const;
export type Subject = (typeof subjects)[number];

export const levels = ["Bachelor's", "Master's"] as const;

export const courses: Course[] = [
  { id: "uts-mai", title: "Master of Artificial Intelligence", university: "University of Technology Sydney", city: "Sydney", country: "Australia", level: "Master's", subject: "Computing & AI" },
  { id: "unimelb-mds", title: "Master of Data Science", university: "University of Melbourne", city: "Melbourne", country: "Australia", level: "Master's", subject: "Data & Analytics" },
  { id: "unsw-mit", title: "Master of Information Technology", university: "UNSW Sydney", city: "Sydney", country: "Australia", level: "Master's", subject: "Computing & AI" },
  { id: "monash-mba", title: "Master of Business Analytics", university: "Monash University", city: "Melbourne", country: "Australia", level: "Master's", subject: "Data & Analytics" },
  { id: "unimelb-bsc", title: "Bachelor of Science", university: "University of Melbourne", city: "Melbourne", country: "Australia", level: "Bachelor's", subject: "Science" },
  { id: "ed-msc-ai", title: "MSc Artificial Intelligence", university: "University of Edinburgh", city: "Edinburgh", country: "United Kingdom", level: "Master's", subject: "Computing & AI" },
  { id: "imperial-msc-computing", title: "MSc Computing", university: "Imperial College London", city: "London", country: "United Kingdom", level: "Master's", subject: "Computing & AI" },
  { id: "man-msc-ds", title: "MSc Data Science", university: "University of Manchester", city: "Manchester", country: "United Kingdom", level: "Master's", subject: "Data & Analytics" },
  { id: "ucl-msc-ba", title: "MSc Business Analytics", university: "University College London", city: "London", country: "United Kingdom", level: "Master's", subject: "Business" },
  { id: "leeds-msc-ib", title: "MSc International Business", university: "University of Leeds", city: "Leeds", country: "United Kingdom", level: "Master's", subject: "Business" },
  { id: "ucl-bsc-cs", title: "BSc Computer Science", university: "University College London", city: "London", country: "United Kingdom", level: "Bachelor's", subject: "Computing & AI" },
  { id: "cmu-mism", title: "MS in Information Systems Management", university: "Carnegie Mellon University", city: "Pittsburgh", country: "United States", level: "Master's", subject: "Business" },
  { id: "neu-mscs", title: "MS in Computer Science", university: "Northeastern University", city: "Boston", country: "United States", level: "Master's", subject: "Computing & AI" },
  { id: "usc-mscs", title: "MS in Computer Science", university: "University of Southern California", city: "Los Angeles", country: "United States", level: "Master's", subject: "Computing & AI" },
  { id: "columbia-msds", title: "MS in Data Science", university: "Columbia University", city: "New York", country: "United States", level: "Master's", subject: "Data & Analytics" },
  { id: "asu-bscs", title: "BS in Computer Science", university: "Arizona State University", city: "Tempe", country: "United States", level: "Bachelor's", subject: "Computing & AI" },
  { id: "uoft-meng-ece", title: "MEng Electrical & Computer Engineering", university: "University of Toronto", city: "Toronto", country: "Canada", level: "Master's", subject: "Engineering" },
  { id: "ubc-mds", title: "Master of Data Science", university: "University of British Columbia", city: "Vancouver", country: "Canada", level: "Master's", subject: "Data & Analytics" },
  { id: "waterloo-meng-ece", title: "MEng Electrical & Computer Engineering", university: "University of Waterloo", city: "Waterloo", country: "Canada", level: "Master's", subject: "Engineering" },
  { id: "ubc-bcom", title: "Bachelor of Commerce", university: "University of British Columbia", city: "Vancouver", country: "Canada", level: "Bachelor's", subject: "Business" },
  { id: "tcd-msc-cs", title: "MSc Computer Science", university: "Trinity College Dublin", city: "Dublin", country: "Ireland", level: "Master's", subject: "Computing & AI" },
  { id: "ucd-msc-ba", title: "MSc Business Analytics", university: "University College Dublin", city: "Dublin", country: "Ireland", level: "Master's", subject: "Data & Analytics" },
  { id: "tum-msc-informatics", title: "MSc Informatics", university: "Technical University of Munich", city: "Munich", country: "Germany", level: "Master's", subject: "Computing & AI" },
  { id: "rwth-msc-cs", title: "MSc Computer Science", university: "RWTH Aachen University", city: "Aachen", country: "Germany", level: "Master's", subject: "Computing & AI" },
  { id: "auckland-mds", title: "Master of Data Science", university: "University of Auckland", city: "Auckland", country: "New Zealand", level: "Master's", subject: "Data & Analytics" },
];
