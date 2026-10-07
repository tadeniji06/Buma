"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import ListSpace from "@/components/ListSpace";
import CategorySwitcher from "@/components/categories/CategorySwitcher";
import CategoryWaitlist from "@/components/categories/CategoryWaitlist";
import { sanity } from "@/lib/sanity";
import { GET_TV_STATIONS } from "@/lib/queries";
import { TvStation } from "@/types/media";
import { logo as defaultLogo } from "@/assets";
import {
	countTvRateCards,
	formatLabel,
	formatPriceValue,
	formatTvLowestPrice,
	getTvPricingGroups,
} from "@/components/mediaFormatters";

const TvSkeleton = () => (
	<div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
		<div className="mb-5 flex items-center justify-between">
			<div className="h-14 w-14 animate-pulse rounded-xl bg-gray-100" />
			<div className="h-7 w-24 animate-pulse rounded-full bg-gray-100" />
		</div>
		<div className="mb-3 h-5 w-3/4 animate-pulse rounded bg-gray-200" />
		<div className="mb-6 h-4 w-1/2 animate-pulse rounded bg-gray-100" />
		<div className="mb-6 grid grid-cols-2 gap-2">
			<div className="h-16 animate-pulse rounded-xl bg-gray-100" />
			<div className="h-16 animate-pulse rounded-xl bg-gray-100" />
		</div>
		<div className="h-12 animate-pulse rounded-xl bg-gray-200" />
	</div>
);

const TvDetailModal = ({
	station,
	onClose,
}: {
	station: TvStation | null;
	onClose: () => void;
}) => {
	if (!station) return null;

	const pricingGroups = getTvPricingGroups(station);
	const message = encodeURIComponent(
		`Hi, I am interested in placing ads on ${station.name}`,
	);
	const whatsappUrl = `https://wa.me/2347040925563?text=${message}`;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6">
			<div className="max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl animate-fadeIn">
				<div className="flex items-start justify-between gap-4 border-b border-gray-100 p-5">
					<div className="flex items-center gap-4">
						<div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-white p-1 shadow-sm">
							<Image
								src={station.logo || defaultLogo}
								alt={station.name}
								width={64}
								height={64}
								className="h-full w-full object-contain"
							/>
						</div>
						<div>
							<p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
								{formatLabel(station.category)} TV Station
							</p>
							<h2 className="mt-1 text-xl font-bold text-gray-950">{station.name}</h2>
						</div>
					</div>
					<button
						type="button"
						onClick={onClose}
						className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
						aria-label="Close TV station details"
					>
						<Icon icon="mdi:close" className="text-2xl" />
					</button>
				</div>

				<div className="max-h-[calc(92vh-96px)] overflow-y-auto p-5">
					<div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
						<div className="rounded-xl bg-gray-50 p-4">
							<p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
								Transmission Type
							</p>
							<p className="mt-1 text-sm font-bold text-gray-900">
								{formatLabel(station.transmissionType)}
							</p>
						</div>
						<div className="rounded-xl bg-gray-50 p-4">
							<p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
								Coverage
							</p>
							<p className="mt-1 text-sm font-bold text-gray-900">
								{station.coverage?.join(", ") || "Not specified"}
							</p>
						</div>
						<div className="rounded-xl bg-gray-50 p-4">
							<p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
								Rate Cards
							</p>
							<p className="mt-1 text-sm font-bold text-gray-900">
								{countTvRateCards(station)}
							</p>
						</div>
					</div>

					{station.advertType?.length ? (
						<section className="mb-5 rounded-xl border border-gray-100 p-4">
							<h3 className="mb-3 text-sm font-bold text-gray-950">Advert Formats Accepted</h3>
							<div className="flex flex-wrap gap-2">
								{station.advertType.map((type) => (
									<span
										key={type}
										className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
									>
										{formatLabel(type)}
									</span>
								))}
							</div>
						</section>
					) : null}

					{station.programmes?.length ? (
						<section className="mb-5 rounded-xl border border-gray-100 p-4">
							<h3 className="mb-3 text-sm font-bold text-gray-950">Programmes</h3>
							<div className="flex flex-wrap gap-2">
								{station.programmes.map((programme) => (
									<span
										key={programme}
										className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
									>
										{programme}
									</span>
								))}
							</div>
						</section>
					) : null}

					{(station.mediaOwner || station.website || station.contactPerson) && (
						<section className="mb-5 rounded-xl border border-gray-100 p-4">
							<h3 className="mb-3 text-sm font-bold text-gray-950">Station Details</h3>
							<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs">
								{station.mediaOwner && (
									<div>
										<span className="text-gray-400">Media Owner: </span>
										<span className="font-semibold text-gray-800">{station.mediaOwner}</span>
									</div>
								)}
								{station.ownershipGroup && (
									<div>
										<span className="text-gray-400">Ownership Group: </span>
										<span className="font-semibold text-gray-800">{station.ownershipGroup}</span>
									</div>
								)}
								{station.website && (
									<div>
										<span className="text-gray-400">Website: </span>
										<a href={station.website} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary-purple underline">
											{station.website}
										</a>
									</div>
								)}
								{station.contactPerson && (
									<div>
										<span className="text-gray-400">Contact Person: </span>
										<span className="font-semibold text-gray-800">{station.contactPerson} ({station.role || "Manager"})</span>
									</div>
								)}
							</div>
						</section>
					)}

					<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
						{pricingGroups.map((group) => (
							<section
								key={group.title}
								className="rounded-xl border border-gray-100 p-4"
							>
								<div className="mb-3 flex items-center gap-2">
									<Icon icon={group.icon} className="h-5 w-5 text-slate-600" />
									<h3 className="text-sm font-bold text-gray-950">{group.title}</h3>
								</div>
								{group.items.length ? (
									<div className="space-y-2">
										{group.items.map((item) => (
											<div
												key={`${group.title}-${item.label}`}
												className="rounded-lg bg-gray-50 px-3 py-2"
											>
												<div className="flex items-center justify-between gap-4">
													<span className="text-sm font-medium text-gray-700">
														{item.label}
													</span>
													<span className="text-sm font-bold text-gray-950">
														{formatPriceValue(item.price)}
													</span>
												</div>
												{item.description && (
													<p className="mt-1 text-xs text-gray-400">{item.description}</p>
												)}
											</div>
										))}
									</div>
								) : (
									<p className="text-sm text-gray-400">No price entered</p>
								)}
							</section>
						))}
					</div>

					<a
						href={whatsappUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3.5 font-semibold text-white transition hover:bg-slate-700"
					>
						<Icon icon="mdi:whatsapp" className="h-5 w-5" />
						Request TV plan
					</a>
				</div>
			</div>
		</div>
	);
};

