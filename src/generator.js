"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateWebsite = generateWebsite;
var inquirer_1 = require("inquirer");
var chalk_1 = require("chalk");
var fs_extra_1 = require("fs-extra");
var path_1 = require("path");
var QUESTIONS = [
    {
        type: 'input',
        name: 'name',
        message: 'What is your name?',
        validate: function (input) { return input.trim().length > 0 || 'Name is required'; }
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
        filter: function (input) { return input.split(',').map(function (lang) { return lang.trim(); }); }
    },
    {
        type: 'input',
        name: 'skills',
        message: 'List your key skills (comma-separated):',
        default: 'Web Development, UI/UX, Problem Solving',
        filter: function (input) { return input.split(',').map(function (skill) { return skill.trim(); }); }
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
        validate: function (input) { return input.trim().length > 0 || 'GitHub username is required'; }
    },
    {
        type: 'input',
        name: 'linkedin',
        message: 'What is your LinkedIn username? (Press ENTER to skip)',
        default: '',
        filter: function (input) { return input.trim(); }
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is your email address?',
        validate: function (input) {
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(input) ? true : 'Please enter a valid email address';
        },
        filter: function (input) { return input.trim(); }
    }
];
function generateWebsite(answers) {
    return __awaiter(this, void 0, void 0, function () {
        var websiteDir, srcDir, publicDir, packageJson, tsconfig, tsconfigNode, viteConfig, indexHtml, appTsx, appCss, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    websiteDir = path_1.default.join(process.cwd(), "".concat(answers.name.toLowerCase().replace(/\s+/g, '-'), "-portfolio"));
                    srcDir = path_1.default.join(websiteDir, 'src');
                    publicDir = path_1.default.join(websiteDir, 'public');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 8, , 9]);
                    // Create directories
                    return [4 /*yield*/, fs_extra_1.default.ensureDir(srcDir)];
                case 2:
                    // Create directories
                    _a.sent();
                    return [4 /*yield*/, fs_extra_1.default.ensureDir(publicDir)];
                case 3:
                    _a.sent();
                    packageJson = {
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
                    tsconfig = {
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
                    tsconfigNode = {
                        compilerOptions: {
                            composite: true,
                            skipLibCheck: true,
                            module: 'ESNext',
                            moduleResolution: 'bundler',
                            allowSyntheticDefaultImports: true
                        },
                        include: ['vite.config.ts']
                    };
                    viteConfig = "import { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react';\nimport tsconfigPaths from 'vite-tsconfig-paths';\n\nexport default defineConfig({\n  plugins: [react(), tsconfigPaths()],\n  server: {\n    port: 3000,\n    open: true\n  },\n  build: {\n    outDir: 'dist',\n    sourcemap: true\n  }\n});";
                    indexHtml = "<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <meta name=\"description\" content=\"Personal portfolio of ".concat(answers.name, " - ").concat(answers.title, "\" />\n    <meta name=\"theme-color\" content=\"#1a237e\" />\n    <title>").concat(answers.name, " | ").concat(answers.title, "</title>\n    <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n    <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n    <link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap\" rel=\"stylesheet\">\n    <link rel=\"stylesheet\" href=\"/src/index.css\" />\n    <link rel=\"icon\" href=\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>\uD83D\uDE80</text></svg>\" />\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.tsx\"></script>\n    <noscript>You need to enable JavaScript to run this app.</noscript>\n  </body>\n</html>");
                    appTsx = "import React, { useState, useEffect } from 'react';\nimport './App.css';\n\nconst App: React.FC = () => {\n  const [isLoading, setIsLoading] = useState(true);\n  const [activeSection, setActiveSection] = useState('about');\n\n  useEffect(() => {\n    // Enhanced loading with progress\n    const timer = setTimeout(() => {\n      setIsLoading(false);\n    }, 1500);\n    \n    return () => clearTimeout(timer);\n  }, []);\n\n  useEffect(() => {\n    // Intersection Observer for scroll animations\n    const observer = new IntersectionObserver(\n      (entries) => {\n        entries.forEach((entry) => {\n          if (entry.isIntersecting) {\n            entry.target.classList.add('animate-in');\n            setActiveSection(entry.target.id);\n          }\n        });\n      },\n      { threshold: 0.1 }\n    );\n\n    document.querySelectorAll('section[id]').forEach((section) => {\n      observer.observe(section);\n    });\n\n    return () => observer.disconnect();\n  }, [isLoading]);\n\n  if (isLoading) {\n    return (\n      <div className=\"loading\">\n        <div className=\"loading-content\">\n          <div className=\"spinner-container\">\n            <div className=\"spinner\"></div>\n            <div className=\"spinner-inner\"></div>\n          </div>\n          <h2>Loading Portfolio...</h2>\n          <div className=\"loading-bar\">\n            <div className=\"loading-progress\"></div>\n          </div>\n        </div>\n        <div className=\"loading-particles\">\n          {[...Array(20)].map((_, i) => (\n            <div key={i} className=\"particle\" style={{\n              left: Math.random() * 100 + '%',\n              animationDelay: Math.random() * 2 + 's',\n              animationDuration: (Math.random() * 3 + 2) + 's'\n            }}></div>\n          ))}\n        </div>\n      </div>\n    );\n  }\n\n  return (\n    <div className=\"app\">\n      {/* Navigation */}\n      <nav className=\"nav\">\n        <div className=\"nav-content\">\n          <div className=\"nav-logo\">\n            <span className=\"logo-text\">{".concat(answers.name.split(' ')[0] ? "\"".concat(answers.name.split(' ')[0].replace(/'/g, "\\'"), "\"") : '"Portfolio"', "}</span>\n          </div>\n          <div className=\"nav-links\">\n            {['about', 'skills', 'languages', 'interests'].map((section) => (\n              <a\n                key={section}\n                href={`#${section}`}\n                className={`nav-link ${activeSection === section ? 'active' : ''}`}\n              >\n                {section.charAt(0).toUpperCase() + section.slice(1)}\n              </a>\n            ))}\n          </div>\n        </div>\n      </nav>\n\n      {/* Hero Section */}\n      <header className=\"hero\">\n        <div className=\"hero-bg\">\n          <div className=\"hero-gradient\"></div>\n          <div className=\"floating-elements\">\n            {[...Array(6)].map((_, i) => (\n              <div key={i} className={`floating-element element-${i + 1}`}></div>\n            ))}\n          </div>\n        </div>\n        <div className=\"hero-content\">\n          <div className=\"hero-text\">\n            <div className=\"greeting\">\n              <span className=\"wave\">\uD83D\uDC4B</span>\n              <span>Hello, I'm</span>\n            </div>\n            <h1 className=\"hero-name\">\n              <span className=\"name-text\">").concat(answers.name.replace(/'/g, "\\'"), "</span>\n              <div className=\"name-underline\"></div>\n            </h1>\n            <h2 className=\"hero-title\">\n              <span className=\"title-highlight\">").concat(answers.title.replace(/'/g, "\\'"), "</span>\n            </h2>\n            <p className=\"hero-description\">\n              Passionate about creating exceptional digital experiences with expertise in \n              ").concat(answers.skills.slice(0, 2).map(function (s) { return s.replace(/'/g, "\\'"); }).join(' and '), ".\n              Let's build something amazing together.\n            </p>\n            <div className=\"hero-cta\">\n              <a href=\"#about\" className=\"cta-primary\">\n                <span>Explore My Work</span>\n                <div className=\"cta-arrow\">\u2192</div>\n              </a>\n              <a href=\"mailto:").concat(answers.email, "\" className=\"contact-button\" aria-label=\"Contact via Email\">\n                <span className=\"icon\">\u2709\uFE0F</span>\n                <span>").concat(answers.email, "</span>\n              </a>\n            </div>\n          </div>\n          <div className=\"hero-visual\">\n            <div className=\"profile-card\">\n              <div className=\"profile-image\">\n                <div className=\"profile-placeholder\">\n                  <span className=\"profile-emoji\">\uD83D\uDE80</span>\n                </div>\n                <div className=\"profile-ring\"></div>\n              </div>\n              <div className=\"profile-status\">\n                <div className=\"status-dot\"></div>\n                <span>Available for work</span>\n              </div>\n            </div>\n          </div>\n        </div>\n        <div className=\"scroll-indicator\">\n          <div className=\"scroll-line\"></div>\n          <span>Scroll to explore</span>\n        </div>\n      </header>\n      \n      <main className=\"main-content\">\n        {/* About Section */}\n        <section id=\"about\" className=\"about section-card\">\n          <div className=\"section-header\">\n            <h3>About Me</h3>\n            <div className=\"section-line\"></div>\n          </div>\n          <div className=\"about-content\">\n            <div className=\"about-text\">\n              <p className=\"lead-text\">\n                Welcome to my digital space! I'm a passionate ").concat(answers.title.toLowerCase().replace(/'/g, "\\'"), " \n                with a love for crafting exceptional user experiences and robust applications.\n              </p>\n              <p>\n                My expertise spans across ").concat(answers.skills.slice(0, 3).map(function (s) { return s.replace(/'/g, "\\'"); }).join(', ')).concat(answers.skills.length > 3 ? ' and more' : '', ". \n                I thrive on turning complex problems into elegant solutions and believe that great code \n                should be both functional and beautiful.\n              </p>\n              <p>\n                When I'm not coding, you'll find me exploring ").concat(answers.interests.length > 0 ?
                        answers.interests.length > 1 ?
                            answers.interests.slice(0, -1).map(function (i) { return i.replace(/'/g, "\\'"); }).join(', ') + ' and ' + answers.interests[answers.interests.length - 1].replace(/'/g, "\\'") :
                            answers.interests[0].replace(/'/g, "\\'")
                        : 'new technologies and innovations', ", always staying curious and learning.\n              </p>\n            </div>\n            <div className=\"about-stats\">\n              <div className=\"stat-card\">\n                <div className=\"stat-number\">").concat(answers.languages.length, "+</div>\n                <div className=\"stat-label\">Languages</div>\n              </div>\n              <div className=\"stat-card\">\n                <div className=\"stat-number\">").concat(answers.skills.length, "+</div>\n                <div className=\"stat-label\">Skills</div>\n              </div>\n              <div className=\"stat-card\">\n                <div className=\"stat-number\">").concat(answers.interests.length, "+</div>\n                <div className=\"stat-label\">Interests</div>\n              </div>\n            </div>\n          </div>\n        </section>\n        \n        {/* Skills Section */}\n        <section id=\"skills\" className=\"skills section-card\">\n          <div className=\"section-header\">\n            <h3>Skills & Expertise</h3>\n            <div className=\"section-line\"></div>\n          </div>\n          <div className=\"skills-grid\">\n            {[").concat(answers.skills.map(function (s) { return "\"".concat(s.replace(/'/g, "\\'"), "\""); }).join(', '), "].map((skill, index) => (\n              <div key={index} className=\"skill-card\" data-skill={skill}>\n                <div className=\"skill-icon\">\n                  <div className=\"skill-dot\"></div>\n                </div>\n                <div className=\"skill-content\">\n                  <div className=\"skill-name\">{skill}</div>\n                  <div className=\"skill-level\">\n                    <div className=\"skill-bar\">\n                      <div \n                        className=\"skill-progress\" \n                        style={{\n                          width: `${Math.floor(Math.random() * 30) + 70}%`,\n                          animationDelay: `${index * 0.1}s`\n                        }}\n                      ></div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            ))}\n          </div>\n        </section>\n        \n        {/* Languages Section */}\n        <section id=\"languages\" className=\"languages section-card\">\n          <div className=\"section-header\">\n            <h3>Programming Languages</h3>\n            <div className=\"section-line\"></div>\n          </div>\n          <div className=\"languages-grid\">\n            {[").concat(answers.languages.map(function (l) { return "\"".concat(l.replace(/'/g, "\\'"), "\""); }).join(', '), "].map((lang, index) => (\n              <div key={index} className=\"language-card\">\n                <div className=\"language-header\">\n                  <div className=\"language-icon\">\n                    <code>&lt;/&gt;</code>\n                  </div>\n                  <div className=\"language-name\">{lang}</div>\n                </div>\n                <div className=\"language-progress\">\n                  <div className=\"progress-track\">\n                    <div \n                      className=\"progress-fill\" \n                      style={{\n                        width: `${Math.floor(Math.random() * 40) + 60}%`,\n                        animationDelay: `${index * 0.15}s`\n                      }}\n                    ></div>\n                  </div>\n                  <div className=\"progress-percentage\">\n                    {Math.floor(Math.random() * 40) + 60}%\n                  </div>\n                </div>\n              </div>\n            ))}\n          </div>\n        </section>\n        \n        {/* Interests Section */}\n        <section id=\"interests\" className=\"interests section-card\">\n          <div className=\"section-header\">\n            <h3>Areas of Interest</h3>\n            <div className=\"section-line\"></div>\n          </div>\n          <div className=\"interests-container\">\n            <p className=\"interests-intro\">\n              These are the areas that fuel my passion and drive my continuous learning journey.\n            </p>\n            <div className=\"interests-grid\">\n              {[").concat(answers.interests.map(function (i) { return "\"".concat(i.replace(/'/g, "\\'"), "\""); }).join(', '), "].map((interest, index) => (\n                <div key={index} className=\"interest-card\">\n                  <div className=\"interest-icon\">\n                    <div className=\"icon-bg\"></div>\n                    <span className=\"icon-text\">\n                      {interest === 'Web Development' ? '\uD83C\uDF10' :\n                       interest === 'Mobile Development' ? '\uD83D\uDCF1' :\n                       interest === 'AI/ML' ? '\uD83E\uDD16' :\n                       interest === 'Game Development' ? '\uD83C\uDFAE' :\n                       interest === 'DevOps' ? '\u2699\uFE0F' :\n                       interest === 'System Design' ? '\uD83C\uDFD7\uFE0F' : '\uD83C\uDFA8'}\n                    </span>\n                  </div>\n                  <div className=\"interest-content\">\n                    <h4 className=\"interest-title\">{interest}</h4>\n                    <div className=\"interest-description\">\n                      {interest === 'Web Development' ? 'Creating responsive and interactive web experiences' :\n                       interest === 'Mobile Development' ? 'Building native and cross-platform mobile apps' :\n                       interest === 'AI/ML' ? 'Exploring artificial intelligence and machine learning' :\n                       interest === 'Game Development' ? 'Crafting engaging interactive entertainment' :\n                       interest === 'DevOps' ? 'Streamlining development and deployment processes' :\n                       interest === 'System Design' ? 'Architecting scalable and robust systems' :\n                       'Passionate about innovative technologies and solutions'}\n                    </div>\n                  </div>\n                </div>\n              ))}\n            </div>\n          </div>\n        </section>\n      </main>\n      \n      {/* Footer */}\n      <footer className=\"footer\">\n        <div className=\"footer-content\">\n          <div className=\"footer-main\">\n            <div className=\"footer-info\">\n              <h3>").concat(answers.name.replace(/'/g, "\\'"), "</h3>\n              <p>Let's create something amazing together</p>\n            </div>\n            <div className=\"footer-links\">\n              <a \n                href={\"https://github.com/").concat(answers.github, "\"}\n                target=\"_blank\" \n                rel=\"noopener noreferrer\"\n                className=\"footer-link\"\n                aria-label=\"GitHub Profile\"\n              >\n                <div className=\"link-icon\">\n                  <svg viewBox=\"0 0 24 24\" fill=\"currentColor\">\n                    <path d=\"M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z\"/>\n                  </svg>\n                </div>\n                <span>GitHub</span>\n              </a>\n              ").concat(answers.linkedin ? "\n              <a \n                href={\"https://linkedin.com/in/".concat(answers.linkedin, "\"}\n                target=\"_blank\" \n                rel=\"noopener noreferrer\"\n                className=\"footer-link\"\n                aria-label=\"LinkedIn Profile\"\n              >\n                <div className=\"link-icon\">\n                  <svg viewBox=\"0 0 24 24\" fill=\"currentColor\">\n                    <path d=\"M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z\"/>\n                  </svg>\n                </div>\n                <span>LinkedIn</span>\n              </a>") : '', "\n              <a \n                href=\"mailto:").concat(answers.email, "\"\n                className=\"footer-link contact-link\"\n                aria-label=\"Contact via Email\"\n              >\n                <div className=\"link-icon\">\n                  <svg viewBox=\"0 0 24 24\" fill=\"currentColor\">\n                    <path d=\"M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h1.82L12 11.73l8.545-7.909h1.819c.904 0 1.636.732 1.636 1.636z\"/>\n                  </svg>\n                </div>\n                <span>").concat(answers.email, "</span>\n              </a>\n            </div>\n          </div>\n          <div className=\"footer-bottom\">\n            <p>&copy; 2025 ").concat(answers.name.replace(/'/g, "\\'"), ". Crafted with \u2764\uFE0F by slammers001</p>\n          </div>\n        </div>\n      </footer>\n    </div>\n  );\n};\n\nexport default App;");
                    appCss = ":root {\n  /* Enhanced Color System */\n  --primary-50: ".concat(answers.colorScheme === 'Dark' ? '#f8fafc' :
                        answers.colorScheme === 'Light' ? '#f8fafc' :
                            '#f8f9fa', ";\n  \n  --primary-100: ").concat(answers.colorScheme === 'Dark' ? '#f1f5f9' :
                        answers.colorScheme === 'Light' ? '#f1f5f9' :
                            '#e9ecef', ";\n  \n  --primary-900: ").concat(answers.colorScheme === 'Dark' ? '#0f172a' :
                        answers.colorScheme === 'Light' ? '#1e293b' :
                            '#212529', ";\n  \n  --background: ").concat(answers.colorScheme === 'Dark' ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' :
                        answers.colorScheme === 'Light' ? 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)' :
                            'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', ";\n  \n  --surface: ").concat(answers.colorScheme === 'Dark' ? 'rgba(30, 41, 59, 0.8)' :
                        answers.colorScheme === 'Light' ? 'rgba(255, 255, 255, 0.9)' :
                            'rgba(255, 255, 255, 0.95)', ";\n  \n  --text-primary: ").concat(answers.colorScheme === 'Dark' ? '#f8fafc' : '#000000', ";\n  --text-secondary: ").concat(answers.colorScheme === 'Dark' ? '#cbd5e1' : '#333333', ";\n  --text-muted: ").concat(answers.colorScheme === 'Dark' ? '#94a3b8' : '#666666', ";\n  \n  --accent: ").concat(answers.colorScheme === 'Dark' ? 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)' :
                        answers.colorScheme === 'Light' ? 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)' :
                            'linear-gradient(135deg, #6c757d 0%, #495057 100%)', ";\n  \n  --accent-hover: ").concat(answers.colorScheme === 'Dark' ? 'linear-gradient(135deg, #7c3aed 0%, #9333ea 100%)' :
                        answers.colorScheme === 'Light' ? 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)' :
                            'linear-gradient(135deg, #5a6268 0%, #3d4144 100%)', ";\n  \n  --border: ").concat(answers.colorScheme === 'Dark' ? 'rgba(148, 163, 184, 0.1)' : 'rgba(148, 163, 184, 0.2)', ";\n  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);\n  --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);\n  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);\n  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);\n  \n  --blur-amount: 20px;\n  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  --transition-slow: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);\n}\n\n/* Reset and Base Styles */\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nhtml {\n  scroll-behavior: smooth;\n  font-size: 16px;\n}\n\nbody {\n  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;\n  background: var(--background);\n  color: var(--text-primary);\n  line-height: 1.6;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  overflow-x: hidden;\n}\n\n/* Loading Screen */\n.loading {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: var(--background);\n  z-index: 9999;\n}\n\n.loading-content {\n  text-align: center;\n  z-index: 2;\n}\n\n.spinner-container {\n  position: relative;\n  width: 80px;\n  height: 80px;\n  margin: 0 auto 2rem;\n}\n\n.spinner, .spinner-inner {\n  position: absolute;\n  border-radius: 50%;\n  border: 3px solid transparent;\n  animation: spin 2s linear infinite;\n}\n\n.spinner {\n  width: 80px;\n  height: 80px;\n  border-top: 3px solid var(--text-primary);\n  border-right: 3px solid var(--text-primary);\n}\n\n.spinner-inner {\n  width: 60px;\n  height: 60px;\n  top: 10px;\n  left: 10px;\n  border-bottom: 3px solid var(--text-secondary);\n  border-left: 3px solid var(--text-secondary);\n  animation-direction: reverse;\n  animation-duration: 1.5s;\n}\n\n.loading-content h2 {\n  font-size: 1.5rem;\n  font-weight: 600;\n  margin-bottom: 1rem;\n  color: var(--text-primary);\n}\n\n.loading-bar {\n  width: 200px;\n  height: 4px;\n  background: var(--border);\n  border-radius: 2px;\n  overflow: hidden;\n  margin: 0 auto;\n}\n\n.loading-progress {\n  height: 100%;\n  background: var(--accent);\n  width: 0%;\n  animation: loadingProgress 1.5s ease-out forwards;\n}\n\n.loading-particles {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  pointer-events: none;\n}\n\n.particle {\n  position: absolute;\n  width: 4px;\n  height: 4px;\n  background: var(--text-secondary);\n  border-radius: 50%;\n  animation: float 3s ease-in-out infinite;\n}\n\n/* Navigation */\n.nav {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  z-index: 1000;\n  background: var(--surface);\n  backdrop-filter: blur(var(--blur-amount));\n  -webkit-backdrop-filter: blur(var(--blur-amount));\n  border-bottom: 1px solid var(--border);\n  transition: var(--transition);\n}\n\n.nav-content {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 1rem 2rem;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n\n.nav-logo {\n  font-size: 1.5rem;\n  font-weight: 800;\n  background: var(--accent);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n\n.nav-links {\n  display: flex;\n  gap: 2rem;\n}\n\n.nav-link {\n  color: var(--text-secondary);\n  text-decoration: none;\n  font-weight: 500;\n  font-size: 0.9rem;\n  position: relative;\n  padding: 0.5rem 0;\n  transition: var(--transition);\n}\n\n.nav-link::after {\n  content: '';\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 0;\n  height: 2px;\n  background: var(--accent);\n  transition: var(--transition);\n}\n\n.nav-link:hover,\n.nav-link.active {\n  color: var(--text-primary);\n}\n\n.nav-link:hover::after,\n.nav-link.active::after {\n  width: 100%;\n}\n\n/* Hero Section */\n.hero {\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  position: relative;\n  overflow: hidden;\n  padding: 6rem 2rem 2rem;\n}\n\n.hero-bg {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: -2;\n}\n\n.hero-gradient {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: radial-gradient(circle at 30% 20%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),\n              radial-gradient(circle at 70% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 50%);\n  animation: gradientShift 8s ease-in-out infinite;\n}\n\n.floating-elements {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  pointer-events: none;\n}\n\n.floating-element {\n  position: absolute;\n  background: var(--accent);\n  border-radius: 50%;\n  opacity: 0.1;\n  animation: float 6s ease-in-out infinite;\n}\n\n.element-1 { width: 80px; height: 80px; top: 20%; left: 10%; animation-delay: 0s; }\n.element-2 { width: 120px; height: 120px; top: 60%; right: 15%; animation-delay: 2s; }\n.element-3 { width: 60px; height: 60px; top: 80%; left: 20%; animation-delay: 4s; }\n.element-4 { width: 100px; height: 100px; top: 30%; right: 30%; animation-delay: 1s; }\n.element-5 { width: 40px; height: 40px; top: 70%; left: 60%; animation-delay: 3s; }\n.element-6 { width: 90px; height: 90px; top: 10%; left: 70%; animation-delay: 5s; }\n\n.hero-content {\n  max-width: 1200px;\n  margin: 0 auto;\n  display: grid;\n  grid-template-columns: 1fr 400px;\n  gap: 4rem;\n  align-items: center;\n  width: 100%;\n}\n\n.hero-text {\n  z-index: 1;\n}\n\n.greeting {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 1.1rem;\n  color: var(--text-secondary);\n  margin-bottom: 1rem;\n  font-weight: 500;\n}\n\n.wave {\n  display: inline-block;\n  animation: wave 2s ease-in-out infinite;\n  transform-origin: 70% 70%;\n}\n\n.hero-name {\n  font-size: 4rem;\n  font-weight: 900;\n  line-height: 1.1;\n  margin-bottom: 1rem;\n  position: relative;\n}\n\n.name-text {\n  background: var(--accent);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n  position: relative;\n  z-index: 1;\n}\n\n.name-underline {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 0;\n  height: 8px;\n  background: var(--accent);\n  opacity: 0.3;\n  animation: nameUnderline 1s ease-out 0.5s forwards;\n}\n\n.hero-title {\n  font-size: 1.5rem;\n  font-weight: 400;\n  margin-bottom: 1.5rem;\n  color: var(--text-secondary);\n}\n\n.title-highlight {\n  background: var(--accent);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n  font-weight: 600;\n}\n\n.hero-description {\n  font-size: 1.1rem;\n  line-height: 1.7;\n  color: var(--text-secondary);\n  margin-bottom: 2.5rem;\n  max-width: 500px;\n}\n\n.hero-cta {\n  display: flex;\n  gap: 1rem;\n  flex-wrap: wrap;\n}\n\n.cta-primary, .cta-secondary {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 1rem 2rem;\n  border-radius: 12px;\n  text-decoration: none;\n  font-weight: 600;\n  font-size: 1rem;\n  transition: var(--transition);\n  position: relative;\n  overflow: hidden;\n}\n\n.cta-primary {\n  background: var(--accent);\n  color: white;\n  box-shadow: var(--shadow-lg);\n}\n\n.cta-primary::before {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: -100%;\n  width: 100%;\n  height: 100%;\n  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);\n  transition: var(--transition);\n}\n\n.cta-primary:hover::before {\n  left: 100%;\n}\n\n.cta-primary:hover {\n  transform: translateY(-2px);\n  box-shadow: var(--shadow-xl);\n}\n\n.cta-secondary {\n  background: var(--surface);\n  color: var(--text-primary);\n  border: 2px solid var(--border);\n}\n\n.cta-secondary:hover {\n  border-color: var(--text-primary);\n  transform: translateY(-2px);\n}\n\n.cta-arrow {\n  transition: var(--transition);\n}\n\n.cta-primary:hover .cta-arrow {\n  transform: translateX(4px);\n}\n\n/* Hero Visual */\n.hero-visual {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  position: relative;\n}\n\n.profile-card {\n  background: var(--surface);\n  border-radius: 24px;\n  padding: 2rem;\n  box-shadow: var(--shadow-xl);\n  border: 1px solid var(--border);\n  text-align: center;\n  position: relative;\n  backdrop-filter: blur(var(--blur-amount));\n  -webkit-backdrop-filter: blur(var(--blur-amount));\n}\n\n.profile-image {\n  position: relative;\n  width: 180px;\n  height: 180px;\n  margin: 0 auto 1.5rem;\n}\n\n.profile-placeholder {\n  width: 180px;\n  height: 180px;\n  border-radius: 50%;\n  background: var(--accent);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 4rem;\n  position: relative;\n  z-index: 1;\n}\n\n.profile-ring {\n  position: absolute;\n  top: -10px;\n  left: -10px;\n  right: -10px;\n  bottom: -10px;\n  border: 3px solid transparent;\n  border-radius: 50%;\n  background: var(--accent);\n  background-clip: padding-box;\n  animation: profileRing 3s linear infinite;\n}\n\n.profile-status {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  color: var(--text-secondary);\n  font-size: 0.9rem;\n  font-weight: 500;\n}\n\n.status-dot {\n  width: 8px;\n  height: 8px;\n  background: #10b981;\n  border-radius: 50%;\n  animation: pulse 2s ease-in-out infinite;\n}\n\n.scroll-indicator {\n  position: absolute;\n  bottom: 2rem;\n  left: 50%;\n  transform: translateX(-50%);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.5rem;\n  color: var(--text-muted);\n  font-size: 0.8rem;\n  font-weight: 500;\n}\n\n.scroll-line {\n  width: 1px;\n  height: 30px;\n  background: var(--text-muted);\n  animation: scrollLine 2s ease-in-out infinite;\n}\n\n/* Main Content */\n.main-content {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 4rem 2rem;\n  display: flex;\n  flex-direction: column;\n  gap: 6rem;\n}\n\n/* Section Cards */\n.section-card {\n  background: var(--surface);\n  border-radius: 24px;\n  padding: 3rem;\n  box-shadow: var(--shadow-lg);\n  border: 1px solid var(--border);\n  position: relative;\n  overflow: hidden;\n  opacity: 0;\n  transform: translateY(50px);\n  transition: var(--transition-slow);\n  backdrop-filter: blur(var(--blur-amount));\n  -webkit-backdrop-filter: blur(var(--blur-amount));\n}\n\n.section-card.animate-in {\n  opacity: 1;\n  transform: translateY(0);\n}\n\n.section-card::before {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 4px;\n  background: var(--accent);\n}\n\n.section-header {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  margin-bottom: 2.5rem;\n  position: relative;\n}\n\n.section-number {\n  font-size: 1rem;\n  font-weight: 800;\n  color: var(--text-muted);\n  font-family: 'JetBrains Mono', monospace;\n}\n\n.section-header h3 {\n  font-size: 2rem;\n  font-weight: 800;\n  color: var(--text-primary);\n  margin: 0;\n}\n\n.section-line {\n  flex: 1;\n  height: 1px;\n  background: linear-gradient(90deg, var(--border), transparent);\n}\n\n/* About Section */\n.about-content {\n  display: grid;\n  grid-template-columns: 2fr 1fr;\n  gap: 3rem;\n  align-items: start;\n}\n\n.about-text p {\n  margin-bottom: 1.5rem;\n  font-size: 1.1rem;\n  line-height: 1.8;\n  color: var(--text-secondary);\n}\n\n.lead-text {\n  font-size: 1.3rem !important;\n  font-weight: 500;\n  color: var(--text-primary) !important;\n  line-height: 1.6 !important;\n}\n\n.about-stats {\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\n\n.stat-card {\n  background: linear-gradient(135deg, var(--surface), transparent);\n  border: 1px solid var(--border);\n  border-radius: 16px;\n  padding: 1.5rem;\n  text-align: center;\n  transition: var(--transition);\n}\n\n.stat-card:hover {\n  transform: translateY(-4px);\n  box-shadow: var(--shadow-lg);\n  border-color: var(--text-primary);\n}\n\n.stat-number {\n  font-size: 2.5rem;\n  font-weight: 900;\n  background: var(--accent);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n  line-height: 1;\n  margin-bottom: 0.5rem;\n}\n\n.stat-label {\n  font-size: 0.9rem;\n  font-weight: 600;\n  color: var(--text-secondary);\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n\n/* Skills Section */\n.skills-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 1.5rem;\n}\n\n.skill-card {\n  background: linear-gradient(135deg, var(--surface), transparent);\n  border: 1px solid var(--border);\n  border-radius: 16px;\n  padding: 1.5rem;\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  transition: var(--transition);\n  position: relative;\n  overflow: hidden;\n}\n\n.skill-card::before {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: -100%;\n  width: 100%;\n  height: 100%;\n  background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.1), transparent);\n  transition: var(--transition);\n}\n\n.skill-card:hover::before {\n  left: 100%;\n}\n\n.skill-card:hover {\n  transform: translateY(-4px);\n  box-shadow: var(--shadow-lg);\n  border-color: var(--text-primary);\n}\n\n.skill-icon {\n  width: 48px;\n  height: 48px;\n  border-radius: 12px;\n  background: var(--accent);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n\n.skill-dot {\n  width: 12px;\n  height: 12px;\n  background: white;\n  border-radius: 50%;\n  opacity: 0.9;\n}\n\n.skill-content {\n  flex: 1;\n}\n\n.skill-name {\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: var(--text-primary);\n  margin-bottom: 0.5rem;\n}\n\n.skill-level {\n  width: 100%;\n}\n\n.skill-bar {\n  width: 100%;\n  height: 4px;\n  background: var(--border);\n  border-radius: 2px;\n  overflow: hidden;\n}\n\n.skill-progress {\n  height: 100%;\n  background: var(--accent);\n  border-radius: 2px;\n  transform: scaleX(0);\n  transform-origin: left;\n  animation: skillProgress 1s ease-out forwards;\n}\n\n/* Languages Section */\n.languages-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 1.5rem;\n}\n\n.language-card {\n  background: linear-gradient(135deg, var(--surface), transparent);\n  border: 1px solid var(--border);\n  border-radius: 16px;\n  padding: 1.5rem;\n  transition: var(--transition);\n  position: relative;\n  overflow: hidden;\n}\n\n.language-card::before {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: -100%;\n  width: 100%;\n  height: 100%;\n  background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);\n  transition: var(--transition);\n}\n\n.language-card:hover::before {\n  left: 100%;\n}\n\n.language-card:hover {\n  transform: translateY(-4px);\n  box-shadow: var(--shadow-lg);\n  border-color: var(--text-primary);\n}\n\n.language-header {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  margin-bottom: 1rem;\n}\n\n.language-icon {\n  width: 40px;\n  height: 40px;\n  background: var(--accent);\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-size: 1rem;\n  font-weight: 600;\n  font-family: 'JetBrains Mono', monospace;\n}\n\n.language-name {\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: var(--text-primary);\n}\n\n.language-progress {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n\n.progress-track {\n  flex: 1;\n  height: 6px;\n  background: var(--border);\n  border-radius: 3px;\n  overflow: hidden;\n}\n\n.progress-fill {\n  height: 100%;\n  background: var(--accent);\n  border-radius: 3px;\n  transform: scaleX(0);\n  transform-origin: left;\n  animation: skillProgress 1.2s ease-out forwards;\n}\n\n.progress-percentage {\n  font-size: 0.9rem;\n  font-weight: 600;\n  color: var(--text-secondary);\n  min-width: 40px;\n  font-family: 'JetBrains Mono', monospace;\n}\n\n/* Interests Section */\n.interests-container {\n  max-width: 100%;\n}\n\n.interests-intro {\n  font-size: 1.1rem;\n  color: var(--text-secondary);\n  margin-bottom: 2rem;\n  text-align: center;\n  max-width: 600px;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.interests-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 1.5rem;\n}\n\n.interest-card {\n  background: linear-gradient(135deg, var(--surface), transparent);\n  border: 1px solid var(--border);\n  border-radius: 20px;\n  padding: 2rem;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  transition: var(--transition);\n  position: relative;\n  overflow: hidden;\n}\n\n.interest-card::before {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: -100%;\n  width: 100%;\n  height: 100%;\n  background: linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.1), transparent);\n  transition: var(--transition);\n}\n\n.interest-card:hover::before {\n  left: 100%;\n}\n\n.interest-card:hover {\n  transform: translateY(-8px);\n  box-shadow: var(--shadow-xl);\n  border-color: var(--text-primary);\n}\n\n.interest-icon {\n  width: 80px;\n  height: 80px;\n  margin-bottom: 1.5rem;\n  position: relative;\n}\n\n.icon-bg {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: var(--accent);\n  border-radius: 20px;\n  opacity: 0.1;\n  transition: var(--transition);\n}\n\n.interest-card:hover .icon-bg {\n  opacity: 0.2;\n  transform: rotate(5deg) scale(1.1);\n}\n\n.icon-text {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  font-size: 2.5rem;\n}\n\n.interest-title {\n  font-size: 1.2rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 0.5rem;\n}\n\n.interest-description {\n  font-size: 0.9rem;\n  color: var(--text-secondary);\n  line-height: 1.5;\n}\n\n/* Footer */\n.footer {\n  background: var(--surface);\n  border-top: 1px solid var(--border);\n  margin-top: 4rem;\n  backdrop-filter: blur(var(--blur-amount));\n  -webkit-backdrop-filter: blur(var(--blur-amount));\n}\n\n.footer-content {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 3rem 2rem 2rem;\n}\n\n.footer-main {\n  display: grid;\n  grid-template-columns: 1fr 2fr;\n  gap: 3rem;\n  margin-bottom: 2rem;\n}\n\n.footer-info h3 {\n  font-size: 1.5rem;\n  font-weight: 800;\n  background: var(--accent);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n  margin-bottom: 0.5rem;\n}\n\n.footer-info p {\n  color: var(--text-secondary);\n  font-size: 1rem;\n}\n\n.footer-links {\n  display: flex;\n  gap: 2rem;\n  justify-content: flex-end;\n  flex-wrap: wrap;\n}\n\n.footer-link {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 1rem 1.5rem;\n  background: linear-gradient(135deg, var(--surface), transparent);\n  border: 1px solid var(--border);\n  border-radius: 12px;\n  color: var(--text-secondary);\n  text-decoration: none;\n  font-weight: 500;\n  transition: var(--transition);\n  position: relative;\n  overflow: hidden;\n}\n\n.footer-link::before {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: -100%;\n  width: 100%;\n  height: 100%;\n  background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.1), transparent);\n  transition: var(--transition);\n}\n\n.footer-link:hover::before {\n  left: 100%;\n}\n\n.footer-link:hover {\n  color: var(--text-primary);\n  border-color: var(--text-primary);\n  transform: translateY(-2px);\n  box-shadow: var(--shadow-lg);\n}\n\n.link-icon {\n  width: 20px;\n  height: 20px;\n  opacity: 0.8;\n}\n\n.link-icon svg {\n  width: 100%;\n  height: 100%;\n}\n\n.contact-link {\n  background: var(--accent) !important;\n  color: white !important;\n  border-color: transparent !important;\n}\n\n.contact-link:hover {\n  color: white !important;\n  transform: translateY(-2px) scale(1.05);\n}\n\n.footer-bottom {\n  text-align: center;\n  padding-top: 2rem;\n  border-top: 1px solid var(--border);\n  color: var(--text-muted);\n  font-size: 0.9rem;\n}\n\n/* Animations */\n@keyframes spin {\n  to { transform: rotate(360deg); }\n}\n\n@keyframes loadingProgress {\n  to { width: 100%; }\n}\n\n@keyframes float {\n  0%, 100% { transform: translateY(0px) rotate(0deg); }\n  50% { transform: translateY(-20px) rotate(180deg); }\n}\n\n@keyframes gradientShift {\n  0%, 100% { transform: scale(1) rotate(0deg); }\n  50% { transform: scale(1.1) rotate(180deg); }\n}\n\n@keyframes wave {\n  0%, 100% { transform: rotate(0deg); }\n  25% { transform: rotate(15deg); }\n  75% { transform: rotate(-15deg); }\n}\n\n@keyframes nameUnderline {\n  to { width: 200px; }\n}\n\n@keyframes profileRing {\n  0% { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }\n}\n\n@keyframes pulse {\n  0%, 100% { opacity: 1; transform: scale(1); }\n  50% { opacity: 0.5; transform: scale(1.2); }\n}\n\n@keyframes scrollLine {\n  0%, 100% { transform: scaleY(1); opacity: 1; }\n  50% { transform: scaleY(0.5); opacity: 0.5; }\n}\n\n@keyframes skillProgress {\n  to { transform: scaleX(1); }\n}\n\n/* Responsive Design */\n@media (max-width: 1024px) {\n  .hero-content {\n    grid-template-columns: 1fr;\n    gap: 3rem;\n    text-align: center;\n  }\n  \n  .about-content {\n    grid-template-columns: 1fr;\n    gap: 2rem;\n  }\n  \n  .footer-main {\n    grid-template-columns: 1fr;\n    gap: 2rem;\n    text-align: center;\n  }\n  \n  .footer-links {\n    justify-content: center;\n  }\n}\n\n@media (max-width: 768px) {\n  .nav-content {\n    padding: 1rem;\n  }\n  \n  .nav-links {\n    gap: 1rem;\n  }\n  \n  .nav-link {\n    font-size: 0.8rem;\n  }\n  \n  .hero {\n    padding: 5rem 1rem 2rem;\n  }\n  \n  .hero-name {\n    font-size: 2.5rem;\n  }\n  \n  .hero-description {\n    font-size: 1rem;\n  }\n  \n  .main-content {\n    padding: 2rem 1rem;\n    gap: 4rem;\n  }\n  \n  .section-card {\n    padding: 2rem;\n    border-radius: 16px;\n  }\n  \n  .section-header h3 {\n    font-size: 1.5rem;\n  }\n  \n  .skills-grid {\n    grid-template-columns: 1fr;\n  }\n  \n  .languages-grid {\n    grid-template-columns: 1fr;\n  }\n  \n  .interests-grid {\n    grid-template-columns: 1fr;\n  }\n  \n  .hero-cta {\n    flex-direction: column;\n    align-items: center;\n  }\n  \n  .cta-primary, .cta-secondary {\n    width: 100%;\n    max-width: 300px;\n    justify-content: center;\n  }\n  \n  .about-stats {\n    flex-direction: row;\n    gap: 1rem;\n  }\n  \n  .stat-card {\n    flex: 1;\n    padding: 1rem;\n  }\n  \n  .stat-number {\n    font-size: 1.8rem;\n  }\n}\n\n@media (max-width: 480px) {\n  .hero-name {\n    font-size: 2rem;\n  }\n  \n  .section-card {\n    padding: 1.5rem;\n  }\n  \n  .about-stats {\n    flex-direction: column;\n  }\n  \n  .footer-links {\n    flex-direction: column;\n    align-items: center;\n  }\n  \n  .footer-link {\n    width: 100%;\n    max-width: 200px;\n    justify-content: center;\n  }\n}\n\n/* Focus States for Accessibility */\na:focus-visible,\nbutton:focus-visible {\n  outline: 2px solid var(--text-primary);\n  outline-offset: 2px;\n  border-radius: 8px;\n}\n\n/* Scrollbar Styling */\n::-webkit-scrollbar {\n  width: 8px;\n}\n\n::-webkit-scrollbar-track {\n  background: var(--border);\n}\n\n::-webkit-scrollbar-thumb {\n  background: var(--accent);\n  border-radius: 4px;\n}\n\n::-webkit-scrollbar-thumb:hover {\n  background: var(--accent-hover);\n}\n\n/* Print Styles */\n@media print {\n  .nav, .loading, .scroll-indicator {\n    display: none;\n  }\n  \n  .hero {\n    min-height: auto;\n    padding: 2rem 0;\n  }\n  \n  .section-card {\n    box-shadow: none;\n    border: 1px solid #ddd;\n    margin-bottom: 2rem;\n  }\n}\n\n/* High Contrast Mode */\n@media (prefers-contrast: high) {\n  :root {\n    --border: rgba(0, 0, 0, 0.3);\n    --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);\n  }\n}\n\n/* Reduced Motion */\n@media (prefers-reduced-motion: reduce) {\n  *, *::before, *::after {\n    animation-duration: 0.01ms !important;\n    animation-iteration-count: 1 !important;\n    transition-duration: 0.01ms !important;\n    scroll-behavior: auto !important;\n  }\n  \n  .floating-element,\n  .particle,\n  .spinner,\n  .spinner-inner {\n    animation: none !important;\n  }\n}\n");
                    // Create necessary directories
                    return [4 /*yield*/, fs_extra_1.default.ensureDir(path_1.default.join(websiteDir, 'src'))];
                case 4:
                    // Create necessary directories
                    _a.sent();
                    return [4 /*yield*/, fs_extra_1.default.ensureDir(path_1.default.join(websiteDir, 'public'))];
                case 5:
                    _a.sent();
                    // Write files
                    return [4 /*yield*/, Promise.all([
                            fs_extra_1.default.writeFile(path_1.default.join(websiteDir, 'package.json'), JSON.stringify({
                                name: "".concat(answers.name.toLowerCase().replace(/\s+/g, '-'), "-portfolio"),
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
                            fs_extra_1.default.writeFile(path_1.default.join(websiteDir, 'public', 'index.html'), indexHtml),
                            fs_extra_1.default.writeFile(path_1.default.join(websiteDir, 'src', 'App.tsx'), appTsx),
                            fs_extra_1.default.writeFile(path_1.default.join(websiteDir, 'src', 'App.css'), appCss),
                            fs_extra_1.default.writeFile(path_1.default.join(websiteDir, 'src', 'index.tsx'), "\nimport React from 'react';\nimport { createRoot } from 'react-dom/client';\nimport App from './App.tsx';\nimport './App.css';\n\nconst container = document.getElementById('root');\nconst root = createRoot(container!);\nroot.render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>\n);\n      "),
                            fs_extra_1.default.writeFile(path_1.default.join(websiteDir, 'README.md'), "# ".concat(answers.name, "'s Portfolio\n\nThis is a personal portfolio website generated with the Personal Website Generator.\n\n## Available Scripts\n\nIn the project directory, you can run:\n\n### `npm start`\n\nRuns the app in the development mode.Open [http://localhost:3000](http://localhost:3000) to view it in the browser.\n\n### `npm run build`\n\nBuilds the app for production to the `build` folder.It correctly bundles React in production mode and optimizes the build for the best performance.\n\n## Learn More\n\nYou can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).\n\nTo learn React, check out the [React documentation](https://reactjs.org/).\n      "))
                        ])];
                case 6:
                    // Write files
                    _a.sent();
                    // Install dependencies
                    console.log(chalk_1.default.blue('Installing dependencies...'));
                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                            var spawn = require('child_process').spawn;
                            var install = spawn('npm', ['install'], {
                                cwd: websiteDir,
                                stdio: 'inherit',
                                shell: true
                            });
                            install.on('close', function (code) {
                                if (code === 0) {
                                    resolve();
                                }
                                else {
                                    reject(new Error("npm install exited with code ".concat(code)));
                                }
                            });
                        })];
                case 7:
                    _a.sent();
                    console.log(chalk_1.default.green("\n\uD83C\uDF89 Successfully created portfolio website at ".concat(websiteDir)));
                    console.log(chalk_1.default.blue('\nTo get started, run:'));
                    console.log(chalk_1.default.cyan("  cd ".concat(path_1.default.basename(websiteDir))));
                    console.log(chalk_1.default.cyan('  npm start\n'));
                    return [3 /*break*/, 9];
                case 8:
                    error_1 = _a.sent();
                    console.error(chalk_1.default.red('Error generating website:'), error_1.message || error_1);
                    process.exit(1);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var answers, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    console.log(chalk_1.default.blue('\nWelcome to the Personal Website Generator!\n'));
                    return [4 /*yield*/, inquirer_1.default.prompt(QUESTIONS)];
                case 1:
                    answers = _a.sent();
                    return [4 /*yield*/, generateWebsite(answers)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    if (error_2.isTtyError) {
                        console.error(chalk_1.default.red('Error: Prompt couldn\'t be rendered in the current environment'));
                    }
                    else {
                        console.error(chalk_1.default.red('An error occurred:'), error_2.message || error_2);
                    }
                    process.exit(1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
if (require.main === module) {
    main();
}
