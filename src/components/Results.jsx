import { useTranslation } from "react-i18next";
import cup from "../assets/winMessage/cup.avif";
import celebrate from "../assets/winMessage/celebrate.avif";
import crown from "../assets/winMessage/crown.avif";
import TotalScoreIcon from "./TotalScoreIcon";
import NextLevelBtn from "./NextLevelBtn";

export default function Results({
  score,
  totalQuestions,
  percentage,
  onRetry,
  // evaluationMessage,
}) {
  const { t } = useTranslation();


  return (
    <div style={{ textAlign: "center" }}>
      <h2>
        {t("your_score")}: {score} {t("from")} {totalQuestions} (
        {percentage.toFixed(1)}%)
      </h2>
      {percentage >= 50 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 15,
            justifyContent: "center",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <TotalScoreIcon percentage={percentage} />
          <NextLevelBtn />
        </div>
      )}

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
