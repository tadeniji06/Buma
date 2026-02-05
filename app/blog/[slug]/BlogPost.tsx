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
import { useState, useEffect } from "react";

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
								(def: any) => def._key === mark,
							);

							if (markDef && markDef._type === "link") {
								content = (
									<a
										key={childIndex}
										href={markDef.href}
										className='text-primary-purple hover:underline font-medium decoration-2 decoration-primary-purple/30 hover:decoration-primary-purple'
										target={markDef.blank ? "_blank" : "_self"}
										rel={markDef.blank ? "noopener noreferrer" : ""}
									>
										{content}
									</a>
								);
							} else if (mark === "strong") {
								content = (
									<strong
										key={childIndex}
										className='font-bold text-gray-900'
									>
										{content}
									</strong>
								);
							} else if (mark === "em") {
								content = (
									<em
										key={childIndex}
										className='italic text-gray-800'
									>
										{content}
									</em>
								);
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
						className='text-3xl md:text-4xl font-bold text-gray-900 mb-6 mt-12 first:mt-0 tracking-tight'
					>
						{renderChildren(children)}
					</h1>
				);
			case "h2":
				return (
					<h2
						key={index}
						className='text-2xl md:text-3xl font-bold text-gray-900 mb-4 mt-10 tracking-tight'
					>
						{renderChildren(children)}
					</h2>
				);
			case "h3":
				return (
					<h3
						key={index}
						className='text-xl md:text-2xl font-bold text-gray-900 mb-3 mt-8 tracking-tight'
					>
						{renderChildren(children)}
					</h3>
				);
			case "blockquote":
				return (
					<blockquote
						key={index}
						className='border-l-4 border-primary-purple bg-accent-purple/30 p-6 my-8 italic text-gray-700 rounded-r-lg'
					>
						{renderChildren(children)}
					</blockquote>
				);
			default:
				return (
					<p
						key={index}
						className='text-gray-700 leading-8 mb-6 text-lg'
					>
						{renderChildren(children)}
					</p>
				);
		}
	};

	return (
		<div className='prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-primary-purple prose-strong:text-gray-900'>
			{content.map((block, index) => renderBlock(block, index))}
		</div>
	);
};

