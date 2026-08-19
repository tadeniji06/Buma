"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import ListSpace from "@/components/ListSpace";
import CategorySwitcher from "@/components/categories/CategorySwitcher";
import CategoryWaitlist from "@/components/categories/CategoryWaitlist";
import { sanity } from "@/lib/sanity";
import { GET_PR_AGENCIES } from "@/lib/queries";
import { PrAgency } from "@/types/media";
import { logo as defaultLogo } from "@/assets";
import {
	formatLabel,
	formatPrLowestPrice,
	formatPriceValue,
} from "@/components/mediaFormatters";

const PrSkeleton = () => (
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

const PrDetailModal = ({
	agency,
	onClose,
}: {
	agency: PrAgency | null;
	onClose: () => void;
}) => {
	if (!agency) return null;

	const message = encodeURIComponent(
		`Hi, I am interested in PR services from ${agency.name}`,
	);
	const whatsappUrl = `https://wa.me/2347040925563?text=${message}`;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6">
			<div className="max-h-[92vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl animate-fadeIn">
				<div className="flex items-start justify-between gap-4 border-b border-gray-100 p-5">
					<div className="flex items-center gap-4">
						<div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-white p-1 shadow-sm">
							<Image
								src={agency.logo || defaultLogo}
								alt={agency.name}
								width={64}
								height={64}
								className="h-full w-full object-contain"
							/>
						</div>
						<div>
							<p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">
								{formatLabel(agency.category)} PR
							</p>
							<h2 className="mt-1 text-xl font-bold text-gray-950">{agency.name}</h2>
						</div>
					</div>
					<button
						type="button"
						onClick={onClose}
						className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
						aria-label="Close PR agency details"
					>
						<Icon icon="mdi:close" className="text-2xl" />
					</button>
				</div>

				<div className="max-h-[calc(92vh-96px)] overflow-y-auto p-5">
					<div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
						<div className="rounded-xl bg-gray-50 p-4">
							<p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
								Markets Served
							</p>
							<p className="mt-1 text-sm font-bold text-gray-900">
								{agency.coverage?.join(", ") || "Not specified"}
							</p>
						</div>
						<div className="rounded-xl bg-gray-50 p-4">
							<p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
								Services
							</p>
							<p className="mt-1 text-sm font-bold text-gray-900">
								{agency.services?.length ?? 0}
							</p>
						</div>
					</div>

					{agency.services?.length ? (
						<section className="rounded-xl border border-gray-100 p-4">
							<div className="mb-3 flex items-center gap-2">
								<Icon
									icon="mdi:bullhorn-outline"
									className="h-5 w-5 text-emerald-600"
								/>
								<h3 className="text-sm font-bold text-gray-950">
									Services & Pricing
								</h3>
							</div>
							<div className="space-y-2">
								{agency.services.map((service) => (
									<div
										key={service.name}
										className="rounded-lg bg-gray-50 px-3 py-2"
									>
										<div className="flex items-center justify-between gap-4">
											<span className="text-sm font-medium text-gray-700">
												{service.name}
											</span>
											<span className="text-sm font-bold text-gray-950">
												{formatPriceValue(service.pricing)}
											</span>
										</div>
										{service.description && (
											<p className="mt-1 text-xs text-gray-400">
												{service.description}
											</p>
										)}
									</div>
								))}
							</div>
						</section>
					) : (
						<p className="text-sm text-gray-400">No services entered yet.</p>
					)}

					<a
						href={whatsappUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3.5 font-semibold text-white transition hover:bg-emerald-700"
					>
						<Icon icon="mdi:whatsapp" className="h-5 w-5" />
						Enquire About PR Services
					</a>
				</div>
			</div>
		</div>
	);
};

const PRPage = () => {
	const [agencies, setAgencies] = useState<PrAgency[]>([]);
	const [selectedAgency, setSelectedAgency] = useState<PrAgency | null>(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState("");
	const resultsRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const fetchAgencies = async () => {
			try {
				setIsLoading(true);
				const data = await sanity.fetch<PrAgency[]>(GET_PR_AGENCIES);
				setAgencies(data || []);
			} catch (fetchError) {
				console.error(fetchError);
				setError("We could not load PR agencies right now.");
			} finally {
				setIsLoading(false);
			}
		};

		fetchAgencies();
	}, []);

	const filteredAgencies = useMemo(() => {
		const normalizedSearch = searchTerm.trim().toLowerCase();
		if (!normalizedSearch) return agencies;

		return agencies.filter((agency) =>
			[
				agency.name,
				agency.category,
				...(agency.coverage || []),
				...(agency.services || []).map((s) => s.name),
			]
				.filter(Boolean)
				.join(" ")
				.toLowerCase()
				.includes(normalizedSearch),
		);
	}, [searchTerm, agencies]);

	const handleSearch = (value: string) => {
		setSearchTerm(value);
		if (value && resultsRef.current) {
			resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	};

	return (
		<div className="flex min-h-screen flex-col bg-gray-50">
			<section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-700 to-teal-800 px-6 py-24 text-center text-white md:py-32">
				<div className="absolute inset-0 opacity-10 pattern-dots" />

				<div className="relative z-10 mx-auto max-w-4xl space-y-8">
					<div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-emerald-100 backdrop-blur-md">
						<span className="flex h-2 w-2 rounded-full bg-green-400" />
						PR media options
					</div>

					<h1 className="text-5xl font-extrabold tracking-tight md:text-7xl">
						PR &amp; Agencies
					</h1>

					<p className="mx-auto max-w-2xl text-xl leading-relaxed text-emerald-100/90 md:text-2xl">
						Amplify your brand voice through leading PR agencies and media campaigns
						across Africa.
					</p>

					<div className="mx-auto mt-12 max-w-2xl">
						<div className="relative">
							<input
								type="text"
								placeholder="Search agencies, services or markets..."
								className="w-full rounded-full bg-white py-5 pl-14 pr-12 text-lg text-gray-900 shadow-2xl transition focus:outline-none focus:ring-4 focus:ring-emerald-400/50"
								value={searchTerm}
								onChange={(event) => handleSearch(event.target.value)}
							/>
							<Icon
								icon="mdi:magnify"
								className="absolute left-5 top-1/2 h-7 w-7 -translate-y-1/2 text-emerald-600"
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
						<span className="text-emerald-200/70">Popular:</span>
						{["Press Release", "Media Tour", "Event PR", "Crisis Management"].map(
							(tag) => (
								<button
									key={tag}
									type="button"
									onClick={() => handleSearch(tag)}
									className="rounded-md px-3 py-1 text-emerald-100 transition hover:bg-white/10 hover:text-white"
								>
									{tag}
								</button>
							),
						)}
					</div>
				</div>
			</section>

			<CategorySwitcher activeHref="/pr" />

			<main ref={resultsRef} className="mx-auto w-full max-w-7xl flex-1 px-6 py-12">
				<div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
					<div>
						<p className="text-sm font-semibold text-emerald-600">PR &amp; Agencies</p>
						<h2 className="text-2xl font-bold text-gray-900">
							{isLoading
								? "Loading agencies"
								: `${filteredAgencies.length} agenc${filteredAgencies.length === 1 ? "y" : "ies"} found`}
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
							<PrSkeleton key={index} />
						))}
					</div>
				) : filteredAgencies.length === 0 ? (
					<CategoryWaitlist
						icon="mdi:bullhorn-outline"
						title="No PR agencies available yet"
						description="PR agency options will appear here once they are ready. You can still request a curated PR plan from the team."
						searchTerm={searchTerm}
					/>
				) : (
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						{filteredAgencies.map((agency) => {
							const message = encodeURIComponent(
								`Hi, I am interested in PR services from ${agency.name}`,
							);
							const whatsappUrl = `https://wa.me/2347040925563?text=${message}`;

							return (
								<article
									key={agency._id}
									className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
								>
									<div>
										<div className="relative z-10 mb-4 flex items-start justify-between">
											<div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-white p-1 shadow-sm">
												<Image
													src={agency.logo || defaultLogo}
													alt={agency.name}
													width={56}
													height={56}
													className="h-full w-full object-contain"
												/>
											</div>
											{agency.category && (
												<span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
													{formatLabel(agency.category)}
												</span>
											)}
										</div>

										<h3 className="relative z-10 mb-2 line-clamp-1 text-lg font-bold text-gray-900 transition group-hover:text-emerald-700">
											{agency.name}
										</h3>

										<div className="relative z-10 mb-6 space-y-2 text-xs text-gray-500">
											<p className="flex items-center gap-2">
												<Icon icon="mdi:map-marker" className="h-4 w-4" />
												{agency.coverage?.join(", ") || "Markets pending"}
											</p>
										</div>

										<div className="relative z-10 mb-6 grid grid-cols-2 gap-2">
											<div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
												<p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
													Services
												</p>
												<p className="text-sm font-bold text-gray-800">
													{agency.services?.length ?? 0}
												</p>
											</div>
											<div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
												<p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
													From
												</p>
												<p className="text-sm font-bold text-gray-800">
													{formatPrLowestPrice(agency)}
												</p>
											</div>
										</div>

										{(agency.services || []).length > 0 && (
											<div className="relative z-10 mb-6 flex flex-wrap gap-2">
												{(agency.services || []).slice(0, 3).map((service) => (
													<span
														key={service.name}
														className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"
													>
														{service.name}
													</span>
												))}
											</div>
										)}
									</div>

									<button
										type="button"
										onClick={() => setSelectedAgency(agency)}
										className="relative z-10 mb-3 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-800 transition hover:border-emerald-400 hover:text-emerald-700"
									>
										<Icon icon="mdi:table-eye" className="h-5 w-5" />
										View services
									</button>

									<a
										href={whatsappUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="relative z-10 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3.5 font-semibold text-white shadow-lg shadow-gray-200 transition hover:bg-emerald-700 hover:shadow-emerald-300/30"
									>
										<Icon icon="mdi:whatsapp" className="h-5 w-5" />
										Enquire Now
									</a>
								</article>
							);
						})}
					</div>
				)}
			</main>

			<PrDetailModal
				agency={selectedAgency}
				onClose={() => setSelectedAgency(null)}
			/>

			<ListSpace />
		</div>
	);
};

export default PRPage;
