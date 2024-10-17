import React, { useState, useEffect, useRef } from 'react';

export interface Task {
  id: string;
  content: string;
  startDate: number;
  endDate: number;
  icons: Array<{ type: 'user' | 'logo'; content: string }>;
  backgroundColor?: string;
  color?: string;
}

interface GanttChartProps {
  tasks: Task[];
  height?: string;
  onTaskItemClick: () => void;
  startDay: number;
}

export const tasks: Task[] = [
  {
    id: '1',
    content: 'Meeting',
    startDate: 2,
    endDate: 4,
    icons: [
      { type: 'user', content: 'A' },
      { type: 'user', content: 'B' }
    ],
    backgroundColor: '#BAE813',
    color: '#ffffff'
  },
  {
    id: '2',
    content: 'Research',
    startDate: 5,
    endDate: 9,
    icons: [
      { type: 'user', content: 'A' },
      { type: 'user', content: 'B' },
      { type: 'user', content: 'C' }
    ],
    backgroundColor: '#E47912',
    color: '#ffffff'
  },
  {
    id: '3',
    content: 'Kickoff Meeting',
    startDate: 11,
    endDate: 20,
    icons: [{ type: 'logo', content: 'D' }],
    backgroundColor: '#ffffff',
    color: '#000000'
  }
];



export const GanttChart: React.FC<GanttChartProps> = ({
  tasks,
  height = '70vh',
  onTaskItemClick,
  startDay
}) => {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const [emptyRows, setEmptyRows] = useState<number>(0);

  const divRef = useRef<HTMLDivElement>(null);
  const [divHeight, setDivHeight] = useState<number>(0);

  const rowHeight = 300;
  const totalChartHeight =
    parseFloat(height) * (Math.ceil(divHeight / rowHeight) + 1);

  useEffect(() => {
    const totalTasksHeight = tasks.length * rowHeight;
    const remainingSpace = totalChartHeight - totalTasksHeight;
    const emptyRowCount = Math.max(0, Math.floor(remainingSpace / rowHeight));
    setEmptyRows(emptyRowCount);
  }, [tasks, totalChartHeight]);

  useEffect(() => {
    if (divRef.current) {
      setDivHeight(divRef.current.offsetHeight);
    }
  }, []);

  const days = Array.from({ length: 30 }, (_, i) => i + startDay);
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const handleDateClick = (date: number) => {
    setSelectedDate(date === selectedDate ? null : date);
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
    flex: '1 0 5.53%',
    textAlign: 'center',
    padding: '10px 0',
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
    height: `${rowHeight}px`
  };

  const taskCellStyle = (
    isWeekend: boolean,
    isSelected: boolean
  ): React.CSSProperties => ({
    flex: '1 0 5.53%',
    borderRight: '1px solid #ccc',
    backgroundColor: isSelected ? '#e6e6fa' : 'white',
    backgroundImage: isWeekend
      ? 'linear-gradient(135deg, transparent 49.5%, #ccc 49.5%, #ccc 50.5%, transparent 50.5%)'
      : 'none',
    backgroundSize: '10px 10px'
  });

  const taskItemStyle = (
    color: string | undefined,
    backgroundColor: string | undefined,
    startIndex: number,
    endIndex: number
  ): React.CSSProperties => ({
    position: 'absolute',
    top: '5px',
    left: `calc(${startIndex * 5.53}% + ${startIndex}px)`,
    width: `calc(${(endIndex - startIndex + 1) * 5.53}% + ${
      endIndex - startIndex - 12
    }px)`,
    height: '65px',
    backgroundColor: backgroundColor || '#4caf50',
    color: color || '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '0 5px',
    borderRadius: '50px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    border: '1px solid lightgrey',
    cursor: 'pointer'
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

  const lightTextStyle = (): React.CSSProperties => ({
    color: 'grey'
  });

  const handleItemClick = () => {
    onTaskItemClick();
  };

  console.info(days, '...days');

  return (
    <div>
      <div
        style={containerStyle}
        ref={divRef}
      >
        <div style={timelineStyle}>
          {days.map((day) => (
            <div
              key={day}
              style={timelineCellStyle(
                (day - 1) % 7 === 0 || (day - 1) % 7 === 6,
                day === selectedDate
              )}
              onClick={() => handleDateClick(day)}
            >
              <span style={lightTextStyle()}>{weekDays[(day - 1) % 7]}</span>{' '}
              <span>{`${day.toString().padStart(2, '0')}`}</span>
              <div style={arrowStyle(day === selectedDate)} />
            </div>
          ))}
        </div>
        {tasks.map((task) => (
          <div
            key={task.id}
            style={taskRowStyle}
          >
            {days.map((day) => (
              <div
                key={`${task.id}-${day}`}
                style={taskCellStyle(
                  (day - 1) % 7 === 0 || (day - 1) % 7 === 6,
                  day === selectedDate
                )}
              />
            ))}
            <div
              role="button"
              style={taskItemStyle(
                task.color,
                task.backgroundColor,
                task.startDate - startDay,
                task.endDate - startDay
              )}
              onClick={handleItemClick}
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
        {/* Add empty rows to fill the remaining space */}
        {Array.from({ length: emptyRows }).map((_, rowIndex) => (
          <div
            key={`empty-${rowIndex}`}
            style={taskRowStyle}
          >
            {days.map((day, index) => (
              <div
                key={`empty-${rowIndex}-${day}`}
                style={taskCellStyle(
                  index % 7 === 0 || index % 7 === 6,
                  day === selectedDate
                )}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
