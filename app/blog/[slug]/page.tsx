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
			title: "Post Not Found | Buma Blog",
			description: "This blog post could not be found on Buma.",
		};
	}

	const description =
		post.body?.[0]?.children?.[0]?.text?.slice(0, 160) ||
		`Read ${post.title} on Buma Blog and learn strategies for business growth.`;

	return {
		title: `${post.title} | Buma Blog`,
		description,
		openGraph: {
			title: post.title,
			description,
			url: `https://www.mybuma.com/blog/${slug}`,
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

// Force dynamic rendering on every request for live content updates with zero ISR writes
export const dynamic = "force-dynamic";

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
	const { slug } = await params;
	const post = await getBlogPost(slug);

	if (!post) notFound();

	const relatedPosts = await getRelatedPosts(
		post.categories || [],
		post._id
	);

	const blogPostingSchema = {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: post.title,
		description:
			post.body?.[0]?.children?.[0]?.text?.slice(0, 160) ||
			`Read ${post.title} on Buma Blog and learn strategies for business growth.`,
		image: post.mainImage
			? urlFor(post.mainImage).url()
			: "https://www.mybuma.com/logo.png",
		author: {
			"@type": "Person",
			name: "Buma Team",
		},
		publisher: {
			"@type": "Organization",
			name: "Buma",
			logo: {
				"@type": "ImageObject",
				url: "https://www.mybuma.com/logo.png",
			},
		},
		datePublished: post.publishedAt || new Date().toISOString(),
		dateModified: post.publishedAt || new Date().toISOString(),
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": `https://www.mybuma.com/blog/${slug}`,
		},
		keywords: "business, lifestyle, digital solutions, Buma",
		articleSection: "Blog",
	};

	return (
		<>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(blogPostingSchema),
				}}
			/>
			<BlogPost post={post} relatedPosts={relatedPosts} />
		</>
	);
};

export default BlogPostPage;
