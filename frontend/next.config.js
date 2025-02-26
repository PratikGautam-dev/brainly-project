/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        domains: ['localhost', 'vercel.app'],
        unoptimized: true
    }
}

module.exports = nextConfig