const TVPage = () => {
	const [stations, setStations] = useState<TvStation[]>([]);
	const [selectedStation, setSelectedStation] = useState<TvStation | null>(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState("");
	const resultsRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const fetchStations = async () => {
			try {
				setIsLoading(true);
				const data = await sanity.fetch<TvStation[]>(GET_TV_STATIONS);
				setStations(data || []);
			} catch (fetchError) {
				console.error(fetchError);
				setError("We could not load TV stations right now.");
			} finally {
				setIsLoading(false);
			}
		};

		fetchStations();
	}, []);

	const filteredStations = useMemo(() => {
		const normalizedSearch = searchTerm.trim().toLowerCase();
		if (!normalizedSearch) return stations;

		return stations.filter((station) =>
			[
				station.name,
				station.category,
				station.transmissionType,
				station.mediaOwner,
				...(station.coverage || []),
				...(station.programmes || []),
				...(station.advertType || []),
				...getTvPricingGroups(station).flatMap((group) => [
					group.title,
					...group.items.map((item) => item.label),
				]),
			]
				.filter(Boolean)
				.join(" ")
				.toLowerCase()
				.includes(normalizedSearch),
		);
	}, [searchTerm, stations]);

	const handleSearch = (value: string) => {
		setSearchTerm(value);
		if (value && resultsRef.current) {
			resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	};

	return (
		<div className="flex min-h-screen flex-col bg-gray-50">
			<section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-slate-900 to-primary-purple px-6 py-24 text-center text-white md:py-32">
				<div className="absolute inset-0 opacity-15 pattern-dots" />

				<div className="relative z-10 mx-auto max-w-4xl space-y-8">
					<div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-purple-100 backdrop-blur-md">
						<span className="flex h-2 w-2 rounded-full bg-green-400" />
						TV media options
					</div>

					<h1 className="text-5xl font-extrabold tracking-tight md:text-7xl">
						TV Advertising
					</h1>

					<p className="mx-auto max-w-2xl text-xl leading-relaxed text-purple-100/90 md:text-2xl">
						Search live TV stations, transmission types, programmes and rate options for
						your campaign.
					</p>

					<div className="mx-auto mt-12 max-w-2xl">
						<div className="relative">
							<input
								type="text"
								placeholder="Search stations, coverage, transmission or programmes..."
								className="w-full rounded-full bg-white py-5 pl-14 pr-12 text-lg text-gray-900 shadow-2xl transition focus:outline-none focus:ring-4 focus:ring-purple-400/50"
								value={searchTerm}
								onChange={(event) => handleSearch(event.target.value)}
							/>
							<Icon
								icon="mdi:magnify"
								className="absolute left-5 top-1/2 h-7 w-7 -translate-y-1/2 text-primary-purple"
							/>
							{searchTerm && (
								<button
									type="button"
									onClick={() => handleSearch("")}
									className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full p-1 transition hover:bg-gray-100"
									aria-label="Clear search"
								>
									<Icon icon="mdi:close" className="h-5 w-5 text-gray-400" />
								</button>
							)}
						</div>
					</div>

					<div className="flex flex-wrap justify-center gap-3 text-sm">
						<span className="text-purple-200/70">Popular:</span>
						{["National", "Commercial", "Terrestrial", "Satellite", "Sponsored"].map((tag) => (
							<button
								key={tag}
								type="button"
								onClick={() => handleSearch(tag)}
								className="rounded-md px-3 py-1 text-purple-100 transition hover:bg-white/10 hover:text-white"
							>
								{tag}
							</button>
						))}
					</div>
				</div>
			</section>

			<CategorySwitcher activeHref="/tv" />

			<main ref={resultsRef} className="mx-auto w-full max-w-7xl flex-1 px-6 py-12">
				<div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
					<div>
						<p className="text-sm font-semibold text-slate-600">Television Media</p>
						<h2 className="text-2xl font-bold text-gray-900">
							{isLoading
								? "Loading stations"
								: `${filteredStations.length} station${filteredStations.length === 1 ? "" : "s"} found`}
						</h2>
					</div>
				</div>

				{error && (
					<div className="mb-6 rounded-2xl border border-red-100 bg-red-50 p-5 text-sm font-medium text-red-700">
						{error}
					</div>
				)}

				{isLoading ? (
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						{Array.from({ length: 6 }).map((_, index) => (
							<TvSkeleton key={index} />
						))}
					</div>
				) : filteredStations.length === 0 ? (
					<CategoryWaitlist
						icon="mdi:television-classic"
						title="No TV stations available yet"
						description="TV station options will appear here once they are ready. You can still request a curated TV plan from the team."
						searchTerm={searchTerm}
					/>
				) : (
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						{filteredStations.map((station) => {
							const coverage = station.coverage?.join(", ") || "Coverage pending";
							const programmes =
								station.programmes?.join(", ") || "Programmes pending";
							const message = encodeURIComponent(
								`Hi, I am interested in placing ads on ${station.name}`,
							);
							const whatsappUrl = `https://wa.me/2347040925563?text=${message}`;

							return (
								<article
									key={station._id}
									className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
								>
									<div>
										<div className="relative z-10 mb-4 flex items-start justify-between">
											<div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-white p-1 shadow-sm">
												<Image
													src={station.logo || defaultLogo}
													alt={station.name}
													width={56}
													height={56}
													className="h-full w-full object-contain"
												/>
											</div>
											{station.category && (
												<span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
													{formatLabel(station.category)}
												</span>
											)}
										</div>

										<h3 className="relative z-10 mb-2 line-clamp-1 text-lg font-bold text-gray-900 transition group-hover:text-slate-700">
											{station.name}
										</h3>

										<div className="relative z-10 mb-6 space-y-2 text-xs text-gray-500">
											{station.transmissionType && (
												<p className="flex items-center gap-2">
													<Icon icon="mdi:access-point" className="h-4 w-4 text-primary-purple" />
													{formatLabel(station.transmissionType)}
												</p>
											)}
											<p className="flex items-center gap-2">
												<Icon icon="mdi:map-marker" className="h-4 w-4" />
												{coverage}
											</p>
											<p className="flex items-center gap-2">
												<Icon icon="mdi:television-classic" className="h-4 w-4" />
												{programmes}
											</p>
										</div>

										<div className="relative z-10 mb-6 grid grid-cols-2 gap-2">
											<div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
												<p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
													Category
												</p>
												<p className="text-sm font-bold text-gray-800">
													{formatLabel(station.category)}
												</p>
											</div>
											<div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
												<p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
													Price From
												</p>
												<p className="text-sm font-bold text-gray-800">
													{formatTvLowestPrice(station)}
												</p>
											</div>
										</div>

										<div className="relative z-10 mb-6 flex flex-wrap gap-2">
											{(station.runOfSpotPricing || []).slice(0, 2).map((item) => (
												<span
													key={item.duration}
													className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
												>
													{formatLabel(item.duration)}
												</span>
											))}
											{(station.advertSpotPricing || []).slice(0, 2).map((item) => (
												<span
													key={`advert-${item.duration}`}
													className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700"
												>
													{formatLabel(item.duration)}
												</span>
											))}
										</div>
									</div>

									<button
										type="button"
										onClick={() => setSelectedStation(station)}
										className="relative z-10 mb-3 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-800 transition hover:border-slate-400 hover:text-slate-700"
									>
										<Icon icon="mdi:table-eye" className="h-5 w-5" />
										View full rate card
									</button>

									<a
										href={whatsappUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="relative z-10 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3.5 font-semibold text-white shadow-lg shadow-gray-200 transition hover:bg-slate-700 hover:shadow-slate-300/40"
									>
										<Icon icon="mdi:whatsapp" className="h-5 w-5" />
										Book Ad Slot
									</a>
								</article>
							);
						})}
					</div>
				)}
			</main>

			<TvDetailModal
				station={selectedStation}
				onClose={() => setSelectedStation(null)}
			/>

			<ListSpace />
		</div>
	);
};

export default TVPage;
