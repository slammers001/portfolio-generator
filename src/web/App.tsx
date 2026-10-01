import { useMemo, useState } from 'react';
import Preview, { type Device } from './Preview';
import Section from './components/Section';
import TagInput from './components/TagInput';
import TextField from './components/TextField';
import ThemePicker from './components/ThemePicker';
import InterestPicker from './components/InterestPicker';
import { GROUPS, type FieldSpec } from './fields';
import { Icon } from './icons';
import { readAsset } from './assets';
import { downloadProject } from './download';
import {
  COLOR_SCHEMES,
  DEFAULT_ANSWERS,
  STYLES,
  projectFolderName,
  validateAnswers,
  type AnswerErrors,
  type PortfolioAnswers
} from '../shared/types';

type FieldKey = keyof PortfolioAnswers;

const STEP_BY_GROUP = {
  identity: '01',
  expertise: '02',
  appearance: '03',
  links: '04'
} as const;

export default function App() {
  const [answers, setAnswers] = useState<PortfolioAnswers>(DEFAULT_ANSWERS);
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});
  const [device, setDevice] = useState<Device>('desktop');
  const [status, setStatus] = useState<{ tone: 'idle' | 'ok' | 'bad'; text: string }>({
    tone: 'idle',
    text: ''
  });
  const [busy, setBusy] = useState(false);

  const errors = useMemo<AnswerErrors>(() => validateAnswers(answers), [answers]);
  const ready = Object.keys(errors).length === 0;
  const folder = projectFolderName(answers);
  const combinations = STYLES.length * COLOR_SCHEMES.length;

  function setField<K extends FieldKey>(key: K, value: PortfolioAnswers[K]): void {
    setAnswers((previous) => ({ ...previous, [key]: value }));
  }

  function markTouched(key: FieldKey): void {
    setTouched((previous) => (previous[key] ? previous : { ...previous, [key]: true }));
  }

  function revealAllErrors(): void {
    setTouched(
      Object.keys(DEFAULT_ANSWERS).reduce<Partial<Record<FieldKey, boolean>>>(
        (accumulator, key) => ({ ...accumulator, [key]: true }),
        {}
      )
    );
  }

  function errorFor(spec: FieldSpec): string | undefined {
    return touched[spec.key] ? errors[spec.key] : undefined;
  }

  function renderField(spec: FieldSpec) {
    if (spec.kind === 'tags') {
      return (
        <TagInput
          key={spec.key}
          id={spec.key}
          label={spec.label}
          help={spec.help}
          error={errorFor(spec)}
          invalid={Boolean(errorFor(spec))}
          placeholder={spec.placeholder ?? ''}
          values={answers[spec.key] as string[]}
          onChange={(values) => setField(spec.key, values as never)}
          onCommit={() => markTouched(spec.key)}
        />
      );
    }

    return (
      <TextField
        key={spec.key}
        spec={spec}
        value={String(answers[spec.key] ?? '')}
        error={errorFor(spec)}
        onChange={(value) => setField(spec.key, value as never)}
        onBlur={() => markTouched(spec.key)}
      />
    );
  }

  function renderGroup(groupId: (typeof GROUPS)[number]['id']) {
    const group = GROUPS.find((candidate) => candidate.id === groupId);

    if (!group) return null;

    if (group.id === 'appearance') {
      return (
        <Section
          key={group.id}
          icon={group.icon}
          title={group.title}
          hint={group.hint}
          step={STEP_BY_GROUP[group.id]}
        >
          <ThemePicker
            answers={answers}
            onStyleChange={(style) => setField('style', style)}
            onSchemeChange={(colorScheme) => setField('colorScheme', colorScheme)}
          />
        </Section>
      );
    }

    return (
      <Section
        key={group.id}
        icon={group.icon}
        title={group.title}
        hint={group.hint}
        step={STEP_BY_GROUP[group.id]}
      >
        {group.id === 'expertise' ? (
          <>
            {group.fields.filter((field) => field.kind === 'tags').map(renderField)}
            <InterestPicker
              selected={answers.interests}
              onChange={(interests) => setField('interests', interests)}
            />
          </>
        ) : (
          group.fields.filter((field) => field.kind === 'text').map(renderField)
        )}
      </Section>
    );
  }

  async function handleDownload(): Promise<void> {
    if (busy) return;

    if (!ready) {
      revealAllErrors();
      setStatus({
        tone: 'bad',
        text: 'A few fields still need attention before we can build your project.'
      });
      return;
    }

    setBusy(true);
    setStatus({ tone: 'idle', text: '' });

    try {
      const fileName = await downloadProject(answers, readAsset);
      setStatus({
        tone: 'ok',
        text: `${fileName} is on its way. Unzip it, then run npm install and npm run dev.`
      });
    } catch (error) {
      setStatus({
        tone: 'bad',
        text: error instanceof Error ? `Could not build the zip: ${error.message}` : 'Could not build the zip.'
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="studio">
      <header className="studio-header">
        <div className="studio-brand">
          <span className="studio-brand__mark" aria-hidden="true">
            <Icon name="spark" size={17} />
          </span>
          <span className="studio-brand__text">
            <span className="studio-brand__name">Portfolio Generator</span>
            <span className="studio-brand__tagline">
              Design it here, own the code. Vite + React + TypeScript, zipped and ready.
            </span>
          </span>
        </div>

        <div className="studio-header__actions">
          <span className="studio-badge">{combinations} themes</span>
          <button
            type="button"
            className="studio-ghost"
            onClick={() => {
              setAnswers(DEFAULT_ANSWERS);
              setTouched({});
              setStatus({ tone: 'idle', text: '' });
            }}
          >
            <Icon name="reset" size={14} />
            Reset
          </button>
          <a
            className="studio-ghost studio-ghost--link"
            href="https://github.com/slammers001/personal-website-generator"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="github" size={14} />
            Star
          </a>
        </div>
      </header>

      <div className="studio-body">
        <section className="studio-panel studio-panel--form" aria-label="Portfolio options">
          <form
            className="studio-form"
            onSubmit={(event) => {
              event.preventDefault();
              void handleDownload();
            }}
          >
            {GROUPS.map((group) => renderGroup(group.id))}

            <div className="studio-submit">
              <button className="studio-primary" type="submit" disabled={busy}>
                <Icon name="download" size={16} />
                {busy ? 'Building your project…' : 'Download project'}
                <span className="studio-primary__ext">.zip</span>
              </button>

              <p className={`studio-note studio-note--${status.tone}`} role="status">
                {status.tone === 'ok' && <Icon name="check" size={14} />}
                {status.tone === 'bad' && <Icon name="alert" size={14} />}
                {status.text ||
                  (ready
                    ? `Ready to build ${folder}/ — 15 files, no account needed.`
                    : 'Name, title, one language, one skill and a GitHub username are required.')}
              </p>
            </div>
          </form>
        </section>

        <section className="studio-panel studio-panel--preview" aria-label="Live preview">
          <div className="studio-toolbar">
            <div className="studio-toolbar__left">
              <div className="studio-toggle" role="group" aria-label="Preview width">
                {(['desktop', 'mobile'] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`studio-toggle__btn ${device === option ? 'studio-toggle__btn--on' : ''}`}
                    aria-pressed={device === option}
                    onClick={() => setDevice(option)}
                  >
                    <Icon name={option === 'desktop' ? 'monitor' : 'mobile'} size={14} />
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <span className="studio-hint">
              {device === 'desktop' ? '1280px' : '400px'} · updates as you type
            </span>
          </div>

          <Preview answers={answers} device={device} folder={folder} />
        </section>
      </div>
    </div>
  );
}