import { useEffect, useRef, useState } from 'react';
import './portfolio.css';
import {
  initialsOf,
  interestDescription,
  joinNatural,
  type PortfolioAnswers
} from './types';

export interface PortfolioViewProps {
  answers: PortfolioAnswers;
}

const SECTIONS = [
  { id: 'about', index: '01', title: 'About' },
  { id: 'skills', index: '02', title: 'Skills' },
  { id: 'languages', index: '03', title: 'Languages' },
  { id: 'interests', index: '04', title: 'Interests' }
] as const;

const pad = (value: number) => String(value).padStart(2, '0');

export default function PortfolioView({ answers }: PortfolioViewProps) {
  const [activeSection, setActiveSection] = useState<string>('about');
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const targets = root.querySelectorAll<HTMLElement>('.reveal');
    if (typeof IntersectionObserver === 'undefined') {
      targets.forEach((target) => target.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            element.classList.add('is-visible');
            setActiveSection(element.dataset.section ?? 'about');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  const { name, title, skills, languages, interests, email, github, linkedin } = answers;
  const firstName = name.trim().split(/\s+/)[0] || 'Portfolio';
  const year = new Date().getFullYear();

  return (
    <div className="page" id="top" ref={rootRef}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="masthead">
        <div className="masthead__inner shell">
          <a className="wordmark" href="#top">
            {firstName}
          </a>
          <nav className="masthead__nav" aria-label="Sections">
            {SECTIONS.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`masthead__link ${
                  activeSection === section.id ? 'is-active' : ''
                }`}
                aria-current={activeSection === section.id ? 'true' : undefined}
              >
                {section.title}
              </a>
            ))}
          </nav>
          <a className="masthead__cta" href="#contact">
            Contact
          </a>
        </div>
      </header>

      <main id="main">
        <section className="hero">
          <div className="hero__inner shell">
            <div className="hero__lead">
              <p className="eyebrow">
                <span className="eyebrow__rule" aria-hidden="true" />
                {title}
              </p>
              <h1 className="hero__name">{name}</h1>
              <p className="hero__summary">
                I design and build software end to end, from the interface down to the services
                behind it. Currently focused on {joinNatural(skills.slice(0, 2))}.
              </p>
              <div className="hero__actions">
                <a className="button button--primary" href="#contact">
                  Start a project
                </a>
                {github && (
                  <a
                    className="button button--quiet"
                    href={`https://github.com/${github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                    <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </div>

            <aside className="hero__aside">
              <div className="portrait">
                <span className="portrait__initials">{initialsOf(name)}</span>
                <p className="portrait__status">
                  <span className="status-dot" aria-hidden="true" />
                  Available for work
                </p>
              </div>

              <dl className="facts">
                <div className="facts__row">
                  <dt className="facts__label">Languages</dt>
                  <dd className="facts__value">{pad(languages.length)}</dd>
                </div>
                <div className="facts__row">
                  <dt className="facts__label">Skills</dt>
                  <dd className="facts__value">{pad(skills.length)}</dd>
                </div>
                <div className="facts__row">
                  <dt className="facts__label">Interests</dt>
                  <dd className="facts__value">{pad(interests.length)}</dd>
                </div>
              </dl>
            </aside>
          </div>
        </section>

        <div className="sections shell">
          <section id="about" className="section reveal" data-section="about">
            <div className="section__head">
              <div className="section__headline">
                <p className="section__index">01</p>
                <h2 className="section__title">About</h2>
              </div>
              <p className="section__note">
                A short version of what I do and how I got here.
              </p>
            </div>

            <div className="section__content">
              <div className="prose">
                <p className="prose__lead">
                  I&apos;m {name}, a {title.toLowerCase()} based on the belief that software
                  should be understandable six months after it ships.
                </p>
                <div className="prose__grid">
                  <p>
                    My day-to-day spans {joinNatural(skills.slice(0, 3))}
                    {skills.length > 3 ? ', plus the tooling that keeps them shipping' : ''}. I
                    care about the unglamorous parts: clear boundaries, honest estimates and code
                    the next person can read.
                  </p>
                  <p>
                    Outside of client work you&apos;ll find me in
                    {' '}{joinNatural(interests)}. It keeps me close to the reasons people build
                    things in the first place.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="skills" className="section reveal" data-section="skills">
            <div className="section__head">
              <div className="section__headline">
                <p className="section__index">02</p>
                <h2 className="section__title">Skills</h2>
              </div>
              <p className="section__note">
                What I reach for most, from interface work through to deployment.
              </p>
            </div>

            <div className="section__content">
              <ul className="tiles">
                {skills.map((skill, position) => (
                  <li key={skill} className="tile">
                    <span className="tile__index">{pad(position + 1)}</span>
                    <span className="tile__name">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section id="languages" className="section reveal" data-section="languages">
            <div className="section__head">
              <div className="section__headline">
                <p className="section__index">03</p>
                <h2 className="section__title">Languages</h2>
              </div>
              <p className="section__note">
                The languages I read and write regularly.
              </p>
            </div>

            <div className="section__content">
              <ul className="specs">
                {languages.map((language) => (
                  <li key={language} className="specs__item">
                    {language}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section id="interests" className="section reveal" data-section="interests">
            <div className="section__head">
              <div className="section__headline">
                <p className="section__index">04</p>
                <h2 className="section__title">Interests</h2>
              </div>
              <p className="section__note">
                Where the curiosity goes when there is no brief attached.
              </p>
            </div>

            <div className="section__content">
              <ul className="cards">
                {interests.map((interest, position) => (
                  <li key={interest} className="card">
                    <span className="card__index">{pad(position + 1)}</span>
                    <h3 className="card__title">{interest}</h3>
                    <p className="card__text">{interestDescription(interest)}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </main>

      <footer className="footer" id="contact">
        <div className="footer__inner shell">
          <div className="footer__cta">
            <h2 className="footer__heading">
              Have something in mind that needs building properly?
            </h2>
            <div className="footer__actions">
              {email && (
                <a className="button button--primary" href={`mailto:${email}`}>
                  {email}
                </a>
              )}
              {github && (
                <a
                  className="button button--quiet"
                  href={`https://github.com/${github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                  <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          </div>

          <div className="footer__base">
            <div className="footer__who">
              <p className="footer__name">{name}</p>
              <p className="footer__role">{title}</p>
            </div>

            <nav className="footer__links" aria-label="Elsewhere">
              {linkedin && (
                <a
                  className="footer__link"
                  href={`https://linkedin.com/in/${linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                  <span aria-hidden="true">↗</span>
                </a>
              )}
              <a className="footer__link" href="#top">
                Back to top
              </a>
            </nav>

            <p className="footer__copy">&copy; {year} {name}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}