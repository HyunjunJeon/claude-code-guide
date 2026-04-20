import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for GitHub Pages
  output: "export",
  // GitHub Pages serves from /<repo-name>/ subpath
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  // Generate /slug/index.html instead of /slug.html — works on all static servers
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Support reading content from parent directory
  serverExternalPackages: ["shiki"],
};

export default nextConfig;
