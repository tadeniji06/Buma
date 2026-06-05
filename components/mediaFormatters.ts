import { Pricing, RadioStation } from "@/types/media";

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
	const amount = pricing?.priceWithMarkup ?? pricing?.basePrice;

	if (typeof amount !== "number") return "Request quote";

	return new Intl.NumberFormat("en-NG", {
		style: "currency",
		currency: (pricing?.currency || "ngn").toUpperCase(),
		maximumFractionDigits: 0,
	}).format(amount);
};

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
		.map((item) => item.price?.priceWithMarkup ?? item.price?.basePrice)
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
			const price = item.price?.priceWithMarkup ?? item.price?.basePrice;
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
