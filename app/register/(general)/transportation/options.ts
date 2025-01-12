import { CheckboxOption } from "@/components/Form/Checkboxes/Checkboxes";

export const travelAcknowledgeOptions = [
    {
        label: "I acknowledge",
        value: "YES",
        isRadio: true
    }
] satisfies CheckboxOption[];

export const travelReimbursementOptions = [
    {
        label: "Yes",
        value: "YES",
        isRadio: true
    },
    {
        label: "No",
        value: "NO",
        isRadio: true
    }
] satisfies CheckboxOption[];
