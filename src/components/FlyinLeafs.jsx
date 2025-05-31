import React, { useMemo } from "react";
import { motion } from "framer-motion";
import leafs from "../assets/aleafs.jpg";

const leafCount = 7;

const generateLeafProps = () => {
  return {
    initialX: Math.random() * window.innerWidth,
    initialY: Math.random() * window.innerHeight + window.innerHeight,
    size: 50 + Math.random() * 30,
    duration: 8 + Math.random() * 7,
    delay: Math.random() * 20,
    rotate: (Math.random() - 0.5) * 360,
    xMotionRange: (Math.random() - 0.5) * 100,
  };
};

const FlyinLeaf = ({ props }) => (
  <motion.img
    src={leafs}
    alt="flying leaf"
    style={{
      position: "fixed",
      width: props.size,
      height: "auto",
      left: props.initialX,
      top: props.initialY,
      pointerEvents: "none",
      userSelect: "none",
      zIndex: 0,
      filter: "drop-shadow(0 0 3px #A5E650)",
    }}
    animate={{
      y: [-props.initialY, -100],
      x: [
        props.initialX,
        props.initialX + props.xMotionRange,
        props.initialX - props.xMotionRange,
        props.initialX,
      ],
      rotate: [
        0,
        props.rotate * 0.5,
        props.rotate,
        -props.rotate * 0.7,
        props.rotate * 0.3,
        0,
      ],
    }}
    transition={{
      duration: props.duration,
      delay: props.delay,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut",
    }}
  />
);

const FlyinLeafs = () => {
  // توليد الأوراق مرة واحدة فقط
  const leaves = useMemo(
    () => Array.from({ length: leafCount }).map(() => generateLeafProps()),
    []
  );

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      {leaves.map((props, i) => (
        <FlyinLeaf key={i} props={props} />
      ))}
    </div>
  );
};

export default FlyinLeafs;
