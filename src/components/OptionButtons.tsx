"use client";

type Option<T extends string> = {
  value: T;
  label: string;
};

export function OptionButtons<T extends string>({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="option-buttons" role="group" aria-label={name}>
      {options.map((option) => (
        <button
          type="button"
          key={option.value}
          className={value === option.value ? "is-selected" : ""}
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
      <input type="hidden" name={name} value={value} />
    </div>
  );
}
