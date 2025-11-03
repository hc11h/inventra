import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Ensure workspace packages are transpiled in dev
  transpilePackages: ["@my-app/ui", "@my-app/utils", "@my-app/types"],
};

export default nextConfig;
