/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: "/legal",
                destination: "/legal/code-of-conduct",
                permanent: true
            }
        ];
    }
};

module.exports = nextConfig;
