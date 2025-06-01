import React, { useState, useEffect } from "react";
import Quiz from "./components/Quiz";
import Results from "./components/Results";
import ConfettiOverlay from "./components/ConfettiOverlay";
import RewardPopup from "./components/RewardPopup";
import FinalIconOverlay from "./components/FinalIconOverlay";
import { motion } from "framer-motion";

import {
  getQuizResults,
  saveQuizResults,
  getUnlockedRewards,
  saveUnlockedRewards,
} from "./utils/localStorageHelpers";

import { checkAndGrantRewards, getRewardsDisplay } from "./utils/rewardUtils";
import { quizzes } from "./data/QuizzesWithTranslations";
import { useParams } from "react-router-dom";
import wall from "./assets/mainWall.webp";
import cup from "./assets/winMessage/cup.avif";
import celebrate from "./assets/winMessage/celebrate.avif";
import crown from "./assets/winMessage/crown.avif";
import lamp from "./assets/winMessage/lamp.avif";
import QuizNavBar from "./components/QuizNavBar";

function Home() {
  const { quizId } = useParams();
  const quiz = quizzes.find((q) => q.id === Number(quizId));

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  // const [showFinalIcon, setShowFinalIcon] = useState(false);
  const [unlockedRewards, setUnlockedRewards] = useState([]);
  const [rewardPopup, setRewardPopup] = useState(null);

  const [pendingConfetti, setPendingConfetti] = useState(false);
  const [pendingFinalIcon, setPendingFinalIcon] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const savedResults = getQuizResults();
    const total = savedResults.reduce((sum, val) => sum + val, 0);
    setTotalScore(total);

    const rewardsKeys = getUnlockedRewards();
    setUnlockedRewards(getRewardsDisplay(rewardsKeys));
  }, []);

  const handleAnswer = (index) => {
    const isCorrect = index === quiz.questions[current].correct;
    const newScore = isCorrect ? score + 1 : score;

    if (current + 1 < quiz.questions.length) {
      setScore(newScore);
      setCurrent(current + 1);
    } else {
      setScore(newScore);
      setShowResult(true);
      const percentageFinal = (newScore / quiz.questions.length) * 100;

      if (percentageFinal >= 50) {
        setPendingConfetti(true);
        setPendingFinalIcon(true);
      }

      const existingResults = getQuizResults();
      const updatedResults = [...existingResults, newScore];
      saveQuizResults(updatedResults);

      const total = updatedResults.reduce((sum, val) => sum + val, 0);
      setTotalScore(total);

      const unlocked = getUnlockedRewards();
      const newlyUnlocked = checkAndGrantRewards(total, unlocked);

      const updatedUnlockedKeys = [
        ...unlocked,
        ...newlyUnlocked.map((r) => r.key),
      ];

      if (newlyUnlocked.length > 0) {
        saveUnlockedRewards(updatedUnlockedKeys);
        setUnlockedRewards(getRewardsDisplay(updatedUnlockedKeys));

        // ❗ أوقف المؤثرات مؤقتًا وانتظر إغلاق RewardPopup
        setRewardPopup(newlyUnlocked[0]);
        setPendingConfetti(true);
        setPendingFinalIcon(true);
      } else {
        // ✅ لا يوجد Popup → أظهر المؤثرات مباشرة إذا كان التأهل >= 50%
        if (percentageFinal >= 50) {
          setShowConfetti(true);
          // setShowFinalIcon(true);
          // setTimeout(() => setShowFinalIcon(false), 6000);
        }
      }
    }
  };

  const handleCloseRewardPopup = () => {
    setRewardPopup(null);
    if (pendingConfetti) setShowConfetti(true);
    if (pendingFinalIcon) {
      // setShowFinalIcon(true);
      // setTimeout(() => setShowFinalIcon(false), 10000);
    }
    setPendingConfetti(false);
    setPendingFinalIcon(false);
  };

  const resetScores = () => {
    const existing = getQuizResults();
    if (existing.length > 0) {
      existing.pop();
      saveQuizResults(existing);
      const total = existing.reduce((sum, val) => sum + val, 0);
      setTotalScore(total);
    }
    setScore(0);
    setCurrent(0);
    setShowResult(false);
    setShowConfetti(false);
    // setShowFinalIcon(false);
    setRewardPopup(null);
  };

  const percentage = (score / quiz.questions.length) * 100;

  return (
    <div
      style={{
        padding: 20,
        fontFamily: "Arial",
        direction: "rtl",
        backgroundImage: `url(${wall})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <QuizNavBar quiz={quiz} totalScore={totalScore} />

      <ConfettiOverlay show={showConfetti && percentage >= 50} />
      <RewardPopup
        reward={rewardPopup}
        onClose={handleCloseRewardPopup}
        disableOutsideClick={true}
      />

      {showResult ? (
        <Results
          score={score}
          totalQuestions={quiz.questions.length}
          percentage={percentage}
          onRetry={resetScores}
        />
      ) : (
        <Quiz
          questions={quiz.questions}
          current={current}
          onAnswer={handleAnswer}
        />
      )}
    </div>
  );
}

export default Home;
