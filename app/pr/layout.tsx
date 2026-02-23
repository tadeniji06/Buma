import { Metadata } from "next";

export const metadata: Metadata = {
	title:
		"PR & Media Placements | Get Featured on Nigeria's Top News Sites",
	description:
		"Amplify your brand voice. Book sponsored posts, press releases, and media features on Nigeria's leading news and digital media platforms instantly.",
	keywords: [
		"PR distribution Nigeria",
		"Online news publication ads",
		"Press release service Nigeria",
		"Top news sites for features",
		"Media coverage Nigeria",
		"Digital PR Lagos",
		"Newspaper advertising Nigeria",
		"Media mentions Africa",
	],
};

export default function PRLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
