import { footBg } from "@/assets";
import Image from "next/image";
import Link from "next/link";

const TutHero = () => {
	return (
		<div className='bg-gray-300 rounded-2xl mt-5 flex flex-col-reverse md:flex-row items-center justify-between gap-8 px-6 py-12 max-w-7xl mx-auto'>
			{/* Left Content */}
			<div className='flex flex-col gap-6 text-center md:text-left'>
				<span className='text-primary-purple font-semibold tracking-wide'>
					HOW IT WORKS
				</span>
				<h2 className='text-3xl md:text-4xl font-bold text-dark'>
					Simple. Transparent. Effective
				</h2>
				<p className='text-gray-600 max-w-md mx-auto md:mx-0'>
					Whether you're looking to advertise your brand or monetize
					your space, BUMA makes the process seamless and secure.
				</p>

				{/* Buttons */}
				<div className='flex flex-col sm:flex-row gap-4 justify-center md:justify-start'>
					<button className='cursor-pointer bg-primary-purple text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-purple/90 transition'>
						List Space
					</button>
				<Link href={'/spaces'}>
				 	<button className='cursor-pointer border border-primary-purple text-primary-purple px-6 py-3 rounded-xl font-medium hover:bg-primary-purple/10 transition'>
 						Browse Space
 					</button>
				</Link>
				</div>
			</div>

			{/* Right Image */}
			<div className='w-full md:w-1/2 flex justify-center'>
				<Image
					src={footBg}
					alt='How it works illustration'
					className='rounded-xl object-contain max-h-[350px] w-auto'
				/>
			</div>
		</div>
	);
};

export default TutHero;
