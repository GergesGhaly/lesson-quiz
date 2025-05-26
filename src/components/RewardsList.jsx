import React from "react";

export default function RewardsList({ rewards }) {
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
      <h3>🏆 المكافآت المفتوحة</h3>
      {rewards.length === 0 ? (
        <p>لا توجد مكافآت حتى الآن.</p>
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
            .map(({ key, reward, icon, image }) => (
              <li
                key={key}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "12px",
                  background: "#ffffff22",
                  padding: "10px 16px",
                  borderRadius: "12px",
                  direction: "rtl",
                }}
              >
                {image ? (
                  <img
                    src={image}
                    alt={reward}
                    style={{ width: 40, height: 40, objectFit: "contain" }}
                  />
                ) : (
                  <span style={{ fontSize: 32 }}>{icon}</span>
                )}
                <span style={{ fontSize: "18px", fontWeight: "500" }}>
                  {reward}
                </span>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
