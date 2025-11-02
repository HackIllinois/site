import majors from "@/modules/majors.json";
import schools from "@/modules/schools.json";
import states from "@/modules/states.json";
import countries from "@/modules/countries.json";
import degrees from "@/modules/degrees.json";

export const ageOptions: string[] = [];
for (let i = 18; i < 75; i += 1) {
    ageOptions.push(String(i));
}
ageOptions.push("75+");

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
    "Less than Secondary/High School",
    "Secondary/High School",
    "Undergraduate University (2 year - community college or similar)",
    "Undergraduate University (3+ year)",
    "Graduate University (Masters, Professional, Doctoral, etc)",
    "Code School/Bootcamp",
    "Other Vocational/Trade Program or Apprenticeship",
    "Post Doctorate",
    "Other",
    "I'm not currently a student",
    "Prefer not to answer"
];

export const graduationYearOptions: string[] = [];
graduationYearOptions.push("N/A");
for (let i = 2030; i >= 1970; i -= 1) {
    graduationYearOptions.push("Fall " + String(i));
    graduationYearOptions.push("Winter " + String(i));
    graduationYearOptions.push("Spring " + String(i));
}

export const majorOptions: string[] = majors.concat(
    "Undecided/Undeclared",
    "My school does not offer majors or primary areas of study",
    "Prefer not to answer"
);

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
