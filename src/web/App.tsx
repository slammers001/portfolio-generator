import { useMemo, useState } from 'react';
import Preview, { type Device } from './Preview';
import { FIELDS, type FieldSpec } from './fields';
import { readAsset } from './assets';
import { downloadProject } from './download';
import {
  COLOR_SCHEMES,
  DEFAULT_ANSWERS,
  INTERESTS,
  STYLES,
  parseList,
  projectFolderName,
  validateAnswers,
  type AnswerErrors,
  type PortfolioAnswers
} from '../shared/types';

type FieldKey = keyof PortfolioAnswers;
type TextKey = 'name' | 'title' | 'github' | 'linkedin' | 'email';

const TEXT_KEYS = new Set<TextKey>(['name', 'title', 'github', 'linkedin', 'email']);

function isTextKey(key: FieldKey): key is TextKey {
  return TEXT_KEYS.has(key as TextKey);
}

export default function App() {
  const [answers, setAnswers] = useState<PortfolioAnswers>(DEFAULT_ANSWERS);
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});
  const [device, setDevice] = useState<Device>('desktop');
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const errors = useMemo<AnswerErrors>(() => validateAnswers(answers), [answers]);
  const ready = Object.keys(errors).length === 0;
  const folder = projectFolderName(answers);

  function setField<K extends FieldKey>(key: K, value: PortfolioAnswers[K]): void {
    setAnswers((previous) => ({ ...previous, [key]: value }));
  }

  function revealErrors(): void {
    setTouched(
      Object.keys(errors).reduce<Partial<Record<FieldKey, boolean>>>(
        (accumulator, key) => ({ ...accumulator, [key]: true }),
        {}
      )
    );
  }

  function renderField(spec: FieldSpec) {
    const error = touched[spec.key] ? errors[spec.key] : undefined;

    if (spec.kind === 'tags') {
      const current = answers[spec.key] as string[];
      return (
        <div className="studio-field">
          <label className="studio-label" htmlFor={spec.key}>
            {spec.label}
          </label>
          <input
            id={spec.key}
            className={`studio-input ${error ? 'studio-input--error' : ''}`}
            value={current.join(', ')}
            placeholder={spec.placeholder}
            onChange={(event) => setField(spec.key, parseList(event.target.value) as never)}
            onBlur={() => setTouched((previous) => ({ ...previous, [spec.key]: true }))}
          />
          <FieldFooter spec={spec} error={error} />
        </div>
      );
    }

    if (isTextKey(spec.key)) {
      return (
        <div className="studio-field">
          <label className="studio-label" htmlFor={spec.key}>
            {spec.label}
          </label>
          <input
            id={spec.key}
            className={`studio-input ${error ? 'studio-input--error' : ''}`}
            value={answers[spec.key]}
            placeholder={spec.placeholder}
            onChange={(event) => setField(spec.key, event.target.value as never)}
            onBlur={() => setTouched((previous) => ({ ...previous, [spec.key]: true }))}
          />
          <FieldFooter spec={spec} error={error} />
        </div>
      );
    }

    if (spec.kind === 'interests') {
      const selected = answers.interests;
      return (
        <fieldset className="studio-field">
          <legend className="studio-label">{spec.label}</legend>
          <div className="studio-chips">
            {INTERESTS.map((interest) => {
              const active = selected.includes(interest);
              return (
                <button
                  key={interest}
                  type="button"
                  className={`studio-chip ${active ? 'studio-chip--on' : ''}`}
                  aria-pressed={active}
                  onClick={() =>
                    setField(
                      'interests',
                      active
                        ? selected.filter((item) => item !== interest)
                        : [...selected, interest]
                    )
                  }
                >
                  {interest}
                </button>
              );
            })}
          </div>
          <FieldFooter spec={spec} error={error} />
        </fieldset>
      );
    }

    const options = spec.kind === 'style' ? STYLES : COLOR_SCHEMES;
    const value = answers[spec.key];

    return (
      <fieldset className="studio-field">
        <legend className="studio-label">{spec.label}</legend>
        <div className="studio-segmented">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              className={`studio-segment ${value === option ? 'studio-segment--on' : ''}`}
              aria-pressed={value === option}
              onClick={() => setField(spec.key, option as never)}
            >
              {option}
            </button>
          ))}
        </div>
        <FieldFooter spec={spec} error={error} />
      </fieldset>
    );
  }

  async function handleDownload(): Promise<void> {
    if (!ready || busy) {
      revealErrors();
      return;
    }

    setBusy(true);
    setStatus(null);

    try {
      const fileName = await downloadProject(answers, readAsset);
      setStatus(
        `${fileName} downloaded. Unzip it, then run: npm install, npm run dev. Output goes to dist/.`
      );
    } catch (error) {
      setStatus(error instanceof Error ? `Failed: ${error.message}` : 'Failed to build the zip.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="studio">
      <header className="studio-header">
        <div>
          <h1 className="studio-title">Portfolio Generator</h1>
          <p className="studio-subtitle">
            Fill this in, watch it render, download a Vite + React project you own.
          </p>
        </div>
        <a
          className="studio-ghost-link"
          href="https://github.com/slammers001/personal-website-generator"
          target="_blank"
          rel="noopener noreferrer"
        >
          Star on GitHub
        </a>
      </header>

      <div className="studio-body">
        <section className="studio-panel studio-panel--form">
          <form
            className="studio-form"
            onSubmit={(event) => {
              event.preventDefault();
              void handleDownload();
            }}
          >
            {FIELDS.map(renderField)}

            <div className="studio-actions">
              <button className="studio-primary" type="submit" disabled={busy}>
                {busy ? 'Building zip…' : 'Download project (.zip)'}
              </button>
              <button
                className="studio-ghost"
                type="button"
                onClick={() => {
                  setAnswers(DEFAULT_ANSWERS);
                  setTouched({});
                  setStatus(null);
                }}
              >
                Reset
              </button>
            </div>

            <p className="studio-status" role="status">
              {status ??
                (ready
                  ? `Ready: ${folder}/ with ${STYLES.length * COLOR_SCHEMES.length} style combinations.`
                  : 'Fill in the highlighted fields to download.')}
            </p>
          </form>
        </section>

        <section className="studio-panel studio-panel--preview">
          <div className="studio-toolbar">
            <div className="studio-segmented studio-segmented--sm">
              {(['desktop', 'mobile'] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`studio-segment ${device === option ? 'studio-segment--on' : ''}`}
                  aria-pressed={device === option}
                  onClick={() => setDevice(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            <span className="studio-hint">Live preview</span>
          </div>
          <Preview answers={answers} device={device} />
        </section>
      </div>
    </div>
  );
}

function FieldFooter({ spec, error }: { spec: FieldSpec; error?: string }) {
  return (
    <p className={`studio-help ${error ? 'studio-help--error' : ''}`}>
      {error ?? spec.help ?? (spec.optional ? 'Optional' : '')}
    </p>
  );
}