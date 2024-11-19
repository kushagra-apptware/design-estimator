import { useEffect } from 'react';
import Loader from '../../components/Loader/Loader';
import { TaskDrawer } from '../../components/TaskDrawer/TaskDrawer';
import { useForm } from '../../context/FormContext';
import { useDownloadAsPDF } from '../../hooks/useDownloadAsPDF/useDownloadAsPDF';
import { useEstimationPage } from '../../hooks/useEstimationPage/useEstimationPage';
import { GanttChartPlot } from '../../components/GanttChart/GanttChartPlot';

import './EstimationPage.scss';

export const EstimationPage = () => {
  const { loading, divRef, spanRef, sendEmailWithAttachment, chartHeight } =
    useDownloadAsPDF();
  const { formData } = useForm();
  const { domain, phase, projectDetails, projectType } = formData;
  const {
    handleEditDetails,
    handleTaskItemClick,
    standardData,
    totalDays,
    selectedTaskId,
    isDrawerOpen,
    setIsDrawerOpen,
    startDay,
    serviceEstimatesToPlot
  } = useEstimationPage();

  useEffect(() => {
    if (!domain?.projectDomain?.length || !phase?.projectStage?.length) {
      handleEditDetails();
    }

    // Delay the download slightly to ensure the component is fully rendered
    const timer = setTimeout(() => {
      // sendEmailWithAttachment();
    }, 1000); // Adjust delay as needed

    return () => clearTimeout(timer); // Cleanup the timer if component unmounts
  }, []);

  const containerHeight = Math.min(chartHeight || 0, window.innerHeight - 90);

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
          <div className="title">
            {projectDetails?.projectName} - {projectType?.projectTypes?.[0]}
          </div>
        </div>
        <div className="right-part">
          <div className="subtitle">Project completion time</div>
          <div className="title">{Math.ceil(totalDays)} Days</div>
        </div>
      </div>
      <div
        className="chart"
        style={{ height: containerHeight }}
      >
        <div
          className="chart"
          style={{ height: containerHeight }}
        >
          <div
            className="linear-gradient"
            id="linear-gradient"
            style={{ height: containerHeight }}
          ></div>
          {Boolean(serviceEstimatesToPlot.length) && (
            <GanttChartPlot
              plots={serviceEstimatesToPlot}
              onTaskItemClick={handleTaskItemClick}
              startDay={startDay}
              divRef={divRef}
              spanRef={spanRef}
              height={containerHeight}
            />
          )}
          {!Boolean(standardData.length) && (
            <div className="warning">
              Please update your selections to view a timeline
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
