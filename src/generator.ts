import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';

interface UserAnswers {
  name: string;
  title: string;
  languages: string[];
  skills: string[];
  interests: string[];
  style: string;
  colorScheme: string;
  github: string;
  email: string;
  linkedin?: string; // Made optional with ?
}

const QUESTIONS = [
  {
    type: 'input',
    name: 'name',
    message: 'What is your name?',
    validate: (input: string) => input.trim().length > 0 || 'Name is required'
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
    filter: (input: string) => input.split(',').map(lang => lang.trim())
  },
  {
    type: 'input',
    name: 'skills',
    message: 'List your key skills (comma-separated):',
    default: 'Web Development, UI/UX, Problem Solving',
    filter: (input: string) => input.split(',').map(skill => skill.trim())
  },
  {
    type: 'checkbox',
    name: 'interests',
    message: 'What are your interests?',
    choices: ['Web Development', 'Mobile Development', 'AI/ML', 'Game Development', 'DevOps', 'System Design', 'App Design']
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
    choices: ['Dark', 'Light', 'Monochrome']
  },
  {
    type: 'input',
    name: 'github',
    message: 'What is your GitHub username?',
    validate: (input: string) => input.trim().length > 0 || 'GitHub username is required'
  },
  {
    type: 'input',
    name: 'linkedin',
    message: 'What is your LinkedIn username? (Press ENTER to skip)',
    default: '',
    filter: (input: string) => input.trim()
  },
  {
    type: 'input',
    name: 'email',
    message: 'What is your email address?',
    validate: (input: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(input) ? true : 'Please enter a valid email address';
    },
    filter: (input: string) => input.trim()
  }
];

