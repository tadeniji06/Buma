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
	const POSTS_PER_PAGE = 6;

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
				post.categories?.some((cat) => cat._id === selectedCategory)
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
						.includes(searchTerm.toLowerCase())
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
			<div className='min-h-screen bg-gray-50'>
				<div className='container mx-auto px-4 py-12'>
					<div className='animate-pulse'>
						<div className='h-12 bg-gray-300 rounded w-1/3 mx-auto mb-8'></div>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
							{[...Array(6)].map((_, i) => (
								<div
									key={i}
									className='bg-white rounded-lg shadow-md p-6'
								>
									<div className='h-48 bg-gray-300 rounded mb-4'></div>
									<div className='h-4 bg-gray-300 rounded w-3/4 mb-2'></div>
									<div className='h-4 bg-gray-300 rounded w-1/2'></div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Hero Section */}
			<div className='bg-gradient-to-r from-dark to-primary-purple text-white py-16'>
				<div className='container mx-auto px-4 text-center'>
					<h1 className='text-4xl md:text-6xl font-bold mb-4'>
						Blog & Insights
					</h1>
					<p className='text-xl md:text-2xl opacity-90 max-w-3xl mx-auto'>
						Insights, strategies, and tools to help companies grow and
						expand across various markets
					</p>
				</div>
			</div>

			<div className='container mx-auto px-4 py-12'>
				{/* Search and Filter Section */}
				<div className='mb-12 space-y-6'>
					{/* Search Bar */}
					<div className='relative max-w-md mx-auto'>
						<SearchIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
						<input
							type='text'
							placeholder='Search articles...'
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent outline-none'
						/>
					</div>

					{/* Category Filter */}
					<div className='flex flex-wrap justify-center gap-3'>
						<button
							onClick={() => setSelectedCategory("all")}
							className={`px-4 py-2 rounded-full border transition-colors duration-200 ${
								selectedCategory === "all"
									? "bg-primary-orange text-white border-primary-orange"
									: "bg-white text-gray-700 border-gray-300 hover:border-primary-orange"
							}`}
						>
							All Articles
						</button>
						{categories.map((category) => (
							<button
								key={category._id}
								onClick={() => setSelectedCategory(category._id)}
								className={`px-4 py-2 rounded-full border transition-colors duration-200 ${
									selectedCategory === category._id
										? "bg-primary-orange text-white border-primary-orange"
										: "bg-white text-gray-700 border-gray-300 hover:border-primary-orange"
								}`}
							>
								{category.title}
							</button>
						))}
					</div>

					{/* Results Count */}
					<div className='text-center text-gray-600'>
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
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12'>
							{filteredPosts.map((post) => (
								<article
									key={post._id}
									className='group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300'
								>
									<Link href={`/blog/${post.slug.current}`}>
										<div className='relative aspect-video overflow-hidden'>
											{post.mainImage ? (
												<Image
													src={urlFor(post.mainImage)
														.width(400)
														.height(250)
														.url()}
													alt={post.title}
													fill
													className='object-cover group-hover:scale-105 transition-transform duration-300'
												/>
											) : (
												<div className='w-full h-full bg-gradient-to-br from-primary-blue to-primary-orange flex items-center justify-center'>
													<span className='text-white text-2xl font-bold'>
														E360
													</span>
												</div>
											)}
										</div>

										<div className='p-6'>
											{/* Categories */}
											{post.categories &&
												post.categories.length > 0 && (
													<div className='flex flex-wrap gap-2 mb-3'>
														{post.categories
															.slice(0, 2)
															.map((category) => (
																<span
																	key={category._id}
																	className='px-2 py-1 bg-primary-orange/10 text-primary-orange text-xs rounded-full font-medium'
																>
																	{category.title}
																</span>
															))}
													</div>
												)}

											<h3 className='text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-orange transition-colors duration-200'>
												{post.title}
											</h3>

											{/* Meta Information */}
											<div className='flex flex-wrap items-center text-sm text-gray-600 gap-4 mb-3'>
												{post.author && (
													<div className='flex items-center gap-1'>
														<UserIcon className='w-4 h-4' />
														<span>{post.author.name}</span>
													</div>
												)}
												<div className='flex items-center gap-1'>
													<CalendarIcon className='w-4 h-4' />
													<span>{formatDate(post.publishedAt)}</span>
												</div>
												<div className='flex items-center gap-1'>
													<ClockIcon className='w-4 h-4' />
													<span>
														{post.estimatedReadingTime} min read
													</span>
												</div>
											</div>
										</div>
									</Link>
								</article>
							))}
						</div>

						{/* Load More Button */}
						{hasMore && selectedCategory === "all" && !searchTerm && (
							<div className='text-center'>
								<button
									onClick={loadMorePosts}
									disabled={loadingMore}
									className='px-8 py-3 bg-primary-orange text-white rounded-lg hover:bg-primary-blue transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
								>
									{loadingMore ? "Loading..." : "Load More Articles"}
								</button>
							</div>
						)}
					</>
				) : (
					<div className='text-center py-12'>
						<p className='text-gray-600 text-lg'>
							No articles found. Try adjusting your search or filter
							criteria.
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default BlogPostsClient;
