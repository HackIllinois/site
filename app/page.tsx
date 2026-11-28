import type { Metadata } from "next";
import FrontierExperience from "./landing/FrontierExperience";

export const metadata: Metadata = {
    title: "HackIllinois 2027 | Forge Your Frontier",
    description:
        "Join HackIllinois on February 26–28, 2027 at the University of Illinois Urbana-Champaign."
};

export default function Home() {
    return <FrontierExperience />;
}
