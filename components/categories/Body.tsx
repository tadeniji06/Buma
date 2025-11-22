"use client";
import { useEffect, useState } from "react";
import { sanity } from "@/lib/sanity";
import { GET_VENDORS_WITH_BILLBOARDS } from "@/lib/queries";
import Image from "next/image";
import { Icon } from "@iconify/react";
import BillboardModal from "../BillboardModal";
import { Vendor, Billboard } from "@/types/billboard";
import Hero from "../categories/Hero";

const Body = () => {
	const [vendors, setVendors] = useState<Vendor[]>([]);
	const [billboards, setBillboards] = useState<Billboard[]>([]);
	const [filteredBillboards, setFilteredBillboards] = useState<
		Billboard[]
	>([]);
	const [selectedBillboard, setSelectedBillboard] =
		useState<Billboard | null>(null);
	const [searchLocation, setSearchLocation] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			const data = await sanity.fetch(GET_VENDORS_WITH_BILLBOARDS);
			setVendors(data);

			// Flatten all billboards from all vendors/regions
			const allBoards = data.flatMap((vendor) =>
				vendor.regions.flatMap((region) =>
					region.billboards.map((b) => ({
						...b,
						vendor: vendor.name,
						region: region.name,
					}))
				)
			);

			setBillboards(allBoards);
			setFilteredBillboards(allBoards);
		};

		fetchData();
	}, []);

	const handleSearch = (location: string) => {
		setSearchLocation(location);
		if (!location) {
			setFilteredBillboards(billboards);
			return;
		}
		const filtered = billboards.filter((b) =>
			b.area?.toLowerCase().includes(location)
		);
		setFilteredBillboards(filtered);
	};

	if (!billboards.length)
		return (
			<div className='flex justify-center items-center min-h-screen'>
				<p className='text-gray-500'>Loading billboards...</p>
			</div>
		);

	return (
		<div className='flex flex-col min-h-screen bg-gray-50'>
			{/* Hero Section with Search */}
			<Hero onSearch={handleSearch} />

			{/* Billboard Grid */}
			<main className='flex-1 p-6 md:px-20 mt-6'>
				<div className='flex justify-between items-center mb-6'>
					<h2 className='text-lg md:text-xl font-semibold text-gray-800'>
						{searchLocation
							? `Results for “${searchLocation}”`
							: "All Available Billboards"}
					</h2>
					<p className='text-sm text-gray-500'>
						{filteredBillboards.length} board
						{filteredBillboards.length !== 1 && "s"} found
					</p>
				</div>

				{filteredBillboards.length === 0 ? (
					<div className='flex justify-center items-center min-h-[200px]'>
						<p className='text-gray-500 text-center'>
							No billboards found for “{searchLocation}”.
						</p>
					</div>
				) : (
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
						{filteredBillboards.map((b, i) => {
							const message = encodeURIComponent(
								`Hi, I’m interested in the billboard at ${
									b.area || "unknown area"
								} (${b.size || "N/A"})`
							);
							const whatsappUrl = `https://wa.me/2347040925563?text=${message}`;

							return (
								<div
									key={i}
									className='group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100'
								>
									{/* Billboard Image */}
									<div
										className='relative w-full h-52 cursor-pointer'
										onClick={() => setSelectedBillboard(b)}
									>
										<Image
											src={b.image}
											alt={b.area || "Billboard"}
											fill
											className='object-cover group-hover:scale-105 transition-transform duration-300'
										/>
										<span
											className={`absolute top-3 left-3 text-xs px-2 py-1 rounded-full font-medium ${
												b.status === "available"
													? "bg-green-100 text-green-700"
													: b.status === "booked"
													? "bg-red-100 text-red-700"
													: "bg-yellow-100 text-yellow-700"
											}`}
										>
											{b.status}
										</span>
									</div>

									{/* Billboard Info */}
									<div className='p-4 flex flex-col justify-between'>
										<div>
											<h3 className='font-semibold text-gray-900 text-base mb-1'>
												{b.area || "Unknown Area"}
											</h3>
											<p className='text-gray-600 text-sm mb-1'>
												{b.size || "Unknown Size"}
											</p>

											{b.description && (
												<p className='text-gray-500 text-xs line-clamp-2'>
													{b.description}
												</p>
											)}
										</div>

										{/* WhatsApp CTA */}
										<a
											href={whatsappUrl}
											target='_blank'
											rel='noopener noreferrer'
											className='mt-4 w-full bg-primary-purple text-white text-center text-sm font-semibold py-2 rounded-lg hover:bg-primary-purple/90 transition-colors flex items-center justify-center gap-2'
										>
											<Icon icon='mdi:whatsapp' className='text-lg' />
											Book this now
										</a>
									</div>
								</div>
							);
						})}
					</div>
				)}
			</main>

			{/* Billboard Details Modal */}
			<BillboardModal
				billboard={selectedBillboard}
				onClose={() => setSelectedBillboard(null)}
			/>
		</div>
	);
};

export default Body;
