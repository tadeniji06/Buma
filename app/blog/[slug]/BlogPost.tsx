"use client";
import { BlogPost as BlogPostType } from "@/utils/sanity";
import { urlFor } from "@/utils/sanity";
import Image from "next/image";
import Link from "next/link";
import {
	CalendarIcon,
	ClockIcon,
	UserIcon,
	ArrowLeftIcon,
} from "lucide-react";
import { useState } from "react";

interface BlogPostProps {
	post: BlogPostType;
	relatedPosts: BlogPostType[];
}

// Component to render Portable Text (Sanity's rich text format)
const PortableText = ({ content }: { content: any[] }) => {
	const renderBlock = (block: any, index: number) => {
		const { _type, style, children, markDefs = [] } = block;

		if (_type !== "block") return null;

		const renderChildren = (children: any[]) => {
			return children.map((child: any, childIndex: number) => {
				if (child._type === "span") {
					let content = child.text;

					// Apply marks (bold, italic, links, etc.)
					if (child.marks && child.marks.length > 0) {
						child.marks.forEach((mark: string) => {
							const markDef = markDefs.find(
								(def: any) => def._key === mark
							);

							if (markDef && markDef._type === "link") {
								content = (
									<a
										key={childIndex}
										href={markDef.href}
										className='text-primary-yellow hover:underline'
										target={markDef.blank ? "_blank" : "_self"}
										rel={markDef.blank ? "noopener noreferrer" : ""}
									>
										{content}
									</a>
								);
							} else if (mark === "strong") {
								content = <strong key={childIndex}>{content}</strong>;
							} else if (mark === "em") {
								content = <em key={childIndex}>{content}</em>;
							}
						});
					}

					return <span key={childIndex}>{content}</span>;
				}
				return child.text;
			});
		};

		// Render different block styles
		switch (style) {
			case "h1":
				return (
					<h1
						key={index}
						className='text-3xl font-bold text-gray-900 mb-6 mt-8'
					>
						{renderChildren(children)}
					</h1>
				);
			case "h2":
				return (
					<h2
						key={index}
						className='text-2xl font-bold text-gray-900 mb-4 mt-8'
					>
						{renderChildren(children)}
					</h2>
				);
			case "h3":
				return (
					<h3
						key={index}
						className='text-xl font-bold text-gray-900 mb-4 mt-6'
					>
						{renderChildren(children)}
					</h3>
				);
			case "blockquote":
				return (
					<blockquote
						key={index}
						className='border-l-4 border-bold-blue text-primary-yellow pl-4 my-6 italic'
					>
						{renderChildren(children)}
					</blockquote>
				);
			default:
				return (
					<p
						key={index}
						className='text-gray-700 leading-relaxed mb-4'
					>
						{renderChildren(children)}
					</p>
				);
		}
	};

	return (
		<div className='prose prose-lg max-w-none'>
			{content.map((block, index) => renderBlock(block, index))}
		</div>
	);
};

