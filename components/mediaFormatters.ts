import { Pricing, RadioStation, TvStation, PrMedia } from "@/types/media";

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

export const getPriceAmount = (pricing?: Pricing): number | undefined => {
	if (!pricing) return undefined;
	const amount = pricing.price ?? pricing.basePrice ?? pricing.priceWithMarkup;
	return typeof amount === "number" ? amount : undefined;
};

export const formatPriceValue = (pricing?: Pricing) => {
	const amount = getPriceAmount(pricing);

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
		.map((item) => getPriceAmount(item.price))
		.filter((price): price is number => typeof price === "number");

	if (!prices.length) return undefined;

	return Math.min(...prices);
};

export const formatRadioLowestPrice = (station: RadioStation) => {
	const amount = getLowestRadioPrice(station);
	if (typeof amount !== "number") return "Request quote";

	const firstPricing = getRadioPricingGroups(station)
		.flatMap((group) => group.items)
		.find((item) => getPriceAmount(item.price) === amount)?.price;

	return formatPriceValue({
		currency: firstPricing?.currency,
		price: amount,
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
		.map((i) => getPriceAmount(i.price))
		.filter((p): p is number => typeof p === "number");
	return prices.length ? Math.min(...prices) : undefined;
};

export const formatTvLowestPrice = (station: TvStation) => {
	const amount = getTvLowestPrice(station);
	if (typeof amount !== "number") return "Request quote";
	const firstPricing = getTvPricingGroups(station)
		.flatMap((g) => g.items)
		.find((i) => getPriceAmount(i.price) === amount)?.price;
	return formatPriceValue({ currency: firstPricing?.currency, price: amount });
};

export const countTvRateCards = (station: TvStation) =>
	getTvPricingGroups(station).reduce((t, g) => t + g.items.length, 0);

// PR x Media helpers

export const getPrMediaPricingItems = (media: PrMedia) => {
	const items: { label: string; price?: Pricing; description?: string; category?: string }[] = [];

	if (media.publicNoticeBlackPricing) {
		items.push({ label: "Public Notice (B&W)", price: media.publicNoticeBlackPricing, category: "Standard Rate" });
	}
	if (media.productsColourPricing) {
		items.push({ label: "Products (Colour)", price: media.productsColourPricing, category: "Standard Rate" });
	}
	if (media.productsBlackPricing) {
		items.push({ label: "Products (B&W)", price: media.productsBlackPricing, category: "Standard Rate" });
	}
	if (media.politicsColorPricing) {
		items.push({ label: "Politics (Colour)", price: media.politicsColorPricing, category: "Standard Rate" });
	}
	if (media.politicsBlackPricing) {
		items.push({ label: "Politics (B&W)", price: media.politicsBlackPricing, category: "Standard Rate" });
	}
	if (media.allureRatePricing) {
		items.push({ label: "Allure Rate", price: media.allureRatePricing, category: "Standard Rate" });
	}

	(media.specialPositions || []).forEach((pos) => {
		items.push({
			label: formatLabel(pos.position),
			price: pos.pricing,
			description: pos.description,
			category: "Special Position",
		});
	});

	(media.customPackages || media.services || media.placements || []).forEach((pkg) => {
		items.push({
			label: pkg.name || "Custom Package",
			price: pkg.pricing,
			description: pkg.description,
			category: "Custom Package",
		});
	});

	return items;
};

export const getPrLowestPrice = (media: PrMedia) => {
	const prices = getPrMediaPricingItems(media)
		.map((item) => getPriceAmount(item.price))
		.filter((p): p is number => typeof p === "number");
	return prices.length ? Math.min(...prices) : undefined;
};

export const formatPrLowestPrice = (media: PrMedia) => {
	const amount = getPrLowestPrice(media);
	if (typeof amount !== "number") return "Request quote";
	const firstPricing = getPrMediaPricingItems(media).find(
		(item) => getPriceAmount(item.price) === amount,
	)?.price;
	return formatPriceValue({ currency: firstPricing?.currency, price: amount });
};

export const getNewsLowestPrice = getPrLowestPrice;
export const formatNewsLowestPrice = formatPrLowestPrice;
