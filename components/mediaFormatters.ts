import { Pricing, RadioStation, TvStation, NewsOutlet, PrAgency } from "@/types/media";

export const formatLabel = (value?: string) => {
	if (!value) return "Not specified";

	return (
		value
			.split(":")
			.pop()
			?.replace(/_/g, " ")
			.replace(/\b\w/g, (char) => char.toUpperCase()) || value
	);
};

export const formatPriceValue = (pricing?: Pricing) => {
	const amount = pricing?.priceWithMarkup;

	if (typeof amount !== "number") return "Request quote";

	return new Intl.NumberFormat("en-NG", {
		style: "currency",
		currency: (pricing?.currency || "ngn").toUpperCase(),
		maximumFractionDigits: 0,
	}).format(amount);
};

// Radio helpers

export const getRadioPricingGroups = (station: RadioStation) => [
	{
		title: "Belt Pricing",
		icon: "mdi:clock-time-four-outline",
		items: (station.beltPricing || []).map((item) => ({
			label: formatLabel(item.belt),
			price: item.pricing,
		})),
	},
	{
		title: "Jingles Pricing",
		icon: "mdi:music-note",
		items: (station.jinglesPricing || []).map((item) => ({
			label: formatLabel(item.duration || item.timeBand),
			price: item.pricing,
		})),
	},
	{
		title: "Sponsored Programme Pricing",
		icon: "mdi:television-play",
		items: (station.sponsoredProgrammePricing || []).map((item) => ({
			label: formatLabel(item.duration || item.timeBand),
			price: item.pricing,
		})),
	},
	{
		title: "Spot Advert Pricing",
		icon: "mdi:bullhorn-outline",
		items: (station.spotAdvertPricing || []).map((item) => ({
			label: formatLabel(item.duration || item.timeBand),
			price: item.pricing,
		})),
	},
	{
		title: "Live Appearance Pricing",
		icon: "mdi:microphone-variant",
		items: (station.liveAppearancePricing || []).map((item) => ({
			label: formatLabel(item.duration || item.timeBand),
			price: item.pricing,
		})),
	},
	{
		title: "Announcement Pricing",
		icon: "mdi:message-text-outline",
		items: (station.announcementPricing || []).map((item) => ({
			label: formatLabel(item.wordCount || item.timeBand),
			price: item.pricing,
		})),
	},
	{
		title: "On-Air Hype Pricing",
		icon: "mdi:radio-handheld",
		items: station.onAirHypePricingItems?.length
			? station.onAirHypePricingItems.map((item) => ({
					label: formatLabel(item.duration || item.wordCount || item.timeBand),
					price: item.pricing,
				}))
			: station.onAirHypePricing
				? [{ label: "Standard package", price: station.onAirHypePricing }]
				: [],
	},
];

export const getLowestRadioPrice = (station: RadioStation) => {
	const prices = getRadioPricingGroups(station)
		.flatMap((group) => group.items)
		.map((item) => item.price?.priceWithMarkup)
		.filter((price): price is number => typeof price === "number");

	if (!prices.length) return undefined;

	return Math.min(...prices);
};

export const formatRadioLowestPrice = (station: RadioStation) => {
	const amount = getLowestRadioPrice(station);
	if (typeof amount !== "number") return "Request quote";

	const firstPricing = getRadioPricingGroups(station)
		.flatMap((group) => group.items)
		.find((item) => {
			const price = item.price?.priceWithMarkup;
			return price === amount;
		})?.price;

	return formatPriceValue({
		currency: firstPricing?.currency,
		priceWithMarkup: amount,
	});
};

export const countRadioRateCards = (station: RadioStation) =>
	getRadioPricingGroups(station).reduce(
		(total, group) => total + group.items.length,
		0,
	);

// TV helpers

export const getTvPricingGroups = (station: TvStation) => [
	{
		title: "Run of Spot",
		icon: "mdi:television-play",
		isTimedDuration: true,
		items: (station.runOfSpotPricing || []).map((item) => ({
			label: formatLabel(item.duration),
			price: item.pricing,
			description: undefined,
		})),
	},
	{
		title: "Advert Spot",
		icon: "mdi:bullhorn-outline",
		isTimedDuration: true,
		items: (station.advertSpotPricing || []).map((item) => ({
			label: formatLabel(item.duration),
			price: item.pricing,
			description: undefined,
		})),
	},
	{
		title: "Live Coverage",
		icon: "mdi:broadcast",
		isTimedDuration: false,
		items: (station.liveCoveragePricing || []).map((item) => ({
			label: item.name || "Package",
			price: item.pricing,
			description: item.description,
		})),
	},
	{
		title: "Guest Appearance",
		icon: "mdi:account-voice",
		isTimedDuration: false,
		items: (station.guestAppearancePricing || []).map((item) => ({
			label: item.name || "Package",
			price: item.pricing,
			description: item.description,
		})),
	},
	{
		title: "Sponsored Programme",
		icon: "mdi:star-circle-outline",
		isTimedDuration: false,
		items: (station.sponsoredProgrammePricing || []).map((item) => ({
			label: item.name || "Package",
			price: item.pricing,
			description: item.description,
		})),
	},
	{
		title: "Announcement",
		icon: "mdi:message-text-outline",
		isTimedDuration: false,
		items: (station.announcementPricing || []).map((item) => ({
			label: item.name || "Package",
			price: item.pricing,
			description: item.description,
		})),
	},
];

export const getTvLowestPrice = (station: TvStation) => {
	const prices = getTvPricingGroups(station)
		.flatMap((g) => g.items)
		.map((i) => i.price?.priceWithMarkup)
		.filter((p): p is number => typeof p === "number");
	return prices.length ? Math.min(...prices) : undefined;
};

export const formatTvLowestPrice = (station: TvStation) => {
	const amount = getTvLowestPrice(station);
	if (typeof amount !== "number") return "Request quote";
	const firstPricing = getTvPricingGroups(station)
		.flatMap((g) => g.items)
		.find((i) => i.price?.priceWithMarkup === amount)?.price;
	return formatPriceValue({ currency: firstPricing?.currency, priceWithMarkup: amount });
};

export const countTvRateCards = (station: TvStation) =>
	getTvPricingGroups(station).reduce((t, g) => t + g.items.length, 0);

// News helpers

export const getNewsLowestPrice = (outlet: NewsOutlet) => {
	const prices = (outlet.placements || [])
		.map((p) => p.pricing?.priceWithMarkup)
		.filter((p): p is number => typeof p === "number");
	return prices.length ? Math.min(...prices) : undefined;
};

export const formatNewsLowestPrice = (outlet: NewsOutlet) => {
	const amount = getNewsLowestPrice(outlet);
	if (typeof amount !== "number") return "Request quote";
	const firstPricing = (outlet.placements || []).find(
		(p) => p.pricing?.priceWithMarkup === amount,
	)?.pricing;
	return formatPriceValue({ currency: firstPricing?.currency, priceWithMarkup: amount });
};

// PR helpers

export const getPrLowestPrice = (agency: PrAgency) => {
	const prices = (agency.services || [])
		.map((s) => s.pricing?.priceWithMarkup)
		.filter((p): p is number => typeof p === "number");
	return prices.length ? Math.min(...prices) : undefined;
};

export const formatPrLowestPrice = (agency: PrAgency) => {
	const amount = getPrLowestPrice(agency);
	if (typeof amount !== "number") return "Request quote";
	const firstPricing = (agency.services || []).find(
		(s) => s.pricing?.priceWithMarkup === amount,
	)?.pricing;
	return formatPriceValue({ currency: firstPricing?.currency, priceWithMarkup: amount });
};
