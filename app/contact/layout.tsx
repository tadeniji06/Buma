import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Contact Buma | Africa's No.1 Media Buying Partner",
	description:
		"Ready to launch your advertising campaign? Get in touch with Buma for expert consultation on Billboards, Radio, TV, and PR placements across Africa.",
	keywords: [
		"Contact Buma",
		"Media Buying Consultation",
		"Advertising Agency Nigeria",
		"Billboard Booking Lagos",
		"Buma Support",
	],
};

export default function ContactLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
