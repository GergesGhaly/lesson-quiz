import React from "react";
import { motion } from "framer-motion";
import leafs from "../assets/leafs.png";

const Leafs = () => {
  return (
    <motion.div
      style={{
        position: "relative",
        width: 100,
        height: 100,
        overflow: "visible",
        display: "inline-block",
      }}
      animate={{
        // y: [0, -100, 0],
        // x: [0, 20, -20, 0],
        // opacity: [1, 0.7, 0.5, 1],
        // rotate: [0, 15, -15, 0],
        filter: [
          "drop-shadow(0 0 0 #A5E650) brightness(1)",
          "drop-shadow(0 0 20px #A5E650) brightness(1.6)",
          "drop-shadow(0 0 40px #A5E650) brightness(2)",
          "drop-shadow(0 0 20px #A5E650) brightness(1.6)",
          "drop-shadow(0 0 0 #A5E650) brightness(1)",
        ],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      }}
    >
      <img
        style={{ width: "100px", display: "block", userSelect: "none" }}
        src={leafs}
        alt="leaf"
      />
    </motion.div>
  );
};

export default Leafs;
