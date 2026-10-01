import { FONT_LINKS, themeCss } from './themes';
import { projectFolderName, type PortfolioAnswers } from './types';

/** Supplies the verbatim text of a file in src/shared. Node reads it, the web bundles it. */
export type AssetReader = (fileName: string) => string;

/** Files copied verbatim from src/shared into the generated project. */
export const SHARED_ASSET_TARGETS: Record<string, string> = {
  'PortfolioView.tsx': 'src/App.tsx',
  'portfolio.css': 'src/portfolio.css',
  'types.ts': 'src/types.ts',
  'random.ts': 'src/random.ts'
};

export const SHARED_ASSET_FILES = Object.keys(SHARED_ASSET_TARGETS);

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function generatedPackageJson(answers: PortfolioAnswers): string {
  return `${JSON.stringify(
    {
      name: projectFolderName(answers),
      version: '1.0.0',
      private: true,
      type: 'module',
      scripts: {
        dev: 'vite',
        build: 'tsc --noEmit && vite build',
        preview: 'vite preview'
      },
      dependencies: {
        react: '^18.3.1',
        'react-dom': '^18.3.1'
      },
      devDependencies: {
        '@types/react': '^18.3.3',
        '@types/react-dom': '^18.3.0',
        '@vitejs/plugin-react': '^4.3.1',
        typescript: '^5.5.4',
        vite: '^5.4.0'
      }
    },
    null,
    2
  )}\n`;
}

const VITE_CONFIG = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
});
`;

function tsconfig(): string {
  return `${JSON.stringify(
    {
      compilerOptions: {
        target: 'ES2020',
        useDefineForClassFields: true,
        lib: ['DOM', 'DOM.Iterable', 'ESNext'],
        module: 'ESNext',
        moduleResolution: 'bundler',
        moduleDetection: 'force',
        resolveJsonModule: true,
        isolatedModules: true,
        skipLibCheck: true,
        noEmit: true,
        jsx: 'react-jsx',
        strict: true,
        forceConsistentCasingInFileNames: true
      },
      include: ['src']
    },
    null,
    2
  )}\n`;
}

function indexHtml(answers: PortfolioAnswers): string {
  const title = escapeHtml(`${answers.name} | ${answers.title}`);
  const description = escapeHtml(`Personal portfolio of ${answers.name}, ${answers.title}.`);

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${description}" />
    <meta name="theme-color" content="#0f172a" />
    <title>${title}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
${FONT_LINKS.map((href) => `    <link href="${href}" rel="stylesheet" />`).join('\n')}
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;
}

const MAIN_TSX = `import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { answers } from './answers';
import './theme.css';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Missing #root element in index.html');
}

createRoot(container).render(
  <StrictMode>
    <App answers={answers} />
  </StrictMode>
);
`;

const VITE_ENV_D_TS = `/// <reference types="vite/client" />
`;

const GITIGNORE = `node_modules
dist
dist-ssr
*.local
.DS_Store
`;

const FAVICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#8b5cf6" />
      <stop offset="100%" stop-color="#a855f7" />
    </linearGradient>
  </defs>
  <rect width="100" height="100" rx="24" fill="url(#g)" />
  <text x="50" y="68" font-family="Segoe UI, sans-serif" font-size="52" font-weight="700"
    fill="#ffffff" text-anchor="middle">&lt;/&gt;</text>
</svg>
`;

function readme(answers: PortfolioAnswers): string {
  const folder = projectFolderName(answers);

  return `# ${answers.name}

${answers.title} — generated with the [Personal Website Generator](https://github.com/slammers001).

Theme: **${answers.style}** / **${answers.colorScheme}**

## Getting started

\`\`\`bash
npm install
npm run dev      # http://localhost:3000
\`\`\`

## Production build

\`\`\`bash
npm run build    # type-checks, then emits static files to dist/
npm run preview  # serves dist/ locally
\`\`\`

\`dist/\` is a static site — host it anywhere: Vercel, Netlify, Cloudflare Pages,
GitHub Pages or any web server.

- **Vercel** — framework preset *Vite*, output directory *dist*
- **GitHub Pages** — add \`base: './'\` to \`vite.config.ts\` and publish \`dist/\`

## Editing

| File | What it does |
| --- | --- |
| \`src/App.tsx\` | The whole portfolio layout and copy |
| \`src/answers.ts\` | Your name, skills, languages, links |
| \`src/theme.css\` | Colours, fonts and radii for this theme |
| \`src/portfolio.css\` | Shared design system (all layouts) |

Re-run the generator to start over, or edit these files directly — they are yours now.

Folders like \`${folder}/\` come from the generator; delete this one when you fork.
`;
}

function answersModule(answers: PortfolioAnswers): string {
  return `import type { PortfolioAnswers } from './types';

export const answers: PortfolioAnswers = ${JSON.stringify(answers, null, 2)};

export default answers;
`;
}

/**
 * Every file of the generated portfolio, keyed by POSIX-style relative path.
 * Pure: no filesystem, no network - the web app renders these into a zip.
 */
export function buildProjectFiles(
  answers: PortfolioAnswers,
  readAsset: AssetReader
): Record<string, string> {
  const files: Record<string, string> = {
    'package.json': generatedPackageJson(answers),
    'vite.config.ts': VITE_CONFIG,
    'tsconfig.json': tsconfig(),
    'index.html': indexHtml(answers),
    '.gitignore': GITIGNORE,
    'README.md': readme(answers),
    'public/favicon.svg': FAVICON_SVG,
    'src/main.tsx': MAIN_TSX,
    'src/theme.css': themeCss(answers),
    'src/answers.ts': answersModule(answers),
    'src/vite-env.d.ts': VITE_ENV_D_TS
  };

  for (const [source, target] of Object.entries(SHARED_ASSET_TARGETS)) {
    files[target] = readAsset(source);
  }

  return files;
}