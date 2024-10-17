import { useState } from 'react';
import Button from '../../components/Button';
import { GanttChartComponent } from '../../components/GanttChart/GanttChart';
import { ButtonTypes } from '../../utils/constants';
import './EstimationPage.scss';

export const EstimationPage = () => {
  const [startDay, setStartDay] = useState(1);

  const handlePrevClick = () => {
    setStartDay(Math.max(1, startDay - 10));
  };

  const handleNextClick = () => {
    setStartDay(Math.min(18, startDay + 10));
  };

  return (
    <div className="estimation-page">
      <div className="navbar"></div>
      <div className="purple-bg"></div>
      <div className="headers">
        <div className="left-part">
          <div className="subtitle">Project Domain</div>
          <div className="title">Project Name</div>
        </div>
        <div className="right-part">
          <div className="title">30 Days</div>
          <div className="subtitle">Project completion time</div>
        </div>
      </div>
      <div className="chart">
        <div className="tabs">Branding</div>
        <div className="chart">
          <GanttChartComponent startDay={startDay} />
        </div>
        <div className="chart-actions">
          <div className="left-actions flex-center">
            <Button variant={ButtonTypes.SECONDARY}>Edit Details</Button>
            <Button>Download as PDF</Button>
          </div>

          <div className="right-actions">
            <button
              onClick={handlePrevClick}
              className="buttons"
              disabled={startDay === 1}
            >
              &lt;
            </button>
            <button
              onClick={handleNextClick}
              className="buttons"
              disabled={startDay === 18}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
