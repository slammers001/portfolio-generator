import type { CSSProperties } from 'react';
import { themeVars } from '../../shared/themes';
import {
  COLOR_SCHEMES,
  STYLES,
  type ColorScheme,
  type PortfolioAnswers,
  type Style
} from '../../shared/types';
import { SCHEME_BLURB, STYLE_BLURB } from '../fields';

interface ThemePickerProps {
  answers: PortfolioAnswers;
  onStyleChange: (style: Style) => void;
  onSchemeChange: (scheme: ColorScheme) => void;
}

export default function ThemePicker({
  answers,
  onStyleChange,
  onSchemeChange
}: ThemePickerProps) {
  return (
    <>
      <div className="studio-field">
        <div className="studio-field__head">
          <span className="studio-label">Style</span>
          <span className="studio-counter">{STYLES.length}</span>
        </div>

        <div className="studio-styles" role="group" aria-label="Style">
          {STYLES.map((style) => {
            const active = answers.style === style;

            return (
              <button
                key={style}
                type="button"
                className={`studio-style ${active ? 'studio-style--on' : ''}`}
                aria-pressed={active}
                onClick={() => onStyleChange(style)}
              >
                <span
                  className="studio-style__preview"
                  style={themeVars({ ...answers, style }) as CSSProperties}
                >
                  <span className="studio-style__bar" />
                  <span className="studio-style__type">Aa</span>
                  <span className="studio-style__card" />
                </span>
                <span className="studio-style__name">{style}</span>
                <span className="studio-style__blurb">{STYLE_BLURB[style]}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="studio-field">
        <div className="studio-field__head">
          <span className="studio-label">Colour scheme</span>
          <span className="studio-counter">{COLOR_SCHEMES.length}</span>
        </div>

        <div className="studio-schemes" role="group" aria-label="Colour scheme">
          {COLOR_SCHEMES.map((scheme) => {
            const active = answers.colorScheme === scheme;

            return (
              <button
                key={scheme}
                type="button"
                className={`studio-scheme ${active ? 'studio-scheme--on' : ''}`}
                aria-pressed={active}
                onClick={() => onSchemeChange(scheme)}
              >
                <span
                  className="studio-scheme__chip"
                  style={themeVars({ ...answers, colorScheme: scheme }) as CSSProperties}
                >
                  <span className="studio-scheme__dot" />
                </span>
                <span className="studio-scheme__name">{scheme}</span>
              </button>
            );
          })}
        </div>
        <p className="studio-help">
          {STYLES.length * COLOR_SCHEMES.length} combinations · {SCHEME_BLURB[answers.colorScheme]}
        </p>
      </div>
    </>
  );
}