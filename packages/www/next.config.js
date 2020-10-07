const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
    webpack(config) {
        config.module.rules.push({
            test: /\.(svg|png)$/,
            issuer: {
                test: /\.(js|ts)x?$/,
            },
            use: ['url-loader'],
        });

        return config;
    },
    async rewrites() {
        return [
            {
                source: '/graphql/:path*',
                destination: 'http://localhost:1337/graphql/:path*',
            },
            {
                source: '/uploads/:path*',
                destination: 'http://localhost:1337/uploads/:path*',
            },
            {
                source: '/content-manager/:path*',
                destination: 'http://localhost:1337/content-manager/:path*',
            },
            {
                source: '/admin/:path*',
                destination: 'http://localhost:1337/admin/:path*',
            }
        ]
    },
}

module.exports = withBundleAnalyzer(nextConfig)