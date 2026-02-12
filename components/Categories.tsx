"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { sanity } from "@/lib/sanity";
import { GET_VENDORS_WITH_BILLBOARDS } from "@/lib/queries";
import { Vendor } from "@/types/billboard";

interface RegionCard {
	name: string;
	total: number;
	image: string;
}

const Categories = () => {
	const [regions, setRegions] = useState<RegionCard[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const data: Vendor[] = await sanity.fetch(
				GET_VENDORS_WITH_BILLBOARDS,
			);
			const regionMap = new Map<string, RegionCard>();

			// Flatten regions across vendors
			data?.forEach((vendor) => {
				vendor.regions?.forEach((region) => {
					const billboards = region.billboards || [];
					const allImages = billboards.map((b) => b.image);
					const cover = allImages.length
						? allImages[0]
						: "/fallback.jpg";

					if (!regionMap.has(region.name)) {
						regionMap.set(region.name, {
							name: region.name,
							total: billboards.length,
							image: cover,
						});
					} else {
						const existing = regionMap.get(region.name)!;
						existing.total += billboards.length;
					}
				});
			});

			setRegions(Array.from(regionMap.values()));
		};

		fetchData();
	}, []);

	if (!regions.length)
		return (
			<div className='flex justify-center items-center py-12'>
				<p className='text-gray-500'>Loading regions...</p>
			</div>
		);

	return (
		<section className='p-5 md:py-12'>
			<div className='flex flex-col md:flex-row justify-between items-start md:items-center mx-auto max-w-6xl mb-8 gap-4'>
				<div className='flex flex-col gap-2'>
					<h2 className='text-2xl md:text-3xl font-bold text-gray-900'>
						Explore by Location
					</h2>
					<p className='text-gray-600 text-sm md:text-base font-light max-w-md'>
						Find billboards available in your preferred city or area.
					</p>
				</div>
				<Link href='/categories'>
					<p className='text-primary-purple font-medium cursor-pointer hover:underline'>
						View all billboards
					</p>
				</Link>
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto'>
				{regions.map((region) => (
					<div
						key={region.name}
						className='group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 cursor-pointer'
					>
						<Link
							href={`/categories?region=${encodeURIComponent(region.name)}`}
						>
							<div className='relative w-full h-44'>
								<Image
									src={region.image}
									alt={region.name}
									fill
									className='object-cover group-hover:scale-105 transition-transform duration-300'
								/>
								<div className='absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors' />
								<div className='absolute bottom-4 left-4 text-white'>
									<h3 className='font-semibold text-lg'>
										{region.name}
									</h3>
									<p className='text-sm text-gray-200'>
										{region.total} billboard
										{region.total !== 1 && "s"}
									</p>
								</div>
							</div>
						</Link>
					</div>
				))}
			</div>
		</section>
	);
};

export default Categories;
