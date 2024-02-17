/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'liveblocks.io',
        port: ''
      }
    ]
  },
  webpack: config => {
    config.externals.push({
      sharp: 'commonjs sharp',
      canvas: 'commonjs canvas'
    })
    return config
  },
  typescript: {
    ignoreBuildErrors: true
  }
}

export default nextConfig
