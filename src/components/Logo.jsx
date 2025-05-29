import React from "react";
import logo from "../assets/logo2.png";
import wrong from "../assets/wrong.png";
import { motion } from "framer-motion";

const Logo = () => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "500px",
        margin: "0 auto",
      }}
    >
      {/* اللوجو */}
      <img style={{ width: "100%", display: "block" }} src={logo} alt="logo" />

      {/* الفراشة تدور حول اللوجو */}
      {/* <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 6,
          ease: "linear",
        }}
        style={{
          position: "absolute",
          top: "-30px",
          left: "50%",
          width: "100%",
          height: "100%",
          transformOrigin: "center",
          pointerEvents: "none",
        }}
      >
        <img
          src={wrong}
          alt="butterfly"
          style={{
            width: "40px",
            height: "40px",
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
      </motion.div> */}
    </div>
  );
};

export default Logo;
