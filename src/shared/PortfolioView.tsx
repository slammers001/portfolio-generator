import { useEffect, useRef, useState } from 'react';
import './portfolio.css';
import {
  initialsOf,
  interestDescription,
  interestIcon,
  joinNatural,
  type PortfolioAnswers
} from './types';
import { seededPercent, seededUnit } from './random';

export interface PortfolioViewProps {
  answers: PortfolioAnswers;
  /** Skip the intro animation. Used by the live preview in the web app. */
  instant?: boolean;
}

const NAV_SECTIONS = ['about', 'skills', 'languages', 'interests'] as const;

export default function PortfolioView({ answers, instant = false }: PortfolioViewProps) {
  const [loaded, setLoaded] = useState(instant);
  const [activeSection, setActiveSection] = useState<string>('about');
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (instant) {
      setLoaded(true);
      return;
    }
    const timer = window.setTimeout(() => setLoaded(true), 1500);
    return () => window.clearTimeout(timer);
  }, [instant]);

  useEffect(() => {
    if (!loaded) return;

    const root = rootRef.current;
    if (!root || typeof IntersectionObserver === 'undefined') return;

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

    const sections = root.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [loaded]);

  const { name, title, skills, languages, interests, email, github, linkedin } = answers;

  if (!loaded) {
    return (
      <div className="loading">
        <div className="loading-content">
          <div className="spinner-container">
            <div className="spinner" />
            <div className="spinner-inner" />
          </div>
          <h2>Loading Portfolio...</h2>
          <div className="loading-bar">
            <div className="loading-progress" />
          </div>
        </div>
        <div className="loading-particles">
          {Array.from({ length: 20 }, (_, index) => (
            <div
              key={index}
              className="particle"
              style={{
                left: `${seededUnit(`particle-x-${index}`) * 100}%`,
                animationDelay: `${seededUnit(`particle-delay-${index}`) * 2}s`,
                animationDuration: `${3 + seededUnit(`particle-duration-${index}`) * 2}s`
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="app" ref={rootRef}>
      <nav className="nav">
        <div className="nav-content">
          <div className="nav-logo">
            <span className="logo-text">
              {name.trim().split(/\s+/)[0] || 'Portfolio'}
            </span>
          </div>
          <div className="nav-links">
            {NAV_SECTIONS.map((section) => (
              <a
                key={section}
                href={`#${section}`}
                className={`nav-link ${activeSection === section ? 'active' : ''}`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-bg">
          <div className="hero-gradient" />
          <div className="floating-elements">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <div key={index} className={`floating-element element-${index + 1}`} />
            ))}
          </div>
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <div className="greeting">
              <span className="wave">👋</span>
              <span>Hello, I&apos;m</span>
            </div>
            <h1 className="hero-name">
              <span className="name-text">{name}</span>
              <div className="name-underline" />
            </h1>
            <h2 className="hero-title">
              <span className="title-highlight">{title}</span>
            </h2>
            <p className="hero-description">
              Passionate about creating exceptional digital experiences with expertise in{' '}
              {joinNatural(skills.slice(0, 2))}. Let&apos;s build something amazing together.
            </p>
            <div className="hero-cta">
              <a href="#about" className="cta-primary">
                <span>Explore My Work</span>
                <div className="cta-arrow">→</div>
              </a>
              {email && (
                <a href={`mailto:${email}`} className="contact-button" aria-label="Contact via Email">
                  <span className="icon">✉️</span>
                  <span>{email}</span>
                </a>
              )}
            </div>
          </div>
          <div className="hero-visual">
            <div className="profile-card">
              <div className="profile-image">
                <div className="profile-placeholder">
                  <span className="profile-emoji">{initialsOf(name)}</span>
                </div>
                <div className="profile-ring" />
              </div>
              <div className="profile-status">
                <div className="status-dot" />
                <span>Available for work</span>
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-line" />
          <span>Scroll to explore</span>
        </div>
      </header>

      <main className="main-content">
        <section id="about" className="about section-card">
          <div className="section-header">
            <h3>About Me</h3>
            <div className="section-line" />
          </div>
          <div className="about-content">
            <div className="about-text">
              <p className="lead-text">
                Welcome to my digital space! I&apos;m a passionate {title.toLowerCase()} with a love
                for crafting exceptional user experiences and robust applications.
              </p>
              <p>
                My expertise spans across {joinNatural(skills.slice(0, 3))}
                {skills.length > 3 ? ' and more' : ''}. I thrive on turning complex problems into
                elegant solutions and believe that great code should be both functional and
                beautiful.
              </p>
              <p>
                When I&apos;m not coding, you&apos;ll find me exploring {joinNatural(interests)},
                always staying curious and learning.
              </p>
            </div>
            <div className="about-stats">
              <div className="stat-card">
                <div className="stat-number">{languages.length}+</div>
                <div className="stat-label">Languages</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{skills.length}+</div>
                <div className="stat-label">Skills</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{interests.length}+</div>
                <div className="stat-label">Interests</div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="skills section-card">
          <div className="section-header">
            <h3>Skills &amp; Expertise</h3>
            <div className="section-line" />
          </div>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div key={skill} className="skill-card">
                <div className="skill-icon">
                  <div className="skill-dot" />
                </div>
                <div className="skill-content">
                  <div className="skill-name">{skill}</div>
                  <div className="skill-level">
                    <div className="skill-bar">
                      <div
                        className="skill-progress"
                        style={{
                          width: `${seededPercent(`skill-${skill}`, 70, 99)}%`,
                          animationDelay: `${index * 0.1}s`
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="languages" className="languages section-card">
          <div className="section-header">
            <h3>Programming Languages</h3>
            <div className="section-line" />
          </div>
          <div className="languages-grid">
            {languages.map((language, index) => {
              const percent = seededPercent(`language-${index}-${language}`, 60, 99);
              return (
                <div key={language} className="language-card">
                  <div className="language-header">
                    <div className="language-icon">
                      <code>&lt;/&gt;</code>
                    </div>
                    <div className="language-name">{language}</div>
                  </div>
                  <div className="language-progress">
                    <div className="progress-track">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${percent}%`,
                          animationDelay: `${index * 0.15}s`
                        }}
                      />
                    </div>
                    <div className="progress-percentage">{percent}%</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section id="interests" className="interests section-card">
          <div className="section-header">
            <h3>Areas of Interest</h3>
            <div className="section-line" />
          </div>
          <div className="interests-container">
            <p className="interests-intro">
              These are the areas that fuel my passion and drive my continuous learning journey.
            </p>
            <div className="interests-grid">
              {interests.map((interest) => (
                <div key={interest} className="interest-card">
                  <div className="interest-icon">
                    <div className="icon-bg" />
                    <span className="icon-text">{interestIcon(interest)}</span>
                  </div>
                  <div className="interest-content">
                    <h4 className="interest-title">{interest}</h4>
                    <div className="interest-description">
                      {interestDescription(interest)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-main">
            <div className="footer-info">
              <h3>{name}</h3>
              <p>Let&apos;s create something amazing together</p>
            </div>
            <div className="footer-links">
              {github && (
                <a
                  href={`https://github.com/${github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                  aria-label="GitHub Profile"
                >
                  <div className="link-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </div>
                  <span>GitHub</span>
                </a>
              )}
              {linkedin && (
                <a
                  href={`https://linkedin.com/in/${linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                  aria-label="LinkedIn Profile"
                >
                  <div className="link-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </div>
                  <span>LinkedIn</span>
                </a>
              )}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="footer-link contact-link"
                  aria-label="Contact via Email"
                >
                  <div className="link-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h1.82L12 11.73l8.545-7.909h1.819c.904 0 1.636.732 1.636 1.636z" />
                    </svg>
                  </div>
                  <span>{email}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}