import Clients from "@/components/Clients";
import Hero from "@/components/Hero";
import Reviews from "@/components/Reviews";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import Advantages from "@/components/Advantages";

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
