"use client";
import { useState, useEffect } from "react";
import { urlFor, getCategories, getBlogPosts } from "@/utils/sanity";
import { BlogPost, Category } from "@/utils/sanity";
import Image from "next/image";
import Link from "next/link";
import {
	CalendarIcon,
	ClockIcon,
	UserIcon,
	SearchIcon,
	FilterIcon,
} from "lucide-react";

const BlogPostsClient = () => {
	const [posts, setPosts] = useState<BlogPost[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);
	const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
	const [selectedCategory, setSelectedCategory] =
		useState<string>("all");
	const [searchTerm, setSearchTerm] = useState("");
	const [loading, setLoading] = useState(true);
	const [loadingMore, setLoadingMore] = useState(false);
	const [offset, setOffset] = useState(0);
	const [hasMore, setHasMore] = useState(true);
	const POSTS_PER_PAGE = 90;

	useEffect(() => {
		const fetchInitialData = async () => {
			try {
				const [initialPosts, categoriesData] = await Promise.all([
					getBlogPosts(POSTS_PER_PAGE, 0),
					getCategories(),
				]);

				setPosts(initialPosts);
				setFilteredPosts(initialPosts);
				setCategories(categoriesData);
				setHasMore(initialPosts.length === POSTS_PER_PAGE);
				setOffset(POSTS_PER_PAGE);
			} catch (error) {
				console.error("Error fetching blog data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchInitialData();
	}, []);

	const loadMorePosts = async () => {
		if (loadingMore || !hasMore) return;

		setLoadingMore(true);
		try {
			const morePosts = await getBlogPosts(POSTS_PER_PAGE, offset);
			if (morePosts.length > 0) {
				setPosts((prev) => [...prev, ...morePosts]);
				setOffset((prev) => prev + POSTS_PER_PAGE);
				setHasMore(morePosts.length === POSTS_PER_PAGE);
			} else {
				setHasMore(false);
			}
		} catch (error) {
			console.error("Error loading more posts:", error);
		} finally {
			setLoadingMore(false);
		}
	};

	const filterPosts = () => {
		let filtered = posts;

		if (selectedCategory !== "all") {
			filtered = filtered.filter((post) =>
				post.categories?.some((cat) => cat._id === selectedCategory),
			);
		}

		if (searchTerm) {
			filtered = filtered.filter(
				(post) =>
					post.title
						.toLowerCase()
						.includes(searchTerm.toLowerCase()) ||
					post.author?.name
						.toLowerCase()
						.includes(searchTerm.toLowerCase()),
			);
		}

		setFilteredPosts(filtered);
	};

	useEffect(() => {
		filterPosts();
	}, [selectedCategory, searchTerm, posts]);

	const formatDate = (date: string) => {
		return new Date(date).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	if (loading) {
		return (
			<div className='min-h-screen bg-light-gray'>
				<div className='container mx-auto px-4 py-12'>
					<div className='animate-pulse'>
						<div className='h-12 bg-gray-200 rounded-lg w-1/3 mx-auto mb-10'></div>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
							{[...Array(6)].map((_, i) => (
								<div
									key={i}
									className='bg-white rounded-2xl shadow-sm p-0 h-full overflow-hidden'
								>
									<div className='h-48 bg-gray-200 w-full'></div>
									<div className='p-6 space-y-4'>
										<div className='h-4 bg-gray-200 rounded w-3/4'></div>
										<div className='h-4 bg-gray-200 rounded w-1/2'></div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-light-gray'>
			{/* Hero Section */}
			<div className='bg-primary-purple-dark text-white relative overflow-hidden'>
				<div className='absolute inset-0 bg-gradient-to-br from-primary-purple-dark to-primary-purple opacity-90'></div>
				<div className='container mx-auto px-4 py-20 relative z-10 text-center'>
					<h1 className='text-4xl md:text-6xl font-extrabold mb-6 tracking-tight animate-popIn'>
						Blog & Insights
					</h1>
					<p
						className='text-lg md:text-2xl text-accent-purple max-w-3xl mx-auto font-light leading-relaxed animate-fadeIn'
						style={{ animationDelay: "0.1s" }}
					>
						Insights, strategies, and tools to help companies grow and
						expand across various markets
					</p>
				</div>
			</div>

			<div className='container mx-auto px-4 py-12'>
				{/* Search and Filter Section */}
				<div
					className='mb-16 space-y-8 animate-fadeIn'
					style={{ animationDelay: "0.2s" }}
				>
					{/* Search Bar */}
					<div className='relative max-w-lg mx-auto group'>
						<div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
							<SearchIcon className='text-gray-400 w-5 h-5 group-focus-within:text-primary-purple transition-colors duration-200' />
						</div>
						<input
							type='text'
							placeholder='Search articles...'
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className='w-full pl-11 pr-4 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-primary-purple/20 focus:border-primary-purple outline-none transition-all duration-200 text-text-header placeholder:text-gray-400'
						/>
					</div>

					{/* Category Filter */}
					<div className='flex flex-wrap justify-center gap-3'>
						<button
							onClick={() => setSelectedCategory("all")}
							className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
								selectedCategory === "all"
									? "bg-primary-purple text-white shadow-md shadow-primary-purple/20"
									: "bg-white text-gray-600 border border-gray-200 hover:border-primary-purple hover:text-primary-purple"
							}`}
						>
							All Articles
						</button>
						{categories.map((category) => (
							<button
								key={category._id}
								onClick={() => setSelectedCategory(category._id)}
								className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
									selectedCategory === category._id
										? "bg-primary-purple text-white shadow-md shadow-primary-purple/20"
										: "bg-white text-gray-600 border border-gray-200 hover:border-primary-purple hover:text-primary-purple"
								}`}
							>
								{category.title}
							</button>
						))}
					</div>

					{/* Results Count */}
					<div className='text-center text-gray-500 text-sm font-medium'>
						{filteredPosts.length === 0 ? (
							<p>No articles found matching your criteria.</p>
						) : (
							<p>
								Showing {filteredPosts.length} article
								{filteredPosts.length !== 1 ? "s" : ""}
							</p>
						)}
					</div>
				</div>

				{/* Blog Posts Grid */}
				{filteredPosts.length > 0 ? (
					<>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16'>
							{filteredPosts.map((post, index) => (
								<article
									key={post._id}
									className='group bg-white rounded-2xl shadow-sm hover:shadow-xl hover:shadow-primary-purple/10 overflow-hidden transition-all duration-300 border border-transparent hover:border-primary-purple/10 animate-fadeIn'
									style={{
										animationDelay: `${0.1 + (index % 6) * 0.1}s`,
									}}
								>
									<Link
										href={`/blog/${post.slug.current}`}
										className='flex flex-col h-full'
									>
										<div className='relative aspect-w-16 aspect-h-9 aspect-video overflow-hidden'>
											{post.mainImage ? (
												<Image
													src={urlFor(post.mainImage)
														.width(600)
														.height(350)
														.url()}
													alt={post.title}
													fill
													className='object-cover group-hover:scale-105 transition-transform duration-500'
												/>
											) : (
												<div className='absolute inset-0 bg-gradient-to-br from-primary-purple via-primary-purple-light to-accent-purple flex items-center justify-center'>
													<span className='text-white text-3xl font-bold opacity-30'>
														E360
													</span>
												</div>
											)}
										</div>

										<div className='p-6 flex flex-col flex-grow'>
											{/* Categories */}
											{post.categories &&
												post.categories.length > 0 && (
													<div className='flex flex-wrap gap-2 mb-4'>
														{post.categories
															.slice(0, 2)
															.map((category) => (
																<span
																	key={category._id}
																	className='px-3 py-1 bg-accent-purple text-primary-purple text-xs rounded-full font-semibold tracking-wide uppercase'
																>
																	{category.title}
																</span>
															))}
													</div>
												)}

											<h3 className='text-xl font-bold text-text-header mb-3 group-hover:text-primary-purple transition-colors duration-200 line-clamp-2 leading-tight'>
												{post.title}
											</h3>

											<div className='mt-auto pt-6 border-t border-gray-100'>
												<div className='flex items-center justify-between text-xs text-gray-500'>
													{post.author ? (
														<div className='flex items-center gap-2'>
															{post.author.image && (
																<div className='w-6 h-6 rounded-full overflow-hidden relative'>
																	<Image
																		src={urlFor(post.author.image)
																			.width(48)
																			.height(48)
																			.url()}
																		alt={post.author.name}
																		fill
																		className='object-cover'
																	/>
																</div>
															)}
															<span className='font-medium text-gray-700'>
																{post.author.name}
															</span>
														</div>
													) : (
														<div className='flex items-center gap-1'>
															<UserIcon className='w-3.5 h-3.5' />
															<span>Unknown</span>
														</div>
													)}
													<div className='flex items-center gap-4'>
														<div className='flex items-center gap-1.5'>
															<CalendarIcon className='w-3.5 h-3.5' />
															<span>
																{formatDate(post.publishedAt)}
															</span>
														</div>
														<div className='flex items-center gap-1.5'>
															<ClockIcon className='w-3.5 h-3.5' />
															<span>
																{post.estimatedReadingTime} min
															</span>
														</div>
													</div>
												</div>
											</div>
										</div>
									</Link>
								</article>
							))}
						</div>

						{/* Load More Button */}
						{hasMore && selectedCategory === "all" && !searchTerm && (
							<div className='text-center py-8'>
								<button
									onClick={loadMorePosts}
									disabled={loadingMore}
									className='px-8 py-3.5 bg-white text-primary-purple border border-primary-purple rounded-full font-medium shadow-sm hover:bg-primary-purple hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1'
								>
									{loadingMore
										? "Loading Articles..."
										: "Load More Articles"}
								</button>
							</div>
						)}
					</>
				) : (
					<div className='text-center py-20 bg-white rounded-3xl shadow-sm border border-dashed border-gray-200'>
						<div className='inline-block p-4 rounded-full bg-gray-50 mb-4'>
							<SearchIcon className='w-8 h-8 text-gray-300' />
						</div>
						<h3 className='text-xl font-medium text-gray-900 mb-2'>
							No articles found
						</h3>
						<p className='text-gray-500 max-w-sm mx-auto'>
							We couldn't find any articles matching "
							<strong>{searchTerm}</strong>". Try checking for typos
							or using different keywords.
						</p>
						<button
							onClick={() => {
								setSearchTerm("");
								setSelectedCategory("all");
							}}
							className='mt-6 text-primary-purple font-medium hover:underline'
						>
							Clear all filters
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default BlogPostsClient;
