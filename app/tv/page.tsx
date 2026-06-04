"use client";

import { useRef, useState } from "react";
import { Icon } from "@iconify/react";
import ListSpace from "@/components/ListSpace";
import CategorySwitcher from "@/components/categories/CategorySwitcher";
import CategoryWaitlist from "@/components/categories/CategoryWaitlist";

const TVPage = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const resultsRef = useRef<HTMLDivElement>(null);

	const handleSearch = (value: string) => {
		setSearchTerm(value);
		if (value && resultsRef.current) {
			resultsRef.current.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}
	};

	return (
		<div className='flex min-h-screen flex-col bg-gray-50'>
			<section className='relative overflow-hidden bg-gradient-to-br from-gray-950 via-slate-900 to-primary-purple px-6 py-24 text-center text-white md:py-32'>
				<div className='absolute inset-0 opacity-15 pattern-dots'></div>

				<div className='relative z-10 mx-auto max-w-4xl space-y-8'>
					<div className='inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-purple-100'>
						<span className='h-2 w-2 rounded-full bg-green-400'></span>
						TV inventory syncing from CMS
					</div>

					<h1 className='text-5xl font-extrabold tracking-tight md:text-7xl'>
						TV Advertising
					</h1>

					<p className='mx-auto max-w-2xl text-xl leading-relaxed text-purple-100/90 md:text-2xl'>
						Plan television placements across broadcast packages, show
						sponsorships, commercial slots and audience-focused campaigns.
					</p>

					<div className='mx-auto mt-12 max-w-2xl'>
						<div className='relative'>
							<input
								type='text'
								placeholder='Search stations, shows or packages...'
								className='w-full rounded-full bg-white py-5 pl-14 pr-12 text-lg text-gray-900 shadow-2xl transition focus:outline-none focus:ring-4 focus:ring-purple-400/50'
								value={searchTerm}
								onChange={(event) => handleSearch(event.target.value)}
							/>
							<Icon
								icon='mdi:magnify'
								className='absolute left-5 top-1/2 h-7 w-7 -translate-y-1/2 text-primary-purple'
							/>
							{searchTerm && (
								<button
									type='button'
									onClick={() => handleSearch("")}
									className='absolute right-5 top-1/2 -translate-y-1/2 rounded-full p-1 transition hover:bg-gray-100'
									aria-label='Clear search'
								>
									<Icon icon='mdi:close' className='h-5 w-5 text-gray-400' />
								</button>
							)}
						</div>
					</div>

					<div className='flex flex-wrap justify-center gap-3 text-sm'>
						<span className='text-purple-200/70'>Popular:</span>
						{["Prime time", "News", "Sports", "Sponsorship"].map((tag) => (
							<button
								key={tag}
								type='button'
								onClick={() => handleSearch(tag)}
								className='rounded-md px-3 py-1 text-purple-100 transition hover:bg-white/10 hover:text-white'
							>
								{tag}
							</button>
						))}
					</div>
				</div>
			</section>

			<CategorySwitcher activeHref='/tv' />

			<main
				ref={resultsRef}
				className='mx-auto w-full max-w-7xl flex-1 px-6 py-12'
			>
				<div className='mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between'>
					<div>
						<p className='text-sm font-semibold text-primary-purple'>
							Television Media
						</p>
						<h2 className='text-2xl font-bold text-gray-900'>
							Available TV placements
						</h2>
					</div>
					<span className='text-sm font-medium text-gray-500'>
						CMS catalogue pending
					</span>
				</div>

				<CategoryWaitlist
					icon='mdi:television-classic'
					title='TV inventory is being synced'
					description='TV now has its own page ready for a CMS-backed catalogue, station filters, package cards and quote requests. Request a curated TV plan while the live list is connected.'
					searchTerm={searchTerm}
				/>
			</main>

			<ListSpace />
		</div>
	);
};

export default TVPage;
