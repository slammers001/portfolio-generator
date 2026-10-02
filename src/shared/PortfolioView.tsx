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
  { id: 'about', index: '01', title: 'About', note: 'A short version of what I do and how I got here.' },
  { id: 'skills', index: '02', title: 'Skills', note: 'What I reach for most, from interface work through to deployment.' },
  {
    id: 'languages',
    index: '03',
    title: 'Languages',
    note: 'The languages I read and write regularly.'
  },
  {
    id: 'interests',
    index: '04',
    title: 'Interests',
    note: 'Where the curiosity goes when there is no brief attached.'
  }
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
  const initials = initialsOf(name);
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
            <span className="wordmark__dot" aria-hidden="true" />
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
            Get in touch
          </a>
        </div>
      </header>

      <main id="main">
        <section className="hero">
          <div className="shell">
            <p className="kicker">{title}</p>

            <h1 className="hero__name">{name}</h1>

            <div className="hero__body">
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

              <p className="hero__summary">
                I design and build software end to end, from the interface down to the services
                behind it. Currently working mostly in {joinNatural(skills.slice(0, 2))}.
              </p>
            </div>

            <dl className="strip">
              <div className="strip__item">
                <dt className="strip__label">Languages</dt>
                <dd className="strip__value">{pad(languages.length)}</dd>
              </div>
              <div className="strip__item">
                <dt className="strip__label">Skills</dt>
                <dd className="strip__value">{pad(skills.length)}</dd>
              </div>
              <div className="strip__item">
                <dt className="strip__label">Interests</dt>
                <dd className="strip__value">{pad(interests.length)}</dd>
              </div>
              <div className="strip__item">
                <dt className="strip__label">Status</dt>
                <dd className="strip__value">
                  <span className="status-dot" aria-hidden="true" />
                  Available for work
                </dd>
              </div>
              <div className="strip__item strip__item--mark">
                <dt className="strip__label">Mark</dt>
                <dd className="strip__value strip__value--mark">{initials}</dd>
              </div>
            </dl>
          </div>
        </section>

        {SECTIONS.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="section reveal"
            data-section={section.id}
          >
            <div className="shell">
              <header className="section__head">
                <p className="section__index">{section.index}</p>
                <h2 className="section__title">{section.title}</h2>
                <p className="section__note">{section.note}</p>
              </header>

              {section.id === 'about' && (
                <div className="prose">
                  <p className="prose__lede">
                    I&apos;m {name}, a {title.toLowerCase()} who believes software should still
                    make sense six months after it ships.
                  </p>
                  <div className="prose__columns">
                    <p>
                      My day-to-day spans {joinNatural(skills.slice(0, 3))}
                      {skills.length > 3 ? ', plus the tooling that keeps them shipping' : ''}. I
                      care about the unglamorous parts: clear boundaries, honest estimates, and
                      code the next person can read without a briefing.
                    </p>
                    <p>
                      Outside of client work you&apos;ll usually find me in
                      {' '}{joinNatural(interests)}. It keeps me close to the reasons people start
                      building things in the first place.
                    </p>
                  </div>
                </div>
              )}

              {section.id === 'skills' && (
                <ul className="index">
                  {skills.map((skill, position) => (
                    <li key={skill} className="index__row">
                      <span className="index__num">{pad(position + 1)}</span>
                      <span className="index__label">{skill}</span>
                    </li>
                  ))}
                </ul>
              )}

              {section.id === 'languages' && (
                <ul className="index index--wide">
                  {languages.map((language, position) => (
                    <li key={language} className="index__row">
                      <span className="index__num">{pad(position + 1)}</span>
                      <span className="index__label">{language}</span>
                    </li>
                  ))}
                </ul>
              )}

              {section.id === 'interests' && (
                <ul className="entries">
                  {interests.map((interest, position) => (
                    <li key={interest} className="entry">
                      <span className="entry__num">{pad(position + 1)}</span>
                      <h3 className="entry__title">{interest}</h3>
                      <p className="entry__text">{interestDescription(interest)}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        ))}

        <section className="outset">
          <div className="shell outset__inner">
            <p className="outset__kicker">Next</p>
            <h2 className="outset__heading">
              Have something in mind that needs building properly?
            </h2>
            <div className="outset__actions">
              {email && (
                <a className="link link--major" href={`mailto:${email}`}>
                  {email}
                  <span aria-hidden="true">↗</span>
                </a>
              )}
              {github && (
                <a
                  className="link"
                  href={`https://github.com/${github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                  <span aria-hidden="true">↗</span>
                </a>
              )}
              {linkedin && (
                <a
                  className="link"
                  href={`https://linkedin.com/in/${linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                  <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="shell footer__inner">
          <p className="footer__name">{name}</p>
          <p className="footer__meta">
            &copy; {year} · {title}
          </p>
          <a className="footer__top" href="#top">
            Back to top
          </a>
        </div>
      </footer>
    </div>
  );
}