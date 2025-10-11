"use client";
import { Billboard } from "@/types/billboard";
import Image from "next/image";
import { Icon } from "@iconify/react";

interface BillboardModalProps {
	billboard: Billboard | null;
	onClose: () => void;
}

const BillboardModal = ({
	billboard,
	onClose,
}: BillboardModalProps) => {
	if (!billboard) return null;

	return (
		<div className='fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4'>
			<div className='bg-white rounded-2xl shadow-lg max-w-lg w-full overflow-hidden animate-fade-in'>
				{/* Header */}
				<div className='flex justify-between items-center border-b p-4'>
					<h2 className='text-lg font-semibold text-gray-800'>
						{billboard.area || "Billboard Details"}
					</h2>
					<button
						onClick={onClose}
						className='p-2 rounded-full hover:bg-gray-100 transition'
					>
						<Icon
							icon='mdi:close'
							className='text-xl text-gray-600'
						/>
					</button>
				</div>

				{/* Image */}
				<div className='relative w-full h-60'>
					<Image
						src={billboard.image}
						alt={billboard.area || "Billboard"}
						fill
						className='object-cover'
					/>
				</div>

				{/* Details */}
				<div className='p-5 space-y-2'>
					<p className='text-sm text-gray-600'>
						<span className='font-medium text-gray-800'>Size:</span>{" "}
						{billboard.size || "N/A"}
					</p>

					<p className='text-sm'>
						<span className='font-medium text-gray-800'>Status:</span>{" "}
						<span
							className={`${
								billboard.status === "available"
									? "text-green-600"
									: billboard.status === "booked"
									? "text-red-500"
									: "text-yellow-600"
							} font-medium`}
						>
							{billboard.status.charAt(0).toUpperCase() +
								billboard.status.slice(1)}
						</span>
					</p>

					{billboard.description && (
						<p className='text-sm text-gray-700 leading-relaxed pt-3 border-t'>
							{billboard.description}
						</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default BillboardModal;
