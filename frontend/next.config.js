/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'standalone',
    images: {
        domains: ['localhost', 'host.docker.internal', 'tribunal.vigla.city'],
    },
}

module.exports = nextConfig
