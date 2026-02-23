import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Book Radio Ad Slots | Top Radio Stations in Nigeria | Buma",
	description:
		"Reach millions of listeners. Compare rankings and book advertisement slots for the best FM radio stations in Lagos and across Nigeria on Buma.",
	keywords: [
		"Radio advertising Nigeria",
		"FM station ad rates Lagos",
		"Radio airtime booking",
		"Nigeria radio stations reach",
		"Top radio stations for ads",
		"Radio publicity Nigeria",
		"Lagos Radio Stations",
		"Radio Marketing Africa",
	],
};

export default function RadioLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
