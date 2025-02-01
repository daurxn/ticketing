import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpackDevMiddleware: (config) => {
    config.watchOptions.poll = 300
    return config
  }
}

export default nextConfig
