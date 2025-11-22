import type { Metadata } from "next";
import BlogPostsClient from "./BlogPostsClient";

export const metadata: Metadata = {
	title: "Buma Blog | Buying Media In Africa",
	description:
		"Buma Blog shares expert insights, data-driven strategies, and tools to help companies start, grow, and expand their businesses across African markets.",
	openGraph: {
		title: "Buma Blog | Insights for Business & Marketing Growth",
		description:
			"Stay ahead with Buma Solutions insights on consulting, expansion, and growth opportunities in Africa.",
		url: "https://mybuma.com/blog",
		siteName: "Buying Media In Africa",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Buma Solutions Blog",
		description:
			"Discover expert content and strategies from Buma Solutions to grow your business in Africa.",
	},
};

const BlogsPage = () => {
	return <BlogPostsClient />;
};

export default BlogsPage;
