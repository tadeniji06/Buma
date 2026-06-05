"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import ListSpace from "@/components/ListSpace";
import CategorySwitcher from "@/components/categories/CategorySwitcher";
import CategoryWaitlist from "@/components/categories/CategoryWaitlist";
import { sanity } from "@/lib/sanity";
import { GET_INFLUENCERS } from "@/lib/queries";
import { Influencer } from "@/types/media";
import { logo as defaultLogo } from "@/assets";

const formatLabel = (value?: string) =>
	value
		? value.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
		: "Not specified";

const formatPrice = (influencer: Influencer) => {
	const prices = (influencer.postPricing || [])
		.map((item) => item.pricing?.priceWithMarkup ?? item.pricing?.basePrice)
		.filter((price): price is number => typeof price === "number");

	if (!prices.length) return "Request quote";

	return new Intl.NumberFormat("en-NG", {
		style: "currency",
		currency: "NGN",
		maximumFractionDigits: 0,
	}).format(Math.min(...prices));
};

const primaryFollowers = (influencer: Influencer) => {
	const metrics = [
		["Instagram", influencer.igFollowers],
		["TikTok", influencer.tiktokFollowers],
		["Facebook", influencer.facebookFollowers],
		["YouTube", influencer.ytSubscribers],
	];

	return metrics.find(([, value]) => value) || ["Audience", "N/A"];
};

const InfluencerSkeleton = () => (
	<div className='rounded-2xl border border-gray-100 bg-white p-6 shadow-sm'>
		<div className='mb-5 flex items-center justify-between'>
			<div className='h-16 w-16 animate-pulse rounded-full bg-gray-100' />
			<div className='h-7 w-24 animate-pulse rounded-full bg-gray-100' />
		</div>
		<div className='mb-3 h-5 w-3/4 animate-pulse rounded bg-gray-200' />
		<div className='mb-6 h-4 w-1/2 animate-pulse rounded bg-gray-100' />
		<div className='mb-6 grid grid-cols-2 gap-2'>
			<div className='h-16 animate-pulse rounded-xl bg-gray-100' />
			<div className='h-16 animate-pulse rounded-xl bg-gray-100' />
		</div>
		<div className='h-12 animate-pulse rounded-xl bg-gray-200' />
	</div>
);

