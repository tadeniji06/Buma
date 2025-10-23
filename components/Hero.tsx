"use client";
import { heroBg } from "@/assets";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useState } from "react";

interface HeroProps {
	onSearch?: (location: string) => void;
}

const Hero = ({ onSearch }: HeroProps) => {
	const [location, setLocation] = useState("");

	const handleSearch = () => {
		if (!onSearch) return;
		onSearch(location.trim().toLowerCase());
	};

	return (
		<section className='relative w-full h-auto p-4 md:p-0 md:h-[700px] overflow-hidden'>
			<Image
				src={heroBg}
				alt='Hero Background'
				priority
				fill
				className='object-cover'
				style={{ zIndex: -2 }}
			/>
			<div className='absolute inset-0 bg-black/70' />

			<div className='relative z-10 flex items-center justify-center h-full px-4'>
				<div className='flex flex-col gap-6 text-white items-center max-w-3xl mx-auto text-center'>
					<h1 className='text-3xl md:text-5xl font-bold leading-snug'>
						Find the Perfect Billboard for Your Brand
					</h1>
					{/* <p className='text-base md:text-lg text-gray-200 font-light'>
						Search by location and explore available outdoor
						advertising spaces.
					</p> */}
{/* 
					<div className='w-full p-5 bg-white rounded-2xl shadow-xl flex flex-col gap-4 md:flex-row md:items-end md:gap-4'>
						<div className='flex flex-col gap-2 flex-1'>
							<label className='text-sm font-medium text-gray-700'>
								Search by Location
							</label>
							<div className='flex items-center border rounded-xl px-3 py-2 gap-3 text-gray-600 bg-gray-50'>
								<Icon
									icon='mdi:location'
									className='text-xl text-gray-500'
								/>
								<input
									className='flex-1 bg-transparent outline-none text-sm'
									type='text'
									placeholder='e.g. Lekki, Lagos'
									value={location}
									onChange={(e) => setLocation(e.target.value)}
									onKeyDown={(e) =>
										e.key === "Enter" && handleSearch()
									}
								/>
							</div>
						</div>

						<div className='flex w-full md:w-auto'>
							<button
								onClick={handleSearch}
								className='w-full bg-primary-purple text-white font-semibold px-6 py-3 rounded-xl hover:bg-primary-purple/90 transition-colors'
							>
								Search
							</button>
						</div>
					</div> */}
				</div>
			</div>
		</section>
	);
};

export default Hero;
