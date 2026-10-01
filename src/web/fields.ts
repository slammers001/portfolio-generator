import type { IconName } from './icons';
import {
  COLOR_SCHEMES,
  DEFAULT_ANSWERS,
  STYLES,
  type PortfolioAnswers
} from '../shared/types';

export type FieldKind = 'text' | 'tags' | 'interests' | 'appearance';

export interface FieldSpec {
  key: keyof PortfolioAnswers;
  label: string;
  kind: FieldKind;
  icon?: IconName;
  placeholder?: string;
  help?: string;
  optional?: boolean;
}

export type GroupId = 'identity' | 'expertise' | 'appearance' | 'links';

export interface FieldGroup {
  id: GroupId;
  title: string;
  hint: string;
  icon: IconName;
  fields: FieldSpec[];
}

export const GROUPS: FieldGroup[] = [
  {
    id: 'identity',
    title: 'Identity',
    hint: 'How you introduce yourself',
    icon: 'user',
    fields: [
      {
        key: 'name',
        label: 'Full name',
        kind: 'text',
        icon: 'user',
        placeholder: 'Ada Lovelace'
      },
      {
        key: 'title',
        label: 'Professional title',
        kind: 'text',
        icon: 'briefcase',
        placeholder: 'Software Developer'
      }
    ]
  },
  {
    id: 'expertise',
    title: 'Expertise',
    hint: 'What you work with and love',
    icon: 'code',
    fields: [
      {
        key: 'languages',
        label: 'Programming languages',
        kind: 'tags',
        icon: 'code',
        placeholder: 'TypeScript',
        help: 'Press Enter or comma to add'
      },
      {
        key: 'skills',
        label: 'Key skills',
        kind: 'tags',
        icon: 'spark',
        placeholder: 'System design',
        help: 'Press Enter or comma to add'
      },
      { key: 'interests', label: 'Interests', kind: 'interests' }
    ]
  },
  {
    id: 'appearance',
    title: 'Appearance',
    hint: `${STYLES.length} styles × ${COLOR_SCHEMES.length} colour schemes`,
    icon: 'palette',
    fields: [
      { key: 'style', label: 'Style', kind: 'appearance' },
      { key: 'colorScheme', label: 'Colour scheme', kind: 'appearance' }
    ]
  },
  {
    id: 'links',
    title: 'Links',
    hint: 'Shown in the hero and footer',
    icon: 'link',
    fields: [
      {
        key: 'github',
        label: 'GitHub username',
        kind: 'text',
        icon: 'github',
        placeholder: DEFAULT_ANSWERS.github
      },
      {
        key: 'linkedin',
        label: 'LinkedIn username',
        kind: 'text',
        icon: 'link',
        placeholder: 'ada-lovelace',
        optional: true,
        help: 'Optional — hides the button'
      },
      {
        key: 'email',
        label: 'Email',
        kind: 'text',
        icon: 'mail',
        placeholder: 'ada@example.com',
        optional: true,
        help: 'Optional — hides the button'
      }
    ]
  }
];

export const ALL_FIELDS: FieldSpec[] = GROUPS.flatMap((group) => group.fields);

export const STYLE_BLURB: Record<(typeof STYLES)[number], string> = {
  Minimalist: 'Neutral greys, tight corners',
  Modern: 'Soft radii, violet accent',
  Creative: 'Bold display type, warm accent',
  Professional: 'Serif headings, navy accent'
};

export const SCHEME_BLURB: Record<(typeof COLOR_SCHEMES)[number], string> = {
  Dark: 'Ink on slate',
  Light: 'Paper white',
  Monochrome: 'Greyscale'
};