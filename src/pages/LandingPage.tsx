import { Link } from 'react-router-dom';
import Button from '../component/Button';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="landing-header">
        <img
          src="/Sun-logo.svg"
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
        src="/Vector1.svg"
        alt="Vector 1"
      />
      <img
        className="vector-2"
        src="/Vector2.svg"
        alt="Vector 2"
      />
      <img
        className="vector-3"
        src="/Vector3.svg"
        alt="Vector 3"
      />
      <img
        className="vector-4"
        src="/Vector4.svg"
        alt="Vector 4"
      />
    </div>
  );
};

export default LandingPage;
