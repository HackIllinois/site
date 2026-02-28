/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "github.com"
            },
            {
                protocol: "https",
                hostname: "raw.githubusercontent.com"
            }
        ]
    }
};

module.exports = nextConfig;
