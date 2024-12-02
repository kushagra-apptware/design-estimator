import { useMemo } from 'react';
import { useEstimationPage } from '../../hooks/useEstimationPage/useEstimationPage';
import { weekDays } from '../../utils/estimationPageUtils/modifyStandardData';

export const useGanttChart = () => {
  const { serviceEstimatesToPlot: plots } = useEstimationPage();

  const finalPlots = useMemo(() => {
    return plots.map((eachTask) => {
      let isSub = false;
      let subCount = 0;
      let { startDate, endDate } = eachTask;
      const newarr = [];
      for (let i = startDate; i < endDate; i++) {
        if (weekDays[i % 7] === 'S') {
          isSub = true;
          newarr.push({
            ...eachTask,
            startDate,
            endDate: i,
            isSub,
            isStart: subCount === 0,
            isEnd: i === endDate - 1,
            task: subCount === 0 ? eachTask.task : '',
            id: eachTask.id + '-' + subCount++
          });
          newarr.push({
            ...eachTask,
            startDate: i + 1,
            endDate: i + 2,
            isSub,
            isStart: subCount === 0,
            isEnd: i === endDate - 1,
            task: subCount === 0 ? eachTask.task : '',
            id: eachTask.id + '-' + subCount++,
            opacity: 0.65,
            isWeekend: true
          });
          i = i + 2;
          startDate = i + 1;
          endDate = endDate;
        }
      }
      newarr.push({
        ...eachTask,
        startDate,
        endDate,
        isSub,
        isStart: subCount === 0,
        isEnd: true,
        task: subCount === 0 ? eachTask.task : '',
        id: eachTask.id + '-' + subCount++
      });
      return newarr;
    });
  }, [plots]);

  const finalResult = useMemo(() => {
    const result: any[] = [];
    let currentIndex = 0;
    finalPlots.forEach((eachPlot, plotIndex) => {
      /**
       * if it is first element in finalPlots, push it as is to result
       */
      if (plotIndex === 0) {
        result.push([eachPlot]);
      } else {
        /**
         * if it is not first element
         * if the parent task of current and prev elements is different
         * then push it to 0th element
         */
        const currentParentTask = eachPlot[0].parentTask;
        const previousParentTask = finalPlots[plotIndex - 1][0].parentTask;

        if (previousParentTask !== currentParentTask) {
          currentIndex = 0;
        } else {
          currentIndex++;
        }
        if (result[currentIndex]) {
          result[currentIndex].push(eachPlot);
        } else {
          result[currentIndex] = [];
          result[currentIndex].push(eachPlot);
        }
      }
    });
    return result.map((each) => each.flatMap((item: any[]) => item));
  }, [finalPlots]);

  return {
    finalResult
  };
};
