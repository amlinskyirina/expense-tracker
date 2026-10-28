const fs = require("node:fs");
const path = require("node:path");

const lock = JSON.parse(
  fs.readFileSync("package-lock.json", "utf8")
);

const output = [
  "THIRD-PARTY LICENSES",
  "Includes installed dependencies and development dependencies.",
  "",
];

const missing = [];
let count = 0;

for (const [folder, metadata] of Object.entries(lock.packages)) {
  if (!folder.includes("node_modules/")) continue;
  if (!fs.existsSync(folder)) continue;

  const packageFile = path.join(folder, "package.json");
  if (!fs.existsSync(packageFile)) continue;

  const info = JSON.parse(fs.readFileSync(packageFile, "utf8"));

  const files = fs.readdirSync(folder).filter((name) => {
    return (
      /^(licen[cs]e|copying|notice)([._-].*)?$/i.test(name) &&
      fs.statSync(path.join(folder, name)).isFile()
    );
  });

  output.push(
    "=".repeat(70),
    `${info.name}@${info.version}`,
    `Location: ${folder}`,
    `Declared license: ${JSON.stringify(
      info.license ?? metadata.license ?? "UNKNOWN"
    )}`,
    ""
  );

  if (files.length === 0) {
  const filename = info.name.replace(/[@/]/g, "_") + ".txt";
  const supplement = path.join("license-supplements", filename);

  if (fs.existsSync(supplement)) {
    output.push(
      "--- Supplementary license information ---",
      fs.readFileSync(supplement, "utf8"),
      ""
    );
  } else {
    missing.push(`${info.name}@${info.version}`);
    output.push("REVIEW REQUIRED: No license file found.", "");
  }
}

  for (const file of files.sort()) {
    output.push(
      `--- ${file} ---`,
      fs.readFileSync(path.join(folder, file), "utf8"),
      ""
    );
  }

  count++;
}

fs.writeFileSync("ALL_LICENSES", output.join("\n"), "utf8");

console.log(`Created ALL_LICENSES for ${count} installed packages.`);
console.log(`Packages requiring review: ${missing.length}`);
for (const name of missing) console.log(name);