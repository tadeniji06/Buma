"use client";
import { ba3, hero1, hero2, hero3, hero4, hero5 } from "@/assets";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";

const Hero = () => {
	const [currentTextIndex, setCurrentTextIndex] = useState(0);
	const [fade, setFade] = useState(true);

	const heroTexts = [
		{ text: "Radio", image: hero4 },
		{ text: "TV", image: hero5 },
		{ text: "PR", image: hero3 },
		{ text: "Billboards", image: hero1 },
		{ text: "Influencer Marketing", image: hero2 },
	];

	useEffect(() => {
		const interval = setInterval(() => {
			setFade(false); // Start fading out
			setTimeout(() => {
				setCurrentTextIndex((prevIndex) =>
					prevIndex === heroTexts.length - 1 ? 0 : prevIndex + 1,
				);
				setFade(true); // Start fading in
			}, 1000); // Wait for the fade out to complete (0.5s)
		}, 4000); // Change text every 3.5 seconds

		return () => clearInterval(interval);
	}, []);

	return (
		<section className='relative w-full h-[600px] md:h-[750px] overflow-hidden flex items-center'>
			{heroTexts.map((item, index) => (
				<div
					key={index}
					className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
						index === currentTextIndex ? "opacity-100" : "opacity-0"
					}`}
					style={{ zIndex: -2 }}
				>
					<Image
						src={item.image}
						alt={`${item.text} Background`}
						priority={index === 0}
						fill
						className='object-cover object-center'
						placeholder='blur'
					/>
				</div>
			))}

			{/* Dark Overlay */}
			<div
				className='absolute inset-0 bg-black/60'
				style={{ zIndex: -1 }}
			/>

			<div className='relative z-10 w-full max-w-7xl px-6 mx-auto'>
				<div className='max-w-3xl space-y-8 text-left'>
					{/* Small Brand Label */}
					<p className='text-sm md:text-base font-bold text-gray-300 uppercase tracking-widest mb-2 animate-fadeIn'>
						BUMA
					</p>

					{/* Main Headline */}
					<h1 className='text-5xl md:text-7xl font-extrabold tracking-tight leading-tight text-white drop-shadow-lg'>
						Find the Perfect <br />
						<span
							className={`inline-block transition-all duration-500 transform ${
								fade
									? "opacity-100 translate-y-0 scale-100"
									: "opacity-0 translate-y-4 scale-95"
							}`}
							style={{ color: indexToColor(currentTextIndex) }}
						>
							{heroTexts[currentTextIndex].text}
						</span>
						<br />
						for Your Brand
					</h1>

					{/* Subtext */}
					<p className='text-lg md:text-xl text-gray-200 font-medium max-w-xl leading-relaxed'>
						Tell us what you need. We handle everything — from finding
						the right media channel to delivering results for your
						campaign.
					</p>

					{/* Buttons */}
					<div
						className='flex flex-wrap items-center gap-4 pt-4 animate-fadeIn'
						style={{ animationDelay: "0.2s" }}
					>
						<a
							href='https://wa.me/2347040925563'
							target='_blank'
							rel='noopener noreferrer'
							className='flex items-center gap-2 px-8 py-4 text-base font-bold text-white bg-[#25D366] rounded-lg hover:bg-[#20bd5a] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1'
						>
							<Icon icon='mdi:whatsapp' className='w-6 h-6' />
							Chat with Us on WhatsApp
						</a>
						{/* <a
							href='#'
							className='flex items-center gap-2 px-8 py-4 text-base font-bold text-white border border-white/30 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all shadow-lg hover:-translate-y-1'
						>
							<Icon
								icon='mdi:credit-card-outline'
								className='w-6 h-6'
							/>
							Pay Online
						</a> */}
					</div>

					{/* Pagination Indicators */}
					<div className='flex items-center gap-3 pt-8'>
						{heroTexts.map((_, idx) => (
							<button
								key={idx}
								onClick={() => {
									setFade(false);
									setTimeout(() => {
										setCurrentTextIndex(idx);
										setFade(true);
									}, 300);
								}}
								className={`h-1.5 rounded-full transition-all duration-300 ${
									idx === currentTextIndex
										? "w-8 bg-primary-purple"
										: "w-2 bg-gray-500 hover:bg-gray-400"
								}`}
								aria-label={`Go to slide ${idx + 1}`}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

// Helper for dynamic colors
const indexToColor = (index: number) => {
	const colors = [
		"#A855F7", // Purple (Radio)
		"#E11D48", // Pink (TV)
		"#3B82F6", // Blue (PR)
		"#F97316", // Orange (Billboards)
		"#10B981", // Emerald (Influencer)
	];
	return colors[index % colors.length];
};

export default Hero;
