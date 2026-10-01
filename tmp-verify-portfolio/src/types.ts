export const STYLES = ['Minimalist', 'Modern', 'Creative', 'Professional'] as const;
export const COLOR_SCHEMES = ['Dark', 'Light', 'Monochrome'] as const;
export const INTERESTS = [
  'Web Development',
  'Mobile Development',
  'AI/ML',
  'Game Development',
  'DevOps',
  'System Design',
  'App Design'
] as const;

export type Style = (typeof STYLES)[number];
export type ColorScheme = (typeof COLOR_SCHEMES)[number];
export type Interest = (typeof INTERESTS)[number];

export interface PortfolioAnswers {
  name: string;
  title: string;
  languages: string[];
  skills: string[];
  interests: Interest[];
  style: Style;
  colorScheme: ColorScheme;
  github: string;
  linkedin?: string;
  email: string;
}

export const DEFAULT_ANSWERS: PortfolioAnswers = {
  name: 'Ada Lovelace',
  title: 'Software Developer',
  languages: ['JavaScript', 'TypeScript', 'Python'],
  skills: ['Web Development', 'UI/UX', 'Problem Solving'],
  interests: ['Web Development', 'AI/ML'],
  style: 'Modern',
  colorScheme: 'Dark',
  github: 'octocat',
  linkedin: '',
  email: 'ada@example.com'
};

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function projectFolderName(answers: PortfolioAnswers): string {
  return `${slugify(answers.name) || 'my'}-portfolio`;
}

export function parseList(input: string | string[]): string[] {
  const parts = Array.isArray(input) ? input : input.split(',');
  return parts.map((part) => part.trim()).filter(Boolean);
}

export type AnswerErrors = Partial<Record<keyof PortfolioAnswers, string>>;

export function validateAnswers(answers: PortfolioAnswers): AnswerErrors {
  const errors: AnswerErrors = {};

  if (!answers.name.trim()) errors.name = 'Name is required';
  if (!answers.title.trim()) errors.title = 'Title is required';
  if (!answers.languages.length) errors.languages = 'Add at least one language';
  if (!answers.skills.length) errors.skills = 'Add at least one skill';
  if (!answers.github.trim()) errors.github = 'GitHub username is required';
  if (answers.email.trim() && !EMAIL_PATTERN.test(answers.email.trim())) {
    errors.email = 'Enter a valid email address';
  }

  return errors;
}

export function isComplete(answers: PortfolioAnswers): boolean {
  return Object.keys(validateAnswers(answers)).length === 0;
}

const INTEREST_ICONS: Record<Interest, string> = {
  'Web Development': '🌐',
  'Mobile Development': '📱',
  'AI/ML': '🤖',
  'Game Development': '🎮',
  DevOps: '⚙️',
  'System Design': '🏗️',
  'App Design': '🎨'
};

const INTEREST_DESCRIPTIONS: Record<Interest, string> = {
  'Web Development': 'Creating responsive and interactive web experiences',
  'Mobile Development': 'Building native and cross-platform mobile apps',
  'AI/ML': 'Exploring artificial intelligence and machine learning',
  'Game Development': 'Crafting engaging interactive entertainment',
  DevOps: 'Streamlining development and deployment processes',
  'System Design': 'Architecting scalable and robust systems',
  'App Design': 'Passionate about innovative technologies and solutions'
};

export function interestIcon(interest: Interest): string {
  return INTEREST_ICONS[interest];
}

export function interestDescription(interest: Interest): string {
  return INTEREST_DESCRIPTIONS[interest];
}

export function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return '★';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function joinNatural(items: string[]): string {
  if (items.length === 0) return 'new technologies and innovations';
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
}