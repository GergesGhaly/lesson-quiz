import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const HeartVerse = ({ visible }) => {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  const verses = t("verses", { returnObjects: true });
  const [verse, setVerse] = useState("");

  useEffect(() => {
    if (visible) {
      const randomIndex = Math.floor(Math.random() * verses.length);
      setVerse(verses[randomIndex]);
    }
  }, [visible]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {visible && verse && (
        <motion.div
          key={verse}
          initial={{ opacity: 1, scale: 0.5, y: 0 }}
          animate={{ opacity: 0, y: -350, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            y: { duration: 2, ease: "easeOut" },
            opacity: { duration: 1.7, ease: "easeOut", delay: 0.3 },
            scale: { duration: 2 },
          }}
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: isMobile ? "250px" : "350px", // جعل العرض أكبر
            height: isMobile ? "160px" : "200px",
            background: "linear-gradient(135deg, #ff2626, #ff353f)",
            clipPath: isMobile
              ? "path('M125 160 C-40 60, 125 -20, 125 44 C125 -20, 290 60, 125 160 Z')" // أعرض للموبايل
              : "path('M175 200 C-60 90, 175 -40, 175 60 C175 -40, 410 90, 175 200 Z')", // أعرض للديسكتوب
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontSize: isMobile ? "12px" : "16px",
            fontWeight: "bold",
            textAlign: "center",
            padding: "14px",
            zIndex: 999,
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          {/* تأثير اللمعان */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 1.2,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(120deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.1) 100%)",
              transform: "skewX(-20deg)",
              zIndex: 1,
            }}
          />
          <div
            style={{
              position: "relative",
              zIndex: 2,
              width: "100%",
              textAlign: "center",
              lineHeight: "1.2",
            }}
          >
            {verse}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HeartVerse;
