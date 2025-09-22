import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimationFrame,
  AnimatePresence,
} from "framer-motion";
import logo from "../assets/logo2.avif";
import butterfly from "../assets/butterfly.avif";
import { useSound } from "../contexts/SoundContext";
import RandomVerse from "./RandomVerse";

const Logo = () => {
  const { isSoundOn } = useSound();

  const butterflyRef = useRef(null);
  const correctSoundRef = useRef(null);

  const [isNear, setIsNear] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showRandomVerse, setShowRandomVerse] = useState(false); // ✅

  const rotate = useMotionValue(0);
  const flap = useMotionValue(0);
  const lastRotate = useRef(0);
  const lastTime = useRef(0);
  const radiusBase = 120;

  const radius = useTransform(
    rotate,
    (r) => radiusBase + 15 * Math.sin((r * Math.PI) / 60)
  );
  const x = useTransform(
    rotate,
    (r) => Math.sin((r * Math.PI) / 180) * radius.get()
  );
  const y = useTransform(
    rotate,
    (r) => Math.cos((r * Math.PI) / 180) * radius.get() * 0.5
  );
  const zIndex = useTransform(rotate, (r) =>
    Math.cos((r * Math.PI) / 180) > 0 ? 2 : 0
  );
  const rotateZ = useTransform(flap, (f) => 10 * Math.sin((f * Math.PI) / 15));
  const rotateX = useTransform(flap, (f) => 5 * Math.cos((f * Math.PI) / 10));

  // ✅ تحديد اتجاه الوجه بناءً على زاوية الدوران
  const scaleX = useTransform(rotate, (r) => (r >= 90 && r <= 270 ? -1 : 1));
  const hintY = useTransform(y, (val) => val - 35);

  useAnimationFrame((t) => {
    flap.set((t / 7) % 60);

    if (!isNear) {
      if (lastTime.current === 0) {
        lastTime.current = t;
      }
      const delta = t - lastTime.current;
      const newRotate = (lastRotate.current + delta / 15) % 360;
      rotate.set(newRotate);
    } else {
      lastRotate.current = rotate.get();
      lastTime.current = 0;
    }
  });

  // timer to show hint
  useEffect(() => {
    const showTimer = setTimeout(() => {
      setShowHint(true);

      const hideTimer = setTimeout(() => {
        setShowHint(false);
      }, 3000); // تختفي بعد 3 ثوانٍ من ظهورها

      // تنظيف مؤقت الاختفاء
      return () => clearTimeout(hideTimer);
    }, 2000); // تظهر بعد 2 ثانية من بداية التطبيق

    // تنظيف مؤقت الظهور
    return () => clearTimeout(showTimer);
  }, []);
  useEffect(() => {
    correctSoundRef.current = new Audio("/sound/shine.mp3");

    const handleMouseMove = (e) => {
      const el = butterflyRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const distance = Math.sqrt(dx * dx + dy * dy);
      setIsNear(distance < 60);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleClick = () => {
    setShowHint(false);
    setShowRandomVerse(true);

    setIsClicked(true);
    if (isSoundOn) {
      correctSoundRef.current?.play().catch(() => {});
    }
    setTimeout(() => setIsClicked(false), 300);
    // إخفاء الآية بعد 5 ثوانٍ مثلاً:
    setTimeout(() => {
      setShowRandomVerse(false);
    }, 5000);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "400px",
        margin: "0 auto",
        perspective: 800,
      }}
    >
      {/* اللوجو */}
      <img
        src={logo}
        alt="logo"
        rel="preload"
        style={{
          width: "100%",
          display: "block",
          position: "relative",
          zIndex: 1,
        }}
      />

      {/* الفراشة */}
      {/* <button>
        <motion.img
          ref={butterflyRef}
          src={butterfly}
          alt="butterfly"
          onClick={handleClick}
          animate={{
            scale: isClicked ? [1, 0.8, 1.1, 1] : 1,
          }}
          transition={{ duration: 0.3 }}
          style={{
            width: "50px",
            height: "50px",
            position: "absolute",
            top: "50%",
            left: "50%",
            x,
            y,
            translateX: "-50%",
            translateY: "-50%",
            zIndex,
            rotateZ,
            rotateX,
            scaleX, // ✅ التحكم باتجاه الوجه
            transformStyle: "preserve-3d",
            willChange: "transform",
            userSelect: "none",
            cursor: "pointer",
            pointerEvents: "auto",
            filter: isClicked
              ? "brightness(1.8) drop-shadow(0 0 10px gold)"
              : "none",
            transition: "filter 0.3s ease",
          }}
        />
      </button> */}
      {/* {showHint && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            x,
            y: hintY, // يتحرك مع الفراشة
            translateX: "-50%",
            translateY: "-50%",
            background: "#91eeff",
            color: "#333",
            padding: "6px 12px",
            borderRadius: "8px",
            fontSize: "12px",
            pointerEvents: "none",
            zIndex: 4,
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            whiteSpace: "nowrap",
          }}
        >
          Click me
        </motion.div>
      )} */}
      {/* {showRandomVerse && <RandomVerse x={x} y={hintY} />} */}
    </div>
  );
};

export default Logo;