async function generateWebsite(answers: UserAnswers) {
  const websiteDir = path.join(process.cwd(), `${answers.name.toLowerCase().replace(/\s+/g, '-')}-portfolio`);
  const srcDir = path.join(websiteDir, 'src');
  const publicDir = path.join(websiteDir, 'public');

  try {
    // Create directories
    await fs.ensureDir(srcDir);
    await fs.ensureDir(publicDir);

    // Generate package.json
    const packageJson = {
      name: answers.name.toLowerCase().replace(/\s+/g, '-'),
      version: '1.0.0',
      private: true,
      scripts: {
        dev: 'vite',
        build: 'tsc && vite build',
        preview: 'vite preview',
        lint: 'eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0'
      },
      dependencies: {
        'react': '^18.2.0',
        'react-dom': '^18.2.0',
        '@types/react': '^18.2.56',
        '@types/react-dom': '^18.2.19',
        '@types/node': '^20.11.19',
        'typescript': '^5.0.0',
        'vite': '^5.0.0',
        '@vitejs/plugin-react': '^4.2.1'
      },
      devDependencies: {
        '@typescript-eslint/eslint-plugin': '^6.0.0',
        '@typescript-eslint/parser': '^6.0.0',
        'eslint': '^8.56.0',
        'eslint-plugin-react-hooks': '^4.6.0',
        'eslint-plugin-react-refresh': '^0.4.5',
        'vite-tsconfig-paths': '^4.3.0'
      }
    };

    // Generate tsconfig.json
    const tsconfig = {
      compilerOptions: {
        target: 'ES2020',
        useDefineForClassFields: true,
        lib: ['DOM', 'DOM.Iterable', 'ESNext'],
        allowJs: false,
        skipLibCheck: true,
        esModuleInterop: false,
        allowSyntheticDefaultImports: true,
        strict: true,
        forceConsistentCasingInFileNames: true,
        module: 'ESNext',
        moduleResolution: 'bundler',
        resolveJsonModule: true,
        isolatedModules: true,
        noEmit: true,
        jsx: 'react-jsx',
        baseUrl: 'src'
      },
      include: ['src'],
      references: [{ path: './tsconfig.node.json' }]
    };

    // Generate tsconfig.node.json
    const tsconfigNode = {
      compilerOptions: {
        composite: true,
        skipLibCheck: true,
        module: 'ESNext',
        moduleResolution: 'bundler',
        allowSyntheticDefaultImports: true
      },
      include: ['vite.config.ts']
    };

    // Generate vite.config.ts
    const viteConfig = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
});`;

    // Generate index.html
    const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Personal portfolio of ${answers.name} - ${answers.title}" />
    <meta name="theme-color" content="#1a237e" />
    <title>${answers.name} | ${answers.title}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/src/index.css" />
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🚀</text></svg>" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
    <noscript>You need to enable JavaScript to run this app.</noscript>
  </body>
</html>`;

    // Generate App.tsx with enhanced UI and animations
    const appTsx = `import React, { useState, useEffect } from 'react';
import './App.css';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    // Enhanced loading with progress
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="loading">
        <div className="loading-content">
          <div className="spinner-container">
            <div className="spinner"></div>
            <div className="spinner-inner"></div>
          </div>
          <h2>Loading Portfolio...</h2>
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
        </div>
        <div className="loading-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: Math.random() * 100 + '%',
              animationDelay: Math.random() * 2 + 's',
              animationDuration: (Math.random() * 3 + 2) + 's'
            }}></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-content">
          <div className="nav-logo">
            <span className="logo-text">{${answers.name.split(' ')[0] ? `"${answers.name.split(' ')[0].replace(/'/g, "\\'")}"` : '"Portfolio"'}}</span>
          </div>
          <div className="nav-links">
            {['about', 'skills', 'languages', 'interests'].map((section) => (
              <a
                key={section}
                href={\`#\${section}\`}
                className={\`nav-link \${activeSection === section ? 'active' : ''}\`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-bg">
          <div className="hero-gradient"></div>
          <div className="floating-elements">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={\`floating-element element-\${i + 1}\`}></div>
            ))}
          </div>
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <div className="greeting">
              <span className="wave">👋</span>
              <span>Hello, I'm</span>
            </div>
            <h1 className="hero-name">
              <span className="name-text">${answers.name.replace(/'/g, "\\'")}</span>
              <div className="name-underline"></div>
            </h1>
            <h2 className="hero-title">
              <span className="title-highlight">${answers.title.replace(/'/g, "\\'")}</span>
            </h2>
            <p className="hero-description">
              Passionate about creating exceptional digital experiences with expertise in 
              ${answers.skills.slice(0, 2).map(s => s.replace(/'/g, "\\'")).join(' and ')}.
              Let's build something amazing together.
            </p>
            <div className="hero-cta">
              <a href="#about" className="cta-primary">
                <span>Explore My Work</span>
                <div className="cta-arrow">→</div>
              </a>
              <a href="mailto:${answers.email}" className="contact-button" aria-label="Contact via Email">
                <span className="icon">✉️</span>
                <span>${answers.email}</span>
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="profile-card">
              <div className="profile-image">
                <div className="profile-placeholder">
                  <span className="profile-emoji">🚀</span>
                </div>
                <div className="profile-ring"></div>
              </div>
              <div className="profile-status">
                <div className="status-dot"></div>
                <span>Available for work</span>
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-line"></div>
          <span>Scroll to explore</span>
        </div>
      </header>
      
      <main className="main-content">
        {/* About Section */}
        <section id="about" className="about section-card">
          <div className="section-header">
            <h3>About Me</h3>
            <div className="section-line"></div>
          </div>
          <div className="about-content">
            <div className="about-text">
              <p className="lead-text">
                Welcome to my digital space! I'm a passionate ${answers.title.toLowerCase().replace(/'/g, "\\'")} 
                with a love for crafting exceptional user experiences and robust applications.
              </p>
              <p>
                My expertise spans across ${answers.skills.slice(0, 3).map(s => s.replace(/'/g, "\\'")).join(', ')}${answers.skills.length > 3 ? ' and more' : ''}. 
                I thrive on turning complex problems into elegant solutions and believe that great code 
                should be both functional and beautiful.
              </p>
              <p>
                When I'm not coding, you'll find me exploring ${answers.interests.length > 0 ? 
                  answers.interests.length > 1 ? 
                    answers.interests.slice(0, -1).map(i => i.replace(/'/g, "\\'")).join(', ') + ' and ' + answers.interests[answers.interests.length - 1].replace(/'/g, "\\'") : 
                    answers.interests[0].replace(/'/g, "\\'")
                  : 'new technologies and innovations'}, always staying curious and learning.
              </p>
            </div>
            <div className="about-stats">
              <div className="stat-card">
                <div className="stat-number">${answers.languages.length}+</div>
                <div className="stat-label">Languages</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">${answers.skills.length}+</div>
                <div className="stat-label">Skills</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">${answers.interests.length}+</div>
                <div className="stat-label">Interests</div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Skills Section */}
        <section id="skills" className="skills section-card">
          <div className="section-header">
            <h3>Skills & Expertise</h3>
            <div className="section-line"></div>
          </div>
          <div className="skills-grid">
            {[${answers.skills.map(s => `"${s.replace(/'/g, "\\'")}"`).join(', ')}].map((skill, index) => (
              <div key={index} className="skill-card" data-skill={skill}>
                <div className="skill-icon">
                  <div className="skill-dot"></div>
                </div>
                <div className="skill-content">
                  <div className="skill-name">{skill}</div>
                  <div className="skill-level">
                    <div className="skill-bar">
                      <div 
                        className="skill-progress" 
                        style={{
                          width: \`\${Math.floor(Math.random() * 30) + 70}%\`,
                          animationDelay: \`\${index * 0.1}s\`
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Languages Section */}
        <section id="languages" className="languages section-card">
          <div className="section-header">
            <h3>Programming Languages</h3>
            <div className="section-line"></div>
          </div>
          <div className="languages-grid">
            {[${answers.languages.map(l => `"${l.replace(/'/g, "\\'")}"`).join(', ')}].map((lang, index) => (
              <div key={index} className="language-card">
                <div className="language-header">
                  <div className="language-icon">
                    <code>&lt;/&gt;</code>
                  </div>
                  <div className="language-name">{lang}</div>
                </div>
                <div className="language-progress">
                  <div className="progress-track">
                    <div 
                      className="progress-fill" 
                      style={{
                        width: \`\${Math.floor(Math.random() * 40) + 60}%\`,
                        animationDelay: \`\${index * 0.15}s\`
                      }}
                    ></div>
                  </div>
                  <div className="progress-percentage">
                    {Math.floor(Math.random() * 40) + 60}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Interests Section */}
        <section id="interests" className="interests section-card">
          <div className="section-header">
            <h3>Areas of Interest</h3>
            <div className="section-line"></div>
          </div>
          <div className="interests-container">
            <p className="interests-intro">
              These are the areas that fuel my passion and drive my continuous learning journey.
            </p>
            <div className="interests-grid">
              {[${answers.interests.map(i => `"${i.replace(/'/g, "\\'")}"`).join(', ')}].map((interest, index) => (
                <div key={index} className="interest-card">
                  <div className="interest-icon">
                    <div className="icon-bg"></div>
                    <span className="icon-text">
                      {interest === 'Web Development' ? '🌐' :
                       interest === 'Mobile Development' ? '📱' :
                       interest === 'AI/ML' ? '🤖' :
                       interest === 'Game Development' ? '🎮' :
                       interest === 'DevOps' ? '⚙️' :
                       interest === 'System Design' ? '🏗️' : '🎨'}
                    </span>
                  </div>
                  <div className="interest-content">
                    <h4 className="interest-title">{interest}</h4>
                    <div className="interest-description">
                      {interest === 'Web Development' ? 'Creating responsive and interactive web experiences' :
                       interest === 'Mobile Development' ? 'Building native and cross-platform mobile apps' :
                       interest === 'AI/ML' ? 'Exploring artificial intelligence and machine learning' :
                       interest === 'Game Development' ? 'Crafting engaging interactive entertainment' :
                       interest === 'DevOps' ? 'Streamlining development and deployment processes' :
                       interest === 'System Design' ? 'Architecting scalable and robust systems' :
                       'Passionate about innovative technologies and solutions'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-main">
            <div className="footer-info">
              <h3>${answers.name.replace(/'/g, "\\'")}</h3>
              <p>Let's create something amazing together</p>
            </div>
            <div className="footer-links">
              <a 
                href={"https://github.com/${answers.github}"}
                target="_blank" 
                rel="noopener noreferrer"
                className="footer-link"
                aria-label="GitHub Profile"
              >
                <div className="link-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <span>GitHub</span>
              </a>
              ${answers.linkedin ? `
              <a 
                href={"https://linkedin.com/in/${answers.linkedin}"}
                target="_blank" 
                rel="noopener noreferrer"
                className="footer-link"
                aria-label="LinkedIn Profile"
              >
                <div className="link-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <span>LinkedIn</span>
              </a>` : ''}
              <a 
                href="mailto:${answers.email}"
                className="footer-link contact-link"
                aria-label="Contact via Email"
              >
                <div className="link-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h1.82L12 11.73l8.545-7.909h1.819c.904 0 1.636.732 1.636 1.636z"/>
                  </svg>
                </div>
                <span>${answers.email}</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;`;

    // Generate enhanced App.css with modern styling
    const appCss = `:root {
  /* Enhanced Color System */
  --primary-50: ${answers.colorScheme === 'Dark' ? '#f8fafc' : 
                 answers.colorScheme === 'Light' ? '#f8fafc' : 
                 '#f8f9fa'};
  
  --primary-100: ${answers.colorScheme === 'Dark' ? '#f1f5f9' : 
                  answers.colorScheme === 'Light' ? '#f1f5f9' : 
                  '#e9ecef'};
  
  --primary-900: ${answers.colorScheme === 'Dark' ? '#0f172a' : 
                  answers.colorScheme === 'Light' ? '#1e293b' : 
                  '#212529'};
  
  --background: ${answers.colorScheme === 'Dark' ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' : 
                answers.colorScheme === 'Light' ? 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)' : 
                'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'};
  
  --surface: ${answers.colorScheme === 'Dark' ? 'rgba(30, 41, 59, 0.8)' : 
             answers.colorScheme === 'Light' ? 'rgba(255, 255, 255, 0.9)' : 
             'rgba(255, 255, 255, 0.95)'};
  
  --text-primary: ${answers.colorScheme === 'Dark' ? '#f8fafc' : '#000000'};
  --text-secondary: ${answers.colorScheme === 'Dark' ? '#cbd5e1' : '#333333'};
  --text-muted: ${answers.colorScheme === 'Dark' ? '#94a3b8' : '#666666'};
  
  --accent: ${answers.colorScheme === 'Dark' ? 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)' : 
            answers.colorScheme === 'Light' ? 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)' : 
            'linear-gradient(135deg, #6c757d 0%, #495057 100%)'};
  
  --accent-hover: ${answers.colorScheme === 'Dark' ? 'linear-gradient(135deg, #7c3aed 0%, #9333ea 100%)' : 
                  answers.colorScheme === 'Light' ? 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)' : 
                  'linear-gradient(135deg, #5a6268 0%, #3d4144 100%)'};
  
  --border: ${answers.colorScheme === 'Dark' ? 'rgba(148, 163, 184, 0.1)' : 'rgba(148, 163, 184, 0.2)'};
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  
  --blur-amount: 20px;
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Reset and Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  font-size: 16px;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: var(--background);
  color: var(--text-primary);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

/* Loading Screen */
.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--background);
  z-index: 9999;
}

.loading-content {
  text-align: center;
  z-index: 2;
}

.spinner-container {
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 auto 2rem;
}

.spinner, .spinner-inner {
  position: absolute;
  border-radius: 50%;
  border: 3px solid transparent;
  animation: spin 2s linear infinite;
}

.spinner {
  width: 80px;
  height: 80px;
  border-top: 3px solid var(--text-primary);
  border-right: 3px solid var(--text-primary);
}

.spinner-inner {
  width: 60px;
  height: 60px;
  top: 10px;
  left: 10px;
  border-bottom: 3px solid var(--text-secondary);
  border-left: 3px solid var(--text-secondary);
  animation-direction: reverse;
  animation-duration: 1.5s;
}

.loading-content h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.loading-bar {
  width: 200px;
  height: 4px;
  background: var(--border);
  border-radius: 2px;
  overflow: hidden;
  margin: 0 auto;
}

.loading-progress {
  height: 100%;
  background: var(--accent);
  width: 0%;
  animation: loadingProgress 1.5s ease-out forwards;
}

.loading-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: var(--text-secondary);
  border-radius: 50%;
  animation: float 3s ease-in-out infinite;
}

/* Navigation */
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: var(--surface);
  backdrop-filter: blur(var(--blur-amount));
  -webkit-backdrop-filter: blur(var(--blur-amount));
  border-bottom: 1px solid var(--border);
  transition: var(--transition);
}

.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-logo {
  font-size: 1.5rem;
  font-weight: 800;
  background: var(--accent);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  position: relative;
  padding: 0.5rem 0;
  transition: var(--transition);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--accent);
  transition: var(--transition);
}

.nav-link:hover,
.nav-link.active {
  color: var(--text-primary);
}

.nav-link:hover::after,
.nav-link.active::after {
  width: 100%;
}

/* Hero Section */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 6rem 2rem 2rem;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
}

.hero-gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 30% 20%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 70% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 50%);
  animation: gradientShift 8s ease-in-out infinite;
}

