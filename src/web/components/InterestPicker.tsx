import { interestIcon, type Interest, type PortfolioAnswers } from '../../shared/types';
import { INTERESTS } from '../../shared/types';

interface InterestPickerProps {
  selected: Interest[];
  onChange: (interests: Interest[]) => void;
}

export default function InterestPicker({ selected, onChange }: InterestPickerProps) {
  return (
    <div className="studio-field">
      <div className="studio-field__head">
        <span className="studio-label">Interests</span>
        <span className="studio-counter">{selected.length}</span>
      </div>

      <div className="studio-interests" role="group" aria-label="Interests">
        {INTERESTS.map((interest) => {
          const active = selected.includes(interest);

          return (
            <button
              key={interest}
              type="button"
              className={`studio-interest ${active ? 'studio-interest--on' : ''}`}
              aria-pressed={active}
              onClick={() =>
                onChange(
                  active
                    ? selected.filter((item) => item !== interest)
                    : ([...selected, interest] as PortfolioAnswers['interests'])
                )
              }
            >
              <span className="studio-interest__emoji" aria-hidden="true">
                {interestIcon(interest)}
              </span>
              <span className="studio-interest__name">{interest}</span>
            </button>
          );
        })}
      </div>
      <p className="studio-help">Pick as many as you like — they fill the last section.</p>
    </div>
  );
}