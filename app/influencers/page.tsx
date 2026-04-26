"use client";
import { influencers } from "@/utils/data";
import ListSpace from "@/components/ListSpace";
import { Icon } from "@iconify/react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { toast } from "sonner";

const InfluencersPage = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const resultsRef = useRef<HTMLDivElement>(null);

	const filteredInfluencers = influencers.filter((influencer) =>
		influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
		influencer.niche.toLowerCase().includes(searchTerm.toLowerCase()) ||
		influencer.platform.toLowerCase().includes(searchTerm.toLowerCase())
	);

	// UX: Toast when no results found
	useEffect(() => {
		if (searchTerm && filteredInfluencers.length === 0) {
			toast.error(`No influencers found for "${searchTerm}"`, {
				description: "Try searching for a different name, niche, or platform.",
				id: "no-results-toast",
			});
		}
	}, [searchTerm, filteredInfluencers.length]);

	const handleSearch = (value: string) => {
		setSearchTerm(value);
		if (value && resultsRef.current) {
			resultsRef.current.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}
	};

	return (
		<div className='flex flex-col min-h-screen bg-gray-50'>
			{/* Hero Section */}
			<div className='relative bg-gradient-to-br from-gray-900 via-black to-gray-800 py-24 md:py-32 px-6 text-center text-white overflow-hidden'>
				{/* Background Elements */}
				<div className='absolute inset-0 opacity-20 pattern-dots'></div>
				<div className='absolute -left-20 -top-20 w-80 h-80 bg-white/5 rounded-full blur-3xl'></div>
				<div className='absolute -right-20 -bottom-20 w-80 h-80 bg-gray-500/20 rounded-full blur-3xl'></div>

				{/* Floating Icons */}
				<div
					className='absolute top-20 left-[10%] opacity-20 animate-bounce hidden md:block'
					style={{ animationDuration: "3s" }}
				>
					<Icon icon='mdi:account-group-outline' className='w-12 h-12' />
				</div>
				<div
					className='absolute bottom-20 right-[15%] opacity-20 animate-pulse hidden md:block'
					style={{ animationDuration: "4s" }}
				>
					<Icon icon='mdi:instagram' className='w-14 h-14' />
				</div>
				<div className='absolute top-[40%] right-[8%] opacity-10 hidden lg:block rotate-12'>
					<Icon icon='mdi:twitter' className='w-24 h-24' />
				</div>
				<div className='absolute bottom-[30%] left-[5%] opacity-10 hidden lg:block -rotate-12'>
					<Icon icon='mdi:youtube' className='w-20 h-20' />
				</div>

				<div className='relative z-10 max-w-4xl mx-auto space-y-8'>
					<div className='inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-gray-200 animate-fadeIn'>
						<span className='flex h-2 w-2 rounded-full bg-green-400 animate-pulse'></span>
						700+ Top Influencers Available
					</div>

					<h1 className='text-5xl md:text-7xl font-extrabold tracking-tight animate-slideUp'>
						Influencer{" "}
						<span className='text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-white'>
							Marketing
						</span>
					</h1>

					<p className='text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed'>
						Connect with top content creators and influencers to amplify your brand's reach and engagement.
					</p>

					{/* Search Bar */}
					<div className='max-w-2xl mx-auto mt-12 relative group'>
						<div className='absolute -inset-1 bg-gradient-to-r from-gray-600 to-gray-400 rounded-full opacity-25 group-hover:opacity-50 transition duration-300 blur'></div>
						<div className='relative'>
							<input
								type='text'
								placeholder='Search by name, niche, or platform...'
								className='w-full pl-14 pr-6 py-5 rounded-full text-gray-900 bg-white shadow-2xl focus:outline-none focus:ring-4 focus:ring-gray-400/50 transition-all text-lg'
								value={searchTerm}
								onChange={(e) => handleSearch(e.target.value)}
							/>
							<Icon
								icon='mdi:magnify'
								className='absolute left-5 top-1/2 -translate-y-1/2 text-gray-900 w-7 h-7'
							/>
							{searchTerm && (
								<button
									onClick={() => handleSearch("")}
									className='absolute right-5 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors'
								>
									<Icon
										icon='mdi:close'
										className='w-5 h-5 text-gray-400'
									/>
								</button>
							)}
						</div>
					</div>

					{/* Popular Tags */}
					<div className='flex flex-wrap justify-center gap-3 text-sm'>
						<span className='text-gray-400'>Popular:</span>
						{["Comedy", "Instagram", "News", "Entertainment"].map(
							(tag) => (
								<button
									key={tag}
									onClick={() => handleSearch(tag)}
									className='text-gray-300 hover:text-white hover:bg-white/10 px-3 py-1 rounded-md transition-colors'
								>
									{tag}
								</button>
							),
						)}
					</div>
				</div>
			</div>

			{/* Content Section */}
			<main
				className='flex-1 max-w-7xl mx-auto w-full px-6 py-12'
				ref={resultsRef}
			>
				<div className='flex justify-between items-center mb-8'>
					<h2 className='text-2xl font-bold text-gray-900'>
						Featured Influencers
					</h2>
					<span className='text-gray-500 font-medium'>
						{filteredInfluencers.length} influencer
						{filteredInfluencers.length !== 1 && "s"}
					</span>
				</div>

				{filteredInfluencers.length === 0 ? (
					<div className='flex flex-col items-center justify-center py-20 text-center'>
						<Icon
							icon='mdi:account-group-outline'
							className='w-16 h-16 text-gray-300 mb-4'
						/>
						<h3 className='text-xl font-semibold text-gray-900 mb-2'>
							No influencers found
						</h3>
						<p className='text-gray-500'>
							We couldn't find any influencers matching "
							{searchTerm}"
						</p>
						<button
							onClick={() => setSearchTerm("")}
							className='mt-6 text-orange-500 font-semibold hover:underline'
						>
							View all influencers
						</button>
					</div>
				) : (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{filteredInfluencers.map((influencer) => {
							const message = encodeURIComponent(
								`Hi, I’m interested in working with ${influencer.name} for an influencer marketing campaign.`,
							);
							// Using the primary WhatsApp number from the contact page
							const whatsappUrl = `https://wa.me/2348064968725?text=${message}`;

							return (
								<div
									key={influencer.name}
									className='group relative bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col justify-between h-full overflow-hidden'
								>
									{/* Background decorative icon */}
									<div className='absolute -right-6 -bottom-6 opacity-5 group-hover:opacity-10 transition-opacity duration-300 transform rotate-12'>
										<Icon
											icon='mdi:account-star'
											className='w-32 h-32 text-orange-500'
										/>
									</div>

									<div>
										<div className='flex items-start justify-between mb-4 relative z-10'>
											<div className='flex gap-3'>
												<div className='w-14 h-14 rounded-full border-2 border-orange-100 bg-white overflow-hidden p-0.5 shadow-sm flex items-center justify-center'>
													<Image
														src={influencer.image}
														alt={influencer.name}
														width={56}
														height={56}
														className='object-cover w-full h-full rounded-full'
													/>
												</div>
											</div>
											<div className='flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide'>
												<Icon
													icon='mdi:check-decagram'
													className='w-3.5 h-3.5'
												/>
												Available
											</div>
										</div>

										<h3 className='text-xl font-bold text-gray-900 mb-1 group-hover:text-orange-500 transition-colors line-clamp-1 relative z-10'>
											{influencer.name}
										</h3>

										<div className='flex items-center gap-2 text-xs text-gray-500 mb-6 relative z-10'>
											<span className='flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md'>
												<Icon
													icon='mdi:tag-outline'
													className='w-3 h-3'
												/>
												{influencer.niche}
											</span>
										</div>

										{/* Stats Grid */}
										<div className='grid grid-cols-2 gap-2 mb-6 relative z-10'>
											<div className='bg-orange-50 p-3 rounded-xl border border-orange-100/50'>
												<div className='flex items-center gap-1.5 mb-1'>
													<Icon
														icon='mdi:account-group'
														className='w-4 h-4 text-orange-500/70'
													/>
													<span className='text-[10px] font-semibold text-gray-500 uppercase tracking-wider'>
														Followers
													</span>
												</div>
												<span className='text-base font-bold text-gray-900'>
													{influencer.followers}
												</span>
											</div>
											<div className='bg-orange-50 p-3 rounded-xl border border-orange-100/50'>
												<div className='flex items-center gap-1.5 mb-1'>
													<Icon
														icon='mdi:cellphone-link'
														className='w-4 h-4 text-orange-500/70'
													/>
													<span className='text-[10px] font-semibold text-gray-500 uppercase tracking-wider'>
														Platform
													</span>
												</div>
												<span className='text-sm font-bold text-gray-900 truncate'>
													{influencer.platform}
												</span>
											</div>
										</div>
									</div>

									<a
										href={whatsappUrl}
										target='_blank'
										rel='noopener noreferrer'
										className='relative z-10 w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gray-900 text-white font-semibold hover:bg-orange-500 transition-all shadow-lg shadow-gray-200 hover:shadow-orange-500/30 group-hover:translate-y-0'
									>
										<Icon icon='mdi:whatsapp' className='w-5 h-5' />
										Contact via WhatsApp
									</a>
								</div>
							);
						})}
					</div>
				)}
			</main>

			<ListSpace />
		</div>
	);
};

export default InfluencersPage;
