import classNames from 'classnames';
import Logo from '../assets/Logo.png';
import { useCallback } from 'react';
import { ChartActions } from './ChartActions';

const Navbar = () => {
  const isChartPage = window.location.href.includes('project-estimation');

  const getClassName = useCallback(() => {
    const defaultClassName = 'navbar-wrapper';

    /**
     * when in chart page, the background of the navbar should be purple too
     */
    return classNames(defaultClassName, {
      'purple-bg': isChartPage,
      'sticky-wrapper': isChartPage
    });
  }, [isChartPage]);

  return (
    <div className={getClassName()}>
      <nav>
        <a href="/">
          <img src={Logo} />
        </a>
        {
          isChartPage && <ChartActions />
        }
        
      </nav>
    </div>
  );
};

export default Navbar;
