import './App.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage.tsx';
import Root from './pages/Root.tsx';
import LandingPage from './pages/LandingPage.tsx';
import Form from './pages/Form.tsx';
import ProjectEstimation from './pages/ProjectEstimation.tsx';
import { GanttChartComponent } from './components/GanttChart/GanttChart.tsx';

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
      },
      {
        path: '/gantt-chart',
        element: <GanttChartComponent />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
