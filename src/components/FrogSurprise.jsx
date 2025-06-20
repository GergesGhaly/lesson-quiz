import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CoinAnimation from "./CoinAnimation";
import frog from "../assets/theFrog.png";

const FrogSurprise = () => {
  const [visible, setVisible] = useState(true);
  const [randomLeft, setRandomLeft] = useState("50%");
  const [key, setKey] = useState(0);

  const [showCoin, setShowCoin] = useState(false);
  const [coinPosition, setCoinPosition] = useState({ x: 0, y: 0 });

  const generateRandomLeft = () => {
    const random = Math.floor(Math.random() * 80); // 0% to 80%
    setRandomLeft(`${random}%`);
  };

  useEffect(() => {
    generateRandomLeft();

    const interval = setInterval(() => {
      setVisible(true);
      generateRandomLeft();
      setKey((prev) => prev + 1);

      setTimeout(() => {
        setVisible(false);
      }, 1000);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const handleClick = (e) => {
    // const rect = e.target.getBoundingClientRect();
    // setCoinPosition({
    //   x: rect.left + rect.width / 2,
    //   y: rect.top + rect.height / 2,
    // });
    setShowCoin(true);

    setTimeout(() => {
      setShowCoin(false);
    }, 1000);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        height: "100dvh",
        width: "100%",
        pointerEvents: "none",
      }}
    >
      <AnimatePresence>
        {showCoin && <CoinAnimation visible={showCoin} />}
        {visible && (
          <motion.img
            key={key}
            src={frog}
            alt="Frog"
            onClick={handleClick}
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 200, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{
              width: "80px",
              height: "130px",
              position: "absolute",
              bottom: "0",
              left: randomLeft,
              transform: "translateX(-50%)",
              zIndex: 10,
              pointerEvents: "auto",
              cursor: "pointer",
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default FrogSurprise;
