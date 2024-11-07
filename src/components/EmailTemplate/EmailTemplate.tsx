import { Link } from 'react-router-dom';
import { socialLinks } from './constants';
import GanttChartPreview from '../../assets/landing-page-gantt-chart-preview.png';
import ApptwareLogo from '../../assets/emailTemaple/apptware-logo.svg';

import './EmailTemplate.scss';
import Button from '../Button';

export const EmailTemplate = () => {
  return (
    <div className="email-temaplate">
      <header>
        <div className="logo">
          <img
            src={ApptwareLogo}
            alt="Apptware Logo"
          />
        </div>
        <div className="greetings">
          <span className="greet-line">Namaste!</span>
          <br />
          <span className="client-name">Deepashree.</span>
        </div>
        <div className="website-message">
          Here's a roadmap for you
          <br />
          Apptware website
        </div>
      </header>
      <div className="content">
        <div className="purple-background"></div>
        <div className="chart">
          <img
            src={GanttChartPreview}
            alt="Gantt Chart Preview"
            width="869px"
            height="391px"
          />
        </div>
        <div className="download-pdf-button">
          <Button>Download as PDF</Button>
        </div>
        <p>
          Thank you for reaching out! we are excited to collaboratewith you for
          Project Name.
        </p>
        <p>
          Kindly book your free
          <Link
            to=""
            target="_blank"
          >
            Consultation call
          </Link>{' '}
          with ourDesign Team for more inputs.
        </p>
      </div>
      <footer>
        <div className="social-links">
          {socialLinks.map((socialLink) => {
            const { name, image } = socialLink;
            return (
              <div className="link-box">
                <img
                  src={image}
                  alt={name}
                  width="100%"
                  height="100%"
                />
              </div>
            );
          })}
        </div>
        <div className="copyrights">&copy; Apptware 2024</div>
      </footer>
    </div>
  );
};
