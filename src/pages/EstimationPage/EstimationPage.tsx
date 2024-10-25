import { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import Button from '../../components/Button';
import { GanttChart } from '../../components/GanttChart/GanttChart';
import { TaskDrawer } from '../../components/TaskDrawer/TaskDrawer';
import { useForm } from '../../context/FormContext';
import { ButtonTypes, taskItemTypes } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import './EstimationPage.scss';
import Loader from '../../components/Loader/Loader';

const standardDataInHours = {
  DiscoveryPlanning: 40,
  InformationArchitectureWireframing: 46,
  VisualDesignPrototyping: 36,
  TestingHandoff: 24,
  PostHandoffSupportOptimization: 24
};

const colors = {
  DiscoveryPlanning: {
    backgroundColor: '#BAE813',
    color: 'white'
  },
  InformationArchitectureWireframing: {
    backgroundColor: '#E47912',
    color: 'white'
  },
  VisualDesignPrototyping: {
    backgroundColor: '#729DE7',
    color: 'white'
  },
  TestingHandoff: {
    backgroundColor: '#1EB7AA',
    color: 'white'
  },
  PostHandoffSupportOptimization: {
    backgroundColor: '#FC3A74',
    color: 'white'
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
      duration: Math.ceil(finalSum / 8),
      type: taskItemTypes.TASK
    };
    if (finalSum > 0) {
      finalArray.push(item);

      let startDate = item.endDate + 1;
      let endDate = calculateEndDate(startDate, 16, 8);

      for (let i = startDate; i <= endDate; i++) {
        if (weekDays[i % 7] === 'S' && i == startDate) {
          startDate += 1;
          endDate += 1;
        }
        if (weekDays[i % 7] === 'S' && i == endDate) {
          endDate += 1;
        }
      }

      const newItem = {
        ...item,
        id: (Number(item.id) + 1).toString(),
        type: taskItemTypes.REVIEW,
        content: `Review ${item.content}`,
        startDate,
        endDate,
        duration: 2
      };
      finalArray.push(newItem);
    }
  });

  finalArray = finalArray.map((each: any) => ({
    ...each,
    icons: [{ type: 'user', content: 'A' }],
    backgroundColor: (colors as any)[each.key].backgroundColor,
    color: (colors as any)[each.key].color
  }));

  const totalDurationInDays = finalArray
    .filter((each: any) => each.type === taskItemTypes.TASK)
    .reduce((acc: any, next: { duration: any }) => acc + next.duration, 0);

  if (totalDurationInDays < 10) {
    const daysToAdd = Math.max(totalDurationInDays, 10 - totalDurationInDays);
    finalArray = finalArray.map((each: any, itemIndex: number) => {
      let durationToAdd = 0;
      if (itemIndex > 0) {
        each.startDate = finalArray[itemIndex - 1].endDate + 1;
        each.endDate = finalArray[itemIndex - 1].endDate + each.duration;
      }
      if (each.type === taskItemTypes.TASK) {
        durationToAdd = Math.floor(
          (each.duration / totalDurationInDays) * daysToAdd
        );
        each.duration += durationToAdd;
        let startDate = each.startDate;
        let endDate = startDate + durationToAdd;

        for (let i = startDate; i <= endDate; i++) {
          if (weekDays[i % 7] === 'S') {
            if (i === startDate) {
              startDate += 1;
            }
            endDate += 1;
          }
        }

        each.startDate = startDate;
        each.endDate = endDate;
      }

      if (each.type === taskItemTypes.REVIEW) {
        let startDate = each.startDate;
        let endDate = each.endDate;

        for (let i = startDate; i <= endDate; i++) {
          if (weekDays[i % 7] === 'S' && i == startDate) {
            startDate += 1;
            endDate += 1;
          }
          if (weekDays[i % 7] === 'S' && i == endDate) {
            endDate += 1;
          }
        }

        each.startDate = startDate;
        each.endDate = endDate;
      }

      return each;
    });
  }

  return finalArray;
};

export const EstimationPage = () => {
  const navigate = useNavigate();
  const { setInitialStep, formData } = useForm();
  const divRef = useRef<HTMLDivElement>(null);
  const spanRef = useRef<HTMLDivElement>(null);

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

  const chartDays = useMemo(() => {
    const weeks = Math.floor(totalDays / 5) + 1;
    return Math.max(weeks * 7, 16);
  }, [totalDays]);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [startDay, setStartDay] = useState(1);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTaskItemClick = (id: string) => {
    setSelectedTaskId(id.split('-')[0]);
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handlePrevClick = useCallback(() => {
    setStartDay(Math.max(1, startDay - 15));
  }, [startDay]);

  const handleNextClick = useCallback(() => {
    setStartDay(Math.min(chartDays - 15, startDay + 15));
  }, [chartDays, startDay]);

  useEffect(() => {
    if (!domain?.projectDomain?.length || !phase?.projectStage?.length) {
      handleEditDetails();
    }
  }, []);

  const downloadAsPDF = async () => {
    if (!divRef.current || !spanRef.current) return;

    const element: HTMLElement | null = document.querySelector(
      '#gantt-chart-container'
    );

    const spanElement: HTMLElement | null = document.querySelector(
      '#gantt-chart-content-wrapper'
    );

    if (element !== null && spanElement !== null) {
      setLoading(true)
      const originalOverflow = element.style.overflow;
      const originalOverflowSpan = spanElement.style.overflow;
      element.style.overflow = 'visible';
      spanElement.style.overflow = 'visible';
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
        const fileName =
          projectDetails?.projectName &&
          domain?.projectDomain &&
          phase?.projectStage
            ? projectDetails?.projectName +
              '-' +
              domain?.projectDomain +
              '-' +
              phase?.projectStage
            : 'gantt-chart';
        pdf.save(`${fileName.toLowerCase()}.pdf`);
        element.style.overflow = originalOverflow;
        spanElement.style.overflow = originalOverflowSpan;
        setLoading(false)
    });
    }
  };

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
