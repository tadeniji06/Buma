"use client";
import { radioStations } from "@/utils/data";
import ListSpace from "@/components/ListSpace";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useState } from "react";

const RadioPage = () => {
	const [searchTerm, setSearchTerm] = useState("");

	const filteredStations = radioStations.filter((station) =>
		station.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	return (
		<div className='flex flex-col min-h-screen bg-gray-50'>
			{/* Hero Section */}
			<div className='relative bg-primary-purple py-20 px-6 text-center text-white overflow-hidden'>
				<div className='absolute inset-0 opacity-10 pattern-dots'></div>
				<div className='relative z-10 max-w-4xl mx-auto space-y-6'>
					<h1 className='text-4xl md:text-5xl font-bold animate-fadeIn'>
						Radio Stations
					</h1>
					<p className='text-xl md:text-2xl text-purple-100 max-w-2xl mx-auto'>
						Connect with millions of listeners across top-rated radio
						stations.
					</p>

					{/* Search Bar */}
					<div className='max-w-xl mx-auto mt-8 relative'>
						<input
							type='text'
							placeholder='Search for a radio station...'
							className='w-full pl-12 pr-4 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-purple-300 shadow-xl'
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
						<Icon
							icon='mdi:magnify'
							className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6'
						/>
					</div>
				</div>
			</div>

			{/* Content Section */}
			<main className='flex-1 max-w-7xl mx-auto w-full px-6 py-12'>
				<div className='flex justify-between items-center mb-8'>
					<h2 className='text-2xl font-bold text-gray-900'>
						Top Ranked Stations
					</h2>
					<span className='text-gray-500 font-medium'>
						{filteredStations.length} station
						{filteredStations.length !== 1 && "s"}
					</span>
				</div>

				{filteredStations.length === 0 ? (
					<div className='flex flex-col items-center justify-center py-20 text-center'>
						<Icon
							icon='mdi:radio-tower'
							className='w-16 h-16 text-gray-300 mb-4'
						/>
						<h3 className='text-xl font-semibold text-gray-900 mb-2'>
							No stations found
						</h3>
						<p className='text-gray-500'>
							We couldn't find any radio stations matching "
							{searchTerm}"
						</p>
						<button
							onClick={() => setSearchTerm("")}
							className='mt-6 text-primary-purple font-semibold hover:underline'
						>
							View all stations
						</button>
					</div>
				) : (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{filteredStations.map((station, index) => {
							// Find the original index for ranking if filtering
							const originalRank = radioStations.indexOf(station) + 1;

							const message = encodeURIComponent(
								`Hi, I’m interested in placing ads on ${station}`,
							);
							const whatsappUrl = `https://wa.me/2347040925563?text=${message}`;

							// Rank Icon Logic
							const getRankDisplay = (rank: number) => {
								if (rank === 1)
									return (
										<Icon
											icon='mdi:trophy'
											className='text-yellow-500 w-6 h-6'
										/>
									);
								if (rank === 2)
									return (
										<Icon
											icon='mdi:medal'
											className='text-gray-400 w-6 h-6'
										/>
									);
								if (rank === 3)
									return (
										<Icon
											icon='mdi:medal'
											className='text-amber-700 w-6 h-6'
										/>
									);
								return (
									<span className='font-bold text-lg'>#{rank}</span>
								);
							};

							return (
								<div
									key={station}
									className='group relative bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col justify-between h-full overflow-hidden'
								>
									{/* Background decorative icon */}
									<div className='absolute -right-6 -bottom-6 opacity-5 group-hover:opacity-10 transition-opacity duration-300 transform rotate-12'>
										<Icon
											icon='mdi:radio-tower'
											className='w-32 h-32 text-primary-purple'
										/>
									</div>

									<div>
										<div className='flex items-start justify-between mb-4 relative z-10'>
											<div className='w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-primary-purple group-hover:bg-primary-purple group-hover:text-white transition-colors shadow-sm ring-4 ring-white'>
												{getRankDisplay(originalRank)}
											</div>
											<div className='flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide'>
												<Icon
													icon='mdi:check-decagram'
													className='w-3.5 h-3.5'
												/>
												Available
											</div>
										</div>

										<h3 className='text-lg font-bold text-gray-900 mb-1 group-hover:text-primary-purple transition-colors line-clamp-1 relative z-10'>
											{station}
										</h3>

										<div className='flex items-center gap-2 text-xs text-gray-500 mb-6 relative z-10'>
											<span className='flex items-center gap-1'>
												<Icon
													icon='mdi:map-marker'
													className='w-3 h-3'
												/>
												Lagos, Nigeria
											</span>
											<span>•</span>
											<span className='flex items-center gap-1'>
												<Icon
													icon='mdi:frequency-stereo'
													className='w-3 h-3'
												/>
												FM Station
											</span>
										</div>

										{/* Mock Stats Grid */}
										<div className='grid grid-cols-2 gap-2 mb-6 relative z-10'>
											<div className='bg-gray-50 p-2.5 rounded-xl border border-gray-100'>
												<div className='flex items-center gap-1.5 mb-1'>
													<Icon
														icon='mdi:account-group'
														className='w-4 h-4 text-primary-purple/70'
													/>
													<span className='text-[10px] font-semibold text-gray-400 uppercase tracking-wider'>
														Audience
													</span>
												</div>
												<span className='text-sm font-bold text-gray-800'>
													Mass Reach
												</span>
											</div>
											<div className='bg-gray-50 p-2.5 rounded-xl border border-gray-100'>
												<div className='flex items-center gap-1.5 mb-1'>
													<Icon
														icon='mdi:chart-bar'
														className='w-4 h-4 text-primary-purple/70'
													/>
													<span className='text-[10px] font-semibold text-gray-400 uppercase tracking-wider'>
														Rating
													</span>
												</div>
												<span className='text-sm font-bold text-gray-800'>
													Top Tier
												</span>
											</div>
										</div>
									</div>

									<a
										href={whatsappUrl}
										target='_blank'
										rel='noopener noreferrer'
										className='relative z-10 w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gray-900 text-white font-semibold hover:bg-primary-purple transition-all shadow-lg shadow-gray-200 hover:shadow-primary-purple/30 group-hover:translate-y-0'
									>
										<Icon icon='mdi:whatsapp' className='w-5 h-5' />
										Book Ad Slot
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

export default RadioPage;
