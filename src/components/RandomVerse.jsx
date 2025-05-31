import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const RandomVerse = () => {
  const { t } = useTranslation();
  const verses = t("verses", { returnObjects: true });
  const [verse, setVerse] = useState("");

  // اختر آية فقط عند تغير verses لأول مرة أو عند تهيئة
  useEffect(() => {
    if (verses.length > 0 && !verse) {
      // فقط إذا لم تكن موجودة آية سابقة
      const randomIndex = Math.floor(Math.random() * verses.length);
      setVerse(verses[randomIndex]);
    }
  }, [verses, verse]);
  return (
    <AnimatePresence>
      <motion.div
        initial={{
          opacity: 1,
          x: 150,
          y: 10,
        }}
        animate={{ opacity: 0, y: -500 }}
        exit={{ opacity: 0, y: -500 }}
        transition={{
          y: { duration: 10, ease: "easeOut" },
          opacity: { duration: 6, ease: "easeOut", delay: 4 },
        }}
        style={{
          position: "absolute",
          translateX: "-50%",
          translateY: "-50%",
          background: "#91eeff",
          color: "#333",
          padding: "8px 14px",
          borderRadius: "10px",
          fontSize: "14px",
          pointerEvents: "none",
          zIndex: 5,
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          whiteSpace: "nowrap",
        }}
      >
        {verse}
      </motion.div>
    </AnimatePresence>
  );
};

export default RandomVerse;
