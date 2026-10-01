# 🚀 Personal Website Generator

Generate a personal portfolio site in **your browser** or **your terminal**, then download a
Vite + React project you actually own — no lock-in, no black box.

Two front ends, one engine:

| | What it does |
| --- | --- |
| **Web app** | Fill in the form, watch the site render live, download it as a `.zip` |
| **CLI** | Same questions in your terminal, writes the project into a new folder |

Both read the same questions and the same templates, so the browser and the terminal can never
drift apart.

## 🌟 Features

- ⚡ **Instant preview** — every keystroke re-renders the real portfolio component
- 🎨 **12 themes** — 4 styles × 3 colour schemes
- 📦 **Real project, not a screenshot** — Vite, React 18, TypeScript, `npm run dev` to start
- 📱 **Responsive** — the preview has a desktop/mobile toggle
- ♿ **Accessible** — labels, focus states, `prefers-reduced-motion`, `prefers-contrast`

## 🚀 Web app

```bash
npm install
npm run dev
```

Then open http://localhost:5173. Fill in the form, switch styles, hit **Download project (.zip)**.

To check the production build:

```bash
npm run build     # type-checks, then emits static files to dist/
npm run preview   # serves dist/ locally
```

### Deploying the web app

`vercel.json` is committed, so Vercel picks it up automatically:

```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

Any other host (Netlify, Cloudflare Pages, GitHub Pages) works too — `dist/` is plain static
files.

## 🖥️ CLI

```bash
npm install
npm run generate
```

Answer ten questions and a folder like `grace-hopper-portfolio/` appears next to you:

```bash
cd grace-hopper-portfolio
npm install
npm run dev
```

Generating several portfolios? Fork the repo — each run writes its own folder, so they stack up
side by side.

## 🎨 The 12 combinations

| Style | Personality | Colour schemes |
| --- | --- | --- |
| Minimalist | System sans, 600 headings, 4–8px radii, slate accent | Dark · Light · Monochrome |
| Modern | Inter, 700 headings, 8–16px radii, violet accent | Dark · Light · Monochrome |
| Creative | Heavy 800 headings, 14–28px radii, magenta accent | Dark · Light · Monochrome |
| Professional | Serif display face, 2–6px radii, navy accent | Dark · Light · Monochrome |

Every combination is built from solid fills, hairline rules and type — no gradients, no glass,
no glows. The only thing that changes between them is the palette, the radii and the weights.

## 🗂️ How it fits together

```
src/
  shared/                ← single source of truth, used by both front ends
    PortfolioView.tsx      the portfolio component + all copy
    portfolio.css          design system: layout, motion, components
    themes.ts              4 styles × 3 schemes → CSS custom properties
    generateProject.ts     pure function: answers → { filePath: contents }
    types.ts               question options, defaults, validation
  web/                   ← browser UI (form, live preview, zip download)
  cli/                   ← terminal UI (prompts, writes to disk)
```

The trick is that `PortfolioView.tsx` and `portfolio.css` are *real files*, not strings inside a
generator. The browser imports them directly to render the preview; the CLI reads them from disk
and copies them into your project as `src/App.tsx` and `src/portfolio.css`. There is only one
copy of the design, so a change shows up in both places immediately.

`portfolio.css` deliberately contains no colours — every value comes from CSS custom properties
that `themes.ts` emits into a generated `theme.css`. Swapping themes never touches the markup.

## 📦 What you get

```
grace-hopper-portfolio/
  index.html
  package.json           scripts: dev / build / preview
  vite.config.ts
  tsconfig.json
  public/favicon.svg
  src/
    main.tsx             mounts <App answers={...} />
    App.tsx              ← your portfolio: markup and copy
    answers.ts           ← your name, skills, languages, links
    theme.css            ← generated: colours, fonts, radii
    portfolio.css        ← shared design system
    types.ts
```

`npm run build` emits static files to `dist/` — host them anywhere. On Vercel use framework
preset **Vite** with output directory **dist**.

## 📜 License

MIT © slammers001

Made with ❤️ by slammers001 — generate your own in minutes! ⏱️

If this helped you, please leave a ⭐.