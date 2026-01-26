import majors from "@/modules/majors.json";
import schools from "@/modules/schools.json";
import states from "@/modules/states.json";
import countries from "@/modules/countries.json";

export const ageOptions: string[] = [];
for (let i = 18; i < 25; i += 1) {
    ageOptions.push(String(i));
}
ageOptions.push("25+");

export const genderOptions: string[] = [
    "Man",
    "Woman",
    "Non-Binary",
    "Prefer to Self-Describe",
    "Prefer Not to Answer"
];

export const raceOptions: string[] = [
    "American Indian or Alaska Native",
    "Arab or Middle Eastern",
    "Black or African American",
    "East Asian",
    "Hispanic or Latino",
    "Native Hawaiian or Pacific Islander",
    "South East Asian",
    "South Asian",
    "White",
    "Other",
    "Prefer Not To Answer"
];

export const numHackathonOptions: string[] = ["0", "1", "2-3", "4+"];

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

export const graduationYearOptions: string[] = [
    "Spring 2026",
    "Fall 2026",
    "Winter 2026",
    "Spring 2027",
    "Fall 2027",
    "Winter 2027",
    "Spring 2028",
    "Fall 2028",
    "Winter 2028",
    "Spring 2029",
    "Fall 2029",
    "Winter 2029",
    "Spring 2030",
    "After Spring 2030"
];

export const majorOptions: string[] = majors;

export const underrepresentedOptions: string[] = ["Yes", "No", "Unsure"];

export const attributionOptions: string[] = [
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

export const eventInterestOptions: string[] = [
    "Attending technical workshops",
    "Winning Prizes",
    "Mini Events & Game Tournaments",
    "Working with mentors",
    "Company Q&A's & Networking",
    "Meeting new people",
    "Other"
];

export const travelReimbursementOptions: string[] = ["Yes", "No"];

export const dietaryRestrictionsOptions: string[] = [
    "Vegetarian",
    "Vegan",
    "Pescetarian",
    "Gluten-Free",
    "Kosher",
    "Halal",
    "Dairy-Free",
    "No Beef",
    "Peanuts",
    "Treenuts",
    "Eggs",
    "Soy",
    "Shellfish",
    "Fish",
    "Sesame",
    "Other"
];
