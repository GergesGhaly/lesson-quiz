import React, { useEffect, useState } from "react";
import wallPc from "./assets/startWall.webp";
import play from "./assets/buttons/play.avif";
import battel from "./assets/buttons/battel.avif";
import bounsIcon from "./assets/buttons/bounsIcon2.png";

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
import SettingModal from "./components/modals/SettingModal";

const StartPage = () => {
  const audioRef = useRef(null);
  const { isSoundOn } = useSound();
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
  ]);

  useEffect(() => {
    const ONE_DAY = 24 * 60 * 60 * 1000;
    const lastShown = localStorage.getItem("dailyBonusLastShown");
    const now = Date.now();

    if (!lastShown || now - parseInt(lastShown) >= ONE_DAY) {
      setIsDailyBonusAvailable(true);
      localStorage.setItem("dailyBonusLastShown", now.toString()); // احفظ وقت العرض
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
