import { APIError } from "./error";
import { RegistrationData, RegistrationType } from "./types";

export function handleError(body: {
    message: string;
    status: number;
    type: string;
}) {
    if (body && body.message) {
        alert(body.message);
    } else {
        alert(body);
    }
    throw new APIError(body);
}

export function registrationToAPI(
    registration: RegistrationData
): RegistrationType {
    return {
        ...registration,
        requestedTravelReimbursement:
            registration.requestedTravelReimbursement[0] === "YES",
        gradYear:
            registration.gradYear === ""
                ? 0
                : Number.parseInt(registration.gradYear, 10),
        considerForGeneral: registration.considerForGeneral
            ? registration.considerForGeneral[0] === "YES"
            : undefined
    };
}

export function registrationFromAPI(
    registration: RegistrationType
): RegistrationData {
    // Convert boolean requested travel reimbursement to yes/no selection
    const requestedTravelReimbursement = [];
    if (registration.requestedTravelReimbursement !== undefined) {
        requestedTravelReimbursement.push(
            registration.requestedTravelReimbursement ? "YES" : "NO"
        );
    }

    return {
        ...registration,
        gradYear: registration.gradYear === 0 ? "" : `${registration.gradYear}`,
        requestedTravelReimbursement,
        considerForGeneral:
            registration.considerForGeneral === undefined
                ? undefined
                : registration.considerForGeneral
                  ? ["YES"]
                  : ["NO"],
        travelAcknowledge: [], // Must default to an empty array for formik
        reviewedInformationAcknowledge: [], // Must default to an empty array for formik
        codeOfConductAcknowledge: [] // Must default to an empty array for formik
    };
}
