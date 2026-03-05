const fs = require("fs");

const files = fs
	.readdirSync("assets/radio")
	.filter(
		(f) =>
			f.endsWith(".png") ||
			f.endsWith(".jpg") ||
			f.endsWith(".jpeg") ||
			f.endsWith(".webp"),
	);

let imports = files
	.map((f, i) => `import r${i} from "./${f}";`)
	.join("\n");
let exportsLines = files
	.map((f, i) => `  "${f.replace(/\.[^/.]+$/, "")}": r${i},`)
	.join("\n");
let x_exports = `export const radioLogos = {\n${exportsLines}\n};\n`;

fs.writeFileSync(
	"assets/radio/index.ts",
	imports + "\n\n" + x_exports,
);
console.log("Done");
