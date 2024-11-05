interface InputProps {
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
  value: string | undefined;
  onChange: (e: any) => void;
  hasError: Record<string, boolean>;
  style?: Record<string, string>;
}

const toCamelCase = (str: string) => {
  return str
    .toLowerCase()
    .split(' ')
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join('');
};

const Input = ({
  label,
  type,
  placeholder,
  required = false,
  value,
  onChange,
  hasError,
  style
}: InputProps) => {
  const identifierValue = toCamelCase(label);

  if (type === 'textarea')
    return (
      <div className="input-container">
        <label
          htmlFor={label}
          style={{ color: hasError[identifierValue] ? 'red' : 'inherit' }}
        >
          {label}
          {required ? <span>*</span> : <></>}
        </label>
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={style}
        />
      </div>
    );
  return (
    <div className="input-container">
      <label
        htmlFor={label}
        style={{ color: hasError[identifierValue] ? 'red' : 'inherit' }}
      >
        {label}
        {required ? <span>*</span> : <></>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
