import React, { useEffect, useState } from "react";
import wallPc from "./assets/startWall.webp";
import play from "./assets/buttons/play.avif";
import battel from "./assets/buttons/battel.avif";
// import logo from "./assets/logo2.png";
import correct from "./assets/correct.avif";
import wrong from "./assets/wrong.avif";
import sound from "./assets/buttons/sound.avif";
import bounsIcon from "./assets/bounsIcon.png";

import en from "./assets/buttons/en.avif";
import ar from "./assets/buttons/ar.avif";
import { Link } from "react-router-dom";
import AboutMoadal from "./components/modals/AboutMoadal";
import { useTranslation } from "react-i18next";
import { useSound } from "./contexts/SoundContext";
import { motion } from "framer-motion";
import StartPageNav from "./components/StartPageNav";
import Logo from "./components/Logo";
import FlyinLeafs from "./components/FlyinLeafs";
import bgMusic from "/sound/gameBackground.mp3";
import { useRef } from "react";
import RewardToast from "./components/RewardToast";
import { getAndClearNewRewardToast } from "./utils/localStorageHelpers";
import GameQrLink from "./components/GameQrLink";
import DailyBonusModal from "./components/modals/DailyBonusModal";
import SettingModal from "./components/modals/settingModal";

const StartPage = () => {
  const audioRef = useRef(null);
  const { isSoundOn, setIsSoundOn } = useSound();
  const [isQrModalOpen, setQrModalOpen] = useState(false);

  const [selectedLang, setSelectedLang] = useState("ar"); // الحالة الافتراضية عربية
  const [showAbout, setShowAbout] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [newReward, setNewReward] = useState(false);
  const { i18n } = useTranslation();
  const [isDailyBonusAvailable, setIsDailyBonusAvailable] = useState(false);

  const [buttons] = useState([
    {
      title: "ابدأ الاختبار",
      link: "/ChooseTest",
      image: play,
    },
    {
      title: " البطولة",
      link: "/ChoosMatchMood",
      image: battel,
      message: "⚠️",
    },
    // {
    //   title: " bouns",
    //   link: "/BuildTheVerse",
    //   image: sound,
    // },
  ]);

  useEffect(() => {
    const ONE_DAY = 24 * 60 * 60 * 1000;
    const lastPlayed = localStorage.getItem("dailyVersePlayedAt");
    const now = Date.now();

    if (!lastPlayed || now - parseInt(lastPlayed) >= ONE_DAY) {
      setIsDailyBonusAvailable(true);
    }
  }, []);

  useEffect(() => {
    const reward = getAndClearNewRewardToast();
    if (reward) {
      setNewReward(reward);
    }
  }, []);

  useEffect(() => {
    if (!newReward) return;

    const timeout = setTimeout(() => {
      setNewReward(null);
    }, 3500);

    return () => clearTimeout(timeout);
  }, [newReward]);

  useEffect(() => {
    setSelectedLang(i18n.language);
  }, [i18n.language]);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(bgMusic);
      audioRef.current.volume = 0.5;
      audioRef.current.loop = true;
    }
  }, []);
  useEffect(() => {
    // إنشاء عنصر الصوت إذا لم يكن موجودًا
    if (!audioRef.current) {
      audioRef.current = new Audio(bgMusic);
      audioRef.current.volume = 0.5;
      audioRef.current.loop = true;
    }

    if (isSoundOn) {
      // حاول تشغيله مباشرة
      audioRef.current.play().catch((err) => {});
    } else {
      audioRef.current.pause();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [isSoundOn]);

  const toggleLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang); // احفظ اللغة الجديدة
  };

  return (
    <div
      style={{
        position: "relative",
        backgroundImage: `url(${wallPc})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        minHeight: "100dvh",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Logo />
      <GameQrLink
        isQrModalOpen={isQrModalOpen}
        setQrModalOpen={setQrModalOpen}
      />

      <div style={{ position: "absolute", top: "-50px", right: "0" }}>
        <FlyinLeafs />
      </div>
      {isDailyBonusAvailable && (
        <DailyBonusModal onClose={() => setIsDailyBonusAvailable(false)} />
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          maxWidth: "300px",
        }}
      >
        {buttons.map((btn) => (
          <motion.button
            key={btn.title}
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              position: "relative",
              outline: "none",
            }}
            whileTap={{ scale: 0.9 }}
            sty
          >
            {btn?.message && <p title="under devopment">{btn.message}</p>}
            <Link to={btn.link} key={btn.title}>
              <img src={btn.image} alt={btn.title} />
            </Link>
          </motion.button>
        ))}
      </div>

      <motion.button
        style={{
          backgroundColor: "transparent",
          border: "none",
          cursor: "pointer",
          position: "relative",
          outline: "none",
        }}
        whileTap={{ scale: 0.9 }}
        sty
      >
        <p>⚠️</p>
        <Link to="/BuildTheVerse">
          <img
            style={{ width: "100px", height: "110px", objectFit: "contain" }}
            src={bounsIcon}
            alt="bouns"
          />
        </Link>
      </motion.button>
      {/* زر الصوت */}
      {/* <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          // maxWidth: "110px",
          position: "relative",
        }}
      >
        <motion.button
          onClick={() => setIsSoundOn((prev) => !prev)}
          whileTap={{ scale: 0.9 }}
          style={{
            backgroundColor: "transparent",
            border: "none",
            outline: "none",
            cursor: "pointer",
            position: "relative",
          }}
        >
          <img
            src={sound}
            alt="sound"
            style={{ width: "100px", height: "110px", objectFit: "contain" }}
          />
          {!isSoundOn && (
            <motion.img
              src={wrong}
              alt="sound off"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{
                position: "absolute",
                bottom: "5px",
                right: "-10px",
                width: "60px",
                height: "60px",
                pointerEvents: "none",
              }}
            />
          )}
        </motion.button>
      </div> */}

      {/* اختيار اللغة */}
      {/* <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div style={{ position: "relative" }}>
          <motion.button
            style={{
              backgroundColor: "transparent",
              border: "none",
              outline: "none",
              cursor: "pointer",
            }}
            onClick={() => toggleLanguage("en")}
            whileTap={{ scale: 0.9 }}
          >
            <img
              style={{
                objectFit: "cover",
                width: "55px",
                height: "55px",
                borderRadius: "50%",
              }}
              src={en}
              alt="English"
            />
            {selectedLang === "en" && (
              <motion.img
                src={correct}
                alt="correct"
                initial={{ scale: 0, opacity: 0, y: -20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0, opacity: 0, y: -20 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  top: "-15px",
                  left: "0px",
                  width: "90px",
                  height: "90px",
                  pointerEvents: "none",
                }}
              />
            )}
          </motion.button>
        </div>

    
        <div style={{ position: "relative" }}>
          <motion.button
            style={{
              backgroundColor: "transparent",
              border: "none",
              outline: "none",
              cursor: "pointer",
              position: "relative",
            }}
            onClick={() => toggleLanguage("ar")}
            whileTap={{ scale: 0.9 }}
          >
            <img
              style={{
                objectFit: "cover",
                width: "55px",
                height: "55px",
                borderRadius: "50%",
              }}
              src={ar}
              alt="Arabic"
            />

            {selectedLang === "ar" && (
              <motion.img
                src={correct}
                alt="correct"
                initial={{ scale: 0, opacity: 0, y: -20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0, opacity: 0, y: -20 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  top: "-15px",
                  left: "0px",
                  width: "90px",
                  height: "90px",
                  pointerEvents: "none",
                }}
              />
            )}
          </motion.button>
        </div>
      </div> */}
      {/* التنقل */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <StartPageNav
          setShowAbout={setShowAbout}
          setQrModalOpen={setQrModalOpen}
          setShowSettings={setShowSettings}
        />
      </div>

      <AboutMoadal isOpen={showAbout} onClose={() => setShowAbout(false)} />
      {newReward && <RewardToast reward={newReward} isOpen={!!newReward} />}
      {showSettings && (
        <SettingModal
          setShowSettings={setShowSettings}
          setShowAbout={setShowAbout}
          setQrModalOpen={setQrModalOpen}
        />
      )}
    </div>
  );
};

export default StartPage;
