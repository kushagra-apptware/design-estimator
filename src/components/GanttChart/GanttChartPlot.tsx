import React, { useEffect, useState } from 'react';
import Avatar from '../../assets/avatar.png';
import { useEstimationPage } from '../../hooks/useEstimationPage/useEstimationPage';
import { ServiceEstimatesWithDatesAndIcons } from '../../types/serviceEstimates';
import { weekDays } from '../../utils/estimationPageUtils/modifyStandardData';

export interface Task {
  id: string;
  content: string;
  startDate: number;
  endDate: number;
  icons: Array<{ type: 'user' | 'logo'; content: string }>;
  duration: number;
  type: string;
  backgroundColor?: string;
  color?: string;
  isSub?: boolean;
  opacity?: number;
}

interface GanttChartProps {
  plots: ServiceEstimatesWithDatesAndIcons[];
  height?: number;
  onTaskItemClick: (id: string) => void;
  startDay: number;
  divRef: React.RefObject<HTMLDivElement>;
  spanRef: React.RefObject<HTMLDivElement>;
}

export const GanttChartPlot: React.FC<GanttChartProps> = ({
  height,
  plots,
  onTaskItemClick,
  startDay,
  divRef,
  spanRef
}) => {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [emptyRows, setEmptyRows] = useState<number>(0);
  const [divHeight, setDivHeight] = useState<number>(0);

  const { chartDays } = useEstimationPage();

  const rowHeight = 100;
  const totalTasksHeight = plots.length * rowHeight;
  const totalChartHeight = Math.min(totalTasksHeight, divHeight);

  useEffect(() => {
    const totalTasksHeight = plots.length * rowHeight;
    const remainingSpace = totalChartHeight - totalTasksHeight;
    const emptyRowCount = Math.max(0, Math.ceil(remainingSpace / rowHeight));
    setEmptyRows(emptyRowCount);
  }, [plots, totalChartHeight, rowHeight]);

  useEffect(() => {
    if (divRef.current) {
      setDivHeight(divRef.current.offsetHeight);
    }
  }, []);

  const days = Array.from({ length: chartDays }, (_, i) => i + startDay);

  const handleDateClick = (date: number) => {
    setSelectedDate(date === selectedDate ? null : date);
  };

  const containerHeight = Math.min(height || 0, window.innerHeight - 90); // Use window.innerHeight to dynamically calculate the height

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #ccc',
    overflow: 'auto',
    height: `${containerHeight}px`,
    margin: '0 auto',
    position: 'relative'
  };

  const timelineStyle: React.CSSProperties = {
    display: 'flex',
    borderBottom: '1px solid #ccc',
    position: 'sticky',
    top: 0,
    zIndex: 10
  };

  const timelineCellStyle = (isSelected: boolean): React.CSSProperties => ({
    flex: '1 0 5.53%',
    textAlign: 'center',
    padding: '10px 0',
    borderRight: '1px solid #ccc',
    borderBottom: '1px solid #ccc',
    backgroundColor: isSelected ? '#e6e6fa' : 'white',
    position: 'relative',
    backgroundSize: '20px 20px',
    backgroundPosition: '0 0'
  });

  const arrowStyle = (isSelected: boolean): React.CSSProperties => ({
    position: 'absolute',
    top: '-30px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 0,
    height: 0,
    borderLeft: '6px solid transparent',
    borderRight: '6px solid transparent',
    borderTop: '6px solid #5350C3',
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
    backgroundSize: '10px 10px',
    height: `${rowHeight}px`
  });

  const taskItemStyle = (
    color: string | undefined,
    backgroundColor: string | undefined,
    startIndex: number,
    endIndex: number,
    isSquare: 'start' | 'end' | boolean,
    opacity?: number
  ): React.CSSProperties => ({
    position: 'absolute',
    top: '12px',
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
    borderTopLeftRadius: !isSquare || isSquare === 'end' ? '50px' : '0px',
    borderBottomLeftRadius: !isSquare || isSquare === 'end' ? '50px' : '0px',
    borderTopRightRadius: !isSquare || isSquare === 'start' ? '50px' : '0px',
    borderBottomRightRadius: !isSquare || isSquare === 'start' ? '50px' : '0px',
    whiteSpace: 'nowrap',
    border: `1px solid ${backgroundColor}`,
    cursor: 'pointer',
    opacity: opacity || 1
  });

  const researchTaskItemStyle = (
    backgroundColor: string | undefined,
    startIndex: number,
    endIndex: number,
    opacity?: number,
    hasBorder?: boolean
  ): React.CSSProperties => ({
    position: 'absolute',
    top: '12px',
    left: `calc(${startIndex * 5.53}% + ${startIndex}px)`,
    width: `calc(${(endIndex - startIndex + 1) * 5.53}% + ${
      endIndex - startIndex - 12 - (hasBorder ? 4 : -1)
    }px)`,
    height: '65px',
    backgroundColor: backgroundColor || '#4caf50',
    color: 'rgba(0,0,0)',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '0 5px',
    whiteSpace: 'nowrap',
    border: `1px solid ${backgroundColor}`,
    borderLeftWidth: hasBorder ? 5 : 0,
    borderLeftColor: hasBorder ? 'rgba(0,0,0,0.6)' : 'inherit',
    cursor: 'pointer',
    opacity: opacity ? opacity - 0.2 : 0.7
  });

  const iconContainerStyle: React.CSSProperties = {
    display: 'flex',
    marginRight: '5px'
  };

  const iconStyle = (
    type: 'user' | 'logo',
    index: number
  ): React.CSSProperties => ({
    width: '55px',
    height: '55px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc',
    color: 'white',
    fontSize: '20px',
    marginLeft: index === 0 ? 0 : '-20px',
    borderWidth: 7,
    borderStyle: 'solid',
    borderColor: type === 'user' ? '#fff' : 'transparent',
    boxSizing: 'border-box',
    zIndex: index
  });

  const lightTextStyle = (): React.CSSProperties => ({
    color: 'grey'
  });

  const handleItemClick = (id: string) => {
    onTaskItemClick(id);
  };

  return (
    <div
      style={containerStyle}
      ref={divRef}
      id="gantt-chart-container"
      className="gantt-chart-container"
    >
      <div style={timelineStyle}>
        {days.map((day) => (
          <div
            key={day}
            style={timelineCellStyle(day === selectedDate)}
            onClick={() => handleDateClick(day)}
          >
            <span style={lightTextStyle()}>{weekDays[(day - 1) % 7]}</span>
            <span>{`${(day <= 31 ? day : day > 61 ? (day % 30) - 1 : day % 31) // TODO: 1st month 31 days, 2nd month 30 days, 3rd month onwards it will break, need to add proper utils here
              .toString()
              .padStart(2, '0')}`}</span>
            <div style={{ position: 'relative' }}>
              <div style={arrowStyle(day === selectedDate)} />
            </div>
          </div>
        ))}
      </div>
      <span
        ref={spanRef}
        id="gantt-chart-content-wrapper"
        className="gantt-chart-content-wrapper"
      >
        {plots.map((finalTasksItem: any, finalTaskItemIndex: any) => {
          const [task] = finalTasksItem;
          return (
            <div
              key={task.id}
              style={taskRowStyle}
            >
              {days.map((day) => (
                <div
                  key={`${task.id}-${day}`}
                  style={taskCellStyle(
                    weekDays[(day - 1) % 7] === 'S',
                    day === selectedDate
                  )}
                />
              ))}

              {finalTasksItem.map((eachTaskItem: any, taskItemIndex: any) => {
                let isSquare: 'start' | 'end' | boolean = false; // both sides are round
                if (finalTasksItem.length >= 2) {
                  if (taskItemIndex === 0) {
                    isSquare = 'end'; // end side is square
                  } else if (taskItemIndex === finalTasksItem.length - 1) {
                    isSquare = 'start'; // start side is square
                  } else {
                    isSquare = true; // both sides are square
                  }
                }

                let hasBorder = false;
                if (taskItemIndex === 0) hasBorder = true;

                const getItemStyles = (
                  color: string | undefined,
                  backgroundColor: string | undefined,
                  startDay: number,
                  endDay: number,
                  isSquare: boolean | 'start' | 'end',
                  opacity: number | undefined
                ) =>
                  !eachTaskItem.isReviewTask
                    ? taskItemStyle(
                        color,
                        backgroundColor,
                        startDay,
                        endDay,
                        isSquare,
                        opacity
                      )
                    : researchTaskItemStyle(
                        backgroundColor,
                        startDay,
                        endDay,
                        opacity,
                        hasBorder
                      );

                let opacity = 1;
                if (eachTaskItem.isReviewTask) {
                  opacity = 0.85;
                }
                if (eachTaskItem.isWeekend) {
                  opacity = 0.65;
                }

                return (
                  <div
                    role="button"
                    style={{
                      ...getItemStyles(
                        eachTaskItem.color,
                        eachTaskItem.backgroundColor,
                        eachTaskItem.startDate - startDay,
                        eachTaskItem.endDate - startDay,
                        isSquare,
                        opacity
                      ),
                      marginTop: finalTaskItemIndex === 0 ? 12 : 0
                    }}
                    onClick={() => handleItemClick(eachTaskItem.id)}
                    key={eachTaskItem.id}
                  >
                    {taskItemIndex === 0 &&
                      !eachTaskItem.isReviewTask &&
                      eachTaskItem.durationInDays && (
                        /* eachTaskItem.durationInDays >= 3 && */ <div
                          style={iconContainerStyle}
                        >
                          {eachTaskItem?.icons?.map((icon: any, index: any) => (
                            <div
                              key={index}
                              style={iconStyle(
                                icon.type as 'user' | 'logo',
                                index
                              )}
                            >
                              <img
                                src={Avatar}
                                style={{ backgroundColor: '#fff' }}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    <span
                      style={{
                        position: 'relative',
                        zIndex: 100,
                        overflow:
                          finalTasksItem.length > 1 ? 'visible' : 'hidden',
                        textOverflow:
                          finalTasksItem.length > 1 ? 'unset' : 'ellipsis',
                        margin: '0 10px',
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                      title={eachTaskItem.task}
                    >
                      {eachTaskItem.isReviewTask ? (
                        <div
                          style={{ display: 'flex', flexDirection: 'column' }}
                        >
                          <span>{eachTaskItem.task}</span>
                          {eachTaskItem.task && (
                            <span>{eachTaskItem.durationInDays} days</span>
                          )}
                        </div>
                      ) : (
                        <div
                          style={{ display: 'flex', flexDirection: 'column' }}
                        >
                          <span>{eachTaskItem.task}</span>
                          {eachTaskItem.task && (
                            <span>{eachTaskItem.durationInDays} days</span>
                          )}
                        </div>
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          );
        })}
        {/* Add empty rows to fill the remaining space */}
        {Array.from({ length: emptyRows }).map((_, rowIndex) => (
          <div
            key={`empty-${rowIndex}`}
            style={taskRowStyle}
          >
            {days.map((day) => (
              <div
                key={`empty-${rowIndex}-${day}`}
                style={taskCellStyle(
                  weekDays[(day - 1) % 7] === 'S',
                  day === selectedDate
                )}
              />
            ))}
          </div>
        ))}
      </span>
    </div>
  );
};
