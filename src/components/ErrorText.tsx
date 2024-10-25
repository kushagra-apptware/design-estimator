interface ErrorText {
  message: string;
  hasError: boolean;
}

const ErrorText = ({ message, hasError }: ErrorText) => {
  return <span className="error-text">{hasError && message}</span>;
};

export default ErrorText;
