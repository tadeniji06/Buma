const fs = require("fs");
const data = [
	"Bond 92.9 FM",
	"Wazobia 95.1 FM",
	"Inspiration 92.3 FM",
	"Cool 96.9 FM",
	"Nigeria Info 99.3 FM",
	"Brila 88.9 FM",
	"Max 102.3 FM",
	"City FM 105.1",
	"Rhythm 93.7 FM (Silverbird)",
	"Law 103.9 FM",
	"Faaji 106.5 FM",
	"Radio Lagos Tiwantiwa 107.5 FM",
	"Hot 93.3 FM",
	"LASGIDI 90.1 FM",
	"Lagos Talks 91.3 FM",
	"Jusmen 105.7 FM",
	"Kiss 98.9 FM",
	"RayPower 100.5 FM",
	"Mainland 98.3 FM",
	"Beat 99.9 FM",
	"Traffic Radio 96.1 FM",
	"Yanga 89.9 FM",
	"Naija 102.7 FM",
	"Ultima 88.5 FM",
	"Radio Now 95.3 FM",
	"Urban Radio 96.5 FM",
	"Vybz 94.5 FM",
	"VOP 90.3 FM",
	"SoundCity 98.5 FM",
	"Adamimogo 93.1 FM",
	"Sure 97.5 FM",
	"Eko 89.7 FM",
	"Konfam 89.5 FM",
	"Correct 104.3 FM",
	"Fresh 105.3 FM",
	"SMA 104.7 FM",
	"Lounge 101.9 FM",
	"Super 92.7 FM",
	"WFM 91.7 FM",
	"Classic 97.3 FM",
	"Konga 103.7 FM",
	"Bounce 89.1 FM",
	"Kids 101.7 FM",
	"Wash 94.9 FM",
	"Star 101.5 FM",
	"Access24 91.5 FM",
	"Kennis 104.1 FM",
	"HI-Impact Radio 102.1 FM",
	"Melody 107.7 FM",
	"Smooth 98.1 FM",
	"Jubilee 99.7 FM",
	"Base 101.1 FM",
	"Miliki 101.3 FM",
	"Top 90.9 FM",
	"SMA 104.7 FM",
	"Metro 97.7 FM",
	"Gbedu 100.1 FM",
	"Kwenu 93.9 FM",
	"Isle 104.9 FM",
	"LASU 95.7 FM",
	"Unilag 103.1 FM",
	"Galaxy Radio 99.1 FM",
	"Spice 102.9 FM",
	"IKD 106.1 FM",
	"Jordan 105.5 FM",
	"Royal Root 107.1 FM",
	"X100.7 FM",
	"Irawo 96.7 FM",
	"Choice 103.5 FM",
	"Lion 93.9 FM",
	"V.O.N. (Voice Of Nigeria)",
	"Bubble 89.2 FM",
];

let res = "export const radioStations = [\n";
for (const item of data) {
	let name = item
		.replace(/\s*\d+(\.\d+)?\s*/g, " ")
		.replace(/\s+/g, " ")
		.trim();
	if (name.includes("X FM") || name === "XFM" || name === "X")
		name = "X FM";

	// heuristics to find the correct logo key
	let fileKey = name.toLowerCase().replace(/[^a-z0-9]/g, "");
	let matchedKey = fileKey;

	if (fileKey.includes("brila"))
		matchedKey = "cool"; // no brila in list, fallback
	else if (fileKey.includes("beat")) matchedKey = "thebeat";
	else if (fileKey.includes("lagostalk")) matchedKey = "lagostalk";
	else if (fileKey.includes("traffic")) matchedKey = "lagostraffic";
	else if (fileKey.includes("radionow")) matchedKey = "radionow";
	else if (fileKey.includes("radiolagostiwantiwa"))
		matchedKey = "radiolagos";
	else if (fileKey.includes("royal")) matchedKey = "royalroots";
	else if (fileKey.includes("smafm") || fileKey.includes("sma"))
		matchedKey = "smafm"; // wait, sma or smafm? 'sma.png' and 'smafm.png' exist! Let's pick 'sma'
	else if (fileKey.includes("star")) matchedKey = "starfm";
	else if (fileKey.includes("sure")) matchedKey = "surefm";
	else if (fileKey.includes("voiceofnigeria")) matchedKey = "von";
	else {
		// Remove fm/radio from end to match files
		matchedKey = matchedKey
			.replace(/radio$|fm$/, "")
			.replace(/radio$/, "");
		if (matchedKey === "sma") matchedKey = "sma";
		if (matchedKey === "coolfm") matchedKey = "cool";
		if (matchedKey === "wazobiafm") matchedKey = "wazobia";
	}

	res += `\t{ name: "${name}", logo: radioLogos['${matchedKey}'] || radioLogos['cool'] },\n`;
}
res += "];\n";
fs.writeFileSync("tmp_radios.txt", res);
console.log("done");
