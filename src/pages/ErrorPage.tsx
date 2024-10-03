import { useNavigate, useRouteError } from 'react-router-dom';
import Button from '../components/Button';

interface RouteError {
  message: string;
  status?: number;
}

export default function ErrorPage() {
  const error = useRouteError() as RouteError;
  console.error(error);
  const navigate = useNavigate();

  const handleReload = () => {
    window.location.reload();
  };

  const handleGoToHome = () => {
    navigate('/')
  }

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>{error?.message}</p>
      <div>
      <Button onClick={handleReload}>Reload page</Button>
      <Button onClick={handleGoToHome}>Go back to Homepage</Button>
      </div>
    </div>
  );
}
