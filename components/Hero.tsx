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
				</div>
			</div>
		</section>
	);
};

export default Hero;
