import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "HackIllinois | Saloon Rush" };

export default function ChallengeLayout({ children }: { children: ReactNode }) {
    return children;
}
