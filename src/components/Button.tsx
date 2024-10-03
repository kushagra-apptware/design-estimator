import { ButtonTypes } from '../utils/constants';

interface ButtonProps {
  children: any;
  onClick?: () => void;
  variant?: ButtonTypes;
}

const Button = ({ children, onClick, variant = ButtonTypes.PRIMARY }: ButtonProps) => {
  switch (variant) {
    case ButtonTypes.SECONDARY:
      return (
        <button
          className="btn-secondary"
          onClick={onClick}
        >
          {children}
        </button>
      );
    default:
      return (
        <button
          className="btn-primary"
          onClick={onClick}
        >
          {children}
        </button>
      );
  }
};

export default Button;