.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.floating-element {
  position: absolute;
  background: var(--accent);
  border-radius: 50%;
  opacity: 0.1;
  animation: float 6s ease-in-out infinite;
}

.element-1 { width: 80px; height: 80px; top: 20%; left: 10%; animation-delay: 0s; }
.element-2 { width: 120px; height: 120px; top: 60%; right: 15%; animation-delay: 2s; }
.element-3 { width: 60px; height: 60px; top: 80%; left: 20%; animation-delay: 4s; }
.element-4 { width: 100px; height: 100px; top: 30%; right: 30%; animation-delay: 1s; }
.element-5 { width: 40px; height: 40px; top: 70%; left: 60%; animation-delay: 3s; }
.element-6 { width: 90px; height: 90px; top: 10%; left: 70%; animation-delay: 5s; }

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 4rem;
  align-items: center;
  width: 100%;
}

.hero-text {
  z-index: 1;
}

.greeting {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
  font-weight: 500;
}

.wave {
  display: inline-block;
  animation: wave 2s ease-in-out infinite;
  transform-origin: 70% 70%;
}

.hero-name {
  font-size: 4rem;
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 1rem;
  position: relative;
}

.name-text {
  background: var(--accent);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  z-index: 1;
}

.name-underline {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 8px;
  background: var(--accent);
  opacity: 0.3;
  animation: nameUnderline 1s ease-out 0.5s forwards;
}

