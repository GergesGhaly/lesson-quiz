import React from "react";

export default function Results({
  score,
  totalQuestions,
  percentage,
  onRetry,
  evaluationMessage,
}) {
  return (
    <div style={{ textAlign: "center" }}>
      <h2>
        🎉 نتيجتك: {score} من {totalQuestions} ({percentage.toFixed(1)}%)
      </h2>
      {percentage >= 50 && <h3>{evaluationMessage}</h3>}
      {percentage < 50 && (
        <>
          <h3>❤️ من هنا تقدر تحاول تانى</h3>
          <button
            onClick={onRetry}
            style={{ padding: "10px 20px", fontSize: "18px", marginTop: 20 }}
          >
            حاول تانى
          </button>
        </>
      )}
    </div>
  );
}
