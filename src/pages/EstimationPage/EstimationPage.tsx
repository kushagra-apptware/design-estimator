import { useEffect, useMemo, useState, useRef } from 'react';
import Button from '../../components/Button';
import { GanttChart } from '../../components/GanttChart/GanttChart';
import { TaskDrawer } from '../../components/TaskDrawer/TaskDrawer';
import { useForm } from '../../context/FormContext';
import { ButtonTypes } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import './EstimationPage.scss';

const standardDataInHours = {
  DiscoveryPlanning: 40,
  InformationArchitectureWireframing: 46,
  VisualDesignPrototyping: 36,
  TestingHandoff: 24,
  PostHandoffSupportOptimization: 24
};

const colors = {
  DiscoveryPlanning: {
    backgroundColor: 'red',
    color: 'white'
  },
  InformationArchitectureWireframing: {
    backgroundColor: 'blue',
    color: 'white'
  },
  VisualDesignPrototyping: {
    backgroundColor: 'green',
    color: 'white'
  },
  TestingHandoff: {
    backgroundColor: 'orange',
    color: 'white'
  },
  PostHandoffSupportOptimization: {
    backgroundColor: 'white',
    color: 'black'
  }
};

const domainWiseComplexityInPercentage = {
  'Ecommerce': 0,
  'Healthcare': 40,
  'Fintech': 50,
  'Lifestyle': -10,
  'Entertainment': 0,
  'Gaming': 0,
  'Elearning': 0,
  'Data Science': -30
};

const stageWiseComplexityInHours = {
  Concept: 0,
  Planning: -36,
  Enhancement: -40,
  Revamp: -40
};

const calculateEndDate = (
  startDate: number,
  totalUnits: number,
  unitsPerDay: number
) => {
  const daysRequired = totalUnits / unitsPerDay;
  const endDate = startDate + daysRequired - 1;

  return Math.ceil(endDate);
};

const weekDays = ['S', 'S', 'M', 'T', 'W', 'T', 'F'];

const modifyStandardData = (
  domains: (keyof typeof domainWiseComplexityInPercentage)[],
  stages: (keyof typeof stageWiseComplexityInHours)[]
) => {
  let finalArray: any = [];
  const domainAmount = domains.reduce(
    (acc, domain) => acc + domainWiseComplexityInPercentage[domain],
    0
  );
  const stageHours = stages.reduce(
    (acc, stage) => acc + stageWiseComplexityInHours[stage],
    0
  );
  let obj = { ...standardDataInHours };
  Object.keys(standardDataInHours).forEach((key) => {
    (obj as any)[key] += ((obj as any)[key] * domainAmount) / 100;
    (obj as any)[key] += stageHours;

    const itemsLength = finalArray.length;
    let currentIndex = itemsLength;
    if (currentIndex > 0) {
      currentIndex = currentIndex - 1;
    }
    const finalSum = (obj as any)[key];
    let startDate = itemsLength ? finalArray[currentIndex].endDate + 1 : 2;
    let endDate = calculateEndDate(startDate, finalSum, 8);

    for (let i = startDate; i <= endDate; i++) {
      if (weekDays[i % 7] === 'S') {
        if (i === startDate) {
          startDate += 1;
        }
        endDate += 1;
      }
    }

    let item = {
      id: (finalArray.length + 1).toString(),
      content: key.replace(/([A-Z])/g, ' $1').trim(),
      key,
      startDate,
      endDate,
      duration: Math.ceil(finalSum / 8)
    };
    if (finalSum > 0) finalArray.push(item);
  });

  finalArray = finalArray.map((each: any) => ({
    ...each,
    icons: [{ type: 'user', content: 'A' }],
    backgroundColor: (colors as any)[each.key].backgroundColor,
    color: (colors as any)[each.key].color
  }));

  return finalArray;
};

export const EstimationPage = () => {
  const navigate = useNavigate();
  const { setInitialStep, formData } = useForm();
  const divRef = useRef<HTMLDivElement>(null);

  const { domain, phase, projectDetails } = formData;

  const handleEditDetails = () => {
    setInitialStep();
    navigate('/form');
  };

  const standardData = useMemo(() => {
    return modifyStandardData(
      domain?.projectDomain as unknown as (keyof typeof domainWiseComplexityInPercentage)[],
      phase?.projectStage as unknown as (keyof typeof stageWiseComplexityInHours)[]
    );
  }, [domain?.projectDomain, phase?.projectStage]);

  const totalDays = standardData.reduce(
    (acc: any, next: { duration: any }) => acc + next.duration,
    0
  );

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [startDay, setStartDay] = useState(1);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const handleTaskItemClick = (id: string) => {
    setSelectedTaskId(id.split('-')[0]);
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handlePrevClick = () => {
    setStartDay(Math.max(1, startDay - 10));
  };

  const handleNextClick = () => {
    setStartDay(Math.min(14, startDay + 10));
  };

  useEffect(() => {
    if (!domain?.projectDomain?.length || !phase?.projectStage?.length) {
      handleEditDetails();
    }
  }, []);

  const downloadAsPDF = async () => {
    if (!divRef.current) return;

    const element: HTMLElement | null = document.querySelector(
      '#gantt-chart-container'
    );
    if (element !== null) {
      const originalOverflow = element.style.overflow;
      element.style.overflow = 'visible';
      await html2canvas(element, {
        scale: 2, // Increase scale for better quality
        width: element.scrollWidth, // Ensure you're capturing the full width
        height: element.scrollHeight // Capture full height of the content
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'px',
          format: [element.scrollWidth, element.scrollHeight] // Adjust height as needed
        });

        pdf.addImage(
          imgData,
          'PNG',
          0,
          0,
          element.scrollWidth,
          element.scrollHeight
        ); // Match the width and height
        pdf.save('download.pdf');
        element.style.overflow = originalOverflow;
      });
    }
  };

  return (
    <div className={`estimation-page ${isDrawerOpen ? 'hide-scroll' : null}`}>
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
              height="618px"
              onTaskItemClick={handleTaskItemClick}
              startDay={startDay}
              divRef={divRef}
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
            <Button onClick={downloadAsPDF}>Download as PDF</Button>
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
              disabled={startDay === 14}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
