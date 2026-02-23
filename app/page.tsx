import Clients from "@/components/Clients";
import Hero from "@/components/Hero";
import Reviews from "@/components/Reviews";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import Advantages from "@/components/Advantages";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Buma | Book Billboards, Radio & PR Ads in Nigeria",
	description:
		"The ultimate media buying platform in Africa. Compare rates and book billboard spaces, radio slots, and PR placements in Lagos and across Nigeria instantly.",
};

export default function Home() {
	return (
		<div className='min-h-screen'>
			<Hero />
			<Services />
			<HowItWorks />
			<Advantages />
			<Clients />
			{/* <Reviews /> */}
		</div>
	);
}
