/** Following rules are followed for reading / modifying each task object */
/** RULE 1: if reviews key is absent or undefined AND if needsReview is true, then append reviews: [REVIEW_AND_ITERATION] */
/** RULE 2: if reviews key is present AND needsReview is true, just ignore this case */
/** RULE 3: if needsReview is false AND reviews key is present, remove the reviews key-value pair from object */
/** RULE 4: if needsReview is false AND reviews key is absent, just ignore this case */
/** RULE 5: if no durationInDays key is present, then can safely calculate from durationInHours */

import { REVIEW_AND_ITERATION } from '../../constants/serviceEstimates';
import {
  RestructuredServiceEstimates,
  ServiceEstimates,
  ServiceEstimatesTask,
  ServiceEstimatesWithDatesAndIcons
} from '../../types/serviceEstimates';
import { weekDays } from '../estimationPageUtils/modifyStandardData';

let count = 0;

const restructureServiceEstimates = (
  serviceEstimateTasks: ServiceEstimatesTask[]
): RestructuredServiceEstimates[] => {
  return serviceEstimateTasks.flatMap((serviceEstimateTask) => {
    const {
      reviews,
      task,
      backgroundColor: parentBackgroundColor,
      color: parentColor
    } = serviceEstimateTask;
    delete serviceEstimateTask.reviews;

    if (reviews && reviews.length) {
      const [review] = reviews;

      const { backgroundColor: reviewBackgroundColor, color: reviewColor } =
        review;

      return [
        {
          ...serviceEstimateTask,
          isReviewTask: false,
          id: (++count).toString()
        } as RestructuredServiceEstimates,
        {
          ...review,
          needsReview: false,
          primaryTask: task,
          isReviewTask: true,
          backgroundColor: reviewBackgroundColor || parentBackgroundColor,
          color: reviewColor || parentColor,
          id: (++count).toString()
        } as unknown as RestructuredServiceEstimates
      ];
    }

    return [
      {
        ...serviceEstimateTask,
        isReviewTask: false,
        id: (++count).toString()
      } as RestructuredServiceEstimates
    ];
  });
};

const generateServiceEstimates = (
  serviceEstimates: ServiceEstimates[]
): ServiceEstimatesTask[] => {
  count = 0;
  return serviceEstimates.flatMap((serviceEstimate) => {
    const {
      tasks,
      phase,
      backgroundColor: parentBackgroundColor,
      color: parentColor
    } = serviceEstimate;
    let totalDurationInDays = 0;
    const modifiedTasks = tasks
      .map((task) => {
        const {
          needsReview,
          reviews,
          durationInDays,
          durationInHours,
          backgroundColor: taskBackgroundColor,
          color: taskColor
        } = task;
        task.parentTask = phase;
        if (!reviews && needsReview) {
          // RULE 1
          task.reviews = [REVIEW_AND_ITERATION];
        }
        if (!needsReview && reviews) {
          // RULE 3
          delete task.reviews;
        }
        if (!durationInDays && durationInHours) {
          // RULE 5
          task.durationInDays = Math.ceil(durationInHours / 8);
        }
        if (!taskBackgroundColor) {
          task.backgroundColor = parentBackgroundColor;
        }
        if (!taskColor) {
          task.color = parentColor;
        }
        totalDurationInDays += task.durationInDays || 0;
        return task;
      })
      .map((task) => {
        return { ...task, totalDurationInDays };
      });
    totalDurationInDays = 0;

    return modifiedTasks;
  });
};

const adjustDatesToIgnoreWeekends = (startDate: number, endDate: number) => {
  for (let i = startDate; i <= endDate; i++) {
    if (weekDays[(i - 1) % 7] === 'S' && i == startDate) {
      startDate += 1;
      endDate += 1;
    }
    if (weekDays[(i - 1) % 7] === 'S' && i == endDate) {
      endDate += 1;
    }
  }

  return { startDate, endDate };
};

export const addDatesToServiceEstimates = (
  serviceEstimates: RestructuredServiceEstimates[]
) => {
  let totalNumberOfDays = 0;
  return serviceEstimates.map((serviceEstimateItem) => {
    const serviceEstimateItemWithDates: ServiceEstimatesWithDatesAndIcons = {
      ...serviceEstimateItem,
      startDate: 0,
      endDate: 0
    };
    const { durationInDays, isReviewTask } = serviceEstimateItemWithDates;
    const startDate = ++totalNumberOfDays;
    const endDate = startDate + (durationInDays || 0) - 1;
    const { startDate: adjustedStartDate, endDate: adjustedEndDate } =
      adjustDatesToIgnoreWeekends(startDate, endDate);
    serviceEstimateItemWithDates.startDate = adjustedStartDate;
    serviceEstimateItemWithDates.endDate = adjustedEndDate;
    /**
     * TODO: consider rework on following expression if task's start/end dates are plotted on weekends
     */
    totalNumberOfDays = isReviewTask ? adjustedEndDate - 1 : adjustedEndDate;
    return serviceEstimateItemWithDates;
  });
};

const addIconsToServiceEstimates = (
  serviceEstimates: ServiceEstimatesWithDatesAndIcons[]
) => {
  return serviceEstimates.map((serviceEstimateItem) => {
    const { isReviewTask } = serviceEstimateItem;
    if (isReviewTask) {
      /**
       * Review Tasks do not need icons to be displayed
       */
      return serviceEstimateItem;
    }
    return {
      ...serviceEstimateItem,
      icons: [{ type: 'user', content: 'A' }]
    };
  });
};

const getServiceEstimatesWithDomaninsAndStagesAdjustment = (
  restructuredServiceEstimates: RestructuredServiceEstimates[]
) => {
  return restructuredServiceEstimates.map((serviceEstimate) => {
    console.info(serviceEstimate, '...serviceEstimate');
    return serviceEstimate;
  });
};

export const getTasksFromServiceEstimates = (
  serviceEstimates: ServiceEstimates[]
) => {
  const generatedServiceEstimates = generateServiceEstimates(serviceEstimates);
  const restructuredServiceEstimates: RestructuredServiceEstimates[] =
    restructureServiceEstimates(generatedServiceEstimates);
  const serviceEstimatesWithDomainsAndStagesAdjustment =
    getServiceEstimatesWithDomaninsAndStagesAdjustment(
      restructuredServiceEstimates
    );
  const serviceEstimatesWithDates: ServiceEstimatesWithDatesAndIcons[] =
    addDatesToServiceEstimates(serviceEstimatesWithDomainsAndStagesAdjustment);
  const serviceEstimatesWithIcons = addIconsToServiceEstimates(
    serviceEstimatesWithDates
  );
  console.info(serviceEstimatesWithIcons, '...serviceEstimatesWithIcons');
  return serviceEstimatesWithIcons;
};
