"use client";
import { useState } from "react";

const Steps = () => {
	const [activeTab, setActiveTab] = useState<"business" | "owners">(
		"business"
	);

	const businessOwners = [
		{
			sn: "1",
			title: "Browse and Discover Spaces",
			desc: "Browse our marketplace of advertising spaces using our powerful search filters. Find spaces by location, type, budget, and availability.",
		},
		{
			sn: "2",
			title: "Review & Compare",
			desc: "View detailed information, photos, specifications, and vendor ratings for each space. Compare multiple options side by side.",
		},
		{
			sn: "3",
			title: "Book Your Space",
			desc: "Select your preferred space and submit your booking request. Get instant confirmation or negotiate terms with the space owner.",
		},
		{
			sn: "4",
			title: "Launch Your Campaign",
			desc: "Coordinate with the vendor for installation and go live with your advertising campaign. Track performance and manage your booking.",
		},
	];

	const spaceOwners = [
		{
			sn: "1",
			title: "List Your Space",
			desc: "Create a detailed listing for your advertising space with photos, specifications, and availability calendar.",
		},
		{
			sn: "2",
			title: "Get Verified",
			desc: "Complete our verification process to build trust with potential advertisers and increase your booking rate.",
		},
		{
			sn: "3",
			title: "Receive Bookings",
			desc: "Get notified when advertisers are interested in your space. Review booking requests and communicate directly with clients.",
		},
		{
			sn: "4",
			title: "Earn & Grow",
			desc: "Get paid securely for confirmed bookings and build your reputation to attract more advertisers to your spaces.",
		},
	];

	const steps =
		activeTab === "business" ? businessOwners : spaceOwners;

	return (
		<div className='py-12 px-6 max-w-6xl mx-auto'>
			{/* Section Header */}
			<div className='text-center mb-10'>
				<h2 className='text-3xl md:text-4xl font-bold text-dark'>
					How It Works
				</h2>
				<p className='text-gray-600 mt-2'>
					Step-by-step guide for{" "}
					<span className='font-semibold text-primary-purple'>
						{activeTab === "business"
							? "Brands & Business Owners"
							: "Space Owners"}
					</span>
				</p>
			</div>

			{/* Tabs */}
			<div className='flex justify-center mb-8'>
				<div className='flex bg-gray-100 rounded-xl p-1'>
					<button
						onClick={() => setActiveTab("business")}
						className={`px-6 py-2 rounded-lg font-medium transition ${
							activeTab === "business"
								? "bg-primary-purple text-white shadow"
								: "text-gray-600 hover:text-dark"
						}`}
					>
						Brands / Business Owners
					</button>
					<button
						onClick={() => setActiveTab("owners")}
						className={`px-6 py-2 rounded-lg font-medium transition ${
							activeTab === "owners"
								? "bg-primary-purple text-white shadow"
								: "text-gray-600 hover:text-dark"
						}`}
					>
						Space Owners
					</button>
				</div>
			</div>

			{/* Steps Grid */}
			<div className='grid gap-8 md:grid-cols-2'>
				{steps.map((step, idx) => (
					<div
						key={idx}
						className='flex gap-5 items-start p-6 border rounded-2xl shadow-sm hover:shadow-md transition'
					>
						<div className='flex-shrink-0 w-10 h-10 flex items-center justify-center bg-primary-purple text-white rounded-full font-bold'>
							{step.sn}
						</div>
						<div>
							<h3 className='text-lg font-semibold text-dark'>
								{step.title}
							</h3>
							<p className='text-gray-600 text-sm mt-1'>
								{step.desc}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Steps;
