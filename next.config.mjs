/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/.well-known/apple-developer-merchantid-domain-association',
        headers: [
          { key: 'Content-Type', value: 'application/octet-stream' },
        ],
      },
    ]
  },
}
export default nextConfig
