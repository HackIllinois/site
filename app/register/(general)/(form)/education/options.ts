import majors from "@/modules/majors.json";
import schools from "@/modules/schools.json";
import states from "@/modules/states.json";
import countries from "@/modules/countries.json";
import degrees from "@/modules/degrees.json";

export const graduationYearOptions: string[] = [];
for (let i = 2030; i >= 1970; i -= 1) {
    graduationYearOptions.push(String(i));
}
graduationYearOptions.push("N/A");

export const locationOptions: string[] = states.concat(countries);

export const schoolOptions: string[] = schools.concat("N/A");

export const degreeOptions: string[] = degrees.concat("N/A");

export const majorOptions: string[] = majors.concat("N/A");
