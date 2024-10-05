/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    domains: ['img.apresenta.me'],
    unoptimized: true,
  },
}

export default nextConfig