.hero-title {
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 1.5rem;
  color: var(--text-secondary);
}

.title-highlight {
  background: var(--accent);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 600;
}

.hero-description {
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--text-secondary);
  margin-bottom: 2.5rem;
  max-width: 500px;
}

.hero-cta {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.cta-primary, .cta-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: var(--transition);
  position: relative;
  overflow: hidden;
}

.cta-primary {
  background: var(--accent);
  color: white;
  box-shadow: var(--shadow-lg);
}

.cta-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: var(--transition);
}

.cta-primary:hover::before {
  left: 100%;
}

.cta-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-xl);
}

.cta-secondary {
  background: var(--surface);
  color: var(--text-primary);
  border: 2px solid var(--border);
}

.cta-secondary:hover {
  border-color: var(--text-primary);
  transform: translateY(-2px);
}

.cta-arrow {
  transition: var(--transition);
}

.cta-primary:hover .cta-arrow {
  transform: translateX(4px);
}

/* Hero Visual */
.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.profile-card {
  background: var(--surface);
  border-radius: 24px;
  padding: 2rem;
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--border);
  text-align: center;
  position: relative;
  backdrop-filter: blur(var(--blur-amount));
  -webkit-backdrop-filter: blur(var(--blur-amount));
}

.profile-image {
  position: relative;
  width: 180px;
  height: 180px;
  margin: 0 auto 1.5rem;
}

