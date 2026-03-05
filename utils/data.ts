export const headerLinks = [
	{
		title: "Home",
		link: "/",
	},
	{
		title: "Categories",
		link: "/categories", // Changed to hash to prevent navigation
		type: "dropdown", // New property to identify dropdown
	},
	{
		title: "Blog",
		link: "/blog",
	},
	// {
	// 	title: "Browse Spaces",
	// 	link: "spaces",
	// },
	// {
	// 	title: "How it works",
	// 	link: "/tutorial",
	// },
	{
		title: "Contact Us",
		link: "/contact",
	},
	// {
	// 	title: "Login",
	// 	link: "/login",
	// },
];

export const billboardTypes = [
	"Portrait",
	"Unipole",
	"Gantry",
	"48 sheet",
	"96 sheet",
	"Wall drape",
	"Wall panel",
	"Bridge panel",
	"Lamp post",
	"Digital led",
	"Backlit",
];

import { radioLogos } from "@/assets/radio";

export const radioStations = [
	{ name: "Bond FM", logo: radioLogos["bond"] || radioLogos["cool"] },
	{
		name: "Wazobia FM",
		logo: radioLogos["wazobia"] || radioLogos["cool"],
	},
	{
		name: "Inspiration FM",
		logo: radioLogos["inspiration"] || radioLogos["cool"],
	},
	{ name: "Cool FM", logo: radioLogos["cool"] || radioLogos["cool"] },
	{
		name: "Nigeria Info FM",
		logo: radioLogos["nigeriainfo"] || radioLogos["cool"],
	},
	{
		name: "Brila FM",
		logo: radioLogos["cool"] || radioLogos["cool"],
	},
	{ name: "Max FM", logo: radioLogos["max"] || radioLogos["cool"] },
	{ name: "City FM", logo: radioLogos["city"] || radioLogos["cool"] },
	{
		name: "Rhythm FM (Silverbird)",
		logo: radioLogos["rhythm"] || radioLogos["cool"],
	},
	{ name: "Law FM", logo: radioLogos["cool"] || radioLogos["cool"] },
	{
		name: "Faaji FM",
		logo: radioLogos["faaji"] || radioLogos["cool"],
	},
	{
		name: "Radio Lagos Tiwantiwa FM",
		logo: radioLogos["radiolagos"] || radioLogos["cool"],
	},
	{ name: "Hot FM", logo: radioLogos["hot"] || radioLogos["cool"] },
	{
		name: "LASGIDI FM",
		logo: radioLogos["cool"] || radioLogos["cool"],
	},
	{
		name: "Lagos Talks FM",
		logo: radioLogos["lagostalk"] || radioLogos["cool"],
	},
	{
		name: "Jusmen FM",
		logo: radioLogos["cool"] || radioLogos["cool"],
	},
	{ name: "Kiss FM", logo: radioLogos["kiss"] || radioLogos["cool"] },
	{
		name: "RayPower FM",
		logo: radioLogos["raypower"] || radioLogos["cool"],
	},
	{
		name: "Mainland FM",
		logo: radioLogos["mainlan"] || radioLogos["cool"],
	},
	{
		name: "Beat FM",
		logo: radioLogos["thebeat"] || radioLogos["cool"],
	},
	{
		name: "Traffic Radio FM",
		logo: radioLogos["lagostraffic"] || radioLogos["cool"],
	},
	{
		name: "Yanga FM",
		logo: radioLogos["yanga"] || radioLogos["cool"],
	},
	{
		name: "Naija FM",
		logo: radioLogos["naija"] || radioLogos["cool"],
	},
	{
		name: "Ultima FM",
		logo: radioLogos["cool"] || radioLogos["cool"],
	},
	{
		name: "Radio Now FM",
		logo: radioLogos["radionow"] || radioLogos["cool"],
	},
	{
		name: "Urban Radio FM",
		logo: radioLogos["urban"] || radioLogos["cool"],
	},
	{ name: "Vybz FM", logo: radioLogos["vybz"] || radioLogos["cool"] },
	{ name: "VOP FM", logo: radioLogos["vop"] || radioLogos["cool"] },
	{
		name: "SoundCity FM",
		logo: radioLogos["soundcity"] || radioLogos["cool"],
	},
	{
		name: "Adamimogo FM",
		logo: radioLogos["adamimogo"] || radioLogos["cool"],
	},
	{
		name: "Sure FM",
		logo: radioLogos["surefm"] || radioLogos["cool"],
	},
	{ name: "Eko FM", logo: radioLogos["eko"] || radioLogos["cool"] },
	{
		name: "Konfam FM",
		logo: radioLogos["konfam"] || radioLogos["cool"],
	},
	{
		name: "Correct FM",
		logo: radioLogos["correct"] || radioLogos["cool"],
	},
	{
		name: "Fresh FM",
		logo: radioLogos["fresh"] || radioLogos["cool"],
	},
	{ name: "SMA FM", logo: radioLogos["smafm"] || radioLogos["cool"] },
	{
		name: "Lounge FM",
		logo: radioLogos["lounge"] || radioLogos["cool"],
	},
	{
		name: "Super FM",
		logo: radioLogos["super"] || radioLogos["cool"],
	},
	{ name: "WFM FM", logo: radioLogos["cool"] || radioLogos["cool"] },
	{
		name: "Classic FM",
		logo: radioLogos["classic"] || radioLogos["cool"],
	},
	{
		name: "Konga FM",
		logo: radioLogos["konga"] || radioLogos["cool"],
	},
	{
		name: "Bounce FM",
		logo: radioLogos["bounce"] || radioLogos["cool"],
	},
	{ name: "Kids FM", logo: radioLogos["kids"] || radioLogos["cool"] },
	{ name: "Wash FM", logo: radioLogos["wash"] || radioLogos["cool"] },
	{
		name: "Star FM",
		logo: radioLogos["starfm"] || radioLogos["cool"],
	},
	{
		name: "Access FM",
		logo: radioLogos["access"] || radioLogos["cool"],
	},
	{
		name: "Kennis FM",
		logo: radioLogos["kennis"] || radioLogos["cool"],
	},
	{
		name: "HI-Impact Radio FM",
		logo: radioLogos["hiimpact"] || radioLogos["cool"],
	},
	{
		name: "Melody FM",
		logo: radioLogos["melody"] || radioLogos["cool"],
	},
	{
		name: "Smooth FM",
		logo: radioLogos["smooth"] || radioLogos["cool"],
	},
	{
		name: "Jubilee FM",
		logo: radioLogos["jubilee"] || radioLogos["cool"],
	},
	{ name: "Base FM", logo: radioLogos["base"] || radioLogos["cool"] },
	{
		name: "Miliki FM",
		logo: radioLogos["miliki"] || radioLogos["cool"],
	},
	{ name: "Top FM", logo: radioLogos["top"] || radioLogos["cool"] },
	{ name: "SMA FM", logo: radioLogos["smafm"] || radioLogos["cool"] },
	{
		name: "Metro FM",
		logo: radioLogos["metro"] || radioLogos["cool"],
	},
	{
		name: "Gbedu FM",
		logo: radioLogos["gbedu"] || radioLogos["cool"],
	},
	{
		name: "Kwenu FM",
		logo: radioLogos["kwenu"] || radioLogos["cool"],
	},
	{ name: "Isle FM", logo: radioLogos["isle"] || radioLogos["cool"] },
	{ name: "LASU FM", logo: radioLogos["lasu"] || radioLogos["cool"] },
	{
		name: "Unilag FM",
		logo: radioLogos["unilag"] || radioLogos["cool"],
	},
	{
		name: "Galaxy Radio FM",
		logo: radioLogos["cool"] || radioLogos["cool"],
	},
	{
		name: "Spice FM",
		logo: radioLogos["spice"] || radioLogos["cool"],
	},
	{ name: "IKD FM", logo: radioLogos["ikd"] || radioLogos["cool"] },
	{
		name: "Jordan FM",
		logo: radioLogos["jordan"] || radioLogos["cool"],
	},
	{
		name: "Royal Root FM",
		logo: radioLogos["royalroots"] || radioLogos["cool"],
	},
	{ name: "X FM", logo: radioLogos["x"] || radioLogos["cool"] },
	{
		name: "Irawo FM",
		logo: radioLogos["irawo"] || radioLogos["cool"],
	},
	{
		name: "Choice FM",
		logo: radioLogos["choice"] || radioLogos["cool"],
	},
	{ name: "Lion FM", logo: radioLogos["lion"] || radioLogos["cool"] },
	{
		name: "V.O.N. (Voice Of Nigeria)",
		logo: radioLogos["von"] || radioLogos["cool"],
	},
	{
		name: "Bubble FM",
		logo: radioLogos["bubble"] || radioLogos["cool"],
	},
	{
		name: "Cosoro Africa",
		logo: radioLogos["cosoro"] || radioLogos["cool"],
	},
];

