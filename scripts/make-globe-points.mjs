// Builds src/data/globe-points.json: dots on land for the 3D globe.
// Run once with: node scripts/make-globe-points.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { feature } from "topojson-client";
import { geoContains } from "d3-geo";

const require = createRequire(import.meta.url);
const topo = JSON.parse(readFileSync(require.resolve("world-atlas/land-110m.json"), "utf8"));
const land = feature(topo, topo.objects.land);

const N = 9000; // points on a Fibonacci sphere
const golden = Math.PI * (3 - Math.sqrt(5));
const out = [];
for (let i = 0; i < N; i++) {
  const y = 1 - (i / (N - 1)) * 2;
  const theta = golden * i;
  const lat = (Math.asin(y) * 180) / Math.PI;
  const lon = ((((theta * 180) / Math.PI) % 360) + 540) % 360 - 180;
  if (lat < -60) continue; // skip Antarctica
  if (geoContains(land, [lon, lat])) out.push([+lat.toFixed(2), +lon.toFixed(2)]);
}
writeFileSync("src/data/globe-points.json", JSON.stringify(out));
console.log(`wrote ${out.length} points`);
