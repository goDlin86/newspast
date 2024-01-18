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
    rewrites: async () => {
        return [
            {
                source: '/api/:path*',
                destination: 
                    process.env.NODE_ENV === 'development'
                        ? 'http://127.0.0.1:5328/api/:path*'
                        : '/api/',
            },
        ]
    },
    swcMinify: true,
}