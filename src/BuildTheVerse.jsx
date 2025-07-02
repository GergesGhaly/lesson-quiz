import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import BounsResult from "./BounsResult";
import CoinAnimation from "./components/CoinAnimation";
import CountdownCircle from "./components/CountdownCircle";
import click from "/sound/click.mp3";
import {
  getQuizResults,
  getUnlockedRewards,
  saveQuizResults,
  saveUnlockedRewards,
  storeNewRewardToast,
} from "./utils/localStorageHelpers";
import { checkAndGrantRewards } from "./utils/rewardUtils";
import { useSound } from "./contexts/SoundContext";

const BuildTheVerse = () => {
  const { t } = useTranslation();
  const { isSoundOn } = useSound();
  const clickAudioRef = useRef(null);
  const correctSoundRef = useRef(null);
  // const RemoveclickRef = useRef(null);

  useEffect(() => {
    clickAudioRef.current = new Audio("/sound/click.mp3"); // مسار مباشر للملف
    correctSoundRef.current = new Audio("/sound/correct.mp3");
    // RemoveclickRef.current = new Audio("/sound/click2.mp3");
  }, []);

  const verses = t("bounsVerses", { returnObjects: true });

  const ONE_DAY = 24 * 60 * 60 * 1000;
  const GAME_TIME = 60;

  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState([]);
  const [shuffledWords, setShuffledWords] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const scoreSaved = useRef(false); // ✅ لحماية التخزين من التكرار

  const currentVerse = verses[questionIndex];
  const correctWords = currentVerse.split(" ");

  useEffect(() => {
    const lastPlayed = localStorage.getItem("dailyVersePlayedAt");
    const now = Date.now();

    if (lastPlayed && now - parseInt(lastPlayed) < ONE_DAY) {
      setIsLocked(true);
    } else {
      startNewQuestion();
    }
  }, []);

  const startNewQuestion = () => {
    const randomIndex = Math.floor(Math.random() * verses.length);
    setQuestionIndex(randomIndex);
    setSelectedWords([]);
    setIsCorrect(false);

    const shuffled = verses[randomIndex]
      .split(" ")
      .map((word, index) => ({ word, id: `${word}-${index}` }))
      .sort(() => Math.random() - 0.5);

    setShuffledWords(shuffled);
  };

  const updateLocalResults = (newScore) => {
    const existingResults = getQuizResults();
    const updatedResults = [...existingResults, newScore];
    saveQuizResults(updatedResults);
    const total = updatedResults.reduce((sum, val) => sum + val, 0);
    const unlocked = getUnlockedRewards();
    const newlyUnlocked = checkAndGrantRewards(total, unlocked);
    const updatedUnlockedKeys = [
      ...unlocked,
      ...newlyUnlocked.map((r) => r.key),
    ];

    if (newlyUnlocked.length > 0) {
      saveUnlockedRewards(updatedUnlockedKeys);
      storeNewRewardToast(newlyUnlocked[0]);
    }
  };

  const handleTimeUp = () => {
    if (scoreSaved.current) return; // ✅ منع التكرار
    setIsFinished(true);
    setIsLocked(true);
    localStorage.setItem("dailyVersePlayedAt", Date.now().toString());
    updateLocalResults(score);
    scoreSaved.current = true; // ✅ تم الحفظ
  };

  const handleWordClick = (wordObj) => {
    if (selectedWords.includes(wordObj) || isCorrect || isFinished || isLocked)
      return;
    if (isSoundOn && clickAudioRef.current) {
      clickAudioRef.current.currentTime = 0;
      clickAudioRef.current.play().catch(() => {});
    }

    const updated = [...selectedWords, wordObj];
    setSelectedWords(updated);

    if (updated.length === correctWords.length) {
      const result = updated.map((w) => w.word).join(" ") === currentVerse;
      setIsCorrect(result);
      if (result) {
        if (isSoundOn && correctSoundRef.current) {
          correctSoundRef.current.currentTime = 0;
          correctSoundRef.current.play().catch(() => {});
        }
        const newScore = score + 5;
        setScore(newScore);
        if (newScore >= 15) {
          setIsFinished(true);
          setIsLocked(true);
          localStorage.setItem("dailyVersePlayedAt", Date.now().toString());

          if (!scoreSaved.current) {
            updateLocalResults(newScore);
            scoreSaved.current = true; // ✅ تم الحفظ
          }
        } else {
          setTimeout(() => {
            startNewQuestion();
          }, 1000);
        }
      } else {
        setIsCorrect(false);
      }
    }
  };

  const handleRemoveWord = (indexToRemove) => {
    if (isCorrect || isFinished || isLocked) return;
    if (isSoundOn && clickAudioRef.current) {
      clickAudioRef.current.currentTime = 0;
      clickAudioRef.current.play().catch(() => {});
    }

    const updated = [...selectedWords];
    updated.splice(indexToRemove, 1);
    setSelectedWords(updated);
    setIsCorrect(false);
  };

  if (isLocked) {
    return <BounsResult score={score} />;
  }

  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",
        fontFamily: "Arial",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
        height: "100dvh",
        gap: "20px",
        background: "radial-gradient(circle, #502a63, #30103F)",
      }}
    >
      <h2 style={{ color: "#fff" }}>🎁 مكافأتك اليومية: كوّن الآية</h2>
      <div style={{ color: "#fff", fontSize: "20px" }}>
        السؤال {Math.min(score / 5 + 1, 3)} / 3
      </div>

      {!isFinished && (
        <CountdownCircle totalTime={GAME_TIME} onComplete={handleTimeUp} />
      )}

      <div style={{ marginBottom: "20px" }}>
        {shuffledWords.map((wordObj) => (
          <button
            key={wordObj.id}
            onClick={() => handleWordClick(wordObj)}
            style={{
              margin: "5px",
              padding: "10px 15px",
              fontSize: "18px",
              borderRadius: "8px",
              cursor: selectedWords.includes(wordObj)
                ? "not-allowed"
                : "pointer",
              backgroundColor: selectedWords.includes(wordObj)
                ? "#ccc"
                : "#ffb004",
              border: "none",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            }}
            disabled={
              selectedWords.includes(wordObj) || isCorrect || isFinished
            }
          >
            {wordObj.word}
          </button>
        ))}
      </div>

      <div
        style={{
          minHeight: "50px",
          minWidth: "300px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "10px",
          border: "2px dashed #999",
          borderRadius: "10px",
          marginBottom: "20px",
          background: "#0000003e",
          direction: "rtl",
        }}
      >
        {selectedWords.map((wordObj, idx) => {
          const isCorrectPosition = correctWords[idx] === wordObj.word;
          const backgroundColor = isCorrectPosition ? "#107c14" : "#dd2d01";

          return (
            <button
              key={wordObj.id}
              onClick={() => handleRemoveWord(idx)}
              style={{
                margin: "5px",
                padding: "10px 15px",
                fontSize: "18px",
                backgroundColor,
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                color: "#ffffff",
              }}
              disabled={isCorrect || isFinished}
            >
              {wordObj.word}
            </button>
          );
        })}
      </div>

      <CoinAnimation visible={isCorrect} points={5} />

      {!isCorrect && isFinished && (
        <div style={{ marginTop: "10px", color: "red", fontSize: "22px" }}>
          ❌ انتهى الوقت!
        </div>
      )}
    </div>
  );
};

export default BuildTheVerse;
