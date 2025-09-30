import { bill, vehicle, mall, rail } from "@/assets";
import Image from "next/image";

const Categories = () => {
	const categories = [
		{
			title: "Billboards",
			image: bill,
			desc: "Large outdoor advertising displays",
		},
		{
			title: "Vehicles",
			image: vehicle,
			desc: "Mobile advertising on trucks & buses",
		},
		{
			title: "Rail/Train Advertising",
			image: rail,
			desc: "Advertise on trains and in rail stations",
		},
		{
			title: "Mall Advertising",
			image: mall,
			desc: "Engage shoppers directly in malls",
		},
	];

	return (
		<div className='p-5 md:py-12'>
			{/* Header */}
			<div className='flex flex-col md:flex-row justify-between items-start md:items-center mx-auto max-w-6xl mb-8 gap-4'>
				<div className='flex flex-col gap-2'>
					<h2 className='text-2xl md:text-3xl font-bold text-gray-900'>
						Find Space By Categories
					</h2>
					<p className='text-gray-600 text-sm md:text-base font-light max-w-md'>
						Find the perfect advertising medium for your campaign
						across various categories
					</p>
				</div>
				<p className='text-primary-purple font-medium cursor-pointer hover:underline'>
					See all
				</p>
			</div>

			{/* Categories Grid */}
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto'>
				{categories.map((category, index) => (
					<div
						key={index}
						className='flex flex-col border-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-200 bg-white'
					>
						{/* Image */}
						<div className='relative w-full h-40'>
							<Image
								src={category.image}
								alt={category.title}
								fill
								className='object-cover'
							/>
						</div>

						{/* Text */}
						<div className='flex flex-col gap-2 p-4'>
							<h3 className='font-semibold text-lg text-gray-900'>
								{category.title}
							</h3>
							<p className='text-sm text-gray-600 leading-snug'>
								{category.desc}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Categories;
