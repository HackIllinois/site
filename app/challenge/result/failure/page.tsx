import { redirect } from "next/navigation";

// Saloon Rush shows every result inline on the challenge page.
export default function ChallengeFailure() {
    redirect("/challenge/description");
}