const BlogPost = ({ post, relatedPosts }: BlogPostProps) => {
	const [showShareMenu, setShowShareMenu] = useState(false);
	const [copySuccess, setCopySuccess] = useState(false);

	const formatDate = (date: string) => {
		return new Date(date).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	const shareUrl =
		typeof window !== "undefined" ? window.location.href : "";
	const shareTitle = post.title;

	const shareOnTwitter = () => {
		window.open(
			`https://twitter.com/intent/tweet?text=${encodeURIComponent(
				shareTitle
			)}&url=${encodeURIComponent(shareUrl)}`,
			"_blank"
		);
	};

	const shareOnFacebook = () => {
		window.open(
			`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
				shareUrl
			)}`,
			"_blank"
		);
	};

	const shareOnLinkedIn = () => {
		window.open(
			`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
				shareUrl
			)}`,
			"_blank"
		);
	};

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(shareUrl);
			setCopySuccess(true);
			setTimeout(() => setCopySuccess(false), 2000);
		} catch (err) {
			console.error("Failed to copy URL:", err);
		}
	};

	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Back Button */}
			<div className='bg-white border-b'>
				<div className='container mx-auto px-4 py-4'>
					<Link
						href='/blog'
						className='inline-flex items-center gap-2 text-gray-600 hover:text-primary-yellow transition-colors duration-200'
					>
						<ArrowLeftIcon className='w-4 h-4' />
						Back to Blog
					</Link>
				</div>
			</div>

			<article className='container mx-auto px-4 py-8 max-w-4xl'>
				{/* Article Header */}
				<header className='mb-8'>
					{/* Categories */}
					{post.categories && post.categories.length > 0 && (
						<div className='flex flex-wrap gap-2 mb-4'>
							{post.categories.map((category) => (
								<span
									key={category._id}
									className='px-3 py-1 bg-primary-ortext-primary-yellow/10 text-primary-yellow text-sm rounded-full font-medium'
								>
									{category.title}
								</span>
							))}
						</div>
					)}

					<h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight'>
						{post.title}
					</h1>

					{/* Article Meta */}
					<div className='flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-200'>
						<div className='flex flex-wrap items-center gap-6 text-gray-600'>
							{post.author && (
								<div className='flex items-center gap-3'>
									{post.author.image && (
										<div className='w-10 h-10 relative rounded-full overflow-hidden'>
											<Image
												src={urlFor(post.author.image)
													.width(40)
													.height(40)
													.url()}
												alt={post.author.name}
												fill
												className='object-cover'
											/>
										</div>
									)}
									<div>
										<div className='flex items-center gap-1'>
											<UserIcon className='w-4 h-4' />
											<span className='font-medium'>
												{post.author.name}
											</span>
										</div>
										{post.author.bio && (
											<p className='text-sm text-gray-500'>
												{post.author.bio}
											</p>
										)}
									</div>
								</div>
							)}
							<div className='flex items-center gap-1'>
								<CalendarIcon className='w-4 h-4' />
								<span>{formatDate(post.publishedAt)}</span>
							</div>
							<div className='flex items-center gap-1'>
								<ClockIcon className='w-4 h-4' />
								<span>{post.estimatedReadingTime} min read</span>
							</div>
						</div>
					</div>
				</header>

				{/* Featured Image */}
				{post.mainImage && (
					<div className='relative aspect-video rounded-lg overflow-hidden mb-8'>
						<Image
							src={urlFor(post.mainImage)
								.width(800)
								.height(450)
								.url()}
							alt={post.title}
							fill
							className='object-cover'
							priority
						/>
					</div>
				)}

				{/* Article Content */}
				<div className='bg-white rounded-lg p-8 shadow-sm mb-12'>
					<PortableText content={post.body} />
				</div>

				{/* Author Bio */}
				{post.author && post.author.bio && (
					<div className='bg-white rounded-lg p-6 shadow-sm mb-12'>
						<div className='flex items-start gap-4'>
							{post.author.image && (
								<div className='w-16 h-16 relative rounded-full overflow-hidden flex-shrink-0'>
									<Image
										src={urlFor(post.author.image)
											.width(64)
											.height(64)
											.url()}
										alt={post.author.name}
										fill
										className='object-cover'
									/>
								</div>
							)}
							<div>
								<h3 className='text-lg font-bold text-gray-900 mb-2'>
									About {post.author.name}
								</h3>
								<p className='text-gray-700'>{post.author.bio}</p>
							</div>
						</div>
					</div>
				)}

				{/* Related Posts */}
				{relatedPosts.length > 0 && (
					<section className='mb-12'>
						<h2 className='text-2xl font-bold text-gray-900 mb-6'>
							Related Articles
						</h2>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
							{relatedPosts.map((relatedPost) => (
								<Link
									key={relatedPost._id}
									href={`/blog/${relatedPost.slug.current}`}
									className='group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300'
								>
									<div className='relative aspect-video overflow-hidden'>
										{relatedPost.mainImage ? (
											<Image
												src={urlFor(relatedPost.mainImage)
													.width(300)
													.height(200)
													.url()}
												alt={relatedPost.title}
												fill
												className='object-cover group-hover:scale-105 transition-transform duration-300'
											/>
										) : (
											<div className='w-full h-full bg-gradient-to-br from-[#4e1803f0] to-primary-ortext-primary-yellow flex items-center justify-center'>
												<span className='text-white text-lg font-bold'>
													E360
												</span>
											</div>
										)}
									</div>
									<div className='p-4'>
										<h3 className='font-bold text-gray-900 mb-2 group-hover:text-primary-yellow transition-colors duration-200 line-clamp-2'>
											{relatedPost.title}
										</h3>
										<div className='flex items-center text-sm text-gray-600 gap-3'>
											{relatedPost.author && (
												<span>{relatedPost.author.name}</span>
											)}
											<span>
												{relatedPost.estimatedReadingTime} min read
											</span>
										</div>
									</div>
								</Link>
							))}
						</div>
					</section>
				)}
			</article>

			{/* Click outside to close share menu */}
			{showShareMenu && (
				<div
					className='fixed inset-0 z-5'
					onClick={() => setShowShareMenu(false)}
				/>
			)}
		</div>
	);
};

export default BlogPost;
