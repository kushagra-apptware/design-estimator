import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { TaskCard } from '../TaskCard/TaskCard';
import { tasks } from '../GanttChart/GanttChart';
import './TaskDrawer.scss';

export const TaskDrawer = ({
  isDrawerOpen,
  setIsDrawerOpen,
  selectedTaskId
}: {
  isDrawerOpen: boolean;
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;
  selectedTaskId: string | null;
}) => {
  const itemRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (
      isDrawerOpen &&
      selectedTaskId !== null &&
      itemRefs.current[selectedTaskId as any]
    ) {
      itemRefs.current[selectedTaskId as any]?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [isDrawerOpen, selectedTaskId]);

  const handleClose = () => {
    setIsDrawerOpen(false);
  };

  const drawerStyles: React.CSSProperties = {
    position: 'fixed',
    top: '20px',
    right: isDrawerOpen ? '20px' : '-30%',
    bottom: '20px',
    width: '563px',
    backgroundColor: 'lightgrey',
    zIndex: 100,
    transition: 'right 0.3s ease',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '20px',
    overflowY: 'auto'
  };

  const closeIconStyles: React.CSSProperties = {
    position: 'absolute',
    top: '20px',
    right: '20px',
    cursor: 'pointer',
    fontSize: '24px',
    color: 'white',
    zIndex: 2
  };

  const overlayStyles: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Slightly dark overlay
    zIndex: 99,
    display: isDrawerOpen ? 'block' : 'none',
    transition: 'opacity 0.3s ease'
  };

  return (
    <div className="task-drawer">
      {/* Overlay */}
      <div
        style={overlayStyles}
        onClick={handleClose}
      ></div>

      {/* Sliding drawer */}
      <div style={drawerStyles}>
        <div className="purple-bg"></div>
        <div className="title">The Roadmap</div>
        <div className="subtitles">
          <div className="left-subtitle">Website Design</div>
          <div className="right-subtitle">Success Story</div>
        </div>
        <span
          style={closeIconStyles}
          onClick={handleClose}
        >
          &times;
        </span>
        {tasks.map((task) => (
          <div
            className="task-card"
            ref={(el) => (itemRefs.current[task.id as any] = el)}
          >
            <TaskCard task={task} />
          </div>
        ))}
      </div>
    </div>
  );
};
