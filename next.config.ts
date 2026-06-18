import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // 静态导出时确保 CSS 正确引用
  trailingSlash: true,
};

export default nextConfig;
