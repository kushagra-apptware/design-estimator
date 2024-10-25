import { useEffect } from 'react';
import Button from '../../components/Button';
import { GanttChart } from '../../components/GanttChart/GanttChart';
import Loader from '../../components/Loader/Loader';
import { TaskDrawer } from '../../components/TaskDrawer/TaskDrawer';
import { useForm } from '../../context/FormContext';
import { useDownloadAsPDF } from '../../hooks/useDownloadAsPDF/useDownloadAsPDF';
import { ButtonTypes } from '../../utils/constants';
import { useEstimationPage } from '../../hooks/useEstimationPage/useEstimationPage';

import './EstimationPage.scss';

export const EstimationPage = () => {
  const { downloadAsPDF, loading, divRef, spanRef } = useDownloadAsPDF();
  const { formData } = useForm();
  const { domain, phase, projectDetails } = formData;
  const {
    chartDays,
    handleEditDetails,
    handleNextClick,
    handlePrevClick,
    handleTaskItemClick,
    standardData,
    totalDays,
    selectedTaskId,
    isDrawerOpen,
    setIsDrawerOpen,
    startDay,
    setStartDay
  } = useEstimationPage();

  useEffect(() => {
    if (!domain?.projectDomain?.length || !phase?.projectStage?.length) {
      handleEditDetails();
    }
  }, []);

  return (
    <div className={`estimation-page ${isDrawerOpen ? 'hide-scroll' : null}`}>
      {loading && <Loader />}
      {isDrawerOpen && (
        <TaskDrawer
          isDrawerOpen
          setIsDrawerOpen={setIsDrawerOpen}
          selectedTaskId={selectedTaskId}
          tasks={standardData}
        />
      )}
      <div className="navbar"></div>
      <div className="purple-bg"></div>
      <div className="headers">
        <div className="left-part">
          <div className="subtitle">{domain?.projectDomain?.[0]}</div>
          <div className="title">{projectDetails?.projectName}</div>
        </div>
        <div className="right-part">
          <div className="title">{Math.ceil(totalDays)} Days</div>
          <div className="subtitle">Project completion time</div>
        </div>
      </div>
      <div className="chart">
        <div className="tabs">{domain?.projectDomain?.[0]}</div>
        <div className="chart">
          {Boolean(standardData.length) && (
            <GanttChart
              tasks={standardData}
              height="603px"
              onTaskItemClick={handleTaskItemClick}
              startDay={startDay}
              divRef={divRef}
              spanRef={spanRef}
            />
          )}
          {!Boolean(standardData.length) && (
            <div className="warning">
              Please update your selections to view a timeline
            </div>
          )}
        </div>
        <div className="chart-actions">
          <div className="left-actions flex-center">
            <Button
              variant={ButtonTypes.SECONDARY}
              onClick={handleEditDetails}
            >
              Edit Details
            </Button>
            <Button
              onClick={async () => {
                await setStartDay(1);
                downloadAsPDF();
              }}
            >
              Download as PDF
            </Button>
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
              disabled={startDay === chartDays - 15}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
