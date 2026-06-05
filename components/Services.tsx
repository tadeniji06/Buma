"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";

const services = [
	{
		title: "Out of Home (OOH)",
		description:
			"Billboards, gantries, LEDs and outdoor media from live CMS inventory.",
		icon: "mdi:city-variant-outline",
		link: "/categories",
		color: "bg-blue-50 text-blue-600",
		cta: "Browse OOH",
		comingSoon: false,
	},
	{
		title: "Radio Stations",
		description: "Reach listeners through CMS-backed radio stations and rate cards.",
		icon: "mdi:radio-tower",
		link: "/radio",
		color: "bg-purple-50 text-purple-600",
		cta: "Browse Radio",
		comingSoon: false,
	},
	{
		title: "PR & News Media",
		description:
			"Publication and media placement opportunities for earned visibility.",
		icon: "mdi:newspaper-variant-outline",
		link: "/pr",
		color: "bg-indigo-50 text-indigo-600",
		cta: "Browse PR",
		comingSoon: false,
	},
	{
		title: "TV Stations",
		description: "Plan broadcast campaigns, sponsorships and commercial placements.",
		icon: "mdi:television",
		link: "/tv",
		color: "bg-pink-50 text-pink-600",
		cta: "Browse TV",
		comingSoon: false,
	},
	{
		title: "Influencer Marketing",
		description: "Connect with live CMS-backed creator profiles and deliverables.",
		icon: "mdi:account-group-outline",
		link: "/influencers",
		color: "bg-orange-50 text-orange-600",
		cta: "Browse Influencers",
		comingSoon: false,
	},
];

const Services = () => {
	return (
		<section className='bg-white px-6 py-20'>
			<div className='mx-auto max-w-7xl'>
				<div className='mx-auto mb-16 max-w-3xl text-center'>
					<span className='text-sm font-bold uppercase tracking-wider text-primary-purple'>
						Media Channels
					</span>
					<h2 className='mb-4 mt-2 text-3xl font-bold text-gray-900 md:text-4xl'>
						What would you like to advertise on?
					</h2>
				</div>

				<div className='grid grid-cols-1 justify-center gap-8 md:grid-cols-2 lg:grid-cols-3'>
					{services.map((service) => (
						<Link
							href={service.link}
							key={service.title}
							className={`group relative flex flex-col items-start rounded-2xl border border-gray-100 bg-white p-8 transition-all duration-300 hover:border-transparent hover:shadow-xl ${
								service.comingSoon ? "cursor-default opacity-80" : "cursor-pointer"
							}`}
						>
							{service.comingSoon && (
								<div className='absolute right-4 top-4 rounded-full bg-gray-100 px-2 py-1 text-[10px] font-bold uppercase text-gray-500'>
									Coming Soon
								</div>
							)}

							<div
								className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl ${service.color} transition-transform duration-300 group-hover:scale-110`}
							>
								<Icon icon={service.icon} className='h-7 w-7' />
							</div>

							<h3 className='mb-2 text-xl font-bold text-gray-900'>
								{service.title}
							</h3>

							<p className='mb-8 leading-relaxed text-gray-500'>
								{service.description}
							</p>

							<div
								className={`mt-auto text-sm font-semibold transition-colors ${
									service.comingSoon
										? "text-gray-400"
										: "text-primary-purple group-hover:text-primary-purple-dark"
								}`}
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
