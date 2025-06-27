import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import chickenImg from "../assets/chicken.png";
import grainImg from "../assets/grain.png";
import bombImg from "../assets/bomb.jpg";
import gameOverSound from "/sound/chekenGameOver.mp3";
import { useSound } from "../contexts/SoundContext";

const ChickenGame = () => {
  const { isSoundOn } = useSound();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  const [isPecking, setIsPecking] = useState(false);
  const [showItem, setShowItem] = useState(false);
  const [itemType, setItemType] = useState("grain");
  const [score, setScore] = useState(0);
  const [itemEaten, setItemEaten] = useState(false);
  const [hearts, setHearts] = useState([true, true, true]);
  const [effect, setEffect] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const audioRef = useRef(null);
  const chickenRef = useRef(null);
  const [grainPosition, setGrainPosition] = useState({ top: 0, left: 0 });

  // مراقبة حجم الشاشة
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 600);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // تحديث موقع الحبة أمام الدجاجة
  useLayoutEffect(() => {
    if (chickenRef.current) {
      const rect = chickenRef.current.getBoundingClientRect();
      const offsetTop = rect.top + rect.height - 45;
      const offsetLeft = rect.left + rect.width / 2 + 35;

      setGrainPosition({ top: offsetTop, left: offsetLeft });
    }
  }, [showItem, isMobile]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameOver) {
        const randomType = Math.random() < 0.7 ? "grain" : "bomb";
        setItemType(randomType);
        setItemEaten(false);
        setShowItem(true);

        setTimeout(() => {
          setShowItem(false);
        }, 800);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [gameOver]);

  const resetGame = () => {
    setScore(0);
    setHearts([true, true, true]);
    setGameOver(false);
  };

  const handleChickenClick = () => {
    if (gameOver) return;

    setIsPecking(true);

    if (showItem && !itemEaten) {
      setItemEaten(true);
      setShowItem(false);

      if (itemType === "grain") {
        setScore((prev) => prev + 1);
        setEffect("grain");
      } else if (itemType === "bomb") {
        const nextHearts = [...hearts];
        const lastRed = nextHearts.lastIndexOf(true);
        if (lastRed !== -1) nextHearts[lastRed] = false;
        setHearts(nextHearts);
        setEffect("bomb");

        if (nextHearts.every((h) => !h)) {
          setGameOver(true);
          if (audioRef.current && isSoundOn) audioRef.current.play();
          setTimeout(() => resetGame(), 3000);
        }
      }

      setTimeout(() => setEffect(null), 500);
    }

    setTimeout(() => setIsPecking(false), 300);
  };

  return (
    <div
      style={{
        position: "absolute",
        bottom: 50,
        left: isMobile ? 0 : "10%",
        zIndex: 10,
        width: isMobile ? "100px" : "230px",
        height: "200px",
        // overflow: "hidden",
        borderRadius: "16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <audio ref={audioRef} src={gameOverSound} />

      {/* السكور + القلوب */}
      {score > 0 && (
        <>
          <div
            style={{
              backgroundColor: "#222222ae",
              color: "#fff",
              padding: "6px 10px",
              borderRadius: "8px",
              fontSize: isMobile ? "14px" : "18px",
              fontWeight: "bold",
            }}
          >
            <img src={grainImg} width="20" height="20" alt="" /> {score}
          </div>
          <div
            style={{
              display: "flex",
              gap: "8px",
              fontSize: isMobile ? "18px" : "24px",
            }}
          >
            {hearts.map((isAlive, i) => (
              <span key={i}>{isAlive ? "❤️" : "🖤"}</span>
            ))}
          </div>
        </>
      )}

      {/* العنصر (الحبة أو القنبلة) */}
      {showItem && (
        <img
          src={itemType === "grain" ? grainImg : bombImg}
          alt={itemType}
          style={{
            position: "fixed", // نستخدم fixed للحصول على تموضع دقيق في الصفحة
            width: "40px",
            height: "40px",
            top: `${grainPosition.top}px`,
            left: `${grainPosition.left}px`,
            zIndex: 10,
          }}
        />
      )}

      {/* تأثير الأكل */}
      <AnimatePresence>
        {effect && (
          <motion.div
            key="effect"
            initial={{ scale: 0.5, opacity: 1 }}
            animate={{ scale: 1.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              top: `${grainPosition.top - 10}px`,
              left: `${grainPosition.left - 10}px`,
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: effect === "grain" ? "yellow" : "red",
              boxShadow: effect === "bomb" ? "0 0 20px red" : "none",
              zIndex: 20,
            }}
          />
        )}
      </AnimatePresence>

      {/* رسالة Game Over */}
      {gameOver && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{
            position: "absolute",
            top: "50px",
            left: "85%",
            backgroundColor: "#000",
            color: "#fff",
            padding: "3px 6px",
            borderRadius: "8px",
            fontSize: "12px",
            fontWeight: "medium",
          }}
        >
          Game Over
        </motion.div>
      )}

      {/* الدجاجة */}
      <motion.img
        ref={chickenRef}
        src={chickenImg}
        alt="Chicken"
        onClick={handleChickenClick}
        initial={{ rotate: 0 }}
        animate={isPecking ? { rotate: 60, y: 30 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.15 }}
        style={{
          width: "100px",
          cursor: "pointer",
        }}
      />
    </div>
  );
};

export default ChickenGame;
