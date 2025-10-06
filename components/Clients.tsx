import {
	mobil,
	franem,
	binance,
	scm,
	dewave,
	bitget,
	gpc,
	maybrands,
} from "@/assets";
import Image from "next/image";

const Clients = () => {
	const images = [
		mobil,
		maybrands,
		franem,
		binance,
		scm,
		dewave,
		bitget,
		gpc,
	];

	return (
		<div className='py-12 px-6 bg-gray-50'>
			<div className='max-w-6xl mx-auto flex flex-col gap-8 items-center text-center'>
				{/* Heading */}
				<div className='max-w-2xl'>
					<h2 className='text-2xl md:text-3xl font-bold text-gray-900'>
						Trusted by advertisers & agencies worldwide
					</h2>
					<p className='text-gray-600 mt-2 text-sm md:text-base'>
						Our platform powers campaigns across industries, from tech
						giants to local businesses.
					</p>
				</div>

				{/* Logos Grid */}
				<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 items-center'>
					{images.map((logo, i) => (
						<div key={i} className='flex justify-center items-center'>
							<Image
								src={logo}
								alt={`Client logo ${i + 1}`}
								className='object-contain'
								width={120}
								height={60}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Clients;
