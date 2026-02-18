"use client";
import { Icon } from "@iconify/react";
import Link from "next/link";

const services = [
	{
		title: "Out of Home (OOH)",
		description:
			"Billboards, Gantries & Outdoor — over 1,000 available",
		icon: "mdi:city-variant-outline",
		link: "/categories",
		color: "bg-blue-50 text-blue-600",
		cta: "Click here to start →",
		comingSoon: false,
	},
	{
		title: "Radio Stations",
		description: "Reach audiences through radio — over 700 available",
		icon: "mdi:radio-tower",
		link: "/radio",
		color: "bg-purple-50 text-purple-600",
		cta: "Click here to start →",
		comingSoon: false,
	},
	{
		title: "PR & News Media",
		description:
			"Media outlet sites and publications — over 700 available",
		icon: "mdi:newspaper-variant-outline",
		link: "/pr",
		color: "bg-indigo-50 text-indigo-600",
		cta: "Click here to start →",
		comingSoon: false,
	},
	{
		title: "TV Stations",
		description: "Television advertising",
		icon: "mdi:television",
		link: "#",
		color: "bg-pink-50 text-pink-600",
		cta: "Coming Soon",
		comingSoon: true,
	},
	{
		title: "Influencer Marketing",
		description: "Connect with top influencers — over 700 available",
		icon: "mdi:account-group-outline",
		link: "#",
		color: "bg-orange-50 text-orange-600",
		cta: "Coming Soon",
		comingSoon: true,
	},
];

const Services = () => {
	return (
		<section className='py-20 px-6 bg-white'>
			<div className='max-w-7xl mx-auto'>
				<div className='text-center mb-16 max-w-3xl mx-auto'>
					<span className='text-primary-purple font-bold tracking-wider uppercase text-sm'>
						Media Channels
					</span>
					<h2 className='text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4'>
						What would you like to advertise on?
					</h2>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center'>
					{services.map((service, index) => (
						<Link
							href={service.link}
							key={index}
							className={`group relative p-8 rounded-2xl border border-gray-100 bg-white hover:border-transparent hover:shadow-xl transition-all duration-300 flex flex-col items-start ${service.comingSoon ? "cursor-default opacity-80" : "cursor-pointer"}`}
						>
							{service.comingSoon && (
								<div className='absolute top-4 right-4 bg-gray-100 text-gray-500 text-[10px] font-bold uppercase px-2 py-1 rounded-full'>
									Coming Soon
								</div>
							)}

							<div
								className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
							>
								<Icon icon={service.icon} className='w-7 h-7' />
							</div>

							<h3 className='text-xl font-bold text-gray-900 mb-2'>
								{service.title}
							</h3>

							<p className='text-gray-500 leading-relaxed mb-8'>
								{service.description}
							</p>

							<div
								className={`mt-auto font-semibold text-sm transition-colors ${service.comingSoon ? "text-gray-400" : "text-primary-purple group-hover:text-primary-purple-dark"}`}
							>
								{service.cta}
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
};

export default Services;
