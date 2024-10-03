interface ErrorText {
  message: string;
}

const ErrorText = ({ message }: ErrorText) => {
  return <span className="error-text">{message}</span>;
};

export default ErrorText;
