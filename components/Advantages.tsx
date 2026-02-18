"use client";
import { Icon } from "@iconify/react";

const advantages = [
	{
		title: "We Handle Everything",
		description:
			"From vendor negotiation to campaign confirmation — our team manages the entire process for you.",
		icon: "mdi:handshake-outline",
		color: "text-blue-600 bg-blue-50",
	},
	{
		title: "Best Rates Guaranteed",
		description:
			"We negotiate directly with media owners to get you the most competitive rates across all channels.",
		icon: "mdi:cash-multiple",
		color: "text-green-600 bg-green-50",
	},
	{
		title: "Fast Turnaround",
		description:
			"Get campaign options within 24 hours of your inquiry. We move at the speed of your business.",
		icon: "mdi:flash-outline",
		color: "text-amber-600 bg-amber-50",
	},
	{
		title: "Campaign Feedback",
		description:
			"We don't just book your ad — we deliver confirmation, photos, and performance updates directly to you.",
		icon: "mdi:chart-bar",
		color: "text-purple-600 bg-purple-50",
	},
];

const Advantages = () => {
	return (
		<section className='py-20 px-6 bg-white'>
			<div className='max-w-7xl mx-auto'>
				<div className='text-center mb-16'>
					<span className='text-primary-purple font-bold tracking-wider uppercase text-sm'>
						Our Advantage
					</span>
					<h2 className='text-3xl md:text-4xl font-bold text-gray-900 mt-2'>
						Why Choose Buma?
					</h2>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12'>
					{advantages.map((item, index) => (
						<div
							key={index}
							className='flex gap-6 items-start p-6 rounded-2xl hover:bg-gray-50 transition-colors duration-300'
						>
							<div
								className={`shrink-0 w-16 h-16 rounded-2xl ${item.color} flex items-center justify-center`}
							>
								<Icon icon={item.icon} className='w-8 h-8' />
							</div>
							<div>
								<h3 className='text-xl font-bold text-gray-900 mb-3'>
									{item.title}
								</h3>
								<p className='text-gray-600 leading-relaxed'>
									{item.description}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Advantages;
