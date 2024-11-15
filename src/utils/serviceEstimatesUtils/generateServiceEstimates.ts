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
  ServiceEstimatesTask
} from '../../types/serviceEstimates';

const restructureServiceEstimates = (
  serviceEstimateTasks: ServiceEstimatesTask[]
): RestructuredServiceEstimates[] => {
  return serviceEstimateTasks.flatMap((serviceEstimateTask) => {
    const { reviews, task } = serviceEstimateTask;

    if (reviews) {
      delete serviceEstimateTask.reviews;

      return [
        {
          ...serviceEstimateTask,
          isReviewTask: false
        } as RestructuredServiceEstimates,
        {
          ...reviews?.[0],
          needsReview: false,
          primaryTask: task,
          isReviewTask: true
        } as unknown as RestructuredServiceEstimates
      ];
    }

    return [serviceEstimateTask as RestructuredServiceEstimates];
  });
};

export const generateServiceEstimates = (
  serviceEstimates: ServiceEstimates[]
): RestructuredServiceEstimates[] => {
  return serviceEstimates.flatMap((serviceEstimate) => {
    const { tasks, phase } = serviceEstimate;
    const modifiedTasks = tasks.map((task) => {
      const { needsReview, reviews, durationInDays, durationInHours } = task;
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
      return task;
    });
    const restructuredServiceEstimates: RestructuredServiceEstimates[] =
      restructureServiceEstimates(modifiedTasks);
    return restructuredServiceEstimates;
  });
};

/**
 * Algorithm
 *
 *
 *
 *
 *
 * The final array should include list of all chart items, the tasks and ths review items in linear passion
 * Ids should appended at the end after creating all the chartItems including review items
 */
