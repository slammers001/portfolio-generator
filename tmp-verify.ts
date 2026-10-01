import fs from 'node:fs';
import path from 'node:path';
import { buildProjectFiles } from './src/shared/generateProject';
import { DEFAULT_ANSWERS, type PortfolioAnswers } from './src/shared/types';

const answers: PortfolioAnswers = {
  ...DEFAULT_ANSWERS,
  name: 'Grace Hopper',
  title: 'Compiler Engineer',
  languages: ['COBOL', 'TypeScript'],
  skills: ['Compilers', 'Debugging', 'Systems Design'],
  interests: ['DevOps', 'System Design'],
  style: 'Professional',
  colorScheme: 'Monochrome',
  github: 'gracehopper',
  linkedin: 'grace-hopper',
  email: 'grace@example.com'
};

const target = path.join(process.cwd(), 'tmp-verify-portfolio');

const files = buildProjectFiles(answers, (name) =>
  fs.readFileSync(path.join(process.cwd(), 'src', 'shared', name), 'utf8')
);

for (const [relativePath, contents] of Object.entries(files)) {
  const absolute = path.join(target, relativePath);
  fs.mkdirSync(path.dirname(absolute), { recursive: true });
  fs.writeFileSync(absolute, contents, 'utf8');
}

console.log('wrote', Object.keys(files).length, 'files to', target);