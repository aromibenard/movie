/** @type {import('next').NextConfig} */

const nextConfig = {
    experimental: {
        serverActions: {
            allowedOrigins: ['localhost:3000', 'https://fluffy-waffle-jvgx6wq4j75355xj-3000.app.github.dev/'],
        },
    },
}

export default nextConfig;
