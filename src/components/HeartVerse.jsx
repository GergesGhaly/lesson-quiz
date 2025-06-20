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
            y: { duration: 3, ease: "easeOut" },
            opacity: { duration: 2.5, ease: "easeOut", delay: 1 },
            scale: { duration: 3 },
          }}
          style={{
            padding: "8px",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100vw",
            maxWidth: "450px",
            height: "300px",
            background: "linear-gradient(135deg, #ff2626, #ff353f)",
            clipPath:
              "path('M225 290 C-60 120, 225 -40, 225 80 C225 -40, 510 120, 225 290 Z')",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontSize: "20px",
            fontWeight: "bold",
            textAlign: "center",
            padding: "20px",
            zIndex: 999,
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          {/* لمعان باستخدام Framer Motion */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 1.2,
              ease: "easeInOut",
              //   repeat: Infinity,
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
          <div style={{ position: "relative", zIndex: 2 }}>{verse}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HeartVerse;
