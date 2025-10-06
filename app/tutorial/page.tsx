import ListSpace from "@/components/ListSpace";
import Faq from "@/components/tutorial/Faq";
import Steps from "@/components/tutorial/Steps";
import TutHero from "@/components/tutorial/TutHero";
import Why from "@/components/tutorial/Why";

const page = () => {
	return (
		<div>
			<TutHero />
			<Steps />
			<Why />
			<Faq />
			<ListSpace />
		</div>
	);
};
export default page;
