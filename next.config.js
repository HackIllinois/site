/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "raw.githubusercontent.com",
                pathname: "/HackIllinois/adonix-metadata/main/avatars/**"
            }
        ]
    },
    async redirects() {
        return [
            // {
            //     source: "/legal",
            //     destination: "/legal/code-of-conduct",
            //     permanent: true
            // },
            {
                source: "/",
                destination: "https://info.hackillinois.org",
                permanent: false
            }
        ];
    }
};

module.exports = nextConfig;
