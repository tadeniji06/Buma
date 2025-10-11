"use client";
import { useEffect, useState } from "react";
import { sanity } from "@/lib/sanity";
import { GET_VENDORS_WITH_BILLBOARDS } from "@/lib/queries";
import { heroBg } from "@/assets";
import Image from "next/image";
import { Icon } from "@iconify/react";

const Hero = () => {
	const [vendors, setVendors] = useState<any[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const data = await sanity.fetch(GET_VENDORS_WITH_BILLBOARDS);
			setVendors(data);
		};
		fetchData();
	}, []);

	return (
		<div className='relative w-full h-[400px] p-4 md:p-0 md:h-[800px] overflow-hidden'>
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
				<div className='flex flex-col gap-6 text-white items-center max-w-5xl mx-auto text-center'>
					<h1 className='text-3xl md:text-5xl font-bold leading-snug max-w-2xl'>
						Browse Spaces by Vendors
					</h1>
					<p className='text-base md:text-xl max-w-xl font-light leading-tight text-gray-200'>
						Browse billboards, vehicles, and digital screens available
						for your next campaign.
					</p>

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

						{/* Vendor */}
						<div className='flex flex-col gap-2 flex-1'>
							<label className='text-sm font-medium text-gray-700'>
								Select Vendor
							</label>
							<div className='flex items-center border rounded-xl px-3 py-2 gap-3 text-gray-600 bg-gray-50'>
								<select className='flex-1 bg-transparent outline-none text-sm'>
									<option value=''>Choose a vendor</option>
									{vendors.map((vendor) => (
										<option key={vendor._id} value={vendor.name}>
											{vendor.name}
										</option>
									))}
								</select>
							</div>
						</div>

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
