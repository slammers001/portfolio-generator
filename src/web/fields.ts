import {
  COLOR_SCHEMES,
  DEFAULT_ANSWERS,
  STYLES,
  type PortfolioAnswers
} from '../shared/types';

export type FieldKind = 'text' | 'tags' | 'interests' | 'style' | 'scheme';

export interface FieldSpec {
  key: keyof PortfolioAnswers;
  label: string;
  kind: FieldKind;
  placeholder?: string;
  help?: string;
  optional?: boolean;
}

export const FIELDS: FieldSpec[] = [
  { key: 'name', label: 'Name', kind: 'text', placeholder: 'Ada Lovelace' },
  { key: 'title', label: 'Professional title', kind: 'text', placeholder: 'Software Developer' },
  {
    key: 'languages',
    label: 'Languages',
    kind: 'tags',
    placeholder: 'TypeScript, Python, Go',
    help: 'Comma-separated'
  },
  {
    key: 'skills',
    label: 'Skills',
    kind: 'tags',
    placeholder: 'React, System Design, Mentoring',
    help: 'Comma-separated'
  },
  { key: 'interests', label: 'Interests', kind: 'interests' },
  { key: 'style', label: 'Style', kind: 'style', help: `${STYLES.length} options` },
  { key: 'colorScheme', label: 'Colour scheme', kind: 'scheme', help: `${COLOR_SCHEMES.length} options` },
  { key: 'github', label: 'GitHub username', kind: 'text', placeholder: DEFAULT_ANSWERS.github },
  {
    key: 'linkedin',
    label: 'LinkedIn username',
    kind: 'text',
    placeholder: 'ada-lovelace',
    optional: true,
    help: 'Leave empty to hide the button'
  },
  {
    key: 'email',
    label: 'Email',
    kind: 'text',
    placeholder: 'ada@example.com',
    optional: true,
    help: 'Leave empty to hide the button'
  }
];