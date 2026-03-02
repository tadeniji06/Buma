"use client";
import { radioStations } from "@/utils/data";
import ListSpace from "@/components/ListSpace";
import { Icon } from "@iconify/react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { toast } from "sonner";

const RadioPage = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const resultsRef = useRef<HTMLDivElement>(null);

	const filteredStations = radioStations.filter((station) =>
		station.name.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	// UX: Toast when no results found
	useEffect(() => {
		if (searchTerm && filteredStations.length === 0) {
			toast.error(`No stations found for "${searchTerm}"`, {
				description: "Try searching for a different name or region.",
				id: "no-results-toast",
			});
		}
	}, [searchTerm, filteredStations.length]);

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
			<div className='relative bg-gradient-to-br from-primary-purple via-purple-700 to-indigo-900 py-24 md:py-32 px-6 text-center text-white overflow-hidden'>
				{/* Background Elements */}
				<div className='absolute inset-0 opacity-20 pattern-dots'></div>
				<div className='absolute -left-20 -top-20 w-80 h-80 bg-white/5 rounded-full blur-3xl'></div>
				<div className='absolute -right-20 -bottom-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl'></div>

				{/* Floating Icons */}
				<div
					className='absolute top-20 left-[10%] opacity-20 animate-bounce hidden md:block'
					style={{ animationDuration: "3s" }}
				>
					<Icon icon='mdi:radio-tower' className='w-12 h-12' />
				</div>
				<div
					className='absolute bottom-20 right-[15%] opacity-20 animate-pulse hidden md:block'
					style={{ animationDuration: "4s" }}
				>
					<Icon icon='mdi:microphone-variant' className='w-14 h-14' />
				</div>
				<div className='absolute top-[40%] right-[8%] opacity-10 hidden lg:block rotate-12'>
					<Icon icon='mdi:waveform' className='w-24 h-24' />
				</div>
				<div className='absolute bottom-[30%] left-[5%] opacity-10 hidden lg:block -rotate-12'>
					<Icon icon='mdi:music-note' className='w-20 h-20' />
				</div>

				<div className='relative z-10 max-w-4xl mx-auto space-y-8'>
					<div className='inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-purple-100 animate-fadeIn'>
						<span className='flex h-2 w-2 rounded-full bg-green-400 animate-pulse'></span>
						70+ Verified Radio Stations
					</div>

					<h1 className='text-5xl md:text-7xl font-extrabold tracking-tight animate-slideUp'>
						Radio{" "}
						<span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-indigo-200'>
							Advertising
						</span>
					</h1>

					<p className='text-xl md:text-2xl text-purple-100/90 max-w-2xl mx-auto leading-relaxed'>
						Reach millions of active listeners across Nigeria’s most
						popular radio stations with instant slot booking.
					</p>

					{/* Search Bar */}
					<div className='max-w-2xl mx-auto mt-12 relative group'>
						<div className='absolute -inset-1 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full opacity-25 group-hover:opacity-50 transition duration-300 blur'></div>
						<div className='relative'>
							<input
								type='text'
								placeholder='Search stations, regions or frequencies...'
								className='w-full pl-14 pr-6 py-5 rounded-full text-gray-900 bg-white shadow-2xl focus:outline-none focus:ring-4 focus:ring-purple-400/50 transition-all text-lg'
								value={searchTerm}
								onChange={(e) => handleSearch(e.target.value)}
							/>
							<Icon
								icon='mdi:magnify'
								className='absolute left-5 top-1/2 -translate-y-1/2 text-primary-purple w-7 h-7'
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
						<span className='text-purple-200/60'>Popular:</span>
						{["Lagos", "Wazobia", "Cool FM", "Top 40", "News"].map(
							(tag) => (
								<button
									key={tag}
									onClick={() => handleSearch(tag)}
									className='text-purple-100 hover:text-white hover:bg-white/10 px-3 py-1 rounded-md transition-colors'
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
						Available Stations
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
						{filteredStations.map(({ name, logo }, index) => {
							const message = encodeURIComponent(
								`Hi, I’m interested in placing ads on ${name}`,
							);
							const whatsappUrl = `https://wa.me/2347040925563?text=${message}`;

							return (
								<div
									key={name}
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
											<div className='flex gap-3'>
												<div className='w-12 h-12 rounded-xl border border-gray-100 bg-white overflow-hidden p-1 shadow-sm flex items-center justify-center'>
													<Image
														src={logo}
														alt={name}
														width={40}
														height={40}
														className='object-contain w-full h-full'
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

										<h3 className='text-lg font-bold text-gray-900 mb-1 group-hover:text-primary-purple transition-colors line-clamp-1 relative z-10'>
											{name}
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