.profile-placeholder {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  position: relative;
  z-index: 1;
}

.profile-ring {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border: 3px solid transparent;
  border-radius: 50%;
  background: var(--accent);
  background-clip: padding-box;
  animation: profileRing 3s linear infinite;
}

.profile-status {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
}

.status-dot {
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-muted);
  font-size: 0.8rem;
  font-weight: 500;
}

.scroll-line {
  width: 1px;
  height: 30px;
  background: var(--text-muted);
  animation: scrollLine 2s ease-in-out infinite;
}

/* Main Content */
.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 6rem;
}

/* Section Cards */
.section-card {
  background: var(--surface);
  border-radius: 24px;
  padding: 3rem;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border);
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(50px);
  transition: var(--transition-slow);
  backdrop-filter: blur(var(--blur-amount));
  -webkit-backdrop-filter: blur(var(--blur-amount));
}

.section-card.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.section-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: var(--accent);
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2.5rem;
  position: relative;
}

.section-number {
  font-size: 1rem;
  font-weight: 800;
  color: var(--text-muted);
  font-family: 'JetBrains Mono', monospace;
}

.section-header h3 {
  font-size: 2rem;
  font-weight: 800;
  color: var(--text-primary);
  margin: 0;
}

.section-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, var(--border), transparent);
}

