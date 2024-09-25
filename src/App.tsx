import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/error-page.tsx';
import Root from './pages/root.tsx';
import LandingPage from './pages/landing-page.tsx';
import Form from './pages/form.tsx';
import ProjectEstimation from './pages/project-estimation.tsx';

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
        element: <ProjectEstimation />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
