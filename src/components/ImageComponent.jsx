import React, { useState } from "react";
import Tooltip from "./Tooltip";

const ImageComponent = ({ image, index, handleImageClick }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <figure
      style={styles.figure}
      key={index}
      onClick={() => handleImageClick(index)}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {showTooltip && <Tooltip text={index} />}
      <div style={styles.outerBevel}>
        <div style={styles.flatSurface}>
          <div style={styles.innerBevel}>
            <img
              loading="lazy"
              src={image}
              alt="Map of the U.S. during the Civil War"
              title="The U.S. during the Civil War"
              width="15"
              height="100%"
              style={styles.map}
            />
          </div>
        </div>
      </div>
    </figure>
  );
};

const styles = {
  figure: {
    width: "70px",
    height: "80px",
    margin: "10px",
    cursor: "pointer",
    position: "relative",
  },
  outerBevel: {
    // boxShadow: "4px 6px 12px 0 black",
    // borderWidth: "3px",
    // borderStyle: "solid",
    // borderColor:
    //   "rgb(109, 84, 58) rgb(109, 84, 58) rgb(24, 19, 13) rgb(24, 19, 13)",
  },
  innerBevel: {
    // borderWidth: "2px",
    // borderStyle: "solid",
    // borderColor:
    //   "rgb(24, 19, 13) rgb(24, 19, 13) rgb(109, 84, 58) rgb(109, 84, 58)",
  },
  map: {
    display: "block",

    height: "100%",
    width: "100%",
    padding: "7.5% 7.5% 10% 7.5%",
    backgroundColor: "rgb(255,249,224)",
    // borderWidth: "2px",
    // borderStyle: "solid",
    // borderColor:
    //   "rgb(145, 110, 0) rgb(207, 166, 0) rgb(207, 166, 0) rgb(145, 110, 0)",
  },
};

export default ImageComponent;
