import React from "react";
import { motion } from "framer-motion";
import cup from "../assets/winMessage/cup.avif";
import celebrate from "../assets/winMessage/celebrate.avif";
import crown from "../assets/winMessage/crown.avif";
import lamp from "../assets/winMessage/lamp.avif";
import { quizzes } from "../data/QuizzesWithTranslations";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const TotalScoreIcon = ({ percentage }) => {
  const { t } = useTranslation();
  const { quizId } = useParams();
  const quiz = quizzes.find((q) => q.id === Number(quizId));

  if (!quiz) return null;

  let iconSrc = lamp;
  let altText = "Lamp";
  let degree = "";

  if (percentage > 85) {
    iconSrc = crown;
    altText = "Crown";
    degree = "score.excellent";
  } else if (percentage > 75) {
    iconSrc = cup;
    altText = "Cup";
    degree = "score.veryGood";
  } else if (percentage >= 50) {
    iconSrc = celebrate;
    altText = "Celebrate";
    degree = "score.good";
  }

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        scale: [1, 1.1, 1, 1.1, 1], // نبضتين
      }}
      transition={{
        y: { duration: 0.5, ease: "easeOut" },
        opacity: { duration: 0.5, ease: "easeOut" },
        scale: {
          delay: 0.5,
          duration: 1,
          ease: "easeInOut",
          times: [0, 0.25, 0.5, 0.75, 1],
        },
      }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <img
        src={iconSrc}
        alt={altText}
        style={{ width: 150, height: 150, objectFit: "cover" }}
      />
      {degree && (
        <h4
          style={{
            margin: 0,
            fontSize: 16,
            fontWeight: "bold",
            color: "#444",
            textAlign: "center",
          }}
        >
          {t(degree)}
        </h4>
      )}
    </motion.div>
  );
};

export default TotalScoreIcon;
