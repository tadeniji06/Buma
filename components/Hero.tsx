"use client";
import { ba3 } from "@/assets";
import Image from "next/image";

const Hero = () => {
	return (
		<section className='relative w-full h-auto p-4 md:p-0 md:h-[700px] overflow-hidden'>
			<Image
				src={ba3}
				alt='Hero Background'
				priority
				fill
				className='object-fit'
				style={{ zIndex: -2 }}
			/>
			<div className='absolute inset-0 bg-black/50' />

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
