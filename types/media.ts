export interface Pricing {
	currency?: string;
	priceWithMarkup?: number;
}

export interface RadioPricingItem {
	belt?: string;
	duration?: string;
	timeBand?: string;
	wordCount?: string;
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
	onAirHypePricing?: Pricing;
	onAirHypePricingItems?: RadioPricingItem[];
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

// TV Station
export interface TvTimedPricingItem {
	duration?: string;
	pricing?: Pricing;
}

export interface TvPlaceholderPricingItem {
	name?: string;
	description?: string;
	pricing?: Pricing;
}

export interface TvStation {
	_id: string;
	name: string;
	logo?: string;
	category?: string;
	viewership?: number;
	programmes?: string[];
	coverage?: string[];
	runOfSpotPricing?: TvTimedPricingItem[];
	advertSpotPricing?: TvTimedPricingItem[];
	liveCoveragePricing?: TvPlaceholderPricingItem[];
	guestAppearancePricing?: TvPlaceholderPricingItem[];
	sponsoredProgrammePricing?: TvPlaceholderPricingItem[];
	announcementPricing?: TvPlaceholderPricingItem[];
}

// News Outlet
export interface NewsPlacementItem {
	name?: string;
	description?: string;
	pricing?: Pricing;
}

export interface NewsOutlet {
	_id: string;
	name: string;
	logo?: string;
	category?: string;
	reach?: number;
	coverage?: string[];
	placements?: NewsPlacementItem[];
}

// PR Agency
export interface PrServiceItem {
	name?: string;
	description?: string;
	pricing?: Pricing;
}

export interface PrAgency {
	_id: string;
	name: string;
	logo?: string;
	category?: string;
	coverage?: string[];
	services?: PrServiceItem[];
}
