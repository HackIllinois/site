/**
 * @type {import('next').NextConfig}
 */
 const nextConfig = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            type: 'asset'
        });
        config.module.rules.push({
            test: /\.png/,
            type: 'asset/resource'
        });

        return config;
    },
    compiler: {
        styledComponents: true,
    },
};

module.exports = nextConfig;
