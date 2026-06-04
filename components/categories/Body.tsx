"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { bbill } from "@/assets";
import BillboardModal from "../BillboardModal";
import Hero from "../categories/Hero";
import CategorySwitcher from "./CategorySwitcher";
import { sanity } from "@/lib/sanity";
import { GET_BILLBOARDS } from "@/lib/queries";
import { Billboard } from "@/types/billboard";

type FilterKey = "displayType" | "billboardSize" | "availability" | "country";

const filterLabels: Record<FilterKey, string> = {
	displayType: "Display Type",
	billboardSize: "Billboard Size",
	availability: "Availability",
	country: "Country",
};

const formatLabel = (value?: string) => {
	if (!value) return "Not specified";

	return value
		.split(":")
		.pop()
		?.replace(/_/g, " ")
		.replace(/\b\w/g, (char) => char.toUpperCase()) || value;
};

const formatPrice = (billboard: Billboard) => {
	const amount =
		billboard.pricing?.priceWithMarkup ?? billboard.pricing?.basePrice;

	if (typeof amount !== "number") return "Request quote";

	const currency = (billboard.pricing?.currency || "ngn").toUpperCase();

	return new Intl.NumberFormat("en-NG", {
		style: "currency",
		currency,
		maximumFractionDigits: 0,
	}).format(amount);
};

const getSearchText = (billboard: Billboard) =>
	[
		billboard.name,
		billboard.description,
		billboard.displayType,
		billboard.billboardSize,
		billboard.billboardDimensions,
		billboard.availability,
		billboard.country,
		formatLabel(billboard.cityState),
	]
		.filter(Boolean)
		.join(" ")
		.toLowerCase();

const BillboardSkeleton = () => (
	<div className='overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm'>
		<div className='h-56 animate-pulse bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100' />
		<div className='space-y-4 p-5'>
			<div className='h-4 w-3/4 animate-pulse rounded bg-gray-200' />
			<div className='h-3 w-1/2 animate-pulse rounded bg-gray-100' />
			<div className='grid grid-cols-2 gap-3'>
				<div className='h-10 animate-pulse rounded-xl bg-gray-100' />
				<div className='h-10 animate-pulse rounded-xl bg-gray-100' />
			</div>
			<div className='h-11 animate-pulse rounded-xl bg-gray-200' />
		</div>
	</div>
);

