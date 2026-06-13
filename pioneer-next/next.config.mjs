/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep legacy ".html" links working: /about.html -> /about, /index.html -> /
  async rewrites() {
    return [
      { source: '/index.html', destination: '/' },
      { source: '/:slug.html', destination: '/:slug' },
    ];
  },
};

export default nextConfig;
