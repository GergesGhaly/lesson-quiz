
import { useTranslation } from "react-i18next";

export default function Results({
  score,
  totalQuestions,
  percentage,
  onRetry,
  evaluationMessage,
}) {
 
  const { t } = useTranslation();

  return (
    <div style={{ textAlign: "center" }}>
      <h2>
        🎉 {t("your_score")}: {score} {t("from")} {totalQuestions} (
        {percentage.toFixed(1)}%)
      </h2>
      {percentage >= 50 && <h3>{evaluationMessage}</h3>}
      {percentage < 50 && (
        <>
          <h3>❤️ {t("try_again_message")}</h3>
          <button
            onClick={onRetry}
            style={{ padding: "10px 20px", fontSize: "18px", marginTop: 20 }}
          >
            {t("try_again")}
          </button>
        </>
      )}
    </div>
  );
}
