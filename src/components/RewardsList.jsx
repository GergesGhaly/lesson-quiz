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
          .map(({ key, reward }) => (
            <li key={key}>{reward}</li>
          ))}
      </ul>
    </div>
  );
}
