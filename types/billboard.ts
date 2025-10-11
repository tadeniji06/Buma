export interface Billboard {
  _id: string;
  image: string;
  size?: string;
  status: "available" | "booked" | "maintenance";
  description?: string;
  area?: string;
}

export interface Region {
  name: string;
  billboards: Billboard[];
}

export interface Vendor {
  _id: string;
  name: string;
  regions: Region[];
}
