import type { ColorScheme, PortfolioAnswers, Style } from './types';

const SANS =
  "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
/**
 * Newsreader is the editorial display face for every style. It ships as a variable
 * font, so weight and optical size come free and there is no second webfont to load.
 */
const SERIF = "'Newsreader', Georgia, 'Iowan Old Style', 'Times New Roman', serif";
const MONO = "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace";

/**
 * Every value here is a flat colour on purpose: the generated portfolio is built from
 * solid fills, hairline rules and type - never from gradients, glass or glows.
 */
interface SchemeTokens {
  /** Page background. */
  background: string;
  /** Panel fill, one step away from the page. */
  surface: string;
  /** Fill for chips and meta blocks. */
  surfaceMuted: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  /** Hairline colour for every rule and border in the layout. */
  border: string;
  /** Keeps native widgets (scrollbars, selection) in step with the palette. */
  colorScheme: 'dark' | 'light';
  /** Text placed on top of the solid accent. */
  accentContrast: string;
  /** Deliberately shallow elevation - borders do the structural work. */
  shadow: string;
}

interface StyleTokens {
  fontDisplay: string;
  fontBody: string;
  fontMono: string;
  headingWeight: number;
  trackingDisplay: string;
  radiusSm: string;
  radiusMd: string;
  radiusLg: string;
  /** Solid fill: button backgrounds, selection. Always paired with accentContrast. */
  accent: string;
  accentHover: string;
  /**
   * Hairlines, rules, hover text and monograms need a different value from the fill:
   * a fill dark enough to carry white text disappears as a 1px mark on a dark page.
   */
  accentMarkDark: string;
  accentMarkLight: string;
  /** Creative sets its display type in italic; the others keep it upright. */
  displayItalic: boolean;
}

const SCHEMES: Record<ColorScheme, SchemeTokens> = {
  Dark: {
    background: '#0a0d13',
    surface: '#10151e',
    surfaceMuted: '#161d29',
    textPrimary: '#f4f6fa',
    textSecondary: '#b7c1d0',
    textMuted: '#7a8698',
    border: '#1d2431',
    colorScheme: 'dark',
    accentContrast: '#ffffff',
    shadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
  },
  Light: {
    background: '#ffffff',
    surface: '#f8f9fb',
    surfaceMuted: '#f0f2f6',
    textPrimary: '#0c1220',
    textSecondary: '#3d4859',
    textMuted: '#616c7d',
    border: '#e2e6ed',
    colorScheme: 'light',
    accentContrast: '#ffffff',
    shadow: '0 1px 2px rgba(16, 24, 40, 0.06)'
  },
  Monochrome: {
    background: '#131313',
    surface: '#1c1c1c',
    surfaceMuted: '#242424',
    textPrimary: '#fafafa',
    textSecondary: '#c6c6c6',
    textMuted: '#8d8d8d',
    border: '#2b2b2b',
    colorScheme: 'dark',
    accentContrast: '#131313',
    shadow: '0 1px 2px rgba(0, 0, 0, 0.6)'
  }
};

const STYLES: Record<Style, StyleTokens> = {
  Minimalist: {
    fontDisplay: SERIF,
    fontBody: SANS,
    fontMono: MONO,
    headingWeight: 300,
    trackingDisplay: '-0.01em',
    radiusSm: '0px',
    radiusMd: '0px',
    radiusLg: '0px',
    accent: '#334155',
    accentHover: '#1e293b',
    accentMarkDark: '#cbd5e1',
    accentMarkLight: '#1e293b',
    displayItalic: false
  },
  Modern: {
    fontDisplay: SERIF,
    fontBody: SANS,
    fontMono: MONO,
    headingWeight: 500,
    trackingDisplay: '-0.025em',
    radiusSm: '2px',
    radiusMd: '4px',
    radiusLg: '6px',
    accent: '#6d28d9',
    accentHover: '#5b21b6',
    accentMarkDark: '#c4b5fd',
    accentMarkLight: '#5b21b6',
    displayItalic: false
  },
  Creative: {
    fontDisplay: SERIF,
    fontBody: SANS,
    fontMono: MONO,
    headingWeight: 600,
    trackingDisplay: '-0.035em',
    radiusSm: '4px',
    radiusMd: '8px',
    radiusLg: '12px',
    accent: '#be123c',
    accentHover: '#9f1239',
    accentMarkDark: '#fda4af',
    accentMarkLight: '#9f1239',
    displayItalic: true
  },
  Professional: {
    fontDisplay: SERIF,
    fontBody: SANS,
    fontMono: MONO,
    headingWeight: 400,
    trackingDisplay: '-0.005em',
    radiusSm: '0px',
    radiusMd: '2px',
    radiusLg: '2px',
    accent: '#1e3a8a',
    accentHover: '#172554',
    accentMarkDark: '#bfdbfe',
    accentMarkLight: '#1e40af',
    displayItalic: false
  }
};

const MONOCHROME_ACCENT = '#e5e5e5';

export const FONT_LINKS = [
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&family=Newsreader:ital,opsz,wght@0,6..72,200..700;1,6..72,200..600&display=swap'
];

/** Every custom property consumed by portfolio.css, resolved for one user. */
export function themeVars(answers: PortfolioAnswers): Record<string, string> {
  const scheme = SCHEMES[answers.colorScheme];
  const style = STYLES[answers.style];
  const accent = answers.colorScheme === 'Monochrome' ? MONOCHROME_ACCENT : style.accent;

  return {
    '--color-scheme': scheme.colorScheme,
    '--background': scheme.background,
    '--surface': scheme.surface,
    '--surface-muted': scheme.surfaceMuted,
    '--text-primary': scheme.textPrimary,
    '--text-secondary': scheme.textSecondary,
    '--text-muted': scheme.textMuted,
    '--border': scheme.border,
    '--accent': accent,
    '--accent-hover': answers.colorScheme === 'Monochrome' ? '#ffffff' : style.accentHover,
    '--accent-mark':
      answers.colorScheme === 'Monochrome'
        ? MONOCHROME_ACCENT
        : answers.colorScheme === 'Light'
          ? style.accentMarkLight
          : style.accentMarkDark,
    '--accent-contrast': scheme.accentContrast,
    '--shadow': scheme.shadow,
    '--radius-sm': style.radiusSm,
    '--radius-md': style.radiusMd,
    '--radius-lg': style.radiusLg,
    '--font-display': style.fontDisplay,
    '--font-body': style.fontBody,
    '--font-mono': style.fontMono,
    '--heading-weight': String(style.headingWeight),
    '--tracking-display': style.trackingDisplay,
    '--display-italic': style.displayItalic ? 'italic' : 'normal',
    '--transition': 'background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease',
    '--transition-slow':
      'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)'
  };
}

/** The same tokens as a stylesheet, for writing the generated project's theme.css. */
export function themeCss(answers: PortfolioAnswers): string {
  const vars = themeVars(answers);
  const body = Object.entries(vars)
    .map(([name, value]) => `  ${name}: ${value};`)
    .join('\n');

  return `/*
 * Generated theme - ${answers.style} / ${answers.colorScheme}
 * Flat colours only: no gradients, no alpha glass. Regenerate with src/shared/themes.ts.
 */

:root {
${body}
}
`;
}
