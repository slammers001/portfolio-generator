import { Icon } from '../icons';
import type { FieldSpec } from '../fields';

interface TextFieldProps {
  spec: FieldSpec;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
}

export default function TextField({ spec, value, error, onChange, onBlur }: TextFieldProps) {
  return (
    <div className="studio-field">
      <label className="studio-label" htmlFor={spec.key}>
        {spec.label}
      </label>

      <div className={`studio-input-wrap ${error ? 'studio-input-wrap--invalid' : ''}`}>
        {spec.icon && (
          <span className="studio-input-wrap__icon">
            <Icon name={spec.icon} size={15} />
          </span>
        )}
        <input
          id={spec.key}
          className="studio-input"
          value={value}
          placeholder={spec.placeholder}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
        />
      </div>

      <p className={`studio-help ${error ? 'studio-help--error' : ''}`}>
        {error ?? spec.help ?? (spec.optional ? 'Optional' : '')}
      </p>
    </div>
  );
}