const Body = () => {
	const [billboards, setBillboards] = useState<Billboard[]>([]);
	const [selectedBillboard, setSelectedBillboard] =
		useState<Billboard | null>(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedFilters, setSelectedFilters] = useState<
		Record<FilterKey, string[]>
	>({
		displayType: [],
		billboardSize: [],
		availability: [],
		country: [],
	});
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);
				const data = await sanity.fetch<Billboard[]>(GET_BILLBOARDS);
				setBillboards(data || []);
			} catch (fetchError) {
				console.error(fetchError);
				setError("We could not load billboard inventory right now.");
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	const filterOptions = useMemo(() => {
		const optionMap: Record<FilterKey, string[]> = {
			displayType: [],
			billboardSize: [],
			availability: [],
			country: [],
		};

		billboards.forEach((billboard) => {
			(Object.keys(optionMap) as FilterKey[]).forEach((key) => {
				const value = billboard[key];
				if (value && !optionMap[key].includes(value)) {
					optionMap[key].push(value);
				}
			});
		});

		return Object.fromEntries(
			Object.entries(optionMap).map(([key, values]) => [
				key,
				values.sort((first, second) =>
					formatLabel(first).localeCompare(formatLabel(second)),
				),
			]),
		) as Record<FilterKey, string[]>;
	}, [billboards]);

	const filteredBillboards = useMemo(() => {
		const normalizedSearch = searchQuery.trim().toLowerCase();

		return billboards.filter((billboard) => {
			const matchesSearch =
				!normalizedSearch ||
				getSearchText(billboard).includes(normalizedSearch);

			const matchesFilters = (
				Object.keys(selectedFilters) as FilterKey[]
			).every((key) => {
				const activeValues = selectedFilters[key];
				if (!activeValues.length) return true;

				const value = billboard[key];
				return value ? activeValues.includes(value) : false;
			});

			return matchesSearch && matchesFilters;
		});
	}, [billboards, searchQuery, selectedFilters]);

	const toggleFilter = (key: FilterKey, value: string) => {
		setSelectedFilters((current) => {
			const values = current[key];
			const nextValues = values.includes(value)
				? values.filter((item) => item !== value)
				: [...values, value];

			return {
				...current,
				[key]: nextValues,
			};
		});
	};

	const clearFilters = () => {
		setSearchQuery("");
		setSelectedFilters({
			displayType: [],
			billboardSize: [],
			availability: [],
			country: [],
		});
	};

	const hasActiveFilters =
		searchQuery.trim() ||
		Object.values(selectedFilters).some((values) => values.length);

	return (
		<div className='min-h-screen bg-gray-50'>
			<Hero onSearch={setSearchQuery} />
			<CategorySwitcher activeHref='/categories' />

			<main className='mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[300px_1fr] lg:px-6'>
				<aside className='h-fit rounded-2xl border border-gray-100 bg-white p-5 shadow-sm lg:sticky lg:top-28'>
					<div className='mb-5 flex items-center justify-between gap-3'>
						<div>
							<p className='text-xs font-semibold uppercase tracking-[0.2em] text-primary-purple'>
								Search
							</p>
							<h2 className='text-xl font-bold text-gray-950'>
								Find media spaces
							</h2>
						</div>
						{hasActiveFilters && (
							<button
								type='button'
								onClick={clearFilters}
								className='text-sm font-semibold text-primary-purple hover:text-primary-purple-dark'
							>
								Clear
							</button>
						)}
					</div>

					<label className='mb-6 block'>
						<span className='mb-2 block text-sm font-semibold text-gray-700'>
							Search by keyword
						</span>
						<span className='flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 text-gray-500 focus-within:border-primary-purple focus-within:bg-white'>
							<Icon icon='mdi:magnify' className='text-xl' />
							<input
								type='search'
								value={searchQuery}
								onChange={(event) => setSearchQuery(event.target.value)}
								placeholder='Lagos, gantry, 96 sheet...'
								className='w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400'
							/>
						</span>
					</label>

					<div className='space-y-6'>
						{(Object.keys(filterLabels) as FilterKey[]).map((key) => {
							const options = filterOptions[key];
							if (!isLoading && !options.length) return null;

							return (
								<section key={key}>
									<h3 className='mb-3 text-sm font-bold text-gray-900'>
										{filterLabels[key]}
									</h3>
									<div className='space-y-2'>
										{isLoading
											? Array.from({ length: 4 }).map((_, index) => (
													<div
														key={index}
														className='h-5 animate-pulse rounded bg-gray-100'
													/>
												))
											: options.map((option) => (
													<label
														key={option}
														className='flex cursor-pointer items-center gap-3 text-sm text-gray-700'
													>
														<input
															type='checkbox'
															checked={selectedFilters[key].includes(option)}
															onChange={() => toggleFilter(key, option)}
															className='h-4 w-4 rounded border-gray-300 accent-primary-purple'
														/>
														<span>{formatLabel(option)}</span>
													</label>
												))}
									</div>
								</section>
							);
						})}
					</div>
				</aside>

				<section>
					<div className='mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
						<div>
							<p className='text-sm font-medium text-primary-purple'>
								OOH Inventory
							</p>
							<h2 className='text-2xl font-bold text-gray-950'>
								{isLoading
									? "Loading billboards"
									: `${filteredBillboards.length} billboard${
											filteredBillboards.length === 1 ? "" : "s"
										} found`}
							</h2>
						</div>
						<p className='max-w-xl text-sm leading-6 text-gray-500'>
							Live inventory from Sanity CMS with search across names,
							locations, display formats, dimensions, availability and pricing.
						</p>
					</div>

					{error && (
						<div className='rounded-2xl border border-red-100 bg-red-50 p-5 text-sm font-medium text-red-700'>
							{error}
						</div>
					)}

					{isLoading ? (
						<div className='grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3'>
							{Array.from({ length: 6 }).map((_, index) => (
								<BillboardSkeleton key={index} />
							))}
						</div>
					) : filteredBillboards.length === 0 ? (
						<div className='flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white p-8 text-center'>
							<Icon
								icon='mdi:map-search-outline'
								className='mb-4 text-5xl text-primary-purple'
							/>
							<h3 className='text-lg font-bold text-gray-950'>
								No matching billboards
							</h3>
							<p className='mt-2 max-w-md text-sm text-gray-500'>
								Adjust your keyword or remove a few checkbox filters to
								expand the inventory.
							</p>
						</div>
					) : (
						<div className='grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3'>
							{filteredBillboards.map((billboard) => {
								const imageSrc = billboard.image || bbill;
								const message = encodeURIComponent(
									`Hi, I'm interested in ${billboard.name} (${formatLabel(
										billboard.displayType,
									)} in ${formatLabel(billboard.cityState)})`,
								);
								const whatsappUrl = `https://wa.me/2347040925563?text=${message}`;

								return (
									<article
										key={billboard._id}
										className='group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl'
									>
										<button
											type='button'
											onClick={() => setSelectedBillboard(billboard)}
											className='relative block h-56 w-full overflow-hidden bg-gray-100 text-left'
										>
											<Image
												src={imageSrc}
												alt={billboard.name}
												fill
												className='object-cover transition duration-500 group-hover:scale-105'
											/>
											<span className='absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-gray-800 shadow-sm'>
												{formatLabel(billboard.availability)}
											</span>
										</button>

										<div className='p-5'>
											<div className='mb-4'>
												<p className='mb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary-purple'>
													{formatLabel(billboard.displayType)}
												</p>
												<h3 className='line-clamp-2 min-h-12 text-base font-bold leading-6 text-gray-950'>
													{billboard.name}
												</h3>
												<p className='mt-2 text-sm text-gray-500'>
													{formatLabel(billboard.cityState)}
												</p>
											</div>

											<div className='mb-5 grid grid-cols-2 gap-3 text-sm'>
												<div className='rounded-xl bg-gray-50 p-3'>
													<p className='text-xs text-gray-400'>Size</p>
													<p className='font-semibold text-gray-800'>
														{formatLabel(billboard.billboardSize)}
													</p>
												</div>
												<div className='rounded-xl bg-gray-50 p-3'>
													<p className='text-xs text-gray-400'>Price</p>
													<p className='font-semibold text-gray-800'>
														{formatPrice(billboard)}
													</p>
												</div>
											</div>

											<a
												href={whatsappUrl}
												target='_blank'
												rel='noopener noreferrer'
												className='flex w-full items-center justify-center gap-2 rounded-xl bg-primary-purple px-4 py-3 text-sm font-bold text-white transition hover:bg-primary-purple-dark'
											>
												<Icon icon='mdi:whatsapp' className='text-lg' />
												Request this space
											</a>
										</div>
									</article>
								);
							})}
						</div>
					)}
				</section>
			</main>

			<BillboardModal
				billboard={selectedBillboard}
				onClose={() => setSelectedBillboard(null)}
			/>
		</div>
	);
};

export default Body;
