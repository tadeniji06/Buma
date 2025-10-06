import { bill, vehicle, mall, rail } from "@/assets";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.cjs";
// Example counts for sidebar (replace with real data from API later)
const sidebarCategories = [
	{ title: "Billboards", count: 435 },
	{ title: "Long Vehicle", count: 405 },
	{ title: "Shopping Mall", count: 400 },
	{ title: "Buildings", count: 270 },
	{ title: "Bus Shelters", count: 300 },
	{ title: "Trains/Rails", count: 400 },
	{ title: "Digital Boards", count: 194 },
	{ title: "Street Billboard", count: 367 },
];

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

const Body = () => {
	return (
		<div className='flex w-full min-h-screen md:px-32 px:16 md:py-8'>
			{/* Sidebar */}
			<aside className='w-64 border-r border-gray-200 p-6 bg-white hidden md:block'>
				<div className='flex items-center gap-2 mb-6'>
					<Icon
						icon='mi:filter'
						className='text-gray-600 text-lg'
					/>
					<p className='font-semibold text-gray-800'>Categories</p>
				</div>

				<ul className='space-y-4'>
					{sidebarCategories.map((cat, i) => (
						<li
							key={i}
							className='flex justify-between items-center text-gray-700 hover:text-primary-purple cursor-pointer text-sm'
						>
							<span>{cat.title}</span>
							<span className='text-gray-500'>
								{cat.count} spaces
							</span>
						</li>
					))}
				</ul>
			</aside>

			{/* Main Content */}
			<main className='flex-1 p-6'>
				<div className='flex justify-between items-center mb-6'>
					<h2 className='text-lg font-semibold text-gray-800'>
						All Categories - {categories.length}
					</h2>
				</div>

				{/* Grid */}
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
					{categories.map((cat, i) => (
						<div
							key={i}
							className='border-white rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all'
						>
							<div className='relative w-full h-40'>
								<Image
									src={cat.image}
									alt={cat.title}
									fill
									className='object-cover'
								/>
							</div>
							<div className='p-4'>
								<h3 className='font-semibold text-gray-900'>
									{cat.title}
								</h3>
								<p className='text-gray-600 text-sm'>{cat.desc}</p>
							</div>
						</div>
					))}
				</div>
			</main>
		</div>
	);
};

export default Body;
