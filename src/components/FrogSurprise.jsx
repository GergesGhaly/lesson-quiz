import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import frog from "../assets/theFrog.png";
import HeartParticles from "./HeartParticles";
import { useSound } from "../contexts/SoundContext";
import HeartVerse from "./HeartVerse";

const FrogSurprise = () => {
  const { isSoundOn } = useSound();

  const [visible, setVisible] = useState(false);
  const [randomLeft, setRandomLeft] = useState("50%");
  const [key, setKey] = useState(0);
  const [showHeart, setShowHeart] = useState(false);
  const [showBigHeart, setBigShowHeart] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [disappearDuration, setDisappearDuration] = useState(1500);
  const [message, setMessage] = useState("");

  const intervalRef = useRef();
  const disappearDurationRef = useRef(disappearDuration);

  const generateRandomLeft = () => {
    const random = Math.floor(Math.random() * 80);
    setRandomLeft(`${random}%`);
  };

  const getFrogMessage = (speed) => {
    if (speed > 1200) return "Catch me if you can!";
    if (speed > 800) return "I'm getting faster!";
    if (speed > 500) return "Too quick for you!";

    return "Ribbit! I'm lightning!";
  };

  // تشغيل صوت الرسالة
  useEffect(() => {
    disappearDurationRef.current = disappearDuration;
    const newMsg = getFrogMessage(disappearDuration);
    setMessage(newMsg);

    if (isSoundOn && newMsg) {
      const msgSound = new Audio("/sound/frogMessage6.mp3");
      msgSound.play();
    }
  }, [disappearDuration, isSoundOn]);

  // ظهور الضفدع بشكل دوري
  useEffect(() => {
    generateRandomLeft();
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, disappearDurationRef.current);

    intervalRef.current = setInterval(() => {
      generateRandomLeft();
      setKey((prev) => prev + 1);
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, disappearDurationRef.current);
    }, 2000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const handleClick = () => {
    if (isSoundOn) {
      const clickSound = new Audio("/sound/frogClick.mp3");
      clickSound.play();
    }

    setClickCount((prev) => {
      const newCount = prev + 1;
      if (newCount % 3 === 0 && disappearDurationRef.current > 400) {
        const newDuration = Math.max(disappearDurationRef.current - 200, 400);
        setDisappearDuration(newDuration);
        setBigShowHeart(true);
      }
      return newCount;
    });

    if (!showHeart) {
      setShowHeart(true);
      setTimeout(() => {
        setShowHeart(false);
        setBigShowHeart(false);
      }, 1000);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        height: "100dvh",
        width: "100%",
        pointerEvents: "none",
      }}
    >
      {clickCount > 0 && (
        <>
          <div
            style={{
              position: "absolute",
              top: 20,
              left: 20,
              background: "#ffffffcc",
              padding: "10px 15px",
              borderRadius: "10px",
              fontSize: "14px",
              fontWeight: "bold",
              zIndex: 20,
              boxShadow: "0 0 5px rgba(0,0,0,0.2)",
              pointerEvents: "none",
            }}
          >
            <div>Clicks: {clickCount}</div>
            <div>Speed: {(disappearDuration / 1000).toFixed(1)}s</div>
          </div>

          {/* رسالة الضفدع */}
          <AnimatePresence mode="wait">
            <motion.div
              key={message}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              style={{
                position: "absolute",
                top: 85,
                left: 20,
                maxWidth: "220px",
                background: "#53c957",
                padding: "10px 14px",
                borderRadius: "12px",
                fontSize: "13px",
                fontWeight: "bold",
                zIndex: 20,
                boxShadow: "0 0 5px rgba(0,0,0,0.1)",
                pointerEvents: "none",
              }}
            >
              {message}
              <div
                style={{
                  position: "absolute",
                  left: "-9px",
                  top: "15px",
                  width: 0,
                  height: 0,
                  borderTop: "6px solid transparent",
                  borderBottom: "6px solid transparent",
                  borderRight: "10px solid #53c957",
                }}
              ></div>
            </motion.div>
          </AnimatePresence>
        </>
      )}
      {/* معلومات الضغط */}

      {showHeart && <HeartParticles trigger={showHeart} />}

      {/* عرض "I am here" لو السرعة وصلت لأقصى حد */}
      {visible && disappearDuration <= 500 && (
        <motion.div
          key="iamhere"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          style={{
            position: "absolute",
            bottom: "140px",
            left: randomLeft,
            transform: "translateX(-50%)",
            background: "#35fd56",
            color: "#000000",
            padding: "8px 12px",
            borderRadius: "8px",
            fontWeight: "medium",
            fontSize: "12px",
            zIndex: 15,
            pointerEvents: "none",
          }}
        >
          I am here!
        </motion.div>
      )}

      {/* الضفدع */}
      <AnimatePresence>
        {visible && (
          <motion.img
            key={key}
            src={frog}
            alt="Frog"
            onClick={handleClick}
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 200, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{
              width: "80px",
              height: "130px",
              position: "absolute",
              bottom: "0",
              left: randomLeft,
              transform: "translateX(-50%)",
              zIndex: 10,
              pointerEvents: "auto",
              cursor: "pointer",
            }}
          />
        )}
      </AnimatePresence>
      {/* <HeartVerse visible={showBigHeart} /> */}
    </div>
  );
};

export default FrogSurprise;
