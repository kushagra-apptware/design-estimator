import { useRouteError } from 'react-router-dom';

interface RouteError {
  message: string;
  status?: number;
}

export default function ErrorPage() {
  const error = useRouteError() as RouteError;
  console.error(error);

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>{error?.message}</p>
      <button onClick={handleReload}>Click to reload</button>
    </div>
  );
}
