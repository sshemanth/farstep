// Popular universities shown on /universities and on each country page.
// Add, remove or reorder freely. `w` must be the university's official website (used for its logo too).

export type University = {
  /** name */ n: string;
  /** city */ city: string;
  /** country code, matches src/lib/countries.ts */ c: string;
  /** official website */ w: string;
};

export const universities: University[] = [
  // United Kingdom
  { n: "University of Oxford", city: "Oxford", c: "UK", w: "https://www.ox.ac.uk" },
  { n: "University of Cambridge", city: "Cambridge", c: "UK", w: "https://www.cam.ac.uk" },
  { n: "Imperial College London", city: "London", c: "UK", w: "https://www.imperial.ac.uk" },
  { n: "University College London (UCL)", city: "London", c: "UK", w: "https://www.ucl.ac.uk" },
  { n: "University of Edinburgh", city: "Edinburgh", c: "UK", w: "https://www.ed.ac.uk" },
  { n: "University of Manchester", city: "Manchester", c: "UK", w: "https://www.manchester.ac.uk" },
  { n: "King's College London", city: "London", c: "UK", w: "https://www.kcl.ac.uk" },
  { n: "University of Warwick", city: "Coventry", c: "UK", w: "https://warwick.ac.uk" },

  // United States
  { n: "Massachusetts Institute of Technology (MIT)", city: "Cambridge, MA", c: "USA", w: "https://www.mit.edu" },
  { n: "Stanford University", city: "Stanford, CA", c: "USA", w: "https://www.stanford.edu" },
  { n: "Harvard University", city: "Cambridge, MA", c: "USA", w: "https://www.harvard.edu" },
  { n: "Carnegie Mellon University", city: "Pittsburgh, PA", c: "USA", w: "https://www.cmu.edu" },
  { n: "University of California, Berkeley", city: "Berkeley, CA", c: "USA", w: "https://www.berkeley.edu" },
  { n: "Columbia University", city: "New York, NY", c: "USA", w: "https://www.columbia.edu" },
  { n: "Northeastern University", city: "Boston, MA", c: "USA", w: "https://www.northeastern.edu" },
  { n: "Arizona State University", city: "Tempe, AZ", c: "USA", w: "https://www.asu.edu" },

  // Canada
  { n: "University of Toronto", city: "Toronto", c: "CAN", w: "https://www.utoronto.ca" },
  { n: "McGill University", city: "Montreal", c: "CAN", w: "https://www.mcgill.ca" },
  { n: "University of British Columbia", city: "Vancouver", c: "CAN", w: "https://www.ubc.ca" },
  { n: "University of Waterloo", city: "Waterloo", c: "CAN", w: "https://uwaterloo.ca" },
  { n: "University of Alberta", city: "Edmonton", c: "CAN", w: "https://www.ualberta.ca" },
  { n: "McMaster University", city: "Hamilton", c: "CAN", w: "https://www.mcmaster.ca" },
  { n: "University of Ottawa", city: "Ottawa", c: "CAN", w: "https://www.uottawa.ca" },
  { n: "Western University", city: "London, ON", c: "CAN", w: "https://www.uwo.ca" },

  // Australia
  { n: "University of Melbourne", city: "Melbourne", c: "AUS", w: "https://www.unimelb.edu.au" },
  { n: "University of Sydney", city: "Sydney", c: "AUS", w: "https://www.sydney.edu.au" },
  { n: "UNSW Sydney", city: "Sydney", c: "AUS", w: "https://www.unsw.edu.au" },
  { n: "Monash University", city: "Melbourne", c: "AUS", w: "https://www.monash.edu" },
  { n: "Australian National University", city: "Canberra", c: "AUS", w: "https://www.anu.edu.au" },
  { n: "University of Queensland", city: "Brisbane", c: "AUS", w: "https://www.uq.edu.au" },
  { n: "University of Technology Sydney", city: "Sydney", c: "AUS", w: "https://www.uts.edu.au" },
  { n: "RMIT University", city: "Melbourne", c: "AUS", w: "https://www.rmit.edu.au" },

  // Ireland
  { n: "Trinity College Dublin", city: "Dublin", c: "IRL", w: "https://www.tcd.ie" },
  { n: "University College Dublin", city: "Dublin", c: "IRL", w: "https://www.ucd.ie" },
  { n: "University of Galway", city: "Galway", c: "IRL", w: "https://www.universityofgalway.ie" },
  { n: "University College Cork", city: "Cork", c: "IRL", w: "https://www.ucc.ie" },
  { n: "Dublin City University", city: "Dublin", c: "IRL", w: "https://www.dcu.ie" },
  { n: "University of Limerick", city: "Limerick", c: "IRL", w: "https://www.ul.ie" },

  // Germany
  { n: "Technical University of Munich", city: "Munich", c: "GER", w: "https://www.tum.de" },
  { n: "LMU Munich", city: "Munich", c: "GER", w: "https://www.lmu.de" },
  { n: "Heidelberg University", city: "Heidelberg", c: "GER", w: "https://www.uni-heidelberg.de" },
  { n: "RWTH Aachen University", city: "Aachen", c: "GER", w: "https://www.rwth-aachen.de" },
  { n: "Humboldt University of Berlin", city: "Berlin", c: "GER", w: "https://www.hu-berlin.de" },
  { n: "Free University of Berlin", city: "Berlin", c: "GER", w: "https://www.fu-berlin.de" },
  { n: "Karlsruhe Institute of Technology", city: "Karlsruhe", c: "GER", w: "https://www.kit.edu" },
  { n: "Technical University of Berlin", city: "Berlin", c: "GER", w: "https://www.tu.berlin" },

  // New Zealand
  { n: "University of Auckland", city: "Auckland", c: "NZ", w: "https://www.auckland.ac.nz" },
  { n: "University of Otago", city: "Dunedin", c: "NZ", w: "https://www.otago.ac.nz" },
  { n: "Victoria University of Wellington", city: "Wellington", c: "NZ", w: "https://www.wgtn.ac.nz" },
  { n: "University of Canterbury", city: "Christchurch", c: "NZ", w: "https://www.canterbury.ac.nz" },
  { n: "Massey University", city: "Palmerston North", c: "NZ", w: "https://www.massey.ac.nz" },
  { n: "Auckland University of Technology", city: "Auckland", c: "NZ", w: "https://www.aut.ac.nz" },
];

// Logos are loaded from each university's own website.
// To use a better logo file, put it in /public/logos and map it here:
//   "University of Example": "/logos/example.svg",
export const universityLogos: Record<string, string> = {};
// If a university asks you not to show its logo, add its name here.
export const hideLogo = new Set<string>([]);

// Links to QS TopUniversities for students who want to search further.
export const qsLinks = {
  universities: "https://www.topuniversities.com/universities",
  programs: "https://www.topuniversities.com/programs",
  rankings: "https://www.topuniversities.com/world-university-rankings",
};

export function universitiesIn(code: string) {
  return universities.filter((u) => u.c === code);
}

const SKIP = new Set(["of", "the", "and", "at", "for", "in", "de", "&", "-"]);

/** Two-letter badge text, e.g. "University of Melbourne" -> "UM". */
export function initials(name: string) {
  const words = name
    .replace(/[(),.]/g, " ")
    .split(/\s+/)
    .filter((w) => w && !SKIP.has(w.toLowerCase()));
  return words
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}
