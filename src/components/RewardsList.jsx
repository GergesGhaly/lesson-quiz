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
        gap: "10px",
        width: "100%",
      }}
    >
      <h3>🏆 {t("unlocked_rewards")}</h3>
      {rewards.length === 0 ? (
        <p> {t("no_rewards")} </p>
      ) : (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            overflow: "auto",
            maxHeight: "300px",
          }}
        >
          {rewards
            .slice()
            .reverse()
            .map(({ key, reward, icon, image, flag }) => (
              <li
                key={key}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  width: "100%",
                  marginBottom: "12px",
                  background: "#ffffff22",
                  padding: "10px 16px",
                  borderRadius: "12px",
                  direction: language === "ar" ? "rtl" : "ltr",
                }}
              >
                {/* صورة المكافأة أو الأيقونة */}
                {image ? (
                  <img
                    src={image}
                    alt={reward[language]}
                    style={{ width: 40, height: 40, objectFit: "contain" }}
                  />
                ) : (
                  <span style={{ fontSize: 32 }}>{icon}</span>
                )}

                {/* إذا كان هناك flag نعرض صورته فقط */}
                {flag && (
                  <img
                    src={flag}
                    alt={reward[language]}
                    style={{ width: 40, height: 40, objectFit: "cover" }}
                  />
                )}

                {/* اسم المكافأة */}
                <span style={{ fontSize: "18px", fontWeight: "500" }}>
                  {reward[language]}
                </span>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
