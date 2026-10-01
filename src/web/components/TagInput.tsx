import { useState, type KeyboardEvent } from 'react';
import { Icon } from '../icons';
import { parseList } from '../../shared/types';

interface TagInputProps {
  id: string;
  label: string;
  values: string[];
  placeholder: string;
  help?: string;
  error?: string;
  invalid?: boolean;
  onChange: (values: string[]) => void;
  onCommit?: () => void;
}

export default function TagInput({
  id,
  label,
  values,
  placeholder,
  help,
  error,
  invalid,
  onChange,
  onCommit
}: TagInputProps) {
  const [draft, setDraft] = useState('');

  function commit(): void {
    const incoming = parseList(draft).filter(
      (value) => !values.some((existing) => existing.toLowerCase() === value.toLowerCase())
    );

    if (incoming.length > 0) {
      onChange([...values, ...incoming]);
      onCommit?.();
    }

    setDraft('');
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      commit();
      return;
    }

    if (event.key === 'Backspace' && draft === '' && values.length > 0) {
      onChange(values.slice(0, -1));
    }
  }

  return (
    <div className="studio-field">
      <div className="studio-field__head">
        <label className="studio-label" htmlFor={id}>
          {label}
        </label>
        <span className="studio-counter">{values.length}</span>
      </div>

      <div className={`studio-tags ${invalid ? 'studio-tags--invalid' : ''}`}>
        {values.map((value) => (
          <span className="studio-tag" key={value}>
            {value}
            <button
              type="button"
              className="studio-tag__remove"
              aria-label={`Remove ${value}`}
              onClick={() => onChange(values.filter((item) => item !== value))}
            >
              <Icon name="close" size={11} />
            </button>
          </span>
        ))}

        <input
          id={id}
          className="studio-tags__input"
          value={draft}
          placeholder={values.length === 0 ? placeholder : ''}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            commit();
            onCommit?.();
          }}
        />
      </div>

      <p className={`studio-help ${error ? 'studio-help--error' : ''}`}>
        {error ?? help}
      </p>
    </div>
  );
}