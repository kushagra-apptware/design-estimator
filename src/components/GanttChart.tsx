import { Gantt, ViewMode } from 'gantt-task-react';
import 'gantt-task-react/dist/index.css';
import { baseTasks } from '../utils/estimationUtils';
import { StandardTooltipContent } from './GanttTooltip';

const GanttChart = () => {
  return (
    <Gantt
      tasks={baseTasks}
      listCellWidth=""
      viewMode={'Day' as ViewMode}
      TooltipContent={StandardTooltipContent}
      barProgressColor="#E47912"
      barProgressSelectedColor="#E47912"
      barCornerRadius={8}
    />
  );
};

export default GanttChart;
