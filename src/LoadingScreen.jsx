import React from "react";
import { motion } from "framer-motion";
import FrogSurprise from "./components/FrogSurprise";

const LoadingScreen = ({ progress }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: "#f0f0f0",
      }}
    >
      <p style={{ marginBottom: "20px", fontSize: "20px"}}>
        Loading ... 
      </p>

      <div
        style={{
          width: "80%",
          height: "25px",
          background: "#ccc",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{
            height: "100%",
            background: "#FFBD2B",
          }}
        />
      </div>
      <p style={{ marginTop: "10px" }}>{Math.round(progress)}%</p>
     
    </div>
  );
};

export default LoadingScreen;
