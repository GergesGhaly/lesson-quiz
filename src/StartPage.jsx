import React, { useEffect, useState } from "react";
import wallPc from "./assets/startWall.png";
import play from "./assets/buttons/play.png";
import battel from "./assets/buttons/battel.png";
import logo from "./assets/logo2.png";
import correct from "./assets/correct.png";
import wrong from "./assets/wrong.png";
import sound from "./assets/buttons/sound.png";
import en from "./assets/buttons/en.jpg";
import ar from "./assets/buttons/ar.jpg";
import { Link } from "react-router-dom";
import ProfileNavigationBtn from "./components/ProfileNavigationBtn";
// import SettingsModal from "./components/modals/SettingsModal";
import AboutMoadal from "./components/modals/AboutMoadal";
import { useTranslation } from "react-i18next";
import { useSound } from "./contexts/SoundContext";

const StartPage = () => {
  const { isSoundOn, setIsSoundOn } = useSound();

  // const [showSettings, setShowSettings] = useState(false);
  // const [showAbout, setShowAbout] = useState(false);
  const [selectedLang, setSelectedLang] = useState("ar"); // الحالة الافتراضية عربية
  // const [isSoundOn, setIsSoundOn] = useState(false); // الصوت مغلق افتراضيًا
  const [showAbout, setShowAbout] = useState(false);
  const { i18n } = useTranslation();
  const [buttons, setButtons] = useState([
    {
      title: "ابدأ الاختبار",
      link: "/ChooseTest",
      image: play,
    },
    {
      title: " البطولة",
      link: "/competition",
      image: battel,
    },
  ]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setSelectedLang(i18n.language);
  }, [i18n.language]);

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
        minHeight: "100vh",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {/* <button>{t("start_game")}</button>; */}
      <img style={{ width: "100%", maxWidth: "500px" }} src={logo} alt="logo" />
      {/* الأزرار */}
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
          <Link to={btn.link} key={btn.title}>
            <img src={btn.image} alt={btn.title} />
          </Link>
        ))}
      </div>
      {/* زر الصوت */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          maxWidth: "110px",
          position: "relative",
        }}
      >
        <button
          onClick={() => setIsSoundOn((prev) => !prev)}
          style={{
            backgroundColor: "transparent",
            border: "none",
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
            <img
              src={wrong}
              alt="sound off"
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
        </button>
      </div>
      {/* اختيار اللغة */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {/* علم EN */}
        <div style={{ position: "relative" }}>
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => toggleLanguage("en")}
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
              <img
                src={correct}
                alt="correct"
                style={{
                  position: "absolute",
                  top: "-15px",
                  left: "0px",
                  width: "90px",
                  height: "90px",
                  pointerEvents: "none", // لمنع التداخل مع الضغط
                }}
              />
            )}
          </button>
        </div>

        {/* علم AR */}
        <div style={{ position: "relative" }}>
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              position: "relative", // لضمان أن الصورة فوق الزر
            }}
            onClick={() => toggleLanguage("ar")}
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
              <img
                src={correct}
                alt="correct"
                style={{
                  position: "absolute",
                  top: "-15px",
                  left: "0px",
                  width: "90px",
                  height: "90px",
                  pointerEvents: "none", // لمنع التداخل مع الضغط
                }}
              />
            )}
          </button>
        </div>
      </div>
      {/* التنقل */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <ProfileNavigationBtn setShowAbout={setShowAbout} />
      </div>
      <AboutMoadal isOpen={showAbout} onClose={() => setShowAbout(false)} />
    </div>
  );
};

export default StartPage;
