import { readFileSync } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { buildProjectFiles } from '../shared/generateProject';
import {
  COLOR_SCHEMES,
  DEFAULT_ANSWERS,
  EMAIL_PATTERN,
  INTERESTS,
  STYLES,
  parseList,
  projectFolderName,
  validateAnswers,
  type PortfolioAnswers
} from '../shared/types';

const SHARED_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'shared');

const QUESTIONS = [
  {
    type: 'input',
    name: 'name',
    message: 'What is your name?',
    default: DEFAULT_ANSWERS.name,
    validate: (value: string) => value.trim().length > 0 || 'Name is required'
  },
  {
    type: 'input',
    name: 'title',
    message: 'What is your professional title?',
    default: DEFAULT_ANSWERS.title
  },
  {
    type: 'input',
    name: 'languages',
    message: 'Which programming languages? (comma-separated)',
    default: DEFAULT_ANSWERS.languages.join(', ')
  },
  {
    type: 'input',
    name: 'skills',
    message: 'What are your key skills? (comma-separated)',
    default: DEFAULT_ANSWERS.skills.join(', ')
  },
  {
    type: 'checkbox',
    name: 'interests',
    message: 'What are your interests?',
    choices: [...INTERESTS],
    default: DEFAULT_ANSWERS.interests
  },
  {
    type: 'list',
    name: 'style',
    message: 'Which style do you prefer?',
    choices: [...STYLES],
    default: DEFAULT_ANSWERS.style
  },
  {
    type: 'list',
    name: 'colorScheme',
    message: 'Which colour scheme do you prefer?',
    choices: [...COLOR_SCHEMES],
    default: DEFAULT_ANSWERS.colorScheme
  },
  {
    type: 'input',
    name: 'github',
    message: 'What is your GitHub username?',
    default: DEFAULT_ANSWERS.github,
    validate: (value: string) => value.trim().length > 0 || 'GitHub username is required'
  },
  {
    type: 'input',
    name: 'linkedin',
    message: 'What is your LinkedIn username? (press ENTER to skip)',
    default: ''
  },
  {
    type: 'input',
    name: 'email',
    message: 'What is your email address? (press ENTER to skip)',
    default: DEFAULT_ANSWERS.email,
    validate: (value: string) =>
      !value.trim() || EMAIL_PATTERN.test(value.trim()) || 'Enter a valid email address'
  }
];

const readSharedAsset = (fileName: string): string =>
  readFileSync(path.join(SHARED_DIR, fileName), 'utf8');

async function writeProject(answers: PortfolioAnswers, targetDir: string): Promise<number> {
  const files = Object.entries(buildProjectFiles(answers, readSharedAsset));

  for (const [relativePath, contents] of files) {
    const absolute = path.join(targetDir, relativePath);
    await fs.mkdir(path.dirname(absolute), { recursive: true });
    await fs.writeFile(absolute, contents, 'utf8');
  }

  return files.length;
}

async function directoryExists(target: string): Promise<boolean> {
  return fs
    .stat(target)
    .then((stats) => stats.isDirectory())
    .catch(() => false);
}

async function main(): Promise<void> {
  console.log(chalk.blue('\n🚀 Personal Website Generator\n'));
  console.log(chalk.dim('12 combinations: 4 styles x 3 colour schemes.\n'));

  const raw = (await inquirer.prompt(QUESTIONS)) as Record<string, string | string[]>;

  const answers: PortfolioAnswers = {
    name: String(raw.name).trim(),
    title: String(raw.title).trim(),
    languages: parseList(raw.languages as string),
    skills: parseList(raw.skills as string),
    interests: raw.interests as PortfolioAnswers['interests'],
    style: raw.style as PortfolioAnswers['style'],
    colorScheme: raw.colorScheme as PortfolioAnswers['colorScheme'],
    github: String(raw.github).trim(),
    linkedin: String(raw.linkedin ?? '').trim() || undefined,
    email: String(raw.email ?? '').trim()
  };

  const errors = validateAnswers(answers);
  if (Object.keys(errors).length > 0) {
    for (const [field, message] of Object.entries(errors)) {
      console.error(chalk.red(`  ${field}: ${message}`));
    }
    process.exitCode = 1;
    return;
  }

  const folderName = projectFolderName(answers);
  const targetDir = path.join(process.cwd(), folderName);

  if (await directoryExists(targetDir)) {
    const { overwrite } = await inquirer.prompt<{ overwrite: boolean }>([
      {
        type: 'confirm',
        name: 'overwrite',
        message: `${chalk.yellow(folderName)} already exists. Overwrite it?`,
        default: false
      }
    ]);

    if (!overwrite) {
      console.log(chalk.dim('\nNothing written.\n'));
      return;
    }
  }

  const count = await writeProject(answers, targetDir);

  console.log(
    chalk.green(`\n✅ Wrote ${count} files to ${path.relative(process.cwd(), targetDir)}/`)
  );
  console.log(chalk.cyan(`\n  cd ${folderName}`));
  console.log(chalk.cyan('  npm install'));
  console.log(chalk.cyan('  npm run dev\n'));
}

main().catch((error: unknown) => {
  console.error(
    chalk.red('Something went wrong:'),
    error instanceof Error ? error.message : error
  );
  process.exitCode = 1;
});