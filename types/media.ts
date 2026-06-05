export interface Pricing {
	currency?: string;
	basePrice?: number;
	priceWithMarkup?: number;
}

export interface RadioPricingItem {
	timeBand?: string;
	belt?: string;
	pricing?: Pricing;
}

export interface RadioStation {
	_id: string;
	name: string;
	logo?: string;
	image?: string;
	coverage?: string[];
	programmes?: string[];
	listenership?: number;
	spotAdvertPricing?: RadioPricingItem[];
	announcementPricing?: RadioPricingItem[];
	jinglesPricing?: RadioPricingItem[];
	liveAppearancePricing?: RadioPricingItem[];
	sponsoredProgrammePricing?: RadioPricingItem[];
	onAirHypePricing?: RadioPricingItem[];
	beltPricing?: RadioPricingItem[];
}

export interface InfluencerPricingItem {
	name?: string;
	description?: string;
	pricing?: Pricing;
}

export interface Influencer {
	_id: string;
	name: string;
	image?: string;
	postPricing?: InfluencerPricingItem[];
	igFollowers?: string;
	facebookFollowers?: string;
	ytSubscribers?: string;
	ytViews?: string;
	tiktokFollowers?: string;
	category?: string;
}
