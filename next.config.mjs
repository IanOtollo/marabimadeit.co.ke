/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // lets a verification build run without disturbing a live dev server; unset in production
  distDir: process.env.BUILD_DIR || ".next",
  async redirects() {
    return [
      { source: "/:path*", has: [{ type: "host", value: "marabimadeit.co.ke" }], destination: "https://www.marabimadeit.co.ke/:path*", permanent: true },
      { source: "/work", destination: "/portfolio", permanent: true },
      { source: "/pricing", destination: "/", permanent: true },
    ];
  },
};
export default nextConfig;