const BlogPost = ({ post, relatedPosts }: BlogPostProps) => {
	const [showShareMenu, setShowShareMenu] = useState(false);
	const [copySuccess, setCopySuccess] = useState(false);
	const [views, setViews] = useState<number>(0);
	const [reactions, setReactions] = useState<number>(0);
	const [hasReacted, setHasReacted] = useState(false);

	// Simulate fetching views and reactions
	useEffect(() => {
		// Generate deterministically random numbers based on slug length or ID
		const pseudoRandom = post._id
			.split("")
			.reduce((acc, char) => acc + char.charCodeAt(0), 0);
		setViews(1200 + (pseudoRandom % 5000));
		setReactions(45 + (pseudoRandom % 200));

		// Check if user has reacted locally
		const storedReaction = localStorage.getItem(
			`reaction_${post._id}`,
		);
		if (storedReaction) {
			setHasReacted(true);
		}
	}, [post._id]);

	const handleReaction = () => {
		if (hasReacted) {
			setReactions((prev) => prev - 1);
			setHasReacted(false);
			localStorage.removeItem(`reaction_${post._id}`);
		} else {
			setReactions((prev) => prev + 1);
			setHasReacted(true);
			localStorage.setItem(`reaction_${post._id}`, "true");
		}
	};

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
				shareTitle,
			)}&url=${encodeURIComponent(shareUrl)}`,
			"_blank",
		);
	};

	const shareOnFacebook = () => {
		window.open(
			`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
				shareUrl,
			)}`,
			"_blank",
		);
	};

	const shareOnLinkedIn = () => {
		window.open(
			`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
				shareUrl,
			)}`,
			"_blank",
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
		<div className='min-h-screen bg-light-gray'>
			{/* Back Button */}
			<div className='bg-white border-b border-gray-100 sticky top-0 z-30 bg-opacity-90 backdrop-blur-md'>
				<div className='container mx-auto px-4 py-4'>
					<Link
						href='/blog'
						className='inline-flex items-center gap-2 text-gray-600 hover:text-primary-purple transition-colors duration-200 font-medium'
					>
						<ArrowLeftIcon className='w-4 h-4' />
						Back to Blog
					</Link>
				</div>
			</div>

			<article className='container mx-auto px-4 py-12 max-w-4xl'>
				{/* Article Header */}
				<header className='mb-10 text-center md:text-left animate-fadeIn'>
					{/* Categories */}
					{post.categories && post.categories.length > 0 && (
						<div className='flex flex-wrap gap-2 mb-6 justify-center md:justify-start'>
							{post.categories.map((category) => (
								<span
									key={category._id}
									className='px-4 py-1.5 bg-accent-purple text-primary-purple text-sm rounded-full font-semibold tracking-wide uppercase'
								>
									{category.title}
								</span>
							))}
						</div>
					)}

					<h1 className='text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-8 leading-tight tracking-tight'>
						{post.title}
					</h1>

					{/* Article Meta */}
					<div className='flex flex-wrap items-center justify-between gap-6 pb-8 border-b border-gray-100'>
						<div className='flex flex-wrap items-center gap-6 text-gray-500 text-sm'>
							{post.author && (
								<div className='flex items-center gap-3'>
									{post.author.image && (
										<div className='w-10 h-10 relative rounded-full overflow-hidden shadow-sm'>
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
									<div className='text-left'>
										<div className='flex items-center gap-1 font-medium text-gray-900'>
											<span>{post.author.name}</span>
										</div>
										<p className='text-xs text-gray-500'>Author</p>
									</div>
								</div>
							)}
							<div className='hidden md:block w-px h-8 bg-gray-200'></div>
							<div className='flex flex-col'>
								<div className='flex items-center gap-1.5 font-medium text-gray-900'>
									<CalendarIcon className='w-4 h-4 text-primary-purple' />
									<span>{formatDate(post.publishedAt)}</span>
								</div>
								<span className='text-xs'>Published</span>
							</div>

							<div className='flex flex-col'>
								<div className='flex items-center gap-1.5 font-medium text-gray-900'>
									<ClockIcon className='w-4 h-4 text-primary-purple' />
									<span>{post.estimatedReadingTime} min read</span>
								</div>
								<span className='text-xs'>Read time</span>
							</div>

							<div className='flex flex-col'>
								<div className='flex items-center gap-1.5 font-medium text-gray-900'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='16'
										height='16'
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
										className='text-primary-purple'
									>
										<path d='M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z' />
										<circle cx='12' cy='12' r='3' />
									</svg>
									<span>{views.toLocaleString()}</span>
								</div>
								<span className='text-xs'>Views</span>
							</div>
						</div>

						{/* Reaction Counter (Mini) */}
						<button
							onClick={handleReaction}
							className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${hasReacted ? "bg-primary-purple/10 text-primary-purple scale-105" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='18'
								height='18'
								viewBox='0 0 24 24'
								fill={hasReacted ? "currentColor" : "none"}
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							>
								<path d='M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z' />
							</svg>
							<span className='font-semibold'>{reactions}</span>
						</button>
					</div>
				</header>

				{/* Featured Image */}
				{post.mainImage && (
					<div
						className='relative aspect-video rounded-2xl overflow-hidden mb-12 shadow-md animate-fadeIn'
						style={{ animationDelay: "0.1s" }}
					>
						<Image
							src={urlFor(post.mainImage)
								.width(1200)
								.height(675)
								.url()}
							alt={post.title}
							fill
							className='object-cover'
							priority
						/>
					</div>
				)}

				{/* Article Content */}
				<div
					className='bg-white rounded-2xl p-8 md:p-12 shadow-sm mb-12 animate-fadeIn'
					style={{ animationDelay: "0.2s" }}
				>
					<PortableText content={post.body} />

					{/* Article Footer / Reaction CTA */}
					<div className='mt-12 pt-8 border-t border-gray-100 flex flex-col items-center justify-center text-center'>
						<p className='text-gray-500 mb-4'>
							Enjoyed this article?
						</p>
						<button
							onClick={handleReaction}
							className={`group relative flex items-center gap-3 px-8 py-4 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-md ${hasReacted ? "bg-primary-purple text-white shadow-primary-purple/30" : "bg-white border-2 border-gray-100 text-gray-600 hover:border-primary-purple hover:text-primary-purple"}`}
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill={hasReacted ? "currentColor" : "none"}
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
								className={`transition-transform duration-300 ${hasReacted ? "scale-110" : "group-hover:scale-110"}`}
							>
								<path d='M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z' />
							</svg>
							<span className='font-bold text-lg'>
								{reactions} Reactions
							</span>
						</button>
					</div>
				</div>

				{/* Author Bio */}
				{post.author && post.author.bio && (
					<div
						className='bg-white rounded-2xl p-8 shadow-sm mb-16 border border-gray-100 animate-fadeIn'
						style={{ animationDelay: "0.3s" }}
					>
						<div className='flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left'>
							{post.author.image && (
								<div className='w-20 h-20 relative rounded-full overflow-hidden flex-shrink-0 shadow-md ring-4 ring-gray-50'>
									<Image
										src={urlFor(post.author.image)
											.width(80)
											.height(80)
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
								<p className='text-gray-600 leading-relaxed'>
									{post.author.bio}
								</p>
							</div>
						</div>
					</div>
				)}

				{/* Related Posts */}
				{relatedPosts.length > 0 && (
					<section
						className='mb-12 animate-fadeIn'
						style={{ animationDelay: "0.4s" }}
					>
						<h2 className='text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2'>
							<span className='w-1 h-8 bg-primary-purple rounded-full'></span>
							Related Articles
						</h2>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
							{relatedPosts.map((relatedPost) => (
								<Link
									key={relatedPost._id}
									href={`/blog/${relatedPost.slug.current}`}
									className='group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl hover:shadow-primary-purple/10 transition-all duration-300 transform hover:-translate-y-1'
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
												className='object-cover group-hover:scale-105 transition-transform duration-500'
											/>
										) : (
											<div className='w-full h-full bg-gradient-to-br from-primary-purple to-primary-purple-dark flex items-center justify-center'>
												<span className='text-white text-lg font-bold opacity-50'>
													E360
												</span>
											</div>
										)}
									</div>
									<div className='p-5'>
										<h3 className='font-bold text-gray-900 mb-2 group-hover:text-primary-purple transition-colors duration-200 line-clamp-2 leading-snug'>
											{relatedPost.title}
										</h3>
										<div className='flex items-center text-xs text-gray-500 gap-3 mt-3'>
											{relatedPost.author && (
												<span>{relatedPost.author.name}</span>
											)}
											<span className='w-1 h-1 rounded-full bg-gray-300'></span>
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
