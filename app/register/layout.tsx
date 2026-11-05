import { notFound } from "next/navigation";

export const metadata = {
    title: "HackIllinois | Register"
};

const Layout = ({ children }: { children: React.ReactNode }) => {
    // next dev only — any host (incl. LAN / Tailscale) is fine locally.
    // Production builds still 404 so /register stays off the live site.
    if (process.env.NODE_ENV !== "development") {
        notFound();
    }

    return children;
};

export default Layout;