/* About Section */
.about-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  align-items: start;
}

.about-text p {
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-secondary);
}

.lead-text {
  font-size: 1.3rem !important;
  font-weight: 500;
  color: var(--text-primary) !important;
  line-height: 1.6 !important;
}

.about-stats {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.stat-card {
  background: linear-gradient(135deg, var(--surface), transparent);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
  transition: var(--transition);
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--text-primary);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 900;
  background: var(--accent);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Skills Section */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.skill-card {
  background: linear-gradient(135deg, var(--surface), transparent);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: var(--transition);
  position: relative;
  overflow: hidden;
}

.skill-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.1), transparent);
  transition: var(--transition);
}

.skill-card:hover::before {
  left: 100%;
}

.skill-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--text-primary);
}

.skill-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.skill-dot {
  width: 12px;
  height: 12px;
  background: white;
  border-radius: 50%;
  opacity: 0.9;
}

.skill-content {
  flex: 1;
}

.skill-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.skill-level {
  width: 100%;
}

.skill-bar {
  width: 100%;
  height: 4px;
  background: var(--border);
  border-radius: 2px;
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  background: var(--accent);
  border-radius: 2px;
  transform: scaleX(0);
  transform-origin: left;
  animation: skillProgress 1s ease-out forwards;
}

/* Languages Section */
.languages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.language-card {
  background: linear-gradient(135deg, var(--surface), transparent);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 1.5rem;
  transition: var(--transition);
  position: relative;
  overflow: hidden;
}

.language-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
  transition: var(--transition);
}

.language-card:hover::before {
  left: 100%;
}

.language-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--text-primary);
}

.language-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.language-icon {
  width: 40px;
  height: 40px;
  background: var(--accent);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  font-family: 'JetBrains Mono', monospace;
}

.language-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
}

.language-progress {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.progress-track {
  flex: 1;
  height: 6px;
  background: var(--border);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--accent);
  border-radius: 3px;
  transform: scaleX(0);
  transform-origin: left;
  animation: skillProgress 1.2s ease-out forwards;
}

.progress-percentage {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-secondary);
  min-width: 40px;
  font-family: 'JetBrains Mono', monospace;
}

/* Interests Section */
.interests-container {
  max-width: 100%;
}

.interests-intro {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
  text-align: center;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.interests-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.interest-card {
  background: linear-gradient(135deg, var(--surface), transparent);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: var(--transition);
  position: relative;
  overflow: hidden;
}

.interest-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.1), transparent);
  transition: var(--transition);
}

.interest-card:hover::before {
  left: 100%;
}

.interest-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
  border-color: var(--text-primary);
}

.interest-icon {
  width: 80px;
  height: 80px;
  margin-bottom: 1.5rem;
  position: relative;
}

