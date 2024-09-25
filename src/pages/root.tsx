import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../component/navbar';
import { FormProvider } from '../context/form-context';

const Root = () => {

  const { pathname } = useLocation();

  /** Styles  for setting background image*/
  const style = {
    backgroundImage: pathname === "/" ? 'url("/Background.png")' : 'none',
    backgroundSize: 'cover', 
    backgroundPosition: 'center',
    height: '100vh'
  };

  return (
    <div className="app" style={style}>
      <Navbar />
      <FormProvider>
      <Outlet />
      </FormProvider>
    </div>
  );
};

export default Root;
