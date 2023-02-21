/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  async redirects() {
    return [
      {
        source: "/draft/:slug",
        destination: "/blog/:slug",
        permanent: true,
      },
    ];
  },
};
