"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_1 = __importDefault(require("chalk"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const QUESTIONS = [
    {
        type: 'input',
        name: 'name',
        message: 'What is your name?',
        validate: (input) => input.trim().length > 0 || 'Name is required'
    },
    {
        type: 'input',
        name: 'title',
        message: 'What is your professional title?',
        default: 'Software Developer'
    },
    {
        type: 'input',
        name: 'languages',
        message: 'What programming languages do you know? (comma-separated)',
        default: 'JavaScript, TypeScript, Python',
        filter: (input) => input.split(',').map(lang => lang.trim())
    },
    {
        type: 'input',
        name: 'skills',
        message: 'List your key skills (comma-separated):',
        default: 'Web Development, UI/UX, Problem Solving',
        filter: (input) => input.split(',').map(skill => skill.trim())
    },
    {
        type: 'checkbox',
        name: 'interests',
        message: 'What are your interests?',
        choices: ['Web Development', 'Mobile Development', 'AI/ML', 'Game Development', 'DevOps', 'System Design', 'Other']
    },
    {
        type: 'list',
        name: 'style',
        message: 'What style do you prefer for your website?',
        choices: ['Minimalist', 'Modern', 'Creative', 'Professional']
    },
    {
        type: 'list',
        name: 'colorScheme',
        message: 'What color scheme do you prefer?',
        choices: ['Dark', 'Light', 'Monochrome', 'Colorful']
    },
    {
        type: 'input',
        name: 'github',
        message: 'What is your GitHub username?',
        validate: (input) => input.trim().length > 0 || 'GitHub username is required'
    },
    {
        type: 'input',
        name: 'linkedin',
        message: 'What is your LinkedIn username?',
        validate: (input) => input.trim().length > 0 || 'LinkedIn username is required'
    }
];
async function generateWebsite(answers) {
    const websiteDir = path_1.default.join(process.cwd(), 'my-website');
    await fs_extra_1.default.ensureDir(websiteDir);
    // Create index.html
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${answers.name} - ${answers.title}</title>
      <link rel="stylesheet" href="styles.css">
    </head>
    <body>
      <nav>
        <a href="https://github.com/${answers.github}" target="_blank">GitHub</a>
        <a href="https://linkedin.com/in/${answers.linkedin}" target="_blank">LinkedIn</a>
      </nav>
      <main>
        <section class="hero">
          <h1>${answers.name}</h1>
          <h2>${answers.title}</h2>
          <div class="languages">
            <h3>Programming Languages</h3>
            <ul>${answers.languages.map(lang => `<li>${lang}</li>`).join('')}</ul>
          </div>
          <div class="skills">
            <h3>Skills</h3>
            <ul>${answers.skills.map(skill => `<li>${skill}</li>`).join('')}</ul>
          </div>
          <div class="interests">
            <h3>Interests</h3>
            <ul>${answers.interests.map(int => `<li>${int}</li>`).join('')}</ul>
          </div>
        </section>
      </main>
    </body>
    </html>
  `;
    // Create styles.css
    const cssContent = `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      ${answers.colorScheme === 'Dark' ? 'background-color: #1a1a1a; color: #ffffff;' : 'background-color: #ffffff; color: #333333;'}
    }

    nav {
      padding: 1rem;
      text-align: center;
    }

    nav a {
      margin: 0 1rem;
      text-decoration: none;
      color: ${answers.colorScheme === 'Dark' ? '#ffffff' : '#333333'};
    }

    main {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .hero {
      text-align: center;
      padding: 4rem 0;
    }

    h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    h2 {
      font-size: 1.5rem;
      color: ${answers.colorScheme === 'Dark' ? '#cccccc' : '#666666'};
    }

    .skills, .interests {
      margin: 2rem 0;
    }

    ul {
      list-style: none;
      padding-left: 1rem;
    }

    ul li {
      margin: 0.5rem 0;
      padding: 0.5rem;
      background-color: ${answers.colorScheme === 'Dark' ? '#333333' : '#f0f0f0'};
      border-radius: 4px;
    }
  `;
    // Write files
    await fs_extra_1.default.writeFile(path_1.default.join(websiteDir, 'index.html'), htmlContent);
    await fs_extra_1.default.writeFile(path_1.default.join(websiteDir, 'styles.css'), cssContent);
    console.log(chalk_1.default.green(`\nYour personal website has been generated at: ${websiteDir}`));
    console.log(chalk_1.default.yellow(`Open ${websiteDir}/index.html in your browser to view it!`));
}
async function main() {
    console.log(chalk_1.default.blue('Welcome to Personal Website Generator!'));
    console.log(chalk_1.default.cyan('Let me help you create a beautiful website!\n'));
    try {
        const answers = await inquirer_1.default.prompt(QUESTIONS);
        await generateWebsite(answers);
    }
    catch (error) {
        console.error(chalk_1.default.red('An error occurred:'), error);
    }
}
main();
