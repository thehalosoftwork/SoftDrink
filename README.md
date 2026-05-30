# SoftDrinks – India's SoftDrink 3D Soda Site

A 3D animated marketing website for **SoftDrinks**, celebrating five iconic Indian soda brands:

- Thums Up
- Limca
- Maaza
- Campa Cola
- Appy Fizz

Built and maintained by **[HaloSoft](https://www.thehalosoft.com/)**.
Originally forked from the "Fizzi" 3D demo and fully rebranded with new can label textures, scene flavors, copy and colors so it looks and feels distinctly Indian.

## Credits

- **Developed by:** [HaloSoft](https://www.thehalosoft.com/)
- **Designed by:** [@gowtham2213](https://github.com/gowtham2213) & [@nikitha2366](https://github.com/nikitha2366)

## Features

- Interactive 3D animated soda cans (one per brand)
- Smooth GSAP scroll transitions between sections
- Each alternating text section now swaps to a different can
- Hindi/Hinglish marketing copy throughout
- Responsive design for desktop and mobile

## Tech Stack

- Next.js 14 (App Router)
- React Three Fiber + Drei (3D scenes)
- GSAP + ScrollTrigger (animations)
- Three.js (rendering)
- Tailwind CSS (styling)
- Prismic.io (headless CMS – content is fetched at build time from a `page` document with the slice zone)

## Getting started

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`. Slice Machine runs alongside Next on its own port for editing slices.

## Brand assets

The can label textures live in `public/labels/`:

- `thumsup.png` – Thums Up (dark navy + red thumb)
- `limca.png` – Limca (lime green + lemons)
- `maaza.png` – Maaza (mango orange)
- `campa.png` – Campa Cola (retro red)
- `appyfizz.png` – Appy Fizz (golden amber + apples)

The original `cherry.png` / `grape.png` / etc. are kept in the folder as reference but are no longer used by the app.

## Flavor keys

The flavor enum used by `SodaCan`, `FloatingCan` and the SkyDive Prismic field is now:

```
thumsUp | limca | maaza | campa | appyFizz
```

`SodaCan` falls back to `thumsUp` if it receives an unknown / null flavor (so old Prismic documents with legacy flavor values still render a real can).

## License

Released under the MIT License – see [`LICENSE`](./LICENSE).
Copyright © 2026 [HaloSoft](https://www.thehalosoft.com/). All rights reserved.
