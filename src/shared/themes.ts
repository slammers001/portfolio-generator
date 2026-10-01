import type { ColorScheme, PortfolioAnswers, Style } from './types';

const SANS =
  "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
const SERIF = "Georgia, 'Iowan Old Style', 'Times New Roman', serif";

interface SchemeTokens {
  background: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  blurAmount: string;
  shadowLg: string;
  shadowXl: string;
}

interface StyleTokens {
  fontDisplay: string;
  fontBody: string;
  headingWeight: number;
  trackingDisplay: string;
  radiusSm: string;
  radiusMd: string;
  radiusLg: string;
  accent: [string, string];
}

const SCHEMES: Record<ColorScheme, SchemeTokens> = {
  Dark: {
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    surface: 'rgba(30, 41, 59, 0.8)',
    textPrimary: '#f8fafc',
    textSecondary: '#cbd5e1',
    textMuted: '#94a3b8',
    border: 'rgba(148, 163, 184, 0.1)',
    blurAmount: '20px',
    shadowLg: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.15)',
    shadowXl: '0 20px 25px -5px rgba(0, 0, 0, 0.35), 0 10px 10px -5px rgba(0, 0, 0, 0.2)'
  },
  Light: {
    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
    surface: 'rgba(255, 255, 255, 0.9)',
    textPrimary: '#0f172a',
    textSecondary: '#334155',
    textMuted: '#64748b',
    border: 'rgba(148, 163, 184, 0.2)',
    blurAmount: '12px',
    shadowLg: '0 10px 15px -3px rgba(15, 23, 42, 0.1), 0 4px 6px -2px rgba(15, 23, 42, 0.06)',
    shadowXl: '0 20px 25px -5px rgba(15, 23, 42, 0.12), 0 10px 10px -5px rgba(15, 23, 42, 0.06)'
  },
  Monochrome: {
    background: 'linear-gradient(135deg, #1b1b1b 0%, #2a2a2a 100%)',
    surface: 'rgba(38, 38, 38, 0.85)',
    textPrimary: '#f5f5f5',
    textSecondary: '#c4c4c4',
    textMuted: '#9a9a9a',
    border: 'rgba(255, 255, 255, 0.08)',
    blurAmount: '0px',
    shadowLg: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
    shadowXl: '0 20px 25px -5px rgba(0, 0, 0, 0.45), 0 10px 10px -5px rgba(0, 0, 0, 0.25)'
  }
};

const STYLES: Record<Style, StyleTokens> = {
  Minimalist: {
    fontDisplay: SANS,
    fontBody: SANS,
    headingWeight: 700,
    trackingDisplay: '-0.02em',
    radiusSm: '6px',
    radiusMd: '10px',
    radiusLg: '14px',
    accent: ['#64748b', '#475569']
  },
  Modern: {
    fontDisplay: SANS,
    fontBody: SANS,
    headingWeight: 800,
    trackingDisplay: '-0.03em',
    radiusSm: '12px',
    radiusMd: '16px',
    radiusLg: '24px',
    accent: ['#8b5cf6', '#a855f7']
  },
  Creative: {
    fontDisplay: SANS,
    fontBody: SANS,
    headingWeight: 900,
    trackingDisplay: '-0.045em',
    radiusSm: '18px',
    radiusMd: '24px',
    radiusLg: '32px',
    accent: ['#f472b6', '#fb923c']
  },
  Professional: {
    fontDisplay: SERIF,
    fontBody: SANS,
    headingWeight: 700,
    trackingDisplay: '-0.01em',
    radiusSm: '4px',
    radiusMd: '8px',
    radiusLg: '12px',
    accent: ['#1e3a8a', '#334155']
  }
};

const MONOCHROME_ACCENT: [string, string] = ['#d4d4d4', '#a3a3a3'];

export const FONT_LINKS = [
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap'
];

/** Every custom property consumed by portfolio.css, resolved for one user. */
export function themeVars(answers: PortfolioAnswers): Record<string, string> {
  const scheme = SCHEMES[answers.colorScheme];
  const style = STYLES[answers.style];
  const accent: [string, string] =
    answers.colorScheme === 'Monochrome' ? MONOCHROME_ACCENT : style.accent;

  return {
    '--accent': `linear-gradient(135deg, ${accent[0]} 0%, ${accent[1]} 100%)`,
    '--accent-hover': `linear-gradient(135deg, ${accent[1]} 0%, ${accent[0]} 100%)`,
    '--background': scheme.background,
    '--surface': scheme.surface,
    '--text-primary': scheme.textPrimary,
    '--text-secondary': scheme.textSecondary,
    '--text-muted': scheme.textMuted,
    '--border': scheme.border,
    '--blur-amount': scheme.blurAmount,
    '--shadow-lg': scheme.shadowLg,
    '--shadow-xl': scheme.shadowXl,
    '--radius-sm': style.radiusSm,
    '--radius-md': style.radiusMd,
    '--radius-lg': style.radiusLg,
    '--font-display': style.fontDisplay,
    '--font-body': style.fontBody,
    '--heading-weight': String(style.headingWeight),
    '--tracking-display': style.trackingDisplay,
    '--transition': 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '--transition-slow': 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
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
 * Regenerate with src/shared/themes.ts or edit by hand.
 */

:root {
${body}
}
`;
}