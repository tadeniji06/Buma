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
import { formatLabel, formatPriceValue } from "@/components/mediaFormatters";

const primaryFollowers = (influencer: Influencer) => {
	const metrics: [string, string | undefined][] = [
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

const InfluencerDetailModal = ({
	influencer,
	onClose,
}: {
	influencer: Influencer | null;
	onClose: () => void;
}) => {
	if (!influencer) return null;

	const metrics: [string, string | undefined, string][] = [
		["Instagram Followers", influencer.igFollowers, "mdi:instagram"],
		["Facebook Followers", influencer.facebookFollowers, "mdi:facebook"],
		["YouTube Subscribers", influencer.ytSubscribers, "mdi:youtube"],
		["YouTube Views", influencer.ytViews, "mdi:eye-outline"],
		["TikTok Followers", influencer.tiktokFollowers, "mdi:music-note"],
	];
	const message = encodeURIComponent(
		`Hi, I'm interested in working with ${influencer.name} for an influencer marketing campaign.`,
	);
	const whatsappUrl = `https://wa.me/2348064968725?text=${message}`;

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6'>
			<div className='max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl animate-fadeIn'>
				<div className='flex items-start justify-between gap-4 border-b border-gray-100 p-5'>
					<div className='flex items-center gap-4'>
						<div className='flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-orange-100 bg-white p-0.5 shadow-sm'>
							<Image
								src={influencer.image || defaultLogo}
								alt={influencer.name}
								width={64}
								height={64}
								className='h-full w-full rounded-full object-cover'
							/>
						</div>
						<div>
							<p className='text-xs font-bold uppercase tracking-[0.18em] text-orange-500'>
								{formatLabel(influencer.category)} Influencer
							</p>
							<h2 className='mt-1 text-xl font-bold text-gray-950'>
								{influencer.name}
							</h2>
						</div>
					</div>
					<button
						type='button'
						onClick={onClose}
						className='rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900'
						aria-label='Close influencer details'
					>
						<Icon icon='mdi:close' className='text-2xl' />
					</button>
				</div>

				<div className='max-h-[calc(92vh-96px)] overflow-y-auto p-5'>
					<div className='mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5'>
						{metrics.map(([label, value, icon]) => (
							<div key={label} className='rounded-xl bg-orange-50 p-4'>
								<div className='mb-2 flex items-center gap-2 text-orange-500'>
									<Icon icon={icon} className='h-4 w-4' />
									<p className='text-[10px] font-semibold uppercase tracking-wide text-gray-500'>
										{label}
									</p>
								</div>
								<p className='text-sm font-bold text-gray-900'>
									{value || "N/A"}
								</p>
							</div>
						))}
					</div>

					<section className='rounded-xl border border-gray-100 p-4'>
						<div className='mb-3 flex items-center justify-between gap-4'>
							<h3 className='text-sm font-bold text-gray-950'>
								Posts & Pricing
							</h3>
							<span className='rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-600'>
								{influencer.postPricing?.length || 0} deliverable
								{(influencer.postPricing?.length || 0) === 1 ? "" : "s"}
							</span>
						</div>

						{influencer.postPricing?.length ? (
							<div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
								{influencer.postPricing.map((item) => (
									<div
										key={`${influencer._id}-${item.name}`}
										className='rounded-xl bg-gray-50 p-4'
									>
										<div className='mb-3 flex items-start justify-between gap-4'>
											<div>
												<p className='font-bold text-gray-950'>
													{item.name || "Deliverable"}
												</p>
												{item.description && (
													<p className='mt-1 text-sm leading-5 text-gray-500'>
														{item.description}
													</p>
												)}
											</div>
											<p className='shrink-0 text-sm font-bold text-gray-950'>
												{formatPriceValue(item.pricing)}
											</p>
										</div>
										<div className='rounded-lg bg-white p-2 text-xs'>
											<p className='text-gray-400'>Price</p>
											<p className='font-bold text-gray-800'>
												{formatPriceValue(item.pricing)}
											</p>
										</div>
									</div>
								))}
							</div>
						) : (
							<p className='text-sm text-gray-400'>No deliverables entered</p>
						)}
					</section>

					<a
						href={whatsappUrl}
						target='_blank'
						rel='noopener noreferrer'
						className='mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3.5 font-semibold text-white transition hover:bg-orange-600'
					>
						<Icon icon='mdi:whatsapp' className='h-5 w-5' />
						Request influencer plan
					</a>
				</div>
			</div>
		</div>
	);
};

const InfluencersPage = () => {
	const [influencers, setInfluencers] = useState<Influencer[]>([]);
	const [selectedInfluencer, setSelectedInfluencer] =
		useState<Influencer | null>(null);
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
						Creator media options
					</div>

					<h1 className='text-5xl font-extrabold tracking-tight md:text-7xl'>
						Influencer Marketing
					</h1>

					<p className='mx-auto max-w-2xl text-xl leading-relaxed text-gray-300 md:text-2xl'>
						Search live creator profiles, audience metrics, platform reach and
						deliverable pricing for your campaign.
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
						title='No influencers available yet'
						description='Influencer options will appear here once they are ready. You can still request a curated creator plan from the team.'
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
											<button
												type='button'
												onClick={() => setSelectedInfluencer(influencer)}
												className='rounded-xl border border-orange-100/50 bg-orange-50 p-3 text-left transition hover:border-orange-300 hover:bg-orange-100'
											>
												<p className='mb-1 text-[10px] font-semibold uppercase tracking-wider text-gray-500'>
													Rates
												</p>
												<p className='text-base font-bold text-gray-900'>
													View full prices
												</p>
											</button>
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

									<button
										type='button'
										onClick={() => setSelectedInfluencer(influencer)}
										className='relative z-10 mb-3 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-800 transition hover:border-orange-500 hover:text-orange-500'
									>
										<Icon icon='mdi:account-details-outline' className='h-5 w-5' />
										View profile & rates
									</button>

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

			<InfluencerDetailModal
				influencer={selectedInfluencer}
				onClose={() => setSelectedInfluencer(null)}
			/>

			<ListSpace />
		</div>
	);
};

export default InfluencersPage;
