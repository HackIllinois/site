import { headers } from "next/headers";
import { notFound } from "next/navigation";

export const metadata = {
    title: "HackIllinois | Register"
};

const Layout = async ({ children }: { children: React.ReactNode }) => {
    const host = (await headers()).get("host")?.toLowerCase() ?? "";
    const hostname = host.replace(/:\d+$/, "");

    if (
        process.env.NODE_ENV !== "development" ||
        (hostname !== "localhost" && hostname !== "127.0.0.1")
    ) {
        notFound();
    }

    return children;
};

export default Layout;