const InfluencersPage = () => {
	const [influencers, setInfluencers] = useState<Influencer[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState("");
	const resultsRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const fetchInfluencers = async () => {
			try {
				setIsLoading(true);
				const data = await sanity.fetch<Influencer[]>(GET_INFLUENCERS);
				setInfluencers(data || []);
			} catch (fetchError) {
				console.error(fetchError);
				setError("We could not load influencers right now.");
			} finally {
				setIsLoading(false);
			}
		};

		fetchInfluencers();
	}, []);

	const filteredInfluencers = useMemo(() => {
		const normalizedSearch = searchTerm.trim().toLowerCase();
		if (!normalizedSearch) return influencers;

		return influencers.filter((influencer) =>
			[
				influencer.name,
				influencer.category,
				influencer.igFollowers,
				influencer.facebookFollowers,
				influencer.ytSubscribers,
				influencer.ytViews,
				influencer.tiktokFollowers,
				...(influencer.postPricing || []).flatMap((item) => [
					item.name,
					item.description,
				]),
			]
				.filter(Boolean)
				.join(" ")
				.toLowerCase()
				.includes(normalizedSearch),
		);
	}, [influencers, searchTerm]);

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
			<section className='relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800 px-6 py-24 text-center text-white md:py-32'>
				<div className='absolute inset-0 opacity-20 pattern-dots'></div>

				<div className='relative z-10 mx-auto max-w-4xl space-y-8'>
					<div className='inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-gray-200 backdrop-blur-md'>
						<span className='flex h-2 w-2 rounded-full bg-green-400'></span>
						Live from Sanity CMS
					</div>

					<h1 className='text-5xl font-extrabold tracking-tight md:text-7xl'>
						Influencer Marketing
					</h1>

					<p className='mx-auto max-w-2xl text-xl leading-relaxed text-gray-300 md:text-2xl'>
						Search live creator profiles, audience metrics, platform reach and
						deliverable pricing from the CMS.
					</p>

					<div className='mx-auto mt-12 max-w-2xl'>
						<div className='relative'>
							<input
								type='text'
								placeholder='Search by name, category, platform or deliverable...'
								className='w-full rounded-full bg-white py-5 pl-14 pr-12 text-lg text-gray-900 shadow-2xl transition focus:outline-none focus:ring-4 focus:ring-gray-400/50'
								value={searchTerm}
								onChange={(event) => handleSearch(event.target.value)}
							/>
							<Icon
								icon='mdi:magnify'
								className='absolute left-5 top-1/2 h-7 w-7 -translate-y-1/2 text-gray-900'
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
				</div>
			</section>

			<CategorySwitcher activeHref='/influencers' />

			<main
				ref={resultsRef}
				className='mx-auto w-full max-w-7xl flex-1 px-6 py-12'
			>
				<div className='mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between'>
					<div>
						<p className='text-sm font-semibold text-primary-purple'>
							Creator Inventory
						</p>
						<h2 className='text-2xl font-bold text-gray-900'>
							{isLoading
								? "Loading influencers"
								: `${filteredInfluencers.length} influencer${
										filteredInfluencers.length === 1 ? "" : "s"
									} found`}
						</h2>
					</div>
					<span className='text-sm font-medium text-gray-500'>
						{influencers.length} published in CMS
					</span>
				</div>

				{error && (
					<div className='mb-6 rounded-2xl border border-red-100 bg-red-50 p-5 text-sm font-medium text-red-700'>
						{error}
					</div>
				)}

				{isLoading ? (
					<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
						{Array.from({ length: 6 }).map((_, index) => (
							<InfluencerSkeleton key={index} />
						))}
					</div>
				) : filteredInfluencers.length === 0 ? (
					<CategoryWaitlist
						icon='mdi:account-star'
						title='No influencers are published yet'
						description='Published influencer documents will appear here automatically from Sanity.'
						searchTerm={searchTerm}
						accentClassName='text-orange-500'
					/>
				) : (
					<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
						{filteredInfluencers.map((influencer) => {
							const [platform, followers] = primaryFollowers(influencer);
							const message = encodeURIComponent(
								`Hi, I'm interested in working with ${influencer.name} for an influencer marketing campaign.`,
							);
							const whatsappUrl = `https://wa.me/2348064968725?text=${message}`;

							return (
								<article
									key={influencer._id}
									className='group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl'
								>
									<div>
										<div className='relative z-10 mb-4 flex items-start justify-between'>
											<div className='flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-orange-100 bg-white p-0.5 shadow-sm'>
												<Image
													src={influencer.image || defaultLogo}
													alt={influencer.name}
													width={64}
													height={64}
													className='h-full w-full rounded-full object-cover'
												/>
											</div>
											<div className='flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-green-700'>
												<Icon icon='mdi:check-decagram' className='h-3.5 w-3.5' />
												Published
											</div>
										</div>

										<h3 className='relative z-10 mb-2 line-clamp-1 text-xl font-bold text-gray-900 transition group-hover:text-orange-500'>
											{influencer.name}
										</h3>

										<div className='relative z-10 mb-6 flex flex-wrap gap-2'>
											<span className='rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600'>
												{formatLabel(influencer.category)}
											</span>
											{(influencer.postPricing || []).slice(0, 2).map((item) => (
												<span
													key={item.name}
													className='rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600'
												>
													{item.name}
												</span>
											))}
										</div>

										<div className='relative z-10 mb-6 grid grid-cols-2 gap-2'>
											<div className='rounded-xl border border-orange-100/50 bg-orange-50 p-3'>
												<p className='mb-1 text-[10px] font-semibold uppercase tracking-wider text-gray-500'>
													{platform}
												</p>
												<p className='text-base font-bold text-gray-900'>
													{followers}
												</p>
											</div>
											<div className='rounded-xl border border-orange-100/50 bg-orange-50 p-3'>
												<p className='mb-1 text-[10px] font-semibold uppercase tracking-wider text-gray-500'>
													From
												</p>
												<p className='text-base font-bold text-gray-900'>
													{formatPrice(influencer)}
												</p>
											</div>
										</div>

										<div className='relative z-10 mb-6 grid grid-cols-2 gap-2 text-xs text-gray-500'>
											<p className='flex items-center gap-1'>
												<Icon icon='mdi:instagram' className='h-4 w-4' />
												{influencer.igFollowers || "N/A"}
											</p>
											<p className='flex items-center gap-1'>
												<Icon icon='mdi:music-note' className='h-4 w-4' />
												{influencer.tiktokFollowers || "N/A"}
											</p>
											<p className='flex items-center gap-1'>
												<Icon icon='mdi:facebook' className='h-4 w-4' />
												{influencer.facebookFollowers || "N/A"}
											</p>
											<p className='flex items-center gap-1'>
												<Icon icon='mdi:youtube' className='h-4 w-4' />
												{influencer.ytSubscribers || "N/A"}
											</p>
										</div>
									</div>

									<a
										href={whatsappUrl}
										target='_blank'
										rel='noopener noreferrer'
										className='relative z-10 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3.5 font-semibold text-white shadow-lg shadow-gray-200 transition hover:bg-orange-500 hover:shadow-orange-500/30'
									>
										<Icon icon='mdi:whatsapp' className='h-5 w-5' />
										Contact via WhatsApp
									</a>
								</article>
							);
						})}
					</div>
				)}
			</main>

			<ListSpace />
		</div>
	);
};

export default InfluencersPage;
