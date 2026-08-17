import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type Shared = {
  label: string;
  name: string;
};

type InputField = Shared &
  Omit<InputHTMLAttributes<HTMLInputElement>, "name"> & {
    as?: "input";
  };

type TextareaField = Shared &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "name"> & {
    as: "textarea";
  };

export function Field(props: InputField | TextareaField) {
  const { label, name, as = "input", id, className, ...rest } = props;
  const fieldId = id ?? name;

  return (
    <div className={`field-block${className ? ` ${className}` : ""}`}>
      <label htmlFor={fieldId}>{label}</label>
      {as === "textarea" ? (
        <textarea
          id={fieldId}
          name={name}
          placeholder={label}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={fieldId}
          name={name}
          placeholder={label}
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
    </div>
  );
}

export function FormSuccess({
  message,
  actionLabel,
  onReset,
}: {
  message: string;
  actionLabel: string;
  onReset: () => void;
}) {
  return (
    <div className="form-success" role="status">
      <p>{message}</p>
      <button type="button" className="ghost-btn" onClick={onReset}>
        {actionLabel}
      </button>
    </div>
  );
}