.icon-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--accent);
  border-radius: 20px;
  opacity: 0.1;
  transition: var(--transition);
}

.interest-card:hover .icon-bg {
  opacity: 0.2;
  transform: rotate(5deg) scale(1.1);
}

.icon-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2.5rem;
}

.interest-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.interest-description {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

/* Footer */
.footer {
  background: var(--surface);
  border-top: 1px solid var(--border);
  margin-top: 4rem;
  backdrop-filter: blur(var(--blur-amount));
  -webkit-backdrop-filter: blur(var(--blur-amount));
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem 2rem;
}

.footer-main {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
  margin-bottom: 2rem;
}

.footer-info h3 {
  font-size: 1.5rem;
  font-weight: 800;
  background: var(--accent);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
}

.footer-info p {
  color: var(--text-secondary);
  font-size: 1rem;
}

.footer-links {
  display: flex;
  gap: 2rem;
  justify-content: flex-end;
  flex-wrap: wrap;
}

.footer-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, var(--surface), transparent);
  border: 1px solid var(--border);
  border-radius: 12px;
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  transition: var(--transition);
  position: relative;
  overflow: hidden;
}

.footer-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.1), transparent);
  transition: var(--transition);
}

.footer-link:hover::before {
  left: 100%;
}

.footer-link:hover {
  color: var(--text-primary);
  border-color: var(--text-primary);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.link-icon {
  width: 20px;
  height: 20px;
  opacity: 0.8;
}

.link-icon svg {
  width: 100%;
  height: 100%;
}

.contact-link {
  background: var(--accent) !important;
  color: white !important;
  border-color: transparent !important;
}

.contact-link:hover {
  color: white !important;
  transform: translateY(-2px) scale(1.05);
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid var(--border);
  color: var(--text-muted);
  font-size: 0.9rem;
}

/* Animations */
@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes loadingProgress {
  to { width: 100%; }
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

@keyframes gradientShift {
  0%, 100% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.1) rotate(180deg); }
}

@keyframes wave {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(15deg); }
  75% { transform: rotate(-15deg); }
}

@keyframes nameUnderline {
  to { width: 200px; }
}

@keyframes profileRing {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.2); }
}

@keyframes scrollLine {
  0%, 100% { transform: scaleY(1); opacity: 1; }
  50% { transform: scaleY(0.5); opacity: 0.5; }
}

