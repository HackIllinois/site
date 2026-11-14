import { redirect } from "next/navigation";

// The Pro Track landing page moved to /challenge (the saloon doors); keep old links working.
export default function LandingPageRedirect() {
    redirect("/challenge");
}
