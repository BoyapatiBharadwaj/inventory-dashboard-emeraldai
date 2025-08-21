/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      rules: {}, // ✅ minimal valid config
    },
  },
};

module.exports = nextConfig;
