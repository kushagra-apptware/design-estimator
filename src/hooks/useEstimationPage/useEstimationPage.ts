import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ganttChartConstants } from '../../constants/ganttChartConstants';
import { serviceEstimates } from '../../constants/serviceEstimates';
import { useForm } from '../../context/FormContext';
import {
  ServiceEstimatesWithDatesAndIcons
} from '../../types/serviceEstimates';
import { getTasksFromServiceEstimates } from '../../utils';
import { modifyStandardData } from '../../utils/estimationPageUtils/modifyStandardData';

const { domainWiseComplexityInPercentage, stageWiseComplexityInHours } =
  ganttChartConstants;

export const useEstimationPage = () => {
  const navigate = useNavigate();
  const {
    setInitialStep,
    formData,
    setSelectedTaskId,
    setIsDrawerOpen,
    isDrawerOpen,
    setStartDay,
    startDay,
    selectedTaskId
  } = useForm();
  const { domain, phase } = formData;

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

  const serviceEstimatesToPlot = getTasksFromServiceEstimates(serviceEstimates);

  const totalDays = serviceEstimatesToPlot.reduce(
    (acc: number, next: ServiceEstimatesWithDatesAndIcons) =>
      acc + (next.durationInDays || 0),
    0
  );

  const chartDays = useMemo(() => {
    const weeks = Math.floor(totalDays / 5) + 1;
    return Math.max(weeks * 7, 16);
  }, [totalDays]);

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

  return {
    handleEditDetails,
    standardData,
    totalDays,
    chartDays,
    handleTaskItemClick,
    handlePrevClick,
    handleNextClick,
    selectedTaskId,
    isDrawerOpen,
    setIsDrawerOpen,
    startDay,
    setStartDay,
    serviceEstimatesToPlot
  };
};
