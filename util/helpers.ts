import { APIError } from "./error";

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
