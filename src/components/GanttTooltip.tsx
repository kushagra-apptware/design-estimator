import { Task } from 'gantt-task-react';
import React from 'react';
import { taskDetails } from '../utils/estimationUtils';

export const StandardTooltipContent: React.FC<{
  task: Task;
  fontSize: string;
  fontFamily: string;
}> = ({ task, fontSize, fontFamily }) => {
  const style = {
    fontSize,
    fontFamily
  };
  return (
    <div
      className="tooltip"
      style={style}
    >
      <div className="tooltip-image"></div>
      <p className="tooltip-title">{task.name}</p>
      <p className="tooltip-description">
        {taskDetails.find((t) => t.name === task.name)?.description}
      </p>
    </div>
  );
};
