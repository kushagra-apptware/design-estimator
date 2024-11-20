import { Link } from 'react-router-dom';
import SunLogo from '../../assets/Sun-logo.svg';
import Vector1 from '../../assets/Vector1.svg';
import Vector4 from '../../assets/Vector4.svg';
import GanttChartPreview from '../../assets/landing-page-gantt-chart-preview.png';
import Button from '../../components/Button';

import './LandingPage.scss';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="landing-header">
        <img
          src={SunLogo}
          alt="Sun Logo"
        />
        <h1>
          Turn Big Ideas Into
          <br />
          Actionable Steps
        </h1>
      </div>
      <div className="landing-description">
        <p>
          Leverage a dynamic project roadmap tool to plan, track, and execute
          effortlessly.
        </p>
        <div>
          <Link to="/form">
            <Button>Try Now!</Button>
          </Link>
        </div>
      </div>
      <div className="gantt-chart-preview">
        <img
          src={GanttChartPreview}
          alt="Gantt Chart Preview"
          width="100%"
          height="100%"
        />
      </div>
      <img
        className="vector-1"
        src={Vector1}
        alt="Vector 1"
      />
      <img
        className="vector-4"
        src={Vector4}
        alt="Vector 4"
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default LandingPage;
