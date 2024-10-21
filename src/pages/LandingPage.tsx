import { Link } from 'react-router-dom';
import Button from '../components/Button';
import SunLogo from '../assets/Sun-logo.svg';
import Vector1 from '../assets/Vector1.svg';
import Vector2 from '../assets/Vector2.svg';
import Vector3 from '../assets/Vector3.svg';
import Vector4 from '../assets/Vector4.svg';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="landing-header">
        <img
          src={SunLogo}
          alt="Sun Logo"
        />
        <h1>Swift Project</h1>
      </div>
      <div className="landing-description">
        <p>
          Having trouble planning your project timeline? <br />
          Our tool can help you generates them in only 5 clicks.
        </p>
        <div>
          <Link to="/form">
            <Button>Try Now!</Button>
          </Link>
        </div>
      </div>
      <img
        className="vector-1"
        src={Vector1}
        alt="Vector 1"
      />
      <img
        className="vector-2"
        src={Vector2}
        alt="Vector 2"
      />
      <img
        className="vector-3"
        src={Vector3}
        alt="Vector 3"
      />
      <img
        className="vector-4"
        src={Vector4}
        alt="Vector 4"
      />
    </div>
  );
};

export default LandingPage;
