import Categories from "@/components/Categories";
import Clients from "@/components/Clients";
import Hero from "@/components/Hero";
import ListSpace from "@/components/ListSpace";
import Reviews from "@/components/Reviews";

const page = () => {
	return (
		<div className='min-h-screen'>
			<Hero />
			<Categories />
			<ListSpace />
			<Clients />
			<Reviews />
		</div>
	);
};
export default page;
