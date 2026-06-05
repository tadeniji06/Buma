"use client";

import { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { bbill } from "@/assets";
import { Billboard } from "@/types/billboard";

interface BillboardModalProps {
	billboard: Billboard | null;
	onClose: () => void;
}

const formatLabel = (value?: string) => {
	if (!value) return "Not specified";

	return value
		.split(":")
		.pop()
		?.replace(/_/g, " ")
		.replace(/\b\w/g, (char) => char.toUpperCase()) || value;
};

const formatPrice = (billboard: Billboard) => {
	const amount = billboard.pricing?.priceWithMarkup;

	if (typeof amount !== "number") return "Request quote";

	const currency = (billboard.pricing?.currency || "ngn").toUpperCase();

	return new Intl.NumberFormat("en-NG", {
		style: "currency",
		currency,
		maximumFractionDigits: 0,
	}).format(amount);
};

const BillboardModal = ({ billboard, onClose }: BillboardModalProps) => {
	const [activeImageIndex, setActiveImageIndex] = useState(0);

	if (!billboard) return null;

	const galleryImages =
		billboard.images?.length ? billboard.images : billboard.image ? [billboard.image] : [];
	const imageSrc = galleryImages[activeImageIndex] || billboard.image || bbill;
	const details = [
		["Display Type", formatLabel(billboard.displayType)],
		["Billboard Size", formatLabel(billboard.billboardSize)],
		["Dimensions", billboard.billboardDimensions || "Not specified"],
		["Location", formatLabel(billboard.cityState)],
		["Country", formatLabel(billboard.country)],
		["Availability", formatLabel(billboard.availability)],
		["Price", formatPrice(billboard)],
	];

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6'>
			<div className='max-h-[92vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl animate-fadeIn'>
				<div className='flex items-start justify-between gap-4 border-b border-gray-100 p-5'>
					<div>
						<p className='text-xs font-bold uppercase tracking-[0.18em] text-primary-purple'>
							OOH Billboard
						</p>
						<h2 className='mt-1 text-xl font-bold text-gray-950'>
							{billboard.name}
						</h2>
					</div>
					<button
						type='button'
						onClick={onClose}
						className='rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900'
						aria-label='Close billboard details'
					>
						<Icon icon='mdi:close' className='text-2xl' />
					</button>
				</div>

				<div className='max-h-[calc(92vh-88px)] overflow-y-auto'>
					<div className='relative h-72 w-full bg-gray-100'>
						<Image
							src={imageSrc}
							alt={billboard.name}
							fill
							className='object-cover'
						/>
					</div>

					<div className='space-y-5 p-5'>
						{galleryImages.length > 1 && (
							<div className='flex gap-2 overflow-x-auto pb-1'>
								{galleryImages.map((image, index) => (
									<button
										key={image}
										type='button'
										onClick={() => setActiveImageIndex(index)}
										className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-lg border ${
											index === activeImageIndex
												? "border-primary-purple"
												: "border-gray-100"
										}`}
										aria-label={`Show billboard image ${index + 1}`}
									>
										<Image
											src={image}
											alt={`${billboard.name} ${index + 1}`}
											fill
											className='object-cover'
										/>
									</button>
								))}
							</div>
						)}

						<div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
							{details.map(([label, value]) => (
								<div key={label} className='rounded-xl bg-gray-50 p-4'>
									<p className='text-xs font-semibold uppercase tracking-wide text-gray-400'>
										{label}
									</p>
									<p className='mt-1 text-sm font-semibold text-gray-900'>
										{value}
									</p>
								</div>
							))}
						</div>

						{billboard.description && (
							<div className='rounded-xl border border-gray-100 p-4'>
								<h3 className='text-sm font-bold text-gray-950'>
									Description
								</h3>
								<p className='mt-2 text-sm leading-6 text-gray-600'>
									{billboard.description}
								</p>
							</div>
						)}

						<div className='rounded-xl border border-gray-100 p-4'>
							<div className='mb-3 flex items-center gap-2'>
								<Icon
									icon='mdi:cash-multiple'
									className='h-5 w-5 text-primary-purple'
								/>
								<h3 className='text-sm font-bold text-gray-950'>Pricing</h3>
							</div>
							<div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
								<div className='rounded-lg bg-gray-50 p-3'>
									<p className='text-xs text-gray-400'>Currency</p>
									<p className='mt-1 text-sm font-bold text-gray-900'>
										{billboard.pricing?.currency?.toUpperCase() || "N/A"}
									</p>
								</div>
								<div className='rounded-lg bg-gray-50 p-3'>
									<p className='text-xs text-gray-400'>Price</p>
									<p className='mt-1 text-sm font-bold text-gray-900'>
										{formatPrice(billboard)}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BillboardModal;
