import majors from "@/modules/majors.json";
import schools from "@/modules/schools.json";
import states from "@/modules/states.json";
import countries from "@/modules/countries.json";

export const OTHER_PLEASE_SPECIFY = "Other (please specify)";
export const OTHER_VC_PLEASE_SPECIFY =
    "Another option not listed (please specify)";
export const OTHER_MAJOR_OPTION = "Other (please specify)";

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

export const numHackathonOptions: string[] = ["0", "1", "2-3", "4+"];

export const countryOptions: string[] = countries;

export const stateOptions: string[] = [...states, "Other"];

export const schoolOptions: string[] = schools;

export const studyLevelOptions: string[] = [
    "Less than Secondary / High School",
    "Secondary / High School",
    "Undergraduate University (2 year - community college or similar)",
    "Undergraduate University (3+ year)",
    "Graduate University (Masters, Professional, Doctoral, etc)",
    "Code School / Bootcamp",
    "Other Vocational / Trade Program or Apprenticeship",
    "Post Doctorate",
    "Other",
    "I'm not currently a student"
];

const graduationSeasons = ["Fall", "Winter", "Spring"] as const;
const graduationYears: string[] = [];
for (let year = 2031; year >= 2026; year -= 1) {
    for (const season of graduationSeasons) {
        graduationYears.push(`${season} ${year}`);
    }
}
graduationYears.push("N/A");
export const graduationYearOptions: string[] = graduationYears;

export const majorOptions: string[] = majors;

export const underrepresentedOptions: string[] = ["Yes", "No", "Unsure"];

export const attributionOptions: string[] = [
    "HackIllinois Newsletter",
    "Instagram",
    "Facebook",
    "Flyers",
    "Discord",
    "Promotional Email",
    "LinkedIn",
    "Word of Mouth",
    OTHER_PLEASE_SPECIFY
];

export const eventInterestOptions: string[] = [
    "Attending Technical Workshops",
    "Winning Prizes",
    "Mini Events & Game Tournaments",
    "Working with Mentors",
    "Company Q&A’s & Networking",
    "Meeting New People",
    OTHER_PLEASE_SPECIFY
];

export const vcInvolvementOptions: string[] = [
    "Meeting/Connecting with VCs",
    "Exploring a scout role",
    "Considering VC part-time or full-time in the future",
    "Currently pursuing VC part-time or full-time",
    "Connecting with other founders",
    "Just curious and want to learn how VC works",
    OTHER_VC_PLEASE_SPECIFY
];

export const areaInterestRankOptions: string[] = ["1", "2"];

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