@keyframes skillProgress {
  to { transform: scaleX(1); }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }
  
  .about-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .footer-main {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
  
  .footer-links {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .nav-content {
    padding: 1rem;
  }
  
  .nav-links {
    gap: 1rem;
  }
  
  .nav-link {
    font-size: 0.8rem;
  }
  
  .hero {
    padding: 5rem 1rem 2rem;
  }
  
  .hero-name {
    font-size: 2.5rem;
  }
  
  .hero-description {
    font-size: 1rem;
  }
  
  .main-content {
    padding: 2rem 1rem;
    gap: 4rem;
  }
  
  .section-card {
    padding: 2rem;
    border-radius: 16px;
  }
  
  .section-header h3 {
    font-size: 1.5rem;
  }
  
  .skills-grid {
    grid-template-columns: 1fr;
  }
  
  .languages-grid {
    grid-template-columns: 1fr;
  }
  
  .interests-grid {
    grid-template-columns: 1fr;
  }
  
  .hero-cta {
    flex-direction: column;
    align-items: center;
  }
  
  .cta-primary, .cta-secondary {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }
  
  .about-stats {
    flex-direction: row;
    gap: 1rem;
  }
  
  .stat-card {
    flex: 1;
    padding: 1rem;
  }
  
  .stat-number {
    font-size: 1.8rem;
  }
}

@media (max-width: 480px) {
  .hero-name {
    font-size: 2rem;
  }
  
  .section-card {
    padding: 1.5rem;
  }
  
  .about-stats {
    flex-direction: column;
  }
  
  .footer-links {
    flex-direction: column;
    align-items: center;
  }
  
  .footer-link {
    width: 100%;
    max-width: 200px;
    justify-content: center;
  }
}

/* Focus States for Accessibility */
a:focus-visible,
button:focus-visible {
  outline: 2px solid var(--text-primary);
  outline-offset: 2px;
  border-radius: 8px;
}

/* Scrollbar Styling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--border);
}

::-webkit-scrollbar-thumb {
  background: var(--accent);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--accent-hover);
}

/* Print Styles */
@media print {
  .nav, .loading, .scroll-indicator {
    display: none;
  }
  
  .hero {
    min-height: auto;
    padding: 2rem 0;
  }
  
  .section-card {
    box-shadow: none;
    border: 1px solid #ddd;
    margin-bottom: 2rem;
  }
}

/* High Contrast Mode */
@media (prefers-contrast: high) {
  :root {
    --border: rgba(0, 0, 0, 0.3);
    --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  
  .floating-element,
  .particle,
  .spinner,
  .spinner-inner {
    animation: none !important;
  }
}
`;

    // Create necessary directories
    await fs.ensureDir(path.join(websiteDir, 'src'));
    await fs.ensureDir(path.join(websiteDir, 'public'));

    // Write files
    await Promise.all([
      fs.writeFile(path.join(websiteDir, 'package.json'), JSON.stringify({
        name: `${answers.name.toLowerCase().replace(/\s+/g, '-')}-portfolio`,
        version: '1.0.0',
        private: true,
        dependencies: {
          'react': '^18.2.0',
          'react-dom': '^18.2.0',
          'react-scripts': '5.0.1',
          'typescript': '^4.9.5',
          '@types/react': '^18.0.28',
          '@types/react-dom': '^18.0.11',
          '@types/node': '^16.18.27'
        },
        scripts: {
          start: 'react-scripts start',
          build: 'react-scripts build',
          test: 'react-scripts test',
          eject: 'react-scripts eject'
        },
        browserslist: {
          production: [
            '>0.2%',
            'not dead',
            'not op_mini all'
          ],
          development: [
            'last 1 chrome version',
            'last 1 firefox version',
            'last 1 safari version'
          ]
        }
      }, null, 2)),
      
      fs.writeFile(path.join(websiteDir, 'public', 'index.html'), indexHtml),
      fs.writeFile(path.join(websiteDir, 'src', 'App.tsx'), appTsx),
      fs.writeFile(path.join(websiteDir, 'src', 'App.css'), appCss),
      fs.writeFile(path.join(websiteDir, 'src', 'index.tsx'), `
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './App.css';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
      `),
      fs.writeFile(path.join(websiteDir, 'README.md'), `# ${answers.name}'s Portfolio

This is a personal portfolio website generated with the Personal Website Generator.

## Available Scripts

In the project directory, you can run:

### \`npm start\`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### \`npm run build\`

Builds the app for production to the \`build\` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
      `)
    ]);

    // Install dependencies
    console.log(chalk.blue('Installing dependencies...'));
    await new Promise<void>((resolve, reject) => {
      const { spawn } = require('child_process');
      const install = spawn('npm', ['install'], { 
        cwd: websiteDir,
        stdio: 'inherit',
        shell: true 
      });

      install.on('close', (code: number) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`npm install exited with code ${code}`));
        }
      });
    });

    console.log(chalk.green(`\n🎉 Successfully created portfolio website at ${websiteDir}`));
    console.log(chalk.blue('\nTo get started, run:'));
    console.log(chalk.cyan(`  cd ${path.basename(websiteDir)}`));
    console.log(chalk.cyan('  npm start\n'));
    
  } catch (error: any) {
    console.error(chalk.red('Error generating website:'), error.message || error);
    process.exit(1);
  }
}

async function main() {
  try {
    console.log(chalk.blue('\nWelcome to the Personal Website Generator!\n'));
    
    const answers = await inquirer.prompt(QUESTIONS) as UserAnswers;
    await generateWebsite(answers);
    
  } catch (error: any) {
    if (error.isTtyError) {
      console.error(chalk.red('Error: Prompt couldn\'t be rendered in the current environment'));
    } else {
      console.error(chalk.red('An error occurred:'), error.message || error);
    }
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

export { generateWebsite };