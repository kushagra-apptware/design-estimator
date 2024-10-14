import React, { useState } from 'react';

interface Task {
  id: string;
  content: string;
  startDate: number;
  endDate: number;
  icons: Array<{ type: 'user' | 'logo'; content: string }>;
  backgroundColor?: string;
}

interface GanttChartProps {
  tasks: Task[];
  height?: string;
}

const GanttChart: React.FC<GanttChartProps> = ({ tasks, height = '70%' }) => {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [startDay, setStartDay] = useState(1);

  const days = Array.from({ length: 14 }, (_, i) => i + startDay);
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const handleDateClick = (date: number) => {
    setSelectedDate(date === selectedDate ? null : date);
  };

  const handlePrevClick = () => {
    setStartDay(Math.max(1, startDay - 10));
  };

  const handleNextClick = () => {
    setStartDay(Math.min(18, startDay + 10));
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #ccc',
    overflow: 'hidden',
    height,
    margin: '0 auto'
  };

  const timelineStyle: React.CSSProperties = {
    display: 'flex',
    borderBottom: '1px solid #ccc'
  };

  const timelineCellStyle = (
    isWeekend: boolean,
    isSelected: boolean
  ): React.CSSProperties => ({
    flex: '1 0 7.14%',
    textAlign: 'center',
    padding: '5px',
    borderRight: '1px solid #ccc',
    backgroundColor: isSelected ? '#e6e6fa' : 'white',
    position: 'relative',
    backgroundImage: isWeekend
      ? 'linear-gradient(135deg, transparent 49.5%, #ccc 49.5%, #ccc 50.5%, transparent 50.5%)'
      : 'none',
    backgroundSize: '10px 10px'
  });

  const arrowStyle = (isSelected: boolean): React.CSSProperties => ({
    content: '""',
    position: 'absolute',
    bottom: '-10px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 0,
    height: 0,
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent',
    borderTop: '5px solid #e6e6fa',
    display: isSelected ? 'block' : 'none'
  });

  const taskRowStyle: React.CSSProperties = {
    display: 'flex',
    position: 'relative',
    height: '80px'
  };

  const taskCellStyle = (
    isWeekend: boolean,
    isSelected: boolean
  ): React.CSSProperties => ({
    flex: '1 0 7.14%',
    padding: '5px',
    borderRight: '1px solid #ccc',
    backgroundColor: isSelected ? '#e6e6fa' : 'white',
    backgroundImage: isWeekend
      ? 'linear-gradient(135deg, transparent 49.5%, #ccc 49.5%, #ccc 50.5%, transparent 50.5%)'
      : 'none',
    backgroundSize: '10px 10px'
  });

  const taskItemStyle = (
    backgroundColor: string | undefined,
    startIndex: number,
    endIndex: number
  ): React.CSSProperties => ({
    position: 'absolute',
    top: '5px',
    left: `calc(${startIndex * 7.14}% + ${
      startIndex * 10
    }px + ${startIndex}px)`,
    width: `calc(${(endIndex - startIndex + 1) * 7.14}% + ${
      (endIndex - startIndex) * 10
    }px+${endIndex - startIndex}px)`,
    height: '70px',
    backgroundColor: backgroundColor || '#4caf50',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '0 5px',
    borderRadius: '50px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  });

  const iconContainerStyle: React.CSSProperties = {
    display: 'flex',
    marginRight: '5px'
  };

  const iconStyle = (
    type: 'user' | 'logo',
    index: number
  ): React.CSSProperties => ({
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc',
    color: 'white',
    fontSize: '20px',
    marginLeft: index === 0 ? 0 : '-20px',
    border: type === 'user' ? '2px solid white' : '2px solid transparent',
    boxSizing: 'border-box',
    zIndex: index
  });

  const navigationStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '10px',
    gap: '10px',
    margin: '10px auto 0'
  };

  const buttonStyle = (disabled: boolean): React.CSSProperties => ({
    padding: '5px 10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: disabled ? '#f0f0f0' : 'white',
    cursor: disabled ? 'not-allowed' : 'pointer'
  });

  return (
    <div>
      <div style={containerStyle}>
        <div style={timelineStyle}>
          {days.map((day, index) => (
            <div
              key={day}
              style={timelineCellStyle(
                index % 7 === 0 || index % 7 === 6,
                day === selectedDate
              )}
              onClick={() => handleDateClick(day)}
            >
              {`${weekDays[(day - 1) % 7]} ${day.toString().padStart(2, '0')}`}
              <div style={arrowStyle(day === selectedDate)} />
            </div>
          ))}
        </div>
        {tasks.map((task) => (
          <div
            key={task.id}
            style={taskRowStyle}
          >
            {days.map((day, index) => (
              <div
                key={`${task.id}-${day}`}
                style={taskCellStyle(
                  index % 7 === 0 || index % 7 === 6,
                  day === selectedDate
                )}
              />
            ))}
            <div
              style={taskItemStyle(
                task.backgroundColor,
                task.startDate - startDay,
                task.endDate - startDay
              )}
            >
              <div style={iconContainerStyle}>
                {task.icons.map((icon, index) => (
                  <div
                    key={index}
                    style={iconStyle(icon.type, index)}
                  >
                    {icon.content.charAt(0).toUpperCase()}
                  </div>
                ))}
              </div>
              <span>{task.content}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={navigationStyle}>
        <button
          onClick={handlePrevClick}
          style={buttonStyle(startDay === 1)}
          disabled={startDay === 1}
        >
          ←
        </button>
        <button
          onClick={handleNextClick}
          style={buttonStyle(startDay === 18)}
          disabled={startDay === 18}
        >
          →
        </button>
      </div>
    </div>
  );
};

const tasks: Task[] = [
  {
    id: '1',
    content: 'Task 1',
    startDate: 2,
    endDate: 4,
    icons: [
      { type: 'user', content: 'A' },
      { type: 'user', content: 'B' }
    ],
    backgroundColor: '#4caf50'
  },
  {
    id: '2',
    content: 'Task 2',
    startDate: 4,
    endDate: 8,
    icons: [
      { type: 'user', content: 'A' },
      { type: 'user', content: 'B' },
      { type: 'user', content: 'C' }
    ],
    backgroundColor: '#2196f3'
  },
  {
    id: '3',
    content: 'Task 3',
    startDate: 2,
    endDate: 4,
    icons: [{ type: 'logo', content: 'D' }],
    backgroundColor: '#ff9800'
  },
  {
    id: '4',
    content: 'Task 3',
    startDate: 10,
    endDate: 16,
    icons: [{ type: 'logo', content: 'D' }],
    backgroundColor: '#ff9800'
  },
  {
    id: '5',
    content: 'Task 3',
    startDate: 15,
    endDate: 19,
    icons: [{ type: 'logo', content: 'D' }],
    backgroundColor: '#ff9800'
  }
];

export const GanttChartComponent = () => (
  <GanttChart
    tasks={tasks}
    height="70vh"
  />
);
