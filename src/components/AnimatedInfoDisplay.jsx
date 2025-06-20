import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const AnimatedInfoDisplay = ({ interval = 4000 }) => {
  const { t, i18n } = useTranslation();
  const [shuffledItems, setShuffledItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const infoList = t("info", { returnObjects: true });
    if (infoList && infoList.length > 0) {
      const shuffled = [...infoList].sort(() => Math.random() - 0.5);
      setShuffledItems(shuffled);
      setCurrentIndex(0);
    }
  }, [i18n.language]);

  useEffect(() => {
    if (shuffledItems.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % shuffledItems.length);
    }, interval);

    return () => clearInterval(timer);
  }, [shuffledItems, interval]);

  return (
    <div
      style={{
        position: "absolute",
        bottom: "20px",
        width: "100%",
        height: "100px",
        overflow: "hidden",
      }}
    >
      <AnimatePresence mode="wait">
        {shuffledItems.length > 0 && (
          <motion.div
            key={shuffledItems[currentIndex]}
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.98 }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              width: "100%",
              textAlign: "center",
              fontSize: "18px",
              fontWeight: "bold",
              direction: i18n.language.startsWith("ar") ? "rtl" : "ltr",
              padding: "0 20px",
              color: "#333",
            }}
          >
            {shuffledItems[currentIndex]}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedInfoDisplay;
