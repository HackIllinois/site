/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        VITE_BASE_API_URL:
            process.env.VITE_BASE_API_URL ?? "https://adonix.hackillinois.org"
    }
};

module.exports = nextConfig;
