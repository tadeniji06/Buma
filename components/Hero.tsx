"use client";
import { ba3 } from "@/assets";
import { useState, useEffect } from "react";
import Image from "next/image";

const Hero = () => {
	const [currentTextIndex, setCurrentTextIndex] = useState(0);
	const [fade, setFade] = useState(true);

	const heroTexts = [
		"Radio",
		"TV",
		"PR",
		"Television",
		"Influencer Marketing",
	];

	useEffect(() => {
		const interval = setInterval(() => {
			setFade(false); // Start fading out
			setTimeout(() => {
				setCurrentTextIndex((prevIndex) =>
					prevIndex === heroTexts.length - 1 ? 0 : prevIndex + 1,
				);
				setFade(true); // Start fading in
			}, 500); // Wait for the fade out to complete (0.5s)
		}, 3500); // Change text every 3.5 seconds

		return () => clearInterval(interval);
	}, []);

	return (
		<section className='relative w-full h-[600px] md:h-[700px] overflow-hidden flex items-center justify-center'>
			<Image
				src={ba3}
				alt='Hero Background'
				priority
				fill
				className='object-cover object-center'
				style={{ zIndex: -2 }}
			/>
			{/* Gradient Overlay for better text readability */}
			<div className='absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black/70' />

			<div className='relative z-10 w-full max-w-5xl px-4 mx-auto text-center text-white space-y-8'>
				{/* Main Headline with Rotating Text */}
				<div className='space-y-4'>
					<h1 className='text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight drop-shadow-2xl'>
						Find the Perfect <br className='md:hidden' />
						<span
							className={`inline-block text-primary-purple-light transition-all duration-500 transform ${
								fade
									? "opacity-100 translate-y-0 scale-100"
									: "opacity-0 translate-y-4 scale-95"
							}`}
						>
							{heroTexts[currentTextIndex]}
						</span>
						<br />
						for Your Brand
					</h1>
					<p className='max-w-2xl mx-auto text-lg md:text-xl md:leading-relaxed text-gray-200 drop-shadow-md font-medium px-4'>
						Seamlessly discover, book, and manage your media campaigns
						across Africa's largest network of advertising spaces.
					</p>
				</div>

				{/* Call to Action */}
				<div
					className='pt-4 animate-fadeIn'
					style={{ animationDelay: "0.2s" }}
				>
					<button className='group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-primary-purple rounded-full hover:bg-primary-purple-dark hover:scale-105 hover:shadow-lg hover:shadow-primary-purple/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-purple focus:ring-offset-gray-900'>
						<span>Start Your Campaign</span>
						<svg
							className='w-5 h-5 ml-2 -mr-1 transition-transform duration-200 group-hover:translate-x-1'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M13 7l5 5m0 0l-5 5m5-5H6'
							/>
						</svg>
					</button>
				</div>
			</div>
		</section>
	);
};

export default Hero;
