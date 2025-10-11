import { mall } from "@/assets";
import { Icon } from "@iconify/react";
import Image from "next/image";

const Hero = () => {
	return (
		<div className='relative w-full h-auto p-4 md:p-0 md:h-[600px] overflow-hidden'>
			<Image
				src={mall}
				alt='Hero Background'
				priority
				fill
				className='object-cover'
				style={{ zIndex: -2 }}
			/>
			{/* Overlay */}
			<div className='absolute inset-0 bg-black/70' />

			{/* Content */}
			<div className='relative z-10 flex items-center justify-center h-full px-4'>
				<div className='flex flex-col gap-6 text-white items-center max-w-5xl mx-auto text-center'>
					<h1 className='text-3xl md:text-5xl font-bold leading-snug max-w-2xl'>
						Find the Perfect Advertising Space for Your Brand
					</h1>
					<p className='text-base md:text-xl max-w-xl font-light leading-tight text-gray-200'>
						Browse billboards, vehicles, and digital screens available
						for your next campaign.
					</p>

					{/* Search Bar */}
					<div className='w-full p-5 bg-white rounded-2xl shadow-xl flex flex-col gap-4 md:flex-row md:items-end md:gap-6'>
						{/* Location */}
						<div className='flex flex-col gap-2 flex-1'>
							<label className='text-sm font-medium text-gray-700'>
								Enter Location
							</label>
							<div className='flex items-center border rounded-xl px-3 py-2 gap-3 text-gray-600 bg-gray-50'>
								<Icon
									icon='mdi:location'
									className='text-xl text-gray-500'
								/>
								<input
									className='flex-1 bg-transparent outline-none text-sm'
									type='text'
									placeholder='e.g. Lagos, Nigeria'
								/>
							</div>
						</div>

						{/* Category */}
						<div className='flex flex-col gap-2 flex-1'>
							<label className='text-sm font-medium text-gray-700'>
								Select Category
							</label>
							<div className='flex items-center border rounded-xl px-3 py-2 gap-3 text-gray-600 bg-gray-50'>
								<select className='flex-1 bg-transparent outline-none text-sm'>
									<option value=''>Choose a category</option>
									<option value='billboard'>Billboard</option>
									<option value='vehicle'>Vehicle</option>
									<option value='digital'>Digital Screen</option>
								</select>
							</div>
						</div>

						{/* Budget */}
						{/* <div className='flex flex-col gap-2 flex-1'>
							<label className='text-sm font-medium text-gray-700'>
								Budget Range
							</label>
							<div className='flex items-center border rounded-xl px-3 py-2 gap-3 text-gray-600 bg-gray-50'>
								<Icon
									icon='mdi:cash'
									className='text-xl text-gray-500'
								/>
								<input
									className='flex-1 bg-transparent outline-none text-sm'
									type='text'
									placeholder='$1000 - $5000'
								/>
							</div>
						</div> */}

						{/* Search Button */}
						<div className='flex w-full md:w-auto'>
							<button className='w-full md:w-auto bg-primary-purple text-white font-semibold px-6 py-3 rounded-xl hover:bg-primary-purple/90 transition-colors'>
								Search
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hero;
