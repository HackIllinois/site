import type { Metadata } from "next";
import FrontierNav from "@/components/Frontier/FrontierNav";
import shared from "@/components/Frontier/Frontier.module.scss";
import { getJobPostings } from "@/util/api";
import type { JobPosting } from "@/util/types";
import JobBoard from "./JobBoard";

export const metadata: Metadata = {
    title: "Job Board | HackIllinois",
    description: "Explore job opportunities from HackIllinois companies."
};

export default async function JobsPage() {
    let jobs: JobPosting[] | null;
    try {
        jobs = await getJobPostings();
    } catch {
        jobs = null;
    }
    return (
        <div className={shared.page}>
            <FrontierNav />
            <JobBoard jobs={jobs} />
        </div>
    );
}
