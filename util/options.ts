import majors from "@/modules/majors.json";
import schools from "@/modules/schools.json";
import states from "@/modules/states.json";
import countries from "@/modules/countries.json";

export const ageOptions: string[] = [];
for (let i = 18; i < 30; i += 1) {
    ageOptions.push(String(i));
}
ageOptions.push("30+");

export const genderOptions: string[] = [
    "Man",
    "Woman",
    "Non-Binary",
    "Prefer to Self-Describe",
    "Prefer Not to Answer"
];

export const raceOptions: string[] = [
    "Asian Indian",
    "Black or African",
    "Chinese",
    "Filipino",
    "Guamanian or Chamorro",
    "Hispanic / Latino / Spanish Origin",
    "Japanese",
    "Korean",
    "Middle Eastern",
    "Native American or Alaskan Native",
    "Native Hawaiian",
    "Samoan",
    "Vietnamese",
    "White",
    "Other Asian (Thai, Cambodian, etc)",
    "Other Pacific Islander",
    "Other",
    "Prefer Not to Answer"
];

export const countryOptions: string[] = countries.concat("N/A");

export const stateOptions: string[] = states.concat("N/A");

export const schoolOptions: string[] = schools.concat("N/A");

export const studyLevelOptions: string[] = [
    "Undergraduate University (2 year - community college or similar)",
    "Undergraduate University (3+ year)",
    "Graduate University (Masters, Professional, Doctoral, etc)",
    "Other",
    "Prefer not to answer"
];

export const graduationYearOptions: string[] = [];
graduationYearOptions.push("Spring 2026");
for (let i = 2027; i <= 2030; i += 1) {
    graduationYearOptions.push("Fall " + String(i));
    graduationYearOptions.push("Winter " + String(i));
    graduationYearOptions.push("Spring " + String(i));
}
graduationYearOptions.push("After Spring 2030");

export const majorOptions: string[] = majors;
// .concat(
//     "Undecided/Undeclared",
//     "My school does not offer majors or primary areas of study",
//     "Prefer not to answer"
// );

export const underrepresentedOptions: string[] = ["Yes", "No", "Unsure"];

export const hackOutreachOptions: string[] = [
    "HackIllinois Newsletter",
    "Instagram",
    "Facebook",
    "UIUC Flyers",
    "Discord",
    "Promotional Emails",
    "LinkedIn",
    "Word of Mouth",
    "Other"
];

export const hackInterestOptions: string[] = [
    "Attending technical workshops",
    "Winning Prizes",
    "Mini Events & Game Tournaments",
    "Working with mentors",
    "Company Q&A's & Networking",
    "Meeting new people",
    "Other"
];

export const travelReimbursementOptions: string[] = ["Yes", "No"];
