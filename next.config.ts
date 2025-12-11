import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// eslint: {
	// 	ignoreDuringBuilds: true,
	// },
	typescript: {
		ignoreBuildErrors: true,
	},
	images: {
		unoptimized: true,
		domains: ["cdn.sanity.io"],
	},
};

export default nextConfig;
