// One-off script: captures a single screenshot of the homepage hero (after the
// preloader finishes) and copies it into every slice folder as the Slice
// Machine preview thumbnail. Not part of the app bundle.
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const SLICE_DIRS = [
  "src/slices/Hero",
  "src/slices/SkyDive",
  "src/slices/Carousel",
  "src/slices/AlternatingText",
  "src/slices/BigText",
];

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      "--no-sandbox",
      "--use-gl=angle",
      "--use-angle=swiftshader",
      "--enable-webgl",
      "--ignore-gpu-blocklist",
    ],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1.5 });

  await page.goto("http://localhost:3000", {
    waitUntil: "networkidle2",
    timeout: 120000,
  });

  // Wait until the hero section has finished fading in (the preloader sets it
  // from opacity 0 -> 1 only after the 3D scene is ready and the curtain wipes).
  try {
    await page.waitForFunction(
      () => {
        const hero = document.querySelector(".hero");
        if (!hero) return false;
        const op = parseFloat(getComputedStyle(hero).opacity || "0");
        return op > 0.9;
      },
      { timeout: 90000, polling: 500 },
    );
  } catch (e) {
    console.warn("Hero visibility wait timed out, continuing anyway:", e.message);
  }

  // Extra settle time for the curtain to slide fully away and cans to land.
  await new Promise((r) => setTimeout(r, 6000));

  const tmp = path.join("assets", "homepage-shot.png");
  fs.mkdirSync("assets", { recursive: true });
  await page.screenshot({ path: tmp });

  await browser.close();

  // Copy the single screenshot into every slice folder.
  for (const dir of SLICE_DIRS) {
    fs.copyFileSync(tmp, path.join(dir, "screenshot-default.png"));
    console.log("wrote", path.join(dir, "screenshot-default.png"));
  }
  console.log("done");
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
