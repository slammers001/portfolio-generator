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
        validate: function (input) { return input.trim().length > 0 || 'GitHub username is required'; }
    },
    {
        type: 'input',
        name: 'linkedin',
        message: 'What is your LinkedIn username?',
        validate: function (input) { return input.trim().length > 0 || 'LinkedIn username is required'; }
    }
];
function generateWebsite(answers) {
    return __awaiter(this, void 0, void 0, function () {
        var websiteDir, htmlContent, cssContent;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    websiteDir = path_1.default.join(process.cwd(), 'my-website');
                    return [4 /*yield*/, fs_extra_1.default.ensureDir(websiteDir)];
                case 1:
                    _a.sent();
                    htmlContent = "\n    <!DOCTYPE html>\n    <html lang=\"en\">\n    <head>\n      <meta charset=\"UTF-8\">\n      <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n      <title>".concat(answers.name, " - ").concat(answers.title, "</title>\n      <link rel=\"stylesheet\" href=\"styles.css\">\n    </head>\n    <body>\n      <nav>\n        <a href=\"https://github.com/").concat(answers.github, "\" target=\"_blank\">GitHub</a>\n        <a href=\"https://linkedin.com/in/").concat(answers.linkedin, "\" target=\"_blank\">LinkedIn</a>\n      </nav>\n      <main>\n        <section class=\"hero\">\n          <h1>").concat(answers.name, "</h1>\n          <h2>").concat(answers.title, "</h2>\n          <div class=\"languages\">\n            <h3>Programming Languages</h3>\n            <ul>").concat(answers.languages.map(function (lang) { return "<li>".concat(lang, "</li>"); }).join(''), "</ul>\n          </div>\n          <div class=\"skills\">\n            <h3>Skills</h3>\n            <ul>").concat(answers.skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join(''), "</ul>\n          </div>\n          <div class=\"interests\">\n            <h3>Interests</h3>\n            <ul>").concat(answers.interests.map(function (int) { return "<li>".concat(int, "</li>"); }).join(''), "</ul>\n          </div>\n        </section>\n      </main>\n    </body>\n    </html>\n  ");
                    cssContent = "\n    * {\n      margin: 0;\n      padding: 0;\n      box-sizing: border-box;\n    }\n\n    body {\n      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\n      line-height: 1.6;\n      ".concat(answers.colorScheme === 'Dark' ? 'background-color: #1a1a1a; color: #ffffff;' : 'background-color: #ffffff; color: #333333;', "\n    }\n\n    nav {\n      padding: 1rem;\n      text-align: center;\n    }\n\n    nav a {\n      margin: 0 1rem;\n      text-decoration: none;\n      color: ").concat(answers.colorScheme === 'Dark' ? '#ffffff' : '#333333', ";\n    }\n\n    main {\n      max-width: 1200px;\n      margin: 0 auto;\n      padding: 2rem;\n    }\n\n    .hero {\n      text-align: center;\n      padding: 4rem 0;\n    }\n\n    h1 {\n      font-size: 3rem;\n      margin-bottom: 1rem;\n    }\n\n    h2 {\n      font-size: 1.5rem;\n      color: ").concat(answers.colorScheme === 'Dark' ? '#cccccc' : '#666666', ";\n    }\n\n    .skills, .interests {\n      margin: 2rem 0;\n    }\n\n    ul {\n      list-style: none;\n      padding-left: 1rem;\n    }\n\n    ul li {\n      margin: 0.5rem 0;\n      padding: 0.5rem;\n      background-color: ").concat(answers.colorScheme === 'Dark' ? '#333333' : '#f0f0f0', ";\n      border-radius: 4px;\n    }\n  ");
                    // Write files
                    return [4 /*yield*/, fs_extra_1.default.writeFile(path_1.default.join(websiteDir, 'index.html'), htmlContent)];
                case 2:
                    // Write files
                    _a.sent();
                    return [4 /*yield*/, fs_extra_1.default.writeFile(path_1.default.join(websiteDir, 'styles.css'), cssContent)];
                case 3:
                    _a.sent();
                    console.log(chalk_1.default.green("\nYour personal website has been generated at: ".concat(websiteDir)));
                    console.log(chalk_1.default.yellow("Open ".concat(websiteDir, "/index.html in your browser to view it!")));
                    return [2 /*return*/];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var answers, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(chalk_1.default.blue('Welcome to Personal Website Generator!'));
                    console.log(chalk_1.default.cyan('Let me help you create a beautiful website!\n'));
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, inquirer_1.default.prompt(QUESTIONS)];
                case 2:
                    answers = _a.sent();
                    return [4 /*yield*/, generateWebsite(answers)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error(chalk_1.default.red('An error occurred:'), error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
main();
