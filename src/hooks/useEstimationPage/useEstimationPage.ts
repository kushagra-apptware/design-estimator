import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../context/FormContext';
import {
  domainWiseComplexityInPercentage,
  modifyStandardData,
  stageWiseComplexityInHours
} from '../../utils/estimationPageUtils/modifyStandardData';

export const useEstimationPage = () => {
  const navigate = useNavigate();
  const { setInitialStep, formData } = useForm();
  const { domain, phase } = formData;
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [startDay, setStartDay] = useState(1);

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
    setStartDay
  };
};
