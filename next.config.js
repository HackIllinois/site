/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: "/",
                has: [
                    {
                        type: "host",
                        value: "hackillinois.org"
                    }
                ],
                destination: "https://hype.hackillinois.org",
                permanent: false
            }
        ];
    }
};

module.exports = nextConfig;
