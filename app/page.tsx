import Categories from "@/components/Categories";
import Hero from "@/components/Hero";
import ListSpace from "@/components/ListSpace";

const page = () => {
	return (
		<div className='min-h-screen'>
			<Hero />
			<Categories />
			<ListSpace />
		</div>
	);
};
export default page;
