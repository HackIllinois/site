import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "HackIllinois 2024",
        short_name: "HackIllinois 2024",
        description: "The Official Website for HackIllinois 2024",
        start_url: "/",
        display: "standalone",
        background_color: "#6ae4ff",
        theme_color: "#6ae4ff"
    };
}
