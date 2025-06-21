import React, { useState, useEffect } from "react";
import Quiz from "./components/Quiz";
import Results from "./components/Results";
import ConfettiOverlay from "./components/ConfettiOverlay";
import RewardPopup from "./components/RewardPopup";
import { motion } from "framer-motion";
import { db, ref, set, update } from "./utils/firebase"; // عدّل المسار حسب ملفك

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
import matchBg from "./assets/matchBg.jpg";
import QuizNavBar from "./components/QuizNavBar";
import { useSound } from "./contexts/SoundContext";
import soundOn from "./assets/buttons/soundOn.png";
import soundOf from "./assets/buttons/soundOf.png";

function Home({ match, playerId, roomId }) {
  const { isSoundOn, setIsSoundOn } = useSound();

  const { quizId } = useParams();
  const quiz = !match
    ? quizzes.find((q) => q.id === Number(quizId))
    : quizzes.find((q) => q.id === 101);

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);

  const [showResult, setShowResult] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [unlockedRewards, setUnlockedRewards] = useState([]);
  const [rewardPopup, setRewardPopup] = useState(null);

  const [pendingConfetti, setPendingConfetti] = useState(false);
  const [pendingFinalIcon, setPendingFinalIcon] = useState(false);

  useEffect(() => {
    const savedResults = getQuizResults();
    const total = savedResults.reduce((sum, val) => sum + val, 0);
    setTotalScore(total);

    const rewardsKeys = getUnlockedRewards();
    setUnlockedRewards(getRewardsDisplay(rewardsKeys));
  }, []);

  const savePlayerScoreToFirebase = async (playerId, roomId, score) => {
    try {
      await set(ref(db, `players/${playerId}/points`), score);
      await update(ref(db, `rooms/${roomId}/playerPoints`), {
        [playerId]: score,
      });

      console.log("تم حفظ النقاط في Firebase");
    } catch (error) {
      console.error("خطأ في حفظ النقاط:", error);
    }
  };

  const updateLocalResults = (newScore) => {
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

      setRewardPopup(newlyUnlocked[0]);
      // storeNewRewardToast(newlyUnlocked[0]);

      setPendingConfetti(true);
      setPendingFinalIcon(true);
    } else {
      if ((newScore / quiz.questions.length) * 100 >= 50) {
        setShowConfetti(true);
      }
    }
  };

  const handleAnswer = async (index) => {
    const isCorrect = index === quiz.questions[current].correct;
    const newScore = isCorrect ? score + 1 : score;

    if (current + 1 < quiz.questions.length) {
      setScore(newScore);
      setCurrent(current + 1);
    } else {
      setScore(newScore);
      setShowResult(true);

      if ((newScore / quiz.questions.length) * 100 >= 50 && !match) {
        setPendingConfetti(true);
        setPendingFinalIcon(true);
      }

      // ✅ في حالة غير مباراة، أرسل النتيجة إلى local
      if (!match) {
        updateLocalResults(newScore);
      }
    }

    if (match && playerId && roomId) {
      await savePlayerScoreToFirebase(playerId, roomId, newScore);
      // updateLocalResults(newScore);
    }

    // if(match && countdown) {
    //   // set scor to local storage
    // }
  };

  const handleCloseRewardPopup = () => {
    setRewardPopup(null);
    if (pendingConfetti) setShowConfetti(true);

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
    setRewardPopup(null);
  };

  const percentage = (score / quiz.questions.length) * 100;

  return (
    <div
      style={{
        padding: 20,
        fontFamily: "Arial",
        direction: "rtl",
        backgroundImage: `url(${match ? matchBg : wall})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        width: "100vw",
        overflow: "hidden",
        display: match && "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {!match && <QuizNavBar quiz={quiz} totalScore={totalScore} />}
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
      <motion.button
        onClick={() => setIsSoundOn((prev) => !prev)}
        whileTap={{ scale: 0.9 }}
        style={{
          backgroundColor: "transparent",
          border: "none",
          outline: "none",
          cursor: "pointer",
          position: "absolute",

          bottom: "10px",
          right: "10px",
        }}
      >
        <img
          src={isSoundOn ? soundOn : soundOf}
          alt="sound"
          style={{ width: "40px", height: "40px", objectFit: "contain" }}
        />
      </motion.button>
    </div>
  );
}

export default Home;
