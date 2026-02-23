import Body from "@/components/categories/Body";
// import Hero from "@/components/categories/Hero";
import ListSpace from "@/components/ListSpace";
// import Spaces from "@/components/Spaces";
import { Metadata } from "next";

export const metadata: Metadata = {
	title:
		"Billboards & OOH Advertising | Premium Outdoor Slots in Nigeria",
	description:
		"Discover and book premium outdoor advertising spaces across Africa. From digital LEDs to unipoles and wall drapes, find the best OOH spots on Buma.",
	keywords: [
		"Billboard advertising Lagos",
		"Nigeria outdoor advertising",
		"OOH media buying Nigeria",
		"Book billboards Africa",
		"Wall drapes ads Lagos",
		"Unipole billboard rates",
		"Gantry ads Nigeria",
		"Bridge panel advertising",
	],
};

const page = () => {
	return (
		<div>
			{/* <Hero /> */}
			<Body />
			{/* <Spaces /> */}
			<ListSpace />
		</div>
	);
};
export default page;
