export interface ChartItemProps {
  backgroundColor?: string;
  color?: string;
}

export interface ReviewsAndIteration extends ChartItemProps{
  /**
   * name of the task
   */
  task: string;
  /**
   * duration in days
   */
  durationInDays: number;
}

export interface ServiceEstimatesTask extends ChartItemProps {
  /**
   * this is the name of the task
   * this name will be used to identify the task and display as label in the graph
   */
  task: string;
  /**
   * needsReview tells whether the current task will need a respective review and iteration task
   * if needsReview is true and atleast one review is present then this review(s) will be used
   * if needsReview is true and no reviews are provided, then we will use default review [REVIEW_AND_ITERATION]
   * if needsReview is false, then the reviews key-value pair will be deleted if present, or it won't be added at all
   */
  needsReview: boolean;
  /**
   * this is the duration in hours required to complete the task
   */
  durationInHours?: number;
  /**
   * this is the duration in days required to complete the task
   * in some cases, durationInHours is 1 but we need to take a whole day for this task
   * to handle such cases, we will have to explicitly pass the durationInDays
   * if durationInDays is not passed, then the durationInDays value is calculated from durationInHours
   * durationInDays = Math.ceil(durationInHours/8)
   */
  durationInDays?: number;
  /**
   * this the array that dictates, what supporting tasks are required alongside the current task
   */
  reviews?: ReviewsAndIteration[];
  /**
   * name of the parent task
   * this is used for mapping as required
   */
  parentTask?: string;
}

export interface ServiceEstimates extends ChartItemProps {
  /**
   * this is the name of the phase under which the tasks are available
   * this is like the main category
   */
  phase: string;
  /**
   * this array contains object
   * each object is a task to be displayed on the chart
   */
  tasks: ServiceEstimatesTask[];
}

export interface RestructuredServiceEstimates extends ServiceEstimatesTask {
  /**
   * tells where a task is review task or not
   * review task has a different design in the chart
   * the general task has a different design
   * this key clears the confusion and helps decide which design to implement
   */
  isReviewTask: boolean;
  /**
   * id for each task
   */
  id: string;
}
