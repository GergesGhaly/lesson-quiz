import React from "react";
import { useTranslation } from "react-i18next";

export default function RewardsList({ rewards }) {
  const { t, i18n } = useTranslation();
  const language = i18n.language || "ar";

  if (!rewards.length) return null;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
        height: "300px",
        gap: "12px",
        width: "100%",
      }}
    >
      {/* Scrollbar styles */}
      <style>
        {`
          ul.child-scroll::-webkit-scrollbar {
            width: 12px;
          }

          ul.child-scroll::-webkit-scrollbar-track {
            background: #f3f0ff52;
            border-radius: 10px;
          }

          ul.child-scroll::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #ffd700, #ff9900);
            border-radius: 10px;
            border: 2px solid white;
          }

          ul.child-scroll::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(to bottom, #ffeb3b, #ff9800);
          }
        `}
      </style>
      <h3>🏆 {t("unlocked_rewards")}</h3>
      {rewards.length === 0 ? (
        <p> {t("no_rewards")} </p>
      ) : (
        <ul
          className="child-scroll"
          style={{
            listStyle: "none",
            padding: 0,
            overflow: "auto",
            maxHeight: "100%",
          }}
        >
          {rewards
            .slice()
            .reverse()
            .map(({ key, reward, icon, image, flag, shield, sword }) => (
              <li
                key={key}
                style={{
                  display: "flex",
                  alignItems: "center", // هذا يجعل الصور والاسم في نفس الخط العمودي
                  gap: "4px",
                  width: "100%",
                  marginBottom: "12px",
                  background: "#ffffff22",
                  padding: "10px 15px",
                  borderRadius: "12px",
                  direction: language === "ar" ? "rtl" : "ltr",
                }}
              >
                {/* الصور والأيقونات معًا في صف */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    minWidth: "70px", // لتوحيد المساحة
                  }}
                >
                  {image ? (
                    <img
                      src={image}
                      alt={reward[language]}
                      style={{ width: 40, height: 40, objectFit: "contain" }}
                    />
                  ) : (
                    <span style={{ fontSize: 32 }}>{icon}</span>
                  )}

                  {flag && (
                    <img
                      src={flag}
                      alt={reward[language]}
                      style={{ width: 40, height: 40, objectFit: "cover" }}
                    />
                  )}

                  {shield && (
                    <img
                      src={shield}
                      alt={reward[language]}
                      style={{ width: 40, height: 40, objectFit: "cover" }}
                    />
                  )}

                  {sword && (
                    <img
                      src={sword}
                      alt={reward[language]}
                      style={{ width: 40, height: 40, objectFit: "cover" }}
                    />
                  )}
                </div>

                {/* اسم المكافأة */}
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: "500",
                    flex: 1,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {reward[language]}
                </span>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
