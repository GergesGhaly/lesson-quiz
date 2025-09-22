import React from "react";

const Tooltip = ({ text }) => {
  const tooltipStyle = {
    position: "absolute",
    top: "0px", // Position the tooltip above the element
    left: "50%",
    transform: "translateX(-50%)",
    padding: "10px",
    backgroundColor: "#333", // Dark background color
    color: "#fff",
    borderRadius: "5px",
    zIndex: 999999,
    width: "auto", // Adjust width based on content
    opacity: 1, // Always show the tooltip
    transition: "opacity 300ms ease",
    fontSize: "20px",
  };

  const arrowStyle = {
    position: "absolute",
    bottom: "-10px", // Position the arrow at the bottom of the tooltip
    left: "50%",
    transform: "translateX(-50%)",
    width: 0,
    height: 0,
    borderLeft: "10px solid transparent",
    borderRight: "10px solid transparent",
    borderTop: "10px solid #333", // Arrow color same as tooltip background
    zIndex: 1001, // Ensure the arrow is above the tooltip
  };

  return (
    <div style={{}}>
      <div style={tooltipStyle}>
        {text}
        <div style={arrowStyle} />
      </div>
    </div>
  );
};

export default Tooltip;
