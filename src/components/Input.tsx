interface InputProps {
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
  value: string | undefined;
  onChange: (e: any) => void;
  style?: Record<string, string>;
}

const Input = ({ label, type, placeholder, required = false, value, onChange, style}: InputProps) => {
  if (type === 'textarea')
    return (
      <div className="input-container">
        <label htmlFor={label}>
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
      <label htmlFor={label}>
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
