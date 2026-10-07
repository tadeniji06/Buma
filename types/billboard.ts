export interface Billboard {
	_id: string;
	name: string;
	agency?: string;
	image?: string;
	images?: string[];
	description?: string;
	displayType?: string;
	billboardSize?: string;
	billboardDimensions?: string;
	availability: "available" | "booked" | "reserved" | "maintenance";
	country?: string;
	state?: string;
	city?: string;
	cityState?: string;
	latitude?: number;
	longitude?: number;
	contactPerson?: string;
	contactPersonEmail?: string;
	contactPersonPhone?: string;
	companyEmail?: string;
	companyPhone?: string;
	pricing?: {
		currency?: string;
		price?: number;
		basePrice?: number;
		priceWithMarkup?: number;
	};
}
