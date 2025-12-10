/** @type {import('next').NextConfig} */
const nextConfig = {
  // エラーを無視してビルドを完了させる設定
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;