export const prPlatforms = [
	"Guardian",
	"The Punch",
	"The Nation Nigeria",
	"Vanguard",
	"Thisday",
	"Premium Times",
	"Daily Trust",
	"The Cable",
	"Leadership Newspapers",
	"BusinessDay Nigeria",
	"Nairametrics",
	"The Sun",
	"Nigerian Tribune",
	"Daily Independent",
	"Blueprint Newspapers",
	"Pulse Nigeria",
	"The Eagle Online",
	"Daily Post Nigeria",
	"The News Magazine",
	"TooXclusive",
	"The Industry",
	"Marketing Space",
	"Vocus News",
	"Breezy News",
	"News Express",
	"Tech Cabal",
	"Tech Point",
	"New Telegraph",
	"Brand icon image",
	"Brand Essence",
];

export const categoryData = {
	OOH: {
		title: "Out of Home (OOH)",
		items: billboardTypes,
		comingSoon: false,
		description:
			"Billboards, Gantries, and other outdoor advertising spaces.",
	},
	Radio: {
		title: "Radio Stations",
		items: radioStations,
		comingSoon: false,
		description:
			"Reach your audience through popular radio stations.",
	},
	PR: {
		title: "PR & Media",
		items: prPlatforms,
		comingSoon: false,
		description:
			"Publish your content on top news sites and newspapers.",
	},
	TV: {
		title: "TV Stations",
		items: [],
		comingSoon: true,
		description: "Television advertising opportunities coming soon.",
	},
	"Influencer Marketing": {
		title: "Influencer Marketing",
		items: [],
		comingSoon: true,
		description:
			"Connect with top influencers to promote your brand.",
	},
};
