import './App.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage.tsx';
import Root from './pages/Root.tsx';
import LandingPage from './pages/LandingPage/LandingPage.tsx';
import Form from './pages/Form.tsx';
import { EstimationPage } from './pages/EstimationPage/EstimationPage.tsx';
import { EmailTemplate } from './components/EmailTemplate/EmailTemplate.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <LandingPage />
      },
      {
        path: '/form',
        element: <Form />
      },
      {
        path: '/project-estimation',
        element: <EstimationPage />
      },
      {
        path: '/email-template',
        element: <EmailTemplate />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
