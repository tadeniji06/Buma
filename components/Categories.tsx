"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { sanity } from "@/lib/sanity";
import { GET_VENDORS_WITH_BILLBOARDS } from "@/lib/queries";
import { Vendor } from "@/types/billboard";

const Categories = () => {
	const [vendors, setVendors] = useState<Vendor[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const data = await sanity.fetch(GET_VENDORS_WITH_BILLBOARDS);
			setVendors(data);
		};
		fetchData();
	}, []);

	if (!vendors.length) {
		return (
			<div className='flex justify-center items-center py-12'>
				<p className='text-gray-500'>Loading categories...</p>
			</div>
		);
	}

	return (
		<section className='p-5 md:py-12'>
			{/* Header */}
			<div className='flex flex-col md:flex-row justify-between items-start md:items-center mx-auto max-w-6xl mb-8 gap-4'>
				<div className='flex flex-col gap-2'>
					<h2 className='text-2xl md:text-3xl font-bold text-gray-900'>
						Find Space By Vendors
					</h2>
					<p className='text-gray-600 text-sm md:text-base font-light max-w-md'>
						Explore billboards across multiple vendors and regions.
					</p>
				</div>
				<Link href='/categories'>
					<p className='text-primary-purple font-medium cursor-pointer hover:underline'>
						See all
					</p>
				</Link>
			</div>

			{/* Categories Grid */}
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto'>
				{vendors.map((vendor) => {
					// flatten billboard images
					const allImages = vendor.regions.flatMap((r) =>
						r.billboards.map((b) => b.image)
					);
					const coverImage =
						allImages.length > 0 ? allImages[0] : "/fallback.jpg";

					const totalBoards = vendor.regions.reduce(
						(sum, region) => sum + (region.billboards?.length || 0),
						0
					);

					return (
						<div
							key={vendor._id}
							className='flex flex-col border-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-200 bg-white'
						>
							{/* Image */}
							<div className='relative w-full h-40'>
								<Image
									src={coverImage}
									alt={vendor.name}
									fill
									className='object-cover'
								/>
							</div>

							{/* Text */}
							<div className='flex flex-col gap-2 p-4'>
								<h3 className='font-semibold text-lg text-gray-900'>
									{vendor.name}
								</h3>
								<p className='text-sm text-gray-600 leading-snug'>
									{totalBoards} billboard{totalBoards !== 1 && "s"}{" "}
									available
								</p>
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
};

export default Categories;
