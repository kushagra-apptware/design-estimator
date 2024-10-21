import { TaskType } from 'gantt-task-react/dist/types/public-types';

const T0 = new Date('2024-09-01');

const TASK_TYPE = 'task' as TaskType;

const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const baseTasks = [
  {
    id: '1',
    name: 'Discovery & Planning',
    start: addDays(T0, 1),
    end: addDays(T0, 5),
    progress: 100,
    type: TASK_TYPE
  },
  {
    id: '2',
    name: 'Information Architecture & Wireframing',
    start: addDays(T0, 6),
    end: addDays(T0, 11),
    progress: 100,
    type: TASK_TYPE
  },
  {
    id: '3',
    name: 'Visual Design & Prototyping',
    start: addDays(T0, 12),
    end: addDays(T0, 16),
    progress: 100,
    type: TASK_TYPE
  },
  {
    id: '4',
    name: 'Testing Handoff',
    start: addDays(T0, 17),
    end: addDays(T0, 20),
    progress: 100,
    type: TASK_TYPE
  },
  {
    id: '5',
    name: 'Post Handoff Support & Optimization',
    start: addDays(T0, 21),
    end: addDays(T0, 24),
    progress: 100,
    type: TASK_TYPE
  }
];

export const taskDetails = [
  {
    name: 'Discovery & Planning',
    description: 'This is a long description of this task in the design phase'
  },
  {
    name: 'Information Architecture & Wireframing',
    description: 'This is a long description of this task in the design phase'
  },
  {
    name: 'Visual Design & Prototyping',
    description: 'This is a long description of this task in the design phase'
  },
  {
    name: 'Testing Handoff',
    description: 'This is a long description of this task in the design phase'
  },
  {
    name: 'Post Handoff Support & Optimization',
    description: 'This is a long description of this task in the design phase'
  }
];
