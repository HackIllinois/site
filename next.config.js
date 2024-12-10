/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: "/",
                destination: "https://hype.hackillinois.org",
                permanent: false
            }
        ];
    }
};

module.exports = nextConfig;
