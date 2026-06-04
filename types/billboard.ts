export interface Billboard {
	_id: string;
	name: string;
	image?: string;
	images?: string[];
	description?: string;
	displayType?: string;
	billboardSize?: string;
	billboardDimensions?: string;
	availability: "available" | "booked" | "reserved" | "maintenance";
	country?: string;
	cityState?: string;
	pricing?: {
		currency?: string;
		basePrice?: number;
		priceWithMarkup?: number;
	};
}
