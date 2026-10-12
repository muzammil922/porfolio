import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const distIndex = resolve("dist/index.html");
if (!existsSync(distIndex)) {
  console.error("ensure-geo: dist/index.html missing — run vite build first");
  process.exit(1);
}

const html = readFileSync(distIndex, "utf8");
const required = [
  "fullsatck.muzammil@gmail.com",
  "+92 311 3840943",
  "Muzammil - FullStack Developer",
  "geo-static",
  "ContactPoint",
];

const missing = required.filter((needle) => !html.includes(needle));
if (missing.length) {
  console.error("ensure-geo: dist/index.html missing GEO markers:", missing.join(", "));
  process.exit(1);
}

console.log("ensure-geo: dist/index.html contains static GEO snapshot + schema ✓");
