import React from "react";
import { useTranslation } from "react-i18next";

const ProgressDots = ({ total, answersStatus }) => {
  const { t, i18n } = useTranslation();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "20px",
        gap: "8px",
        flexWrap: "wrap",
        direction: i18n.language === "ar" ? "rtl" : "ltr",
      }}
    >
      {Array.from({ length: total }).map((_, index) => {
        let backgroundColor = "#ccc"; // الافتراضي

        if (answersStatus[index] === "correct") {
          backgroundColor = "#4CAF50"; // أخضر
        } else if (answersStatus[index] === "wrong") {
          backgroundColor = "#F44336"; // أحمر
        }

        return (
          <div
            key={index}
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor,
              transition: "background-color 0.3s",
            }}
          />
        );
      })}
    </div>
  );
};

export default ProgressDots;
