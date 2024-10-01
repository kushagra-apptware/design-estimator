interface InputProps {
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
  value: string | undefined;
  onChange: (e: any) => void
}

const Input = ({ label, type, placeholder, required = false, value, onChange}: InputProps) => {
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
