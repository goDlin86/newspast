module.exports = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/world',
                permanent: true,
            },
        ]
    },
    swcMinify: true,
    experimental: {
        // Required:
        appDir: true,
    },
}