import type { Metadata } from "next";
import "./globals.css";
import Header from "@/layouts/Header";
import Footer from "@/layouts/Footer";
import ClarityScript from "@/components/Clarity";

import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { Toaster } from "sonner";
import AnalyticsScript from "@/components/Analytics";

export const metadata: Metadata = {
	title: "Buma | Africa's No.1 Media Buying Marketplace",
	description:
		"Seamlessly search, book, and manage advertising spaces across Africa. From Billboards (OOH) to Radio, TV, PR, and Influencer marketing — Buma connects brands with premium ad slots at the best rates.",
	icons: {
		icon: "/buma.png",
	},
	keywords: [
		"Media Buying Africa",
		"Billboard Advertising Nigeria",
		"Radio Ad Slots Lagos",
		"OOH Advertising Africa",
		"PR Distribution Nigeria",
		"Advertising Marketplace",
		"Digital Billboards Nigeria",
		"Media MarketPlace Lagos",
		"AdTech Africa",
		"Book Billboards Online",
		"TV Commercials Nigeria",
		"Influencer Marketing Nigeria",
		"Buma Media",
		"Buma",
		"My Buma",
		"Advertising Spaces Africa",
		"Gantry Advertising Lagos",
		"Best Advertising Rates Nigeria",
		"Programmatic OOH Nigeria",
		"DOOH Africa",
		"Digital PR MarketPlace Lagos",
		"Media Planning Tool",
		"Direct Media Buying",
		"Ad Inventory Africa",
	],
	openGraph: {
		title: "Buma | Africa's No.1 Media Buying Marketplace",
		description:
			"Find and book the perfect advertising spots for your brand across Africa. Real-time availability for Billboards, Radio, PR, and more.",
		url: "https://www.mybuma.com",
		siteName: "Buma",
		images: [
			{
				url: "/buma.png",
				width: 800,
				height: 600,
				alt: "Buma Media Buying",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Buma | Media Buying In Africa",
		description:
			"Connecting brands to premium advertising spaces across Africa.",
		images: ["/buma.png"],
	},
};

const websiteSchema = {
	"@context": "https://schema.org",
	"@type": "WebSite",
	name: "Buma",
	url: "https://www.mybuma.com",
	potentialAction: {
		"@type": "SearchAction",
		target: "https://www.mybuma.com/?s={search_term_string}",
		"query-input": "required name=search_term_string",
	},
};

const organizationSchema = {
	"@context": "https://schema.org",
	"@type": "Organization",
	name: "Buma",
	url: "https://www.mybuma.com",
	logo: "https://www.mybuma.com/logo.png",
	description:
		"Buma is a modern platform offering innovative products and services designed to simplify everyday living and enhance customer experiences.",
	sameAs: [
		"https://www.instagram.com/",
		"https://www.facebook.com/",
		"https://www.linkedin.com/",
		"https://www.twitter.com/",
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<head>
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(websiteSchema),
					}}
				/>
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(organizationSchema),
					}}
				/>
			</head>
			<body className={`antialiased`}>
				<Header />
				{children}
				<Footer />
				<ClarityScript />
				<AnalyticsScript />
				<FloatingWhatsApp />
				<Toaster richColors position='top-right' />
			</body>
		</html>
	);
}
