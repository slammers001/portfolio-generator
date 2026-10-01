# Grace Hopper

Compiler Engineer — generated with the [Personal Website Generator](https://github.com/slammers001).

Theme: **Professional** / **Monochrome**

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

## Production build

```bash
npm run build    # type-checks, then emits static files to dist/
npm run preview  # serves dist/ locally
```

`dist/` is a static site — host it anywhere: Vercel, Netlify, Cloudflare Pages,
GitHub Pages or any web server.

- **Vercel** — framework preset *Vite*, output directory *dist*
- **GitHub Pages** — add `base: './'` to `vite.config.ts` and publish `dist/`

## Editing

| File | What it does |
| --- | --- |
| `src/App.tsx` | The whole portfolio layout and copy |
| `src/answers.ts` | Your name, skills, languages, links |
| `src/theme.css` | Colours, fonts and radii for this theme |
| `src/portfolio.css` | Shared design system (all layouts) |

Re-run the generator to start over, or edit these files directly — they are yours now.

Folders like `grace-hopper-portfolio/` come from the generator; delete this one when you fork.
