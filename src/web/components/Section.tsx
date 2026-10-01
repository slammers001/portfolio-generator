import type { ReactNode } from 'react';
import { Icon, type IconName } from '../icons';

interface SectionProps {
  icon: IconName;
  title: string;
  hint: string;
  step?: string;
  children: ReactNode;
}

export default function Section({ icon, title, hint, step, children }: SectionProps) {
  return (
    <section className="studio-section">
      <header className="studio-section__head">
        <span className="studio-section__icon">
          <Icon name={icon} size={15} />
        </span>
        <span className="studio-section__titles">
          <span className="studio-section__title">{title}</span>
          <span className="studio-section__hint">{hint}</span>
        </span>
        {step && <span className="studio-section__step">{step}</span>}
      </header>
      <div className="studio-section__body">{children}</div>
    </section>
  );
}