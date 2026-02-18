"use client";
import { Icon } from "@iconify/react";

const steps = [
	{
		title: "Browse Categories",
		description:
			"Explore OOH, Radio, PR, TV, and Influencer options across Africa.",
		icon: "mdi:magnify",
	},
	{
		title: "Tell Us What You Need",
		description:
			"Chat with our team on WhatsApp or pay directly online. We'll gather your campaign requirements.",
		icon: "mdi:message-text-outline",
	},
	{
		title: "Buma Handles Everything",
		description:
			"We negotiate with vendors, confirm availability, and manage the booking on your behalf.",
		icon: "mdi:cogs",
	},
	{
		title: "Your Campaign Goes Live",
		description:
			"We deliver feedback and campaign confirmation directly to you. Sit back and watch your brand grow.",
		icon: "mdi:rocket-launch-outline",
	},
];

const HowItWorks = () => {
	return (
		<section className='py-20 px-6 bg-gray-50'>
			<div className='max-w-7xl mx-auto'>
				<div className='text-center mb-16'>
					<span className='text-primary-purple font-bold tracking-wider uppercase text-sm'>
						Simple Process
					</span>
					<h2 className='text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4'>
						How It Works
					</h2>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative'>
					{/* Connector Line (Desktop) - Adjusted for 4 columns */}
					<div className='hidden lg:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-gray-200 -z-10 border-t-2 border-dashed border-gray-300' />

					{steps.map((step, index) => (
						<div
							key={index}
							className='flex flex-col items-center text-center group'
						>
							<div className='w-24 h-24 rounded-full bg-white border-4 border-gray-100 shadow-sm flex items-center justify-center mb-6 group-hover:border-primary-purple/30 group-hover:scale-110 transition-all duration-300 relative z-10'>
								<div className='w-16 h-16 rounded-full bg-primary-purple/5 text-primary-purple flex items-center justify-center'>
									<Icon icon={step.icon} className='w-8 h-8' />
								</div>
								<div className='absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary-purple text-white font-bold flex items-center justify-center text-sm border-2 border-white'>
									{index + 1}
								</div>
							</div>

							<h3 className='text-lg font-bold text-gray-900 mb-3'>
								{step.title}
							</h3>
							<p className='text-gray-500 text-sm leading-relaxed max-w-[250px]'>
								{step.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default HowItWorks;
