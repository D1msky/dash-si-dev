/** @type {import('next').NextConfig} */
const nextConfig = {
  // Transpile antd package
  transpilePackages: ['antd', '@ant-design/nextjs-registry'],

  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Add security headers
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY'
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block'
        }
      ]
    }
  ]
};

export default nextConfig;
