import React, { Dispatch, SetStateAction } from 'react';

export const TaskDrawer = ({
  isDrawerOpen,
  setIsDrawerOpen
}: {
  isDrawerOpen: boolean;
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const handleClose = () => {
    setIsDrawerOpen(false);
  };

  const drawerStyles: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    right: isDrawerOpen ? 0 : '-30%', // Slide from the right, hidden by default
    width: '30vw',
    height: '100vh',
    backgroundColor: 'lightgrey',
    padding: '30px',
    zIndex: 100,
    transition: 'right 0.3s ease', // Smooth transition effect
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column'
  };

  const closeIconStyles: React.CSSProperties = {
    position: 'absolute',
    top: '20px',
    right: '20px',
    cursor: 'pointer',
    fontSize: '24px',
    color: 'black'
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
    <>
      {/* Overlay */}
      <div
        style={overlayStyles}
        onClick={handleClose}
      ></div>

      {/* Sliding drawer */}
      <div style={drawerStyles}>
        <span
          style={closeIconStyles}
          onClick={handleClose}
        >
          &times;
        </span>
        <h2>Task Details</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec
          iaculis mauris. Curabitur et erat a velit congue tincidunt. Morbi
          vitae dolor ac velit fermentum euismod at a justo.
        </p>
        <p>
          Donec tincidunt vulputate urna, a fermentum metus euismod eget. Nulla
          auctor purus quis ligula hendrerit, vel accumsan odio faucibus.
        </p>
      </div>
    </>
  );
};
