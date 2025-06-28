import React, { useEffect, useState } from "react";
import wrong from "../../assets/wrong.avif";
import sound from "../../assets/buttons/sound.avif";
import correct from "../../assets/correct.avif";
import en from "../../assets/buttons/en.avif";
import ar from "../../assets/buttons/ar.avif";
import aboutBtn from "../../assets/buttons/aboutBtn.avif";
import qr from "../../assets/buttons/qr-icon.png";

import { motion, AnimatePresence } from "framer-motion";
import { useSound } from "../../contexts/SoundContext";
import { useTranslation } from "react-i18next";

const SettingModal = ({ setShowAbout, setQrModalOpen, setShowSettings }) => {
  const { isSoundOn, setIsSoundOn } = useSound();
  const { i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState("ar");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    setSelectedLang(i18n.language);
  }, [i18n.language]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 600);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100dvw",
          height: "100dvh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // backgroundColor: "rgba(0, 0, 0, 0.4)",
          zIndex: 999999,
        }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            width: isMobile ? "90dvw" : "40dvw",
            height: isMobile ? "50dvh" : "40dvh" ,
            // background: `url(${bg}) no-repeat center center`,
            backgroundSize: "cover",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            boxSizing: "border-box",

            gap: isMobile ? "20px" : "30px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            backgroundColor: "#2C3E50",
            border: "2px solid #fff",
          }}
        >
          {/* <div style={{ position: "absolute",top: 0, width: "100%", height: "100%" }}>
            <img src={bgModal} style={{ width: "100%", height: "100%", objectFit: "contain" }} alt="" srcset="" />
          </div> */}
          {/* زر الإغلاق */}
          <motion.button
            onClick={() => setShowSettings(false)}
            whileTap={{ scale: 0.9 }}
            style={{
              position: "absolute",
              top: "-25px",
              right: "-25px",

              background: "transparent",
              border: "none",
              fontSize: "20px",
              cursor: "pointer",
              color: "#fff",
            }}
          >
            <img style={{ width: "60px" }} src={wrong} alt="close" srcset="" />
          </motion.button>

          {/* الصوت + كلمة */}
          <div
            style={{
              // marginBottom: "20px",
              display: "flex",
              // marginTop: "40px",
              // flexDirection: "column",
              alignItems: "center",
              gap: isMobile ? "10px" : "20px",
            }}
          >
            <span style={{ color: "#fff", fontWeight: "bold" }}>Sound</span>
            <motion.button
              onClick={() => setIsSoundOn((prev) => !prev)}
              whileTap={{ scale: 0.9 }}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                position: "relative",
              }}
            >
              <img
                src={sound}
                alt="sound"
                style={{
                  width: isMobile ? "85px" : "110px",
                  height: isMobile ? "85px" : "110px",
                }}
              />
              {!isSoundOn && (
                <motion.img
                  src={wrong}
                  alt="off"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    position: "absolute",
                    bottom: "5px",
                    right: "-10px",
                    width: "50px",
                    height: "50px",
                  }}
                />
              )}
            </motion.button>
          </div>

          {/* اللغات + عنوان */}
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <span
              style={{
                color: "#fff",
                fontWeight: "bold",
                display: "block",
                marginBottom: "10px",
              }}
            >
              Language
            </span>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: isMobile ? "10px" : "20px",
                flexWrap: "wrap",
              }}
            >
              {[
                { lang: "en", icon: en },
                { lang: "ar", icon: ar },
              ].map(({ lang, icon }) => (
                <div key={lang} style={{ position: "relative" }}>
                  <motion.button
                    onClick={() => toggleLanguage(lang)}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={icon}
                      alt={lang}
                      style={{
                        width: isMobile ? "45px" : "55px",
                        height: isMobile ? "45px" : "55px",
                        borderRadius: "50%",
                      }}
                    />
                    {selectedLang === lang && (
                      <motion.img
                        src={correct}
                        alt="correct"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          position: "absolute",
                          top: "-15px",
                          left: "0px",
                          width: "90px",
                          height: "90px",
                        }}
                      />
                    )}
                  </motion.button>
                </div>
              ))}
            </div>
          </div>

          {/* about & share + كلمات */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: isMobile ? "10px" : "20px",
              flexWrap: "wrap",
              marginBottom: "10px",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <span>About</span>
              <motion.img
                whileHover={{ scale: 1.1 }}
                src={aboutBtn}
                alt="about"
                onClick={() => setShowAbout(true)}
                style={{ width: "60px", cursor: "pointer" }}
              />
            </div>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <span>Share</span>
              <motion.img
                whileHover={{ scale: 1.1 }}
                src={qr}
                alt="qr"
                onClick={() => setQrModalOpen(true)}
                style={{
                  width: "45px",
                  borderRadius: "40%",
                  cursor: "pointer",
                }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SettingModal;
