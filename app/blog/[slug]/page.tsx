import { getBlogPost, getRelatedPosts, urlFor } from "@/utils/sanity";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BlogPost from "./BlogPost";

interface BlogPostPageProps {
	params: Promise<{ slug: string }>;
}

export async function generateMetadata({
	params,
}: BlogPostPageProps): Promise<Metadata> {
	const { slug } = await params;
	const post = await getBlogPost(slug);

	if (!post) {
		return {
			title: "Post Not Found | M360 Blog",
			description: "This blog post could not be found on M360.",
		};
	}

	const description =
		post.body?.[0]?.children?.[0]?.text?.slice(0, 160) ||
		`Read ${post.title} on M360 Blog and learn strategies for business growth.`;

	return {
		title: `${post.title} | Explore360 Blog`,
		description,
		openGraph: {
			title: post.title,
			description,
			url: `https://m360solutionsgroup.com/blog/${slug}`,
			images: post.mainImage
				? [
						{
							url: urlFor(post.mainImage).url(),
							width: 1200,
							height: 630,
							alt: post.title,
						},
				  ]
				: [],
		},
		twitter: {
			card: "summary_large_image",
			title: post.title,
			description,
			images: post.mainImage ? [urlFor(post.mainImage).url()] : [],
		},
	};
}

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
	const { slug } = await params;
	const post = await getBlogPost(slug);

	if (!post) notFound();

	const relatedPosts = await getRelatedPosts(
		post.categories || [],
		post._id
	);
	return <BlogPost post={post} relatedPosts={relatedPosts} />;
};

export default BlogPostPage;
