import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  transpilePackages: ["@my-app/ui", "@my-app/utils", "@my-app/types"],
};

export default nextConfig;
