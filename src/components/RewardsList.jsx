import React from "react";

export default function RewardsList({ rewards }) {
  if (!rewards.length) return null;

  return (
    <div style={{ marginBottom: 10 }}>
      <h4>🎁 المكافآت التي حصلت عليها:</h4>
      <ul>
        {rewards
          .slice()
          .reverse()
          .map(({ key, reward, icon, image }) => (
            <li key={key} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {image ? (
                <img src={image} alt={reward} style={{ width: 24, height: 24 }} />
              ) : (
                <span style={{ fontSize: 20 }}>{icon}</span>
              )}
              <span>{reward}</span>
            </li>
          ))}
      </ul>
    </div>
  );
}
