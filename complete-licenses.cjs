const fs = require("node:fs");

async function main() {
  const folder = "license-supplements";
  fs.mkdirSync(folder, { recursive: true });

  const sources = {
    "@humanfs/types": [
      "https://raw.githubusercontent.com/humanwhocodes/humanfs/85069f193cbacc371c3beb649ce746f8c5a493be/packages/core/LICENSE",
    ],
    "@rolldown/binding-win32-x64-msvc": [
      "https://raw.githubusercontent.com/rolldown/rolldown/v1.2.15/LICENSE",
      "https://raw.githubusercontent.com/rolldown/rolldown/v1.2.15/THIRD-PARTY-LICENSE",
    ],
    imurmurhash: [
      "https://raw.githubusercontent.com/jensyt/imurmurhash-js/master/LICENSE",
    ],
    "natural-compare": [
      "https://raw.githubusercontent.com/litejs/natural-compare-lite/main/LICENSE",
    ],
    saxes: [
      "https://raw.githubusercontent.com/lddubeau/saxes/211fa0ebec9b628affc09219199639887174bfc3/LICENSE",
    ],
  };

  for (const [name, urls] of Object.entries(sources)) {
    const parts = [name, ""];

    // Preserve the installed package's attribution and license declaration.
    const readme = `node_modules/${name}/README.md`;
    if (fs.existsSync(readme)) {
      parts.push("Installed package README:", fs.readFileSync(readme, "utf8"));
    }

    for (const url of urls) {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`${response.status}: ${url}`);
      }
      parts.push(`License text source: ${url}`, await response.text());
    }

    const filename = name.replace(/[@/]/g, "_") + ".txt";
    fs.writeFileSync(`${folder}/${filename}`, parts.join("\n\n"), "utf8");
    console.log(`Saved: ${name}`);
  }

  const source = fs.readFileSync(
    "node_modules/esrecurse/esrecurse.js",
    "utf8"
  );
  const notice = source.match(/\/\*[\s\S]*?\*\//)?.[0];

  if (!notice || !notice.includes("Redistribution")) {
    throw new Error("esrecurse license notice not found");
  }

  fs.writeFileSync(
    `${folder}/esrecurse.txt`,
    `Source: node_modules/esrecurse/esrecurse.js\n\n${notice}`,
    "utf8"
  );

  console.log("Saved: esrecurse");
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});