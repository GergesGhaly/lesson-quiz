import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const generateHearts = (count) => {
  return Array.from({ length: count }).map(() => ({
    id: Math.random().toString(36).substr(2, 9),
    x: Math.random() * 100 - 50,
    y: Math.random() * -100 - 50,
    scale: Math.random() * 0.5 + 0.5,
    delay: Math.random() * 0.5,
  }));
};

const HeartParticles = ({ trigger }) => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    if (trigger) {
      setHearts(generateHearts(10));
      const timer = setTimeout(() => setHearts([]), 1500);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  return (
    <AnimatePresence>
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ opacity: 1, y: 0, x: 0, scale: heart.scale }}
          animate={{
            opacity: 0,
            y: heart.y,
            x: heart.x,
            scale: heart.scale,
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, delay: heart.delay }}
          style={{
            position: "absolute",
            bottom: "80px",
            left: "50%",
            width: "20px",
            height: "20px",
            backgroundColor: "#35fd56",
            clipPath:
              "path('M10 20 C-10 10, 0 -10, 10 5 C20 -10, 30 10, 10 20 Z')",
            zIndex: 999,
            pointerEvents: "none",
          }}
        ></motion.div>
      ))}
    </AnimatePresence>
  );
};

export default HeartParticles